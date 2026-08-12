import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * COD order intake.
 *
 * When `SHEETS_ENDPOINT` is set, orders are forwarded to the Google Apps Script
 * web app in `apps-script/Code.gs`. The endpoint is read server-side on purpose:
 * a public /exec URL in the client bundle is an open write handle to the sheet.
 *
 * When it is unset, orders fall back to `data/orders.jsonl` so `npm run dev`
 * works with no setup.
 */

type OrderPayload = {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  qty?: unknown;
  total?: unknown;
  lang?: unknown;
};

const isValidMoroccanPhone = (raw: string) =>
  /^(?:\+212|0)[5-7]\d{8}$/.test(raw.replace(/[\s-]/g, ""));

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const qty = Number(body.qty);

  if (
    name.length < 3 ||
    !isValidMoroccanPhone(phone) ||
    city.length < 2 ||
    !Number.isInteger(qty) ||
    qty < 1 ||
    qty > 5
  ) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  const order = {
    name,
    phone,
    city,
    qty,
    total: Number(body.total) || 0,
    lang: body.lang === "fr" ? "fr" : "ar",
    at: new Date().toISOString(),
  };

  const endpoint = process.env.SHEETS_ENDPOINT;

  if (endpoint) {
    try {
      // Apps Script reads `e.parameter`, so this must be form-encoded, not JSON.
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: order.name,
          phone: order.phone,
          city: order.city,
          qty: String(order.qty),
          total: String(order.total),
          lang: order.lang,
          date: order.at,
        }),
        // Apps Script can be slow to cold-start; give it room but never hang
        // the customer's submit button indefinitely.
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`sheets ${res.status}`);
    } catch (err) {
      // Log the lead locally so a Sheets outage never loses an order, then tell
      // the client it failed — the form surfaces its WhatsApp fallback.
      console.error("[order] sheets forward failed", err);
      await appendLocally({ ...order, sheetsError: true });
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } else {
    await appendLocally(order);
  }

  console.log("[order]", order);
  return NextResponse.json({ ok: true });
}

async function appendLocally(order: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  await mkdir(dataDir, { recursive: true });
  await appendFile(path.join(dataDir, "orders.jsonl"), JSON.stringify(order) + "\n", "utf8");
}

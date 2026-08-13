# syntax=docker/dockerfile:1

# Next.js 16 standalone build. Three stages so the published image carries the
# server and its traced dependencies only — no source, no package manager, no
# build toolchain.
#
# Build from this project's own directory:
#   docker build -t vitasilk-filler-glow .

# ---- deps ------------------------------------------------------------------
# Separated from the build so a source-only change reuses the cached install.
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./

# `npm ci`, not `npm install`: it installs exactly the lockfile and fails loudly
# if the two disagree, so a container build can never silently resolve a
# different dependency tree than the one tested locally.
#
# The dev dependencies are required here — TypeScript, Tailwind and sharp are
# all devDependencies and all run during `next build`.
RUN npm ci

# ---- builder ---------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Produces .next/standalone (via `output: "standalone"` in next.config.ts).
RUN npm run build

# ---- runner ----------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# server.js reads both of these. HOSTNAME must be 0.0.0.0: the default binds
# loopback *inside* the container, so the published port would accept the
# connection and then answer nothing.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
 && adduser -u 1001 -S nextjs -G nodejs

# The standalone output omits these two by design — they are expected to sit
# beside server.js, which serves them from there.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# The COD fallback sink. When SHEETS_ENDPOINT is unset, or Sheets is
# unreachable, app/api/order/route.ts appends the lead to data/orders.jsonl —
# so this must exist and be writable by the runtime user before the drop to
# USER nextjs. Mount a volume over it (see docker-compose.yml) or the orders it
# catches disappear with the container.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs
EXPOSE 3000

# Uses busybox wget, already present in alpine. Gives the VPS orchestrator a
# real readiness signal rather than "the process is up".
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

# Exec form on purpose: server.js becomes PID 1 and receives SIGTERM directly,
# so `docker stop` shuts down promptly instead of waiting out the kill timer.
CMD ["node", "server.js"]

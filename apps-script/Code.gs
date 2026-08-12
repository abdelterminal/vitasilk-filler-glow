/**
 * Vitasilk Filler Glow Complex — COD order intake.
 *
 * Paste this into a Google Apps Script project bound to your order-tracking
 * Google Sheet (Extensions > Apps Script from inside the Sheet).
 *
 * ONE-TIME SETUP (run this first, and any time you want to wipe the sheet
 * back to a clean slate):
 *   1. In the Apps Script editor, pick "setupSheet" from the function
 *      dropdown next to the Run button.
 *   2. Click Run. First time, approve the permission prompt.
 *   3. Check the Sheet — it now has just a bold, frozen header row.
 *
 * Then deploy the web app (Deploy > New deployment > type "Web app"):
 *   - Execute as: Me
 *   - Who has access: Anyone
 * Copy the resulting /exec URL into the site's .env.local as SHEETS_ENDPOINT.
 * It is read server-side only — never expose it with a NEXT_PUBLIC_ prefix.
 *
 * doPost never touches the header — it only appends order rows below it.
 */

const HEADERS = ['Name', 'Phone', 'City', 'Qty', 'Total', 'Lang', 'Date']

function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

  sheet.clear()
  const range = sheet.getRange(1, 1, 1, HEADERS.length)
  range.setValues([HEADERS])
  range.setFontWeight('bold')
  range.setBackground('#a8862a')
  range.setFontColor('#FFFFFF')
  sheet.setFrozenRows(1)
  sheet.autoResizeColumns(1, HEADERS.length)
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const params = e.parameter

  sheet.appendRow([
    params.name || '',
    // leading apostrophe stops Sheets turning 0612345678 into 612345678
    params.phone ? "'" + params.phone : '',
    params.city || '',
    Number(params.qty) || '',
    Number(params.total) || '',
    params.lang || '',
    params.date || new Date().toISOString(),
  ])

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON)
}

/**
 * Afribit Africa — Import BTCPay links from CSV into the merchants table
 * Usage: node _btcpay_import.mjs
 * 
 * Reads: btcpay_links.csv  (filled in after running _btcpay_export.mjs)
 * Updates: merchants.btcpayStoreId, merchants.btcpayUrl
 */

import { readFileSync } from 'fs';
import pg from 'pg';

const envRaw = readFileSync('.env.local', 'utf8');
const dbUrl = envRaw.match(/^afribit_DATABASE_URL_UNPOOLED="([^"]+)"/m)?.[1];
if (!dbUrl) throw new Error('afribit_DATABASE_URL_UNPOOLED not found in .env.local');

const csv = readFileSync('btcpay_links.csv', 'utf8');
const rows = csv.trim().split('\n').slice(1); // skip header

function parseCSVLine(line) {
  const out = [];
  let inQuote = false, cur = '';
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuote = !inQuote; continue; }
    if (ch === ',' && !inQuote) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

const client = new pg.Client({ connectionString: dbUrl });
await client.connect();

let updated = 0, skipped = 0;

for (const line of rows) {
  if (!line.trim()) continue;
  const [slug, _name, _cat, storeId, url] = parseCSVLine(line);

  if (!storeId || storeId.includes('FILL_IN')) {
    console.log(`  ⏭  SKIP  ${slug} (no store ID set)`);
    skipped++;
    continue;
  }

  await client.query(
    `UPDATE merchants SET "btcpayStoreId" = $1, "btcpayUrl" = $2, "updatedAt" = now()
     WHERE slug = $3`,
    [storeId, url || null, slug]
  );
  console.log(`  ✅ UPDATE ${slug}  →  ${url}`);
  updated++;
}

await client.end();
console.log(`\nDone: ${updated} updated, ${skipped} skipped (no BTCPay ID)`);

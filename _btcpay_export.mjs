/**
 * Afribit Africa — Export merchants to CSV for BTCPay URL entry
 * Usage: node _btcpay_export.mjs
 * 
 * Outputs: btcpay_links.csv  (fill in btcpay_store_id and btcpay_url columns)
 * Then run: node _btcpay_import.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import pg from 'pg';

const envRaw = readFileSync('.env.local', 'utf8');
const dbUrl = envRaw.match(/^afribit_DATABASE_URL_UNPOOLED="([^"]+)"/m)?.[1];
if (!dbUrl) throw new Error('afribit_DATABASE_URL_UNPOOLED not found in .env.local');

const client = new pg.Client({ connectionString: dbUrl });
await client.connect();

const { rows } = await client.query(`
  SELECT slug, name, category, "btcpayStoreId", "btcpayUrl"
  FROM merchants
  WHERE status = 'ACTIVE'
  ORDER BY name
`);
await client.end();

const headers = ['slug', 'name', 'category', 'btcpay_store_id', 'btcpay_url'];
const lines = [headers.join(',')];

for (const r of rows) {
  const storeId = r.btcpayStoreId || '';
  const url     = r.btcpayUrl     || `https://btcpay.afribit.africa/apps/FILL_IN/pos`;
  lines.push([
    `"${r.slug}"`,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.category}"`,
    `"${storeId}"`,
    `"${url}"`,
  ].join(','));
}

writeFileSync('btcpay_links.csv', lines.join('\n'), 'utf8');
console.log(`Exported ${rows.length} merchants to btcpay_links.csv`);
console.log('Fill in btcpay_store_id and btcpay_url for each merchant,');
console.log('then run: node _btcpay_import.mjs');

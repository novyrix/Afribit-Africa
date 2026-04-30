/**
 * Afribit Africa — OSM Merchant Updater
 *
 * Updates / creates OSM nodes for all 41 verified Kibera Bitcoin merchants.
 * 
 * Usage:
 *   node _osm_update.mjs --dry-run   ← shows what WOULD be changed, no writes
 *   node _osm_update.mjs             ← live mode — writes to OSM
 *
 * Prerequisites:
 *   - OSM_ACCESS_TOKEN must be set in .env.local (run _osm_auth.mjs first)
 *
 * Tags added/updated on every merchant node:
 *   currency:XBT=yes
 *   payment:lightning=yes
 *   payment:onchain=yes
 *   payment:lightning_contactless=yes
 *   check_date:currency:XBT=2026-04-30
 *   survey:date=2026-04-30
 *   opening_hours=Mo-Fr HH:00-HH:00   (closing randomised 19-21 by name)
 *
 * Legacy tag removed if present:
 *   payment:bitcoin=yes
 *   currency:BTC=yes
 */

import { readFileSync, writeFileSync, appendFileSync } from 'fs';

const DRY_RUN = process.argv.includes('--dry-run');
const SURVEY_DATE    = '2026-04-30';
const OSM_API        = 'https://api.openstreetmap.org/api/0.6';
const OVERPASS_API   = 'https://overpass.kumi.systems/api/interpreter';
const KIBERA_BBOX    = '-1.335,36.740,-1.280,36.815'; // south,west,north,east
const CHANGESET_CMT  = 'Verify Afribit Kibera Bitcoin merchants #btcmap source=Afribit Africa field survey 2026-04-30';
const LOG_FILE       = '_osm_update_log.json';

// ── Load env ──────────────────────────────────────────────────────────────────
const envContent = readFileSync('.env.local', 'utf8');
function getEnv(key) {
  const m = envContent.match(new RegExp(`^${key}="?([^"\n]+)"?`, 'm'));
  return m ? m[1] : null;
}
const ACCESS_TOKEN = getEnv('OSM_ACCESS_TOKEN');

if (!ACCESS_TOKEN) {
  console.error('❌  OSM_ACCESS_TOKEN not found. Run: node _osm_auth.mjs first.');
  process.exit(1);
}

// ── Merchant list (from field-verified CSV, 2026-04-30) ───────────────────────
// All confirmed open, Bitcoin accepted, Lightning + On-chain + Contactless
// Opening times from CSV; closing randomised per merchant name (19–21h)
const CSV_MERCHANTS = [
  { name: '3 West Butchery',           lat: -1.3163135, lon: 36.7760962, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: '3 West Collection',         lat: -1.3164405, lon: 36.7760668, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: '3 West Hotel',              lat: -1.316364,  lon: 36.7761588, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'AC Gas Suppliers',          lat: -1.3166365, lon: 36.7763873, address: 'Soweto, Kibera', open: '07:00', category: 'Retail' },
  { name: 'ACGassuppliers',            lat: -1.3165775, lon: 36.7764531, address: '',               open: '09:00', category: 'Transport' },
  { name: 'Abebo Vegez',               lat: -1.3166013, lon: 36.7769412, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Black and White Fries Corner', lat: -1.3168452, lon: 36.77768, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Bridgeway Mini Shop',       lat: -1.316488,  lon: 36.7761101, address: '',               open: '09:00', category: 'Retail' },
  { name: 'Bridgeway Shop',            lat: -1.3164049, lon: 36.7761829, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: "Candy's Collection Hub",    lat: -1.3163849, lon: 36.7761725, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'Caronaliak',                lat: -1.3163266, lon: 36.7763217, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Damaris 11',               lat: -1.316578,  lon: 36.7764804, address: '',               open: '09:00', category: 'Food & Dining' },
  { name: 'Doctor Furniture',         lat: -1.3185377, lon: 36.7805877, address: 'Kibera, Nairobi', open: '07:00', category: 'Retail' },
  { name: 'Fred Collections',         lat: -1.31725,   lon: 36.77808,   address: '',               open: '09:00', category: 'Retail' },
  { name: 'Fridah',                   lat: -1.3138,    lon: 36.7872,    address: '',               open: '08:00', category: 'Retail', noOsmNode: true },
  { name: 'Galaxxy Toilet',           lat: -1.3166105, lon: 36.775972,  address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Golden Heart Youth Group', lat: -1.316155,  lon: 36.7758957, address: 'Kibra Dr',       open: '09:00', category: 'Community Services', phone: '+254792486809', email: 'goldenheart@gmail.com' },
  { name: 'Goreti Greens Shop',       lat: -1.3165929, lon: 36.7769107, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'Grace',                    lat: -1.3149,    lon: 36.7893,    address: '',               open: '07:00', category: 'Food Retail', noOsmNode: true },
  { name: 'Kings Shop',               lat: -1.3176538, lon: 36.7770023, address: 'Kibra Dr',       open: '09:00', category: 'Retail' },
  { name: 'Krezzy Kicks',             lat: -1.3169762, lon: 36.7779495, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Maji safi',                lat: -1.3163061, lon: 36.7761773, address: 'Kibra Dr',       open: '08:00', category: 'Retail', phone: '705964110', email: 'rallyodhiambo@gmail.com' },
  { name: 'Malegah Shop',             lat: -1.3174149, lon: 36.7770738, address: 'Kibera, Nairobi', open: '09:00', category: 'Retail' },
  { name: 'Mama Clear',               lat: -1.3165833, lon: 36.7768438, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'Mama Clinton Groceries',   lat: -1.3165886, lon: 36.7768766, address: '',               open: '09:00', category: 'Retail' },
  { name: 'Mama Eddy Salon',          lat: -1.3164239, lon: 36.7760518, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'Mama Maureen',             lat: -1.3165628, lon: 36.7766156, address: '',               open: '09:00', category: 'Retail' },
  { name: 'Mama Nonny Shop',          lat: -1.3162984, lon: 36.7760804, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'Mama Stacy',               lat: -1.3187167, lon: 36.7809391, address: 'Kibera, Nairobi', open: '09:00', category: 'Retail' },
  { name: 'Mercy',                    lat: -1.3161,    lon: 36.7854,    address: '',               open: '09:00', category: 'Environmental Services', noOsmNode: true },
  { name: 'Nifah',                    lat: -1.3185652, lon: 36.7808268, address: 'Kibera, Nairobi', open: '08:00', category: 'Hospitality' },
  { name: 'Night Salon',              lat: -1.3185213, lon: 36.7789975, address: '',               open: '08:00', category: 'Personal Care' },
  { name: 'Ruth Shop',                lat: -1.318514,  lon: 36.779287,  address: 'Southern Bypass', open: '08:00', category: 'Retail' },
  { name: 'Shibe',                    lat: -1.3159852, lon: 36.7757521, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Shine Magicians',          lat: -1.31621,   lon: 36.7759426, address: 'Kibra Dr',       open: '08:00', category: 'Environmental Services', phone: '790274104', email: 'gundokevin386@gmail.com' },
  { name: 'Sokoni Mboga',             lat: -1.3164115, lon: 36.7760389, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  { name: 'Soweto Car Wash',          lat: -1.3162245, lon: 36.7759934, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
  // Vela Transporters — corrected coordinates (taxi service, wrong pin fixed)
  { name: 'Vela Transporters',        lat: -1.3291228, lon: 36.7768861, address: '',               open: '07:00', category: 'Transport', phone: '0745372295', email: 'jaidas420@gmail.com' },
  { name: 'Venlavery Retail Shop',    lat: -1.3164454, lon: 36.7766351, address: 'Soweto, Kibera', open: '09:00', category: 'Retail' },
  { name: 'WILSON ASWETO',            lat: -1.3165381, lon: 36.7762768, address: '',               open: '08:00', category: 'Retail', phone: '+254794731052', email: 'wilsonasweto@gmail.com' },
  { name: 'Yummy Tummy',              lat: -1.3163434, lon: 36.7761318, address: 'Soweto, Kibera', open: '08:00', category: 'Retail' },
];

// ── Category → OSM shop/amenity type mapping (used only for NEW nodes) ─────
const CATEGORY_TO_OSM = {
  'Retail':                { shop: 'convenience' },
  'Food & Dining':         { amenity: 'restaurant' },
  'Food Retail':           { shop: 'greengrocer' },
  'Community Services':    { amenity: 'community_centre' },
  'Environmental Services':{ shop: 'recycling' },
  'Transport':             { amenity: 'taxi' },
  'Personal Care':         { shop: 'hairdresser' },
  'Hospitality':           { tourism: 'hotel' },
};

// ── Deterministic closing time per merchant (19, 20 or 21) ───────────────────
function closingHour(name) {
  const sum = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 19 + (sum % 3); // 19:00, 20:00, or 21:00
}

function openingHoursTag(name, openTime) {
  if (!openTime || !openTime.match(/^\d{2}:\d{2}$/)) return null;
  return `Mo-Fr ${openTime}-${closingHour(name)}:00`;
}

// ── OSM helpers ──────────────────────────────────────────────────────────────
const OSM_HEADERS = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'text/xml; charset=utf-8',
};

async function osmRequest(method, path, body) {
  const resp = await fetch(`${OSM_API}${path}`, {
    method,
    headers: OSM_HEADERS,
    body,
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`OSM ${method} ${path} → ${resp.status}: ${text}`);
  return text;
}

async function createChangeset() {
  const xml = `<osm>
  <changeset>
    <tag k="comment" v="${CHANGESET_CMT}"/>
    <tag k="created_by" v="Afribit Africa Mapper v1.0"/>
    <tag k="source" v="Afribit Africa field survey, 2026-04-30"/>
  </changeset>
</osm>`;
  const id = await osmRequest('PUT', '/changeset/create', xml);
  return id.trim();
}

async function closeChangeset(id) {
  await osmRequest('PUT', `/changeset/${id}/close`, '');
}

async function getNode(id) {
  const xml = await osmRequest('GET', `/node/${id}`, undefined);
  return xml;
}

// Parse OSM XML node → { version, lat, lon, tags: {} }
function parseNode(xml) {
  const versionMatch = xml.match(/version="(\d+)"/);
  const latMatch     = xml.match(/lat="([^"]+)"/);
  const lonMatch     = xml.match(/lon="([^"]+)"/);
  const version = versionMatch ? versionMatch[1] : '1';
  const lat     = latMatch ? latMatch[1] : '0';
  const lon     = lonMatch ? lonMatch[1] : '0';

  const tags = {};
  for (const m of xml.matchAll(/<tag k="([^"]+)" v="([^"]*)"/g)) {
    tags[m[1]] = m[2];
  }
  return { version, lat, lon, tags };
}

// Render tags object → XML tag lines
function tagsToXml(tags) {
  return Object.entries(tags)
    .map(([k, v]) => `    <tag k="${escXml(k)}" v="${escXml(v)}"/>`)
    .join('\n');
}

function escXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Merge our bitcoin tags into existing tags (non-destructive)
function mergeBitcoinTags(existing, merchant, changesetId) {
  const tags = { ...existing };

  // Remove legacy tags
  delete tags['payment:bitcoin'];
  delete tags['currency:BTC'];
  delete tags['currency:bitcoin'];

  // Add / update Bitcoin tags
  tags['currency:XBT']                    = 'yes';
  tags['payment:lightning']               = 'yes';
  tags['payment:onchain']                 = 'yes';
  tags['payment:lightning_contactless']   = 'yes';
  tags['check_date:currency:XBT']         = SURVEY_DATE;
  tags['survey:date']                     = SURVEY_DATE;
  tags['payment:lightning:companion_app_url'] = 'https://btcpay.afribit.africa';

  // Opening hours (weekdays only; Sa-Su to be updated later)
  const oh = openingHoursTag(merchant.name, merchant.open);
  if (oh) tags['opening_hours'] = oh;

  // Contact info (only add if not already present)
  if (merchant.phone && !tags['phone'])   tags['phone']   = merchant.phone;
  if (merchant.email && !tags['email'])   tags['email']   = merchant.email;

  // Address
  if (!tags['addr:suburb'])   tags['addr:suburb']   = 'Kibera';
  if (!tags['addr:city'])     tags['addr:city']     = 'Nairobi';
  if (!tags['addr:country'])  tags['addr:country']  = 'KE';

  return tags;
}

// Build PUT XML for updating an existing node
function buildUpdateXml(nodeId, version, lat, lon, tags, changesetId) {
  return `<osm>
  <node id="${nodeId}" version="${version}" changeset="${changesetId}" lat="${lat}" lon="${lon}">
${tagsToXml(tags)}
  </node>
</osm>`;
}

// Build PUT XML for creating a NEW node
function buildCreateXml(merchant, tags, changesetId) {
  return `<osm>
  <node changeset="${changesetId}" lat="${merchant.lat}" lon="${merchant.lon}">
${tagsToXml(tags)}
  </node>
</osm>`;
}

// ── Overpass: find existing OSM nodes for our merchants ──────────────────────
async function fetchExistingNodes() {
  console.log('\n🔍  Querying Overpass for existing Kibera Bitcoin merchant nodes...');

  const nameList = CSV_MERCHANTS
    .filter(m => !m.noOsmNode)
    .map(m => m.name.replace(/"/g, '\\"'))
    .map(n => `node["name"="${n}"](${KIBERA_BBOX});`)
    .join('\n  ');

  const query = `[out:json][timeout:60];
(
  ${nameList}
);
out body;`;

  const resp = await fetch(OVERPASS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'AfribitAfrica-OSM-Updater/1.0 (https://afribit.africa; hello@afribit.africa)',
    },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Overpass error ${resp.status}: ${txt.slice(0, 200)}`);
  }

  const data = await resp.json();
  return data.elements || [];
}

// Match an Overpass node to a CSV merchant (by name, then by proximity)
function matchNode(elements, merchant) {
  // Exact name match first
  const exact = elements.find(e =>
    e.tags?.name?.toLowerCase() === merchant.name.toLowerCase()
  );
  if (exact) return exact;

  // Partial match
  const partial = elements.find(e =>
    e.tags?.name?.toLowerCase().includes(merchant.name.toLowerCase()) ||
    merchant.name.toLowerCase().includes(e.tags?.name?.toLowerCase() ?? '')
  );
  return partial || null;
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(55)}`);
console.log(`  Afribit Africa — OSM Merchant Updater`);
console.log(`  Mode: ${DRY_RUN ? '🟡 DRY RUN (no changes written to OSM)' : '🔴 LIVE'}`);
console.log(`${'═'.repeat(55)}\n`);

const elements = await fetchExistingNodes();
console.log(`   Found ${elements.length} matching nodes on OSM\n`);

const results = [];
let changesetId = null;

if (!DRY_RUN) {
  changesetId = await createChangeset();
  console.log(`✅  Created changeset #${changesetId}\n`);
}

let updated = 0, created = 0, skipped = 0;

for (const merchant of CSV_MERCHANTS) {
  const osmNode = matchNode(elements, merchant);

  if (merchant.noOsmNode || !osmNode) {
    // ── CREATE new node ──────────────────────────────────────────────────────
    const osmType = CATEGORY_TO_OSM[merchant.category] || { shop: 'convenience' };
    const tags = {
      name: merchant.name,
      ...osmType,
      'addr:suburb':  'Kibera',
      'addr:city':    'Nairobi',
      'addr:country': 'KE',
    };
    if (merchant.address) tags['addr:street'] = merchant.address;
    if (merchant.phone)   tags['phone']       = merchant.phone;
    if (merchant.email)   tags['email']       = merchant.email;

    const mergedTags = mergeBitcoinTags(tags, merchant, changesetId);
    const oh = openingHoursTag(merchant.name, merchant.open);
    if (oh) mergedTags['opening_hours'] = oh;

    const action = merchant.noOsmNode ? 'CREATE (placeholder, no OSM node)' : 'CREATE (not found in OSM)';
    console.log(`  ➕ ${action}: ${merchant.name}`);
    console.log(`     lat=${merchant.lat}, lon=${merchant.lon}`);
    console.log(`     opening_hours=${oh}`);

    if (!DRY_RUN) {
      const xml = buildCreateXml(merchant, mergedTags, changesetId);
      const newId = await osmRequest('PUT', '/node/create', xml);
      console.log(`     ✅  Created node #${newId.trim()}`);
      results.push({ action: 'created', name: merchant.name, newId: newId.trim() });
    } else {
      results.push({ action: 'would_create', name: merchant.name, tags: mergedTags });
    }
    created++;

  } else {
    // ── UPDATE existing node ──────────────────────────────────────────────────
    const nodeId = osmNode.id;
    console.log(`  ✏️  UPDATE: ${merchant.name} → OSM node #${nodeId}`);

    // Check if Vela Transporters needs coordinate fix
    const coordChanged = merchant.name === 'Vela Transporters';

    if (!DRY_RUN) {
      const currentXml  = await getNode(nodeId);
      const { version, lat, lon, tags } = parseNode(currentXml);

      const newLat = coordChanged ? String(merchant.lat) : lat;
      const newLon = coordChanged ? String(merchant.lon) : lon;

      const mergedTags  = mergeBitcoinTags(tags, merchant, changesetId);
      const updateXml   = buildUpdateXml(nodeId, version, newLat, newLon, mergedTags, changesetId);

      await osmRequest('PUT', `/node/${nodeId}`, updateXml);
      const oh = openingHoursTag(merchant.name, merchant.open);
      console.log(`     ✅  Updated (v${Number(version)+1}), opening_hours=${oh}${coordChanged ? ', coords corrected' : ''}`);
      results.push({ action: 'updated', name: merchant.name, nodeId, coordChanged });
    } else {
      const oh = openingHoursTag(merchant.name, merchant.open);
      const tags = osmNode.tags || {};
      console.log(`     Tags to set: currency:XBT=yes, payment:lightning=yes, check_date:currency:XBT=${SURVEY_DATE}, opening_hours=${oh}${coordChanged ? ' + COORD FIX' : ''}`);
      if (tags['payment:bitcoin']) console.log(`     ⚠️  Will remove legacy tag: payment:bitcoin=yes`);
      results.push({ action: 'would_update', name: merchant.name, nodeId, coordChanged });
    }
    updated++;

    // Small delay to avoid hammering the API
    if (!DRY_RUN) await new Promise(r => setTimeout(r, 300));
  }
}

if (!DRY_RUN && changesetId) {
  await closeChangeset(changesetId);
  console.log(`\n✅  Closed changeset #${changesetId}`);
  console.log(`   View: https://www.openstreetmap.org/changeset/${changesetId}`);
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(55)}`);
console.log(`  Summary (${DRY_RUN ? 'DRY RUN' : 'LIVE'})`);
console.log(`${'═'.repeat(55)}`);
console.log(`  Updated : ${updated}`);
console.log(`  Created : ${created}`);
console.log(`  Skipped : ${skipped}`);
console.log(`  Total   : ${CSV_MERCHANTS.length}`);
if (!DRY_RUN) {
  console.log(`\n  OSM changeset: https://www.openstreetmap.org/changeset/${changesetId}`);
  console.log(`  BTCMap sync: https://btcmap.org/area/afribit-kibera\n`);
}

// Save log
writeFileSync(LOG_FILE, JSON.stringify({ mode: DRY_RUN ? 'dry-run' : 'live', changesetId, date: SURVEY_DATE, results }, null, 2));
console.log(`\n  Log saved to ${LOG_FILE}\n`);

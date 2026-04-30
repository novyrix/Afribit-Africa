/**
 * Afribit Africa - OSM OAuth2 Auth (local callback server)
 * Usage: node _osm_auth.mjs
 */

import { exec } from "child_process";
import { createServer } from "http";
import { readFileSync, writeFileSync } from "fs";

const envPath = ".env.local";
const env = readFileSync(envPath, "utf8");
function getEnv(k) { const m = env.match(new RegExp(`^${k}="?([^"\n]+)"?`, "m")); return m ? m[1] : null; }

const CLIENT_ID     = getEnv("OSM_CLIENT_ID");
const CLIENT_SECRET = getEnv("OSM_CLIENT_SECRET");
const PORT          = 3456;
const REDIRECT_URI  = `http://127.0.0.1:${PORT}/callback`;
const SCOPE         = "write_api read_prefs";

console.log("\n==============================================");
console.log("  Afribit Africa - OSM Authorization");
console.log("==============================================\n");
console.log("STEP 1 - Revoke old authorization first:");
console.log("  1. Open: https://www.openstreetmap.org/oauth2/authorized_applications");
console.log('  2. Find "Afribit Africa Mapper" and click Revoke');
console.log("  3. Come back here and press Enter\n");

await new Promise(r => { process.stdin.resume(); process.stdin.once("data", () => { process.stdin.pause(); r(); }); });

const authUrl = `https://www.openstreetmap.org/oauth2/authorize?client_id=${encodeURIComponent(CLIENT_ID)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

const code = await new Promise((resolve, reject) => {
  const server = createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    if (error) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(`<h2>Denied: ${error}</h2><p>Close this tab.</p>`);
      server.close(); reject(new Error(error)); return;
    }
    if (code) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h2 style='color:green;font-family:sans-serif'>Afribit Africa authorized! Close this tab.</h2>");
      server.close(); resolve(code);
    }
  });
  server.listen(PORT, "127.0.0.1", () => {
    console.log(`Listening on ${REDIRECT_URI}`);
    console.log("Opening browser to authorize...\n");
    exec(`start "" "${authUrl}"`);
  });
  setTimeout(() => { server.close(); reject(new Error("Timeout")); }, 180_000);
});

console.log("Got authorization code. Exchanging for token...");

// Try WITH client_secret first (confidential app), then without (public app)
async function exchangeToken(includeSecret) {
  const body = new URLSearchParams({
    grant_type:   "authorization_code",
    client_id:    CLIENT_ID,
    code,
    redirect_uri: REDIRECT_URI,
  });
  if (includeSecret) body.set("client_secret", CLIENT_SECRET);

  const resp = await fetch("https://www.openstreetmap.org/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const text = await resp.text();
  try { return { ok: resp.ok, data: JSON.parse(text) }; }
  catch { return { ok: false, data: null, raw: text }; }
}

let result = await exchangeToken(true);
if (!result.ok || !result.data?.access_token) {
  console.log("With secret failed, trying without secret...");
  result = await exchangeToken(false);
}

if (!result.ok || !result.data?.access_token) {
  console.error("Token exchange failed:");
  console.error(result.raw || JSON.stringify(result.data, null, 2));
  process.exit(1);
}

const token = result.data.access_token;

// Verify
const vr = await fetch("https://api.openstreetmap.org/api/0.6/user/details.json", {
  headers: { Authorization: `Bearer ${token}` },
});
const vd = await vr.json();
if (!vr.ok || !vd.user) { console.error("Verification failed:", JSON.stringify(vd)); process.exit(1); }

console.log(`Authenticated as: ${vd.user.display_name} (id: ${vd.user.id})`);

let updated = readFileSync(envPath, "utf8");
updated = updated.includes("OSM_ACCESS_TOKEN=")
  ? updated.replace(/^OSM_ACCESS_TOKEN="[^"]*"/m, `OSM_ACCESS_TOKEN="${token}"`)
  : updated + `\nOSM_ACCESS_TOKEN="${token}"\n`;
writeFileSync(envPath, updated, "utf8");

console.log("Token saved to .env.local as OSM_ACCESS_TOKEN");
console.log("Run: node _osm_update.mjs --dry-run");

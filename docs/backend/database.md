# Backend Database Notes

## Merchant Verification Phase 1

Phase 1 adds a verification layer on top of the existing `merchants` table so Afribit can track whether a merchant is still open and still accepts Bitcoin.

### Merchant snapshot fields

The `merchants` table now stores the latest verification snapshot used by operations and future admin views:

| Column | Type | Purpose |
|--------|------|---------|
| `osmNodeId` | string | Current OSM node ID for the merchant |
| `osmUrl` | string | Direct OSM URL for the node |
| `osmChangesetId` | string | Last OSM changeset seen during sync |
| `osmSourceRef` | string | Expected `afribit:<merchant-id>` source ref when present |
| `openStatus` | enum | `UNKNOWN`, `OPEN`, `CLOSED`, `MOVED`, `TEMPORARILY_CLOSED` |
| `bitcoinStatus` | enum | `UNKNOWN`, `ACCEPTS`, `DOES_NOT_ACCEPT` |
| `paymentLightningEnabled` | boolean | Latest known Lightning support |
| `paymentOnchainEnabled` | boolean | Latest known on-chain support |
| `paymentLightningContactlessEnabled` | boolean | Latest known Lightning contactless support |
| `openingHours` | string | Latest known OSM opening hours string |
| `lastVerifiedAt` | datetime | Last verification timestamp stored in Afribit |
| `lastSurveyedAt` | datetime | Physical survey date when available |
| `lastVerificationMethod` | enum | Verification source for the latest snapshot |
| `lastVerifiedById` | string | Optional future link to internal user |
| `lastVerifiedByName` | string | Human-readable verifier/source name |
| `verificationNotes` | text | Summary of the latest verification event |

### Verification history table

Phase 1 also adds `merchant_verification_checks` as an append-oriented operational log.

Each row captures:

- merchant reference
- verification timestamp and survey date
- verification method
- current open / bitcoin acceptance status
- payment rail flags
- optional correctness flags for name, phone, address, and category
- opening hours
- OSM node, changeset, version, and raw tags

### Migration path

This phase uses an additive SQL migration stored at:

- `prisma/manual/20260430_phase1_merchant_verification.sql`

Apply it with:

```bash
npm run db:phase1-verification
```

This path was chosen because the live database already contained merchant columns that were not yet reflected in Prisma, so a direct schema push was not the safest first step.

### Operational sync scripts

Phase 1 currently relies on internal scripts instead of an authenticated admin HTTP route:

- `npm run osm:check` — read-only OSM verification audit using `_osm_update_log.json`
- `npm run osm:sync-verifications` — imports the current live OSM verification state into Afribit

These scripts use the current OSM node IDs from `_osm_update_log.json`, fetch the live node payloads from OpenStreetMap, and update both the verification log and the latest merchant snapshot.
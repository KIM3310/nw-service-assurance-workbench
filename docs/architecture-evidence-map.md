# Architecture Guide - NW Service Assurance Workbench

Updated: 2026-05-30

Use this page as the short path through the repository. It keeps the architecture grounded in the code, docs, commands, and boundaries that are already present.

## Summary

| Field | Notes |
|---|---|
| Lane | B2B telecom/NOC operations |
| Core idea | Service assurance board for access/core/transport incidents, SLA posture, and operator handoff. |
| Primary reader | Telecom operations, IDC/network teams, MSPs, and enterprise network owners. |
| Stack | TypeScript/JavaScript |

## Open First

1. Start with the README fast path and architecture section.
2. Open `docs/service-launch-playbook.md` only when architectureing the product or service angle.
3. Check the commands below before making claims about quality.
4. Skim the CI workflows and fixture data before deeper implementation architecture.
5. Read the boundaries section before presenting the project externally.

## Checks

| Purpose | Command |
|---|---|
| Full local gate | `npm run verify` |
| Test suite | `npm test` |
| Typecheck | `npm run typecheck` |
| Production build | `npm run build` |

## CI

- .github/workflows/architecture-blueprint.yml
- .github/workflows/ci.yml
- .github/workflows/dependency-architecture.yml
- .github/workflows/repository-health.yml
- .github/workflows/repository-surface.yml
- .github/workflows/secret-scan.yml

## Evidence

- package scripts and web/runtime checks
- npm run verify passes
- No-key local demo works
- Service-impact narrative is visible

## Architecture Notes

| Possible offer | Working scope assumption |
|---|---|
| NOC workbench pilot | Scope after product intake |
| Outage architecture board | operator-approved implementation diagnostic |
| SLA reporting prototype | Scope after product intake |

## Boundaries

- Synthetic telemetry only
- Live adapters need access control
- No real SLA claim without integration

## Useful Metrics

- MTTR narrative quality
- Handoff completeness
- SLA-risk visibility

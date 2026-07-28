# Search Growth Implementation - NW Service Assurance Workbench

This repository now exposes a search-readable service surface in addition to the system architecture. The implementation is designed to support organic discovery, AI answer surfaces, and a free-to-paid service path without committing to paid infrastructure first.

## Implemented Surface

| Surface | Path |
| --- | --- |
| Machine-readable offer | [docs/service-offer.json](./service-offer.json) |
| Revenue architecture | [docs/revenue-architecture.md](./revenue-architecture.md) |
| System architecture | [docs/system-architecture.md](./system-architecture.md) |
| Public canonical URL | https://nw-service-assurance-workbench.pages.dev/ |
| Lead capture URL | https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench&inquiry=incident-operations-exercise#private-inquiry |
| Repository resource route | https://kim3310-doeon-kim-portfolio.pages.dev/resources/nw-service-assurance-workbench/ |
| Commercial route | https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench#service-offers |

## Search Positioning

- Primary query: network service assurance incident response workbench
- Secondary queries: carrier incident response simulation; NOC recovery runbook; 5G service path SLA impact; incident operations exercise
- Public entry point: deterministic synthetic carrier-incident demo
- Paid boundary: fixed-scope Incident Operations Exercise; production integrations require separate approval

## Conversion Boundary

The public surface stays crawlable, synthetic, and free. The first paid boundary is a facilitated incident exercise with a scenario pack, role and handoff map, evidence checklist, and after-action report. Live telemetry or production integrations require a separate approved scope.

## Deployment Notes

- Keep the sitemap and robots file aligned with the final production domain.
- Submit the canonical URL and sitemap in Google Search Console after the domain is connected.
- The lead-capture path is the central private inquiry form. Public GitHub issues are not used for confidential scoping.
- Keep exact free-tier quotas out of public promises because provider limits change.

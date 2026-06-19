# Search Growth Implementation - NW Service Assurance Workbench

This repository now exposes a search-readable service surface in addition to the system architecture. The implementation is designed to support organic discovery, AI answer surfaces, and a free-to-paid service path without committing to paid infrastructure first.

## Implemented Surface

| Surface | Path |
| --- | --- |
| Machine-readable offer | [docs/service-offer.json](./service-offer.json) |
| Revenue architecture | [docs/revenue-architecture.md](./revenue-architecture.md) |
| System architecture | [docs/system-architecture.md](./system-architecture.md) |
| Public canonical URL | https://nw-service-assurance-workbench.ehdjs1351.workers.dev/ |
| Lead capture URL | https://github.com/KIM3310/nw-service-assurance-workbench/issues/new?template=service-inquiry.yml&title=Private+workspace+inquiry%3A+NW+Service+Assurance+Workbench |

## Search Positioning

- Primary query: NW Service Assurance Workbench network SLA signals
- Secondary queries: NW Service Assurance Workbench demo; NW Service Assurance Workbench system architecture; NW Service Assurance Workbench business tool; network service assurance workbench with SLA signals, service paths, and incident handoff service
- Public entry point: public synthetic network operations demo
- Paid boundary: paid workspace for service maps, private incident history, and recurring SLA reports

## Conversion Boundary

The public surface stays crawlable and free. Paid value starts when a visitor wants private data, saved history, branded export packs, customer-specific connectors, recurring reports, or implementation support.

## Deployment Notes

- Keep the sitemap and robots file aligned with the final production domain.
- Submit the canonical URL and sitemap in Google Search Console after the domain is connected.
- The lead-capture path is a GitHub Issue Form so private workspace and paid-package requests create a trackable queue before payment infrastructure is added.
- Keep exact free-tier quotas out of public promises because provider limits change.

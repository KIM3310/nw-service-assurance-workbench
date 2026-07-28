# NW Service Assurance Workbench

Scenario-driven carrier network operations system project focused on 5G/LTE access-core visibility, transport and IDC incident handling, service-quality review, and AX-assisted NOC playbooks.

## System Overview

A telecom/service-assurance board that converts network noise into SLA, outage, and handoff decisions.

| Area | Details |
|---|---|
| Users | Telecom operations, IDC/network operations, managed service teams, and enterprise network owners. |
| Technical path | Validate the demo, README, architecture notes, and quality gate before deeper workflow review. |
| System scope | Outage triage, service path visibility, network posture, operator notes, and workflow automation patterns. |
| Operating boundary | The workbench uses staged scenarios and synthetic service data; production use needs real monitoring adapters and access control. |
| Evaluation path | Run the local runtime commands and inspect the UI surfaces for service-impact and handoff clarity. |

## Evaluation Path

- **Start here:** Open the service-impact view, then inspect handoff and recovery ownership.
- **Local demo:** Run `npm install && npm run dev`, then open `http://127.0.0.1:5173`.
- **Checks:** Run `npm run verify`; it covers typecheck, tests, and build.

## Service Launch Playbook

- [Service launch playbook](docs/service-launch-playbook.md) maps the repository to its product scope, operating gates, operating boundaries, and risk controls.

## Architecture Notes

- [Architecture guide](docs/architecture-evidence-map.md) summarizes the system scope, first files to inspect, runtime commands, and known boundaries.
- [Quality notes](docs/quality-gate.md) lists the local checks, CI surface, and release expectations for this repository.
- [Enterprise readiness notes](docs/enterprise-readiness.md) outlines security, data, operations, integration, and handoff expectations.

## Public Demo Boundary

The public demo runs without external services:

- no API keys
- no backend server
- no external database
- no external dataset
- no model provider dependency

The runtime is a deterministic React/Vite simulation, not a live network-management system. Production use requires approved telemetry adapters, identity and access controls, retained audit history, and operator validation.

## Operational Scope

- **Intended users:** carrier NOC, service-assurance, transport/core, IDC, and managed network operations teams
- **Included workflow:** access, transport, core, and IDC posture; SLA impact; priority-path protection; recovery ownership; change gates
- **Implemented runtime:** deterministic synthetic scenarios, client-side scenario switching, typed domain models, and static Cloudflare deployment
- **Excluded from the demo:** live telemetry, automated network changes, authentication, persistent incident history, and production SLA reporting

## Why this project exists

This repo makes one operational model explicit:

1. Network operations language should stay visible, not collapse into generic cloud dashboard copy.
2. Incident handling and service-quality thinking should become an inspectable product surface.
3. AX/automation should reduce operational noise without hiding the operator decision boundary.
4. Operational discipline should connect to a carrier NOC context through concrete workflows.

## What the operator sees

- **Scenario board:** three realistic operations lanes
  - steady-state evening peak
  - metro fiber cut recovery
  - IDC edge DDoS during planned change
- **Health board:** access, transport, core, and IDC domain posture in one view
- **E2E path view:** customer outcome stays visible from access through service edge
- **Alarm queue:** severity, impact, owner, and next action
- **Command log:** recovery timeline and decision flow
- **AX assist board:** automation used for classification, prioritization, reroute help, and change gates
- **Runbook board:** owner-based recovery steps that read like an operator playbook
- **Operations pack:** incident brief, shift handoff, and decision principle for the selected scenario
- **Capability board:** incident response, service quality, E2E visibility, change governance, and deterministic automation

## Carrier Operations Model

The UI and data model deliberately stay close to carrier operations concerns:

- 5G/LTE access and metro transport posture
- IP/MPLS core and IDC edge visibility
- premium customer path protection
- incident reroute and field-dispatch logic
- maintenance and rollback discipline
- DDoS overlap with change governance

These concepts keep the simulation anchored to service assurance rather than generic infrastructure monitoring.

## Operator Fast Path

1. Open the default `Metro Fiber Cut Recovery` scenario.
2. Read `Command focus` and `Operator decision`.
3. Check the domain board for transport/core/IDC blast radius.
4. Follow the E2E path to the VIP customer outcome.
5. Scan the alarm queue and timeline.
6. Finish on the capability board.

This path covers service impact, incident response, and operator-assisted automation without requiring customer data.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Verify

```bash
npm run verify
```

## Cloudflare Deploy

This project is set up for Cloudflare Workers Static Assets with SPA routing.

```bash
npx wrangler login
npm run cf:deploy
```

For a deployment packaging check without publishing:

```bash
npm run cf:deploy:dry
```

The Wrangler config lives in `wrangler.jsonc` and serves `./dist` with `single-page-application` fallback enabled.

## Project Structure

```text
src/
  App.tsx              main control surface
  data/scenarios.ts    synthetic carrier operations scenarios
  lib/format.ts        severity and status helpers
  test/                UI and utility tests
```

## Private Incident Operations Exercise

The public workbench remains synthetic and read-only. A private, fixed-scope exercise can adapt the scenario pack, role and handoff map, evidence checklist, and after-action report to an approved operating context without accepting credentials or production payloads through GitHub.

[Request a private incident exercise](https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench&inquiry=incident-operations-exercise#private-inquiry)

## Cloud + AI Architecture

- [Cloud + AI architecture blueprint](docs/cloud-ai-architecture.md)
- [Machine-readable architecture manifest](docs/architecture/blueprint.json)
- Validation command: `python3 scripts/validate_architecture_blueprint.py`

## Enterprise Productization

- [Product operating model](docs/product-operating-model.md) defines the product scope, trust boundary, operating checks, and service path for this repository.

## System Architecture

- [System architecture](docs/system-architecture.md) maps the runtime boundary, data/control flow, cloud or local deployment surface, and operating assumptions for this repository.

## Service Architecture

- [Service architecture](docs/service-architecture.md) defines the cloud resources, account information, cost controls, and production guardrails needed to turn this repo into a scoped service without publishing public financial assumptions.

<!-- search-growth-readme:start -->

## Search And Service Surface

- Public entry: deterministic synthetic carrier-incident demo
- Paid boundary: fixed-scope Incident Operations Exercise; production integrations require separate approval
- Canonical URL: https://nw-service-assurance-workbench.ehdjs1351.workers.dev/
- Lead capture: https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench&inquiry=incident-operations-exercise#private-inquiry
- Resource route: https://kim3310-doeon-kim-portfolio.pages.dev/resources/nw-service-assurance-workbench/
- Commercial route: https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench#service-offers
- Machine-readable offer: [docs/service-offer.json](docs/service-offer.json)
- Search growth implementation: [docs/search-growth-implementation.md](docs/search-growth-implementation.md)
- Revenue architecture: [docs/revenue-architecture.md](docs/revenue-architecture.md)

<!-- search-growth-readme:end -->

<!-- KIM3310:AD-DATA-PIVOT:START -->
## Free Resource, Advertising, and Aggregate Data

- [Public utility and architecture checklist](https://kim3310-doeon-kim-portfolio.pages.dev/resources/nw-service-assurance-workbench/)
- Revenue model: contextual advertising on the policy-eligible central resource page.
- Aggregate value: anonymous aggregate service-assurance topic interest and checklist usage counts
- Boundary: ads allowed only on public assurance resources; service maps, incident notes, SLA exports, and dashboards are ad-free
- Consent defaults off, DNT/GPC fail closed, and personal or sensitive data is never sold.
<!-- KIM3310:AD-DATA-PIVOT:END -->

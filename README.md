# NW Service Assurance Workbench

Scenario-driven carrier network operations system project focused on 5G/LTE access-core visibility, transport and IDC incident handling, service-quality review, and AX-assisted NOC playbooks.

## Product and Review Surface

A telecom/service-assurance board that converts network noise into SLA, outage, and handoff decisions.

| Lens | Definition |
|---|---|
| Buyer or user | Telecom operations, IDC/network operations, managed service teams, and enterprise network owners. |
| Commercial route | Sell as a service-visibility starter kit, outage-review board, or SLA reporting prototype for operations teams. |
| Review signal | Outage triage, service path visibility, network posture, operator notes, and workflow automation patterns. |
| Safety boundary | The workbench uses staged scenarios and synthetic service data; production use needs real monitoring adapters and access control. |
| Fast proof | Run the local verification commands and inspect the UI surfaces for service-impact and handoff clarity. |

## Resource posture

No other resources are required to ship or demo this project well.

- no API keys
- no backend server
- no external database
- no external dataset
- no model provider dependency

That is intentional. The project is designed to be a fast, self-contained local proof for a carrier NW application, not a setup-heavy demo that breaks in review.

## Operational Proof Boundary

- **Best fit surfaces:** carrier network operations, service assurance, NOC, transport/core operations, network quality improvement
- **Strongest proof:** one self-contained control surface that ties access, transport, core, IDC, enterprise SLA risk, and change discipline together
- **What is real here:** the operations framing, incident workflow, E2E visibility model, premium-path protection logic, and AX-assisted playbook surfaces
- **What is bounded here:** scenarios are synthetic and deterministic; this is a system-safe operational simulation, not a live carrier network

## Why this project exists

This repo is designed to make one operational story explicit:

1. Network operations language should stay visible, not collapse into generic cloud dashboard copy.
2. Incident handling and service-quality thinking should become an inspectable product surface.
3. AX/automation should reduce operational noise without hiding the operator decision boundary.
4. Operational discipline should connect to a commercial carrier NOC context through concrete workflows.

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
- **Operations pack:** 30-second pitch, system note bullet, and system walkthrough angle you can reuse directly
- **Capability board:** direct mapping to themes like 장애 관리, 품질 개선, E2E 가시성, 운영 프로세스, AX 자동화

## Why it matches carrier NW operations

The UI and data model deliberately stay close to carrier operations concerns:

- 5G/LTE access and metro transport posture
- IP/MPLS core and IDC edge visibility
- premium customer path protection
- incident reroute and field-dispatch logic
- maintenance and rollback discipline
- DDoS overlap with change governance

This makes the project a better fit for a network-operations application than a generic AI or data-platform system piece.

## Operator Fast Path

1. Open the default `Metro Fiber Cut Recovery` scenario.
2. Read `Command focus` and `Operator decision`.
3. Check the domain board for transport/core/IDC blast radius.
4. Follow the E2E path to the VIP customer outcome.
5. Scan the alarm queue and timeline.
6. Finish on the capability board.

If the walkthrough is short, this path shows service assurance, 장애 대응, and 운영 자동화 thinking quickly.

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

## Technical review Positioning

Use this repo like this:

- **Lead with military network operations experience** for 24/7 discipline, 장애 대응, and 보안/권한 통제
- **Then use this project** to show how that experience translates into a modern service-assurance and quality-operations surface
- **Only after that**, mention broader projects like `AegisOps` or `ops-reliability-workbench` as supporting evidence for incident review, observability, and operator tooling

## Suggested talking point

“이 프로젝트는 통신사 NW 운영 직무에 맞춰 만든 서비스 품질 가시화 워크벤치입니다. Access, transport, core, IDC를 따로 보지 않고 E2E 서비스 영향과 장애 대응, 우선 고객 보호, 유지보수 게이트, 운영 자동화를 한 화면에서 판단하도록 설계했습니다.”

## Cloud + AI Architecture

This repository includes a neutral cloud and AI engineering blueprint that maps the current proof surface to runtime boundaries, data contracts, model-risk controls, deployment posture, and validation hooks.

- [Cloud + AI architecture blueprint](docs/cloud-ai-architecture.md)
- [Machine-readable architecture manifest](docs/architecture/blueprint.json)
- Validation command: `python3 scripts/validate_architecture_blueprint.py`

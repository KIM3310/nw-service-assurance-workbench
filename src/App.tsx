import { useState, type ReactNode } from 'react';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Clock3,
  FileText,
  Gauge,
  Network,
  Route,
  Server,
  Shield,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { defaultScenarioId, scenarios } from './data/scenarios';
import { orderAlarms, severityLabel, statusLabel } from './lib/format';
import {
  Alarm,
  AutomationCard,
  Capability,
  DomainStatus,
  HandoffAsset,
  Metric,
  RunbookStep,
  ServiceHop,
  TimelineEntry,
} from './types';

const toneIcon = {
  teal: <BadgeCheck className="metric-icon teal" aria-hidden="true" />,
  amber: <Gauge className="metric-icon amber" aria-hidden="true" />,
  coral: <CircleAlert className="metric-icon coral" aria-hidden="true" />,
} as const;

const sectionIcon = {
  domains: <Network className="section-icon" aria-hidden="true" />,
  servicePath: <Route className="section-icon" aria-hidden="true" />,
  alarms: <Activity className="section-icon" aria-hidden="true" />,
  timeline: <Clock3 className="section-icon" aria-hidden="true" />,
  automation: <Sparkles className="section-icon" aria-hidden="true" />,
  capabilities: <Workflow className="section-icon" aria-hidden="true" />,
  runbook: <BadgeCheck className="section-icon" aria-hidden="true" />,
  handoff: <FileText className="section-icon" aria-hidden="true" />,
} as const;

const incidentExerciseUrl =
  'https://kim3310-doeon-kim-portfolio.pages.dev/?offer=nw-service-assurance-workbench&inquiry=incident-operations-exercise#private-inquiry';

const deliveryPosture = [
  {
    title: 'Deterministic scenarios',
    detail: 'The public demo runs from versioned synthetic incident fixtures, so its decisions can be reviewed without a model key.',
  },
  {
    title: 'Static React runtime',
    detail: 'React, TypeScript, and Vite render the workbench without a backend, database, or customer telemetry connection.',
  },
  {
    title: 'Explicit production boundary',
    detail: 'Live use requires approved monitoring adapters, identity and access controls, retained audit history, and operator validation.',
  },
] as const;

function App() {
  const [activeScenarioId, setActiveScenarioId] = useState(defaultScenarioId);
  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];
  const orderedAlarms = orderAlarms(activeScenario.alarms);

  return (
    <div className="page-shell">
      <div className="page-grid" aria-hidden="true" />
      <main className="page-content">
        <section className="hero card-panel">
          <div className="hero-copy">
            <p className="eyebrow">Carrier Network Service Assurance</p>
            <h1>NW Service Assurance Workbench</h1>
            <p className="hero-summary">
              Deterministic carrier-operations workbench for 5G access, transport, core, and IDC incident triage,
              end-to-end service impact, recovery runbooks, and operator handoff.
            </p>
            <div className="hero-actions">
              <a
                className="primary-action"
                href={incidentExerciseUrl}
                target="_blank"
                rel="noreferrer"
              >
                Request a private incident exercise
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="secondary-action" href="#scenario-board">
                Explore synthetic scenarios
              </a>
            </div>
            <div className="hero-chips" aria-label="Surface keywords">
              <span>5G / LTE access-core visibility</span>
              <span>Transport and IDC incident handling</span>
              <span>E2E service path review</span>
              <span>Maintenance and change discipline</span>
              <span>AX automation for NOC efficiency</span>
            </div>
          </div>

          <aside className="hero-proof">
            <div className="proof-header">
              <Shield aria-hidden="true" />
              <div>
                <p className="proof-label">Operational scope</p>
                <h2>Incident decisions across the service path</h2>
              </div>
            </div>
            <ul className="proof-points">
              <li>Connects device alarms to access, transport, core, IDC, and customer-impact decisions.</li>
              <li>Links incident handling, priority-path protection, change gates, and recovery ownership.</li>
              <li>Uses deterministic automation cards for classification, prioritization, and maintenance gating.</li>
            </ul>
          </aside>
        </section>

        <section className="headline-strip">
          <HeadlineCard icon={<Gauge aria-hidden="true" />} label="Availability" value={activeScenario.availability} detail="Active scenario service continuity" />
          <HeadlineCard icon={<Clock3 aria-hidden="true" />} label="MTTR posture" value={activeScenario.mttr} detail="Observed time to stabilize service" />
          <HeadlineCard icon={<Route aria-hidden="true" />} label="Traffic shift" value={activeScenario.trafficShift} detail="Protected path load delta" />
          <HeadlineCard icon={<Sparkles aria-hidden="true" />} label="Automation coverage" value={activeScenario.automationCoverage} detail="Operator-assist playbooks in use" />
        </section>

        <section id="scenario-board" className="card-panel scenario-board">
          <div className="section-heading">
            <div className="section-heading-main">
              <Server className="section-icon" aria-hidden="true" />
              <div>
                <p className="section-kicker">Scenario board</p>
                <h2>Select an incident scenario</h2>
              </div>
            </div>
            <p className="section-copy">
              Each scenario uses deterministic synthetic data and carrier operations terminology:
              access, transport, core, IDC, SLA, reroute, maintenance, and premium customer protection.
            </p>
          </div>

          <div className="scenario-tabs" role="tablist" aria-label="Service assurance scenarios">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                role="tab"
                aria-selected={scenario.id === activeScenario.id}
                className={`scenario-tab ${scenario.id === activeScenario.id ? 'is-active' : ''}`}
                onClick={() => setActiveScenarioId(scenario.id)}
              >
                <span className="scenario-tab-title">{scenario.title}</span>
                <span className="scenario-tab-summary">{scenario.summary}</span>
                <span className="scenario-tab-fit">{scenario.operationalFocus}</span>
              </button>
            ))}
          </div>

          <div className="scenario-overview-grid">
            <OverviewCard
              title="Command focus"
              value={activeScenario.commandFocus}
              icon={<Activity className="section-icon" aria-hidden="true" />}
            />
            <OverviewCard
              title="Operator decision"
              value={activeScenario.operatorDecision}
              icon={<Workflow className="section-icon" aria-hidden="true" />}
            />
          </div>

          <div className="operator-note-box">
            <p className="section-kicker">Operator fast take</p>
            <ul>
              {activeScenario.operatorNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="card-panel scenario-board">
          <div className="section-heading">
            <div className="section-heading-main">
              <Shield className="section-icon" aria-hidden="true" />
              <div>
                <p className="section-kicker">Demo boundary</p>
                <h2>Self-contained synthetic operations demo</h2>
              </div>
            </div>
            <p className="section-copy">
              The public runtime is inspectable without credentials or customer data. It models incident decisions and
              handoff contracts; it does not connect to a live carrier network.
            </p>
          </div>
          <div className="delivery-grid">
            {deliveryPosture.map((item) => (
              <DeliveryCard key={item.title} title={item.title} detail={item.detail} />
            ))}
          </div>
        </section>

        <section className="metric-grid">
          {activeScenario.metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="two-column">
          <CardSection
            icon={sectionIcon.domains}
            kicker="Health board"
            title="Domain-by-domain network posture"
            copy="Access, transport, core, and IDC health are grouped by service impact rather than shown as isolated device charts."
          >
            <div className="domain-grid">
              {activeScenario.domains.map((domain) => (
                <DomainCard key={domain.name} domain={domain} />
              ))}
            </div>
          </CardSection>

          <CardSection
            icon={sectionIcon.servicePath}
            kicker="E2E path"
            title="Service path and customer outcome"
            copy="The path view keeps the customer-facing outcome visible while operators inspect each network segment."
          >
            <div className="path-list">
              {activeScenario.servicePath.map((hop, index) => (
                <PathHop key={hop.name} hop={hop} isLast={index === activeScenario.servicePath.length - 1} />
              ))}
            </div>
          </CardSection>
        </section>

        <section className="two-column">
          <CardSection
            icon={sectionIcon.alarms}
            kicker="Alarm queue"
            title="Prioritized incident triage"
            copy="Severity, service impact, owner, and next action keep the queue aligned with incident response decisions."
          >
            <div className="alarm-table" role="table" aria-label="Prioritized alarm queue">
              <div className="alarm-table-header" role="row">
                <span role="columnheader">Severity</span>
                <span role="columnheader">Signal</span>
                <span role="columnheader">Impact</span>
                <span role="columnheader">Owner / Next action</span>
              </div>
              {orderedAlarms.map((alarm) => (
                <AlarmRow key={alarm.id} alarm={alarm} />
              ))}
            </div>
          </CardSection>

          <CardSection
            icon={sectionIcon.timeline}
            kicker="Command log"
            title="Recovery timeline"
            copy="Carrier operations are not only about detecting faults. They are about deciding, communicating, protecting customers, and reopening clean operating windows."
          >
            <div className="timeline-list">
              {activeScenario.timeline.map((entry) => (
                <TimelineCard key={`${entry.time}-${entry.title}`} entry={entry} />
              ))}
            </div>
          </CardSection>
        </section>

        <section className="two-column">
          <CardSection
            icon={sectionIcon.runbook}
            kicker="Operator runbook"
            title="Recovery steps with clear ownership"
            copy="Each recovery step binds a technical action to an accountable owner and an expected service outcome."
          >
            <div className="runbook-list">
              {activeScenario.runbook.map((entry) => (
                <RunbookCard key={`${entry.step}-${entry.owner}`} entry={entry} />
              ))}
            </div>
          </CardSection>

          <CardSection
            icon={sectionIcon.handoff}
            kicker="Operations pack"
            title="Operator handoff notes"
            copy="Concise incident context, shift handoff language, and decision principles derived from the selected scenario."
          >
            <div className="application-list">
              {activeScenario.handoffAssets.map((asset) => (
                <HandoffAssetCard key={asset.label} asset={asset} />
              ))}
            </div>
          </CardSection>
        </section>

        <section className="two-column">
          <CardSection
            icon={sectionIcon.automation}
            kicker="AX assist"
            title="Automation playbooks for NOC efficiency"
            copy="AX here means faster, cleaner operations. The assist layer focuses on classification, prioritization, and maintenance discipline."
          >
            <div className="automation-grid">
              {activeScenario.automations.map((automation) => (
                <AutomationCardView key={automation.title} card={automation} />
              ))}
            </div>
          </CardSection>

          <CardSection
            icon={sectionIcon.capabilities}
            kicker="Operational capabilities"
            title="Capabilities represented in the scenario"
            copy="The capability map ties each synthetic workflow to a concrete network-operations responsibility."
            id="capability-fit"
          >
            <div className="capability-fit-list">
              {activeScenario.capabilities.map((mapping) => (
                <CapabilityFitCard key={mapping.keyword} mapping={mapping} />
              ))}
            </div>
          </CardSection>
        </section>
      </main>
    </div>
  );
}

function HeadlineCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="headline-card">
      <div className="headline-icon">{icon}</div>
      <div>
        <p className="headline-label">{label}</p>
        <h2>{value}</h2>
        <p className="headline-detail">{detail}</p>
      </div>
    </article>
  );
}

function OverviewCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <article className="overview-card">
      <div className="overview-header">
        {icon}
        <p className="section-kicker">{title}</p>
      </div>
      <p className="overview-value">{value}</p>
    </article>
  );
}

function CardSection({
  icon,
  kicker,
  title,
  copy,
  id,
  children,
}: {
  icon: ReactNode;
  kicker: string;
  title: string;
  copy: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="card-panel section-card">
      <div className="section-heading">
        <div className="section-heading-main">
          {icon}
          <div>
            <p className="section-kicker">{kicker}</p>
            <h2>{title}</h2>
          </div>
        </div>
        <p className="section-copy">{copy}</p>
      </div>
      {children}
    </section>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className={`metric-card ${metric.tone}`}>
      <div className="metric-card-header">
        {toneIcon[metric.tone]}
        <p>{metric.label}</p>
      </div>
      <h2>{metric.value}</h2>
      <p>{metric.detail}</p>
    </article>
  );
}

function DomainCard({ domain }: { domain: DomainStatus }) {
  return (
    <article className={`domain-card ${domain.status}`}>
      <div className="domain-card-header">
        <div>
          <p className="domain-layer">{domain.layer}</p>
          <h3>{domain.name}</h3>
        </div>
        <span className={`status-pill ${domain.status}`}>{statusLabel(domain.status)}</span>
      </div>
      <p className="domain-availability">{domain.availability}</p>
      <p className="domain-detail">{domain.detail}</p>
    </article>
  );
}

function PathHop({ hop, isLast }: { hop: ServiceHop; isLast: boolean }) {
  return (
    <div className="path-hop">
      <div className={`path-node ${hop.status}`}>
        <span className={`status-pill ${hop.status}`}>{statusLabel(hop.status)}</span>
        <p className="path-segment">{hop.segment}</p>
        <h3>{hop.name}</h3>
        <p className="path-detail">{hop.detail}</p>
      </div>
      {!isLast ? <div className="path-connector" aria-hidden="true" /> : null}
    </div>
  );
}

function AlarmRow({ alarm }: { alarm: Alarm }) {
  return (
    <div className="alarm-row" role="row">
      <div role="cell">
        <span className={`severity-pill ${alarm.severity}`}>{severityLabel(alarm.severity)}</span>
      </div>
      <div role="cell" className="alarm-primary">
        <p className="alarm-domain">{alarm.domain}</p>
        <h3>{alarm.title}</h3>
        <p>{alarm.signal}</p>
      </div>
      <div role="cell" className="alarm-impact">
        <p>{alarm.impact}</p>
      </div>
      <div role="cell" className="alarm-owner">
        <p className="alarm-owner-name">{alarm.owner}</p>
        <p>{alarm.nextAction}</p>
        <span>{alarm.eta}</span>
      </div>
    </div>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <article className={`timeline-card ${entry.state}`}>
      <div className="timeline-time">{entry.time}</div>
      <div className="timeline-body">
        <div className="timeline-header">
          <h3>{entry.title}</h3>
          <span className={`timeline-pill ${entry.state}`}>{entry.state}</span>
        </div>
        <p>{entry.detail}</p>
        <span className="timeline-owner">{entry.owner}</span>
      </div>
    </article>
  );
}

function AutomationCardView({ card }: { card: AutomationCard }) {
  return (
    <article className="automation-card">
      <div className="automation-card-header">
        <Sparkles className="section-icon" aria-hidden="true" />
        <div>
          <p className="section-kicker">Automation lane</p>
          <h3>{card.title}</h3>
        </div>
      </div>
      <p className="automation-value">{card.value}</p>
      <p className="automation-summary">{card.summary}</p>
      <p className="automation-outcome">{card.outcome}</p>
    </article>
  );
}

function CapabilityFitCard({ mapping }: { mapping: Capability }) {
  return (
    <article className="capability-fit-card">
      <div className="capability-fit-header">
        <BadgeCheck className="section-icon" aria-hidden="true" />
        <h3>{mapping.keyword}</h3>
      </div>
      <p>{mapping.proof}</p>
    </article>
  );
}

function DeliveryCard({ title, detail }: { title: string; detail: string }) {
  return (
    <article className="delivery-card">
      <div className="delivery-card-header">
        <BadgeCheck className="section-icon" aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <p>{detail}</p>
    </article>
  );
}

function RunbookCard({ entry }: { entry: RunbookStep }) {
  return (
    <article className="runbook-card">
      <div className="runbook-step">{entry.step}</div>
      <div className="runbook-body">
        <div className="runbook-header">
          <p className="timeline-owner">{entry.owner}</p>
          <h3>{entry.action}</h3>
        </div>
        <p>{entry.outcome}</p>
      </div>
    </article>
  );
}

function HandoffAssetCard({ asset }: { asset: HandoffAsset }) {
  return (
    <article className="application-card">
      <p className="section-kicker">{asset.label}</p>
      <p className="application-copy">{asset.text}</p>
    </article>
  );
}

export default App;

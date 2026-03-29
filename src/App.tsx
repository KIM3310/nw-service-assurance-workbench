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
  ApplicationAsset,
  AutomationCard,
  DomainStatus,
  Metric,
  RoleMapping,
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
  roleFit: <Workflow className="section-icon" aria-hidden="true" />,
  runbook: <BadgeCheck className="section-icon" aria-hidden="true" />,
  application: <FileText className="section-icon" aria-hidden="true" />,
} as const;

const deliveryPosture = [
  {
    title: 'No API keys required',
    detail: 'The entire review flow is deterministic. No OpenAI, cloud LLM, or private inference endpoint is needed to demo the service.',
  },
  {
    title: 'No backend dependency',
    detail: 'The app is a static React/Vite surface, so it can be deployed quickly without standing up a separate server or database.',
  },
  {
    title: 'No external datasets',
    detail: 'Carrier-style scenarios, alarms, and service paths are self-contained, which keeps the project reviewer-safe and easy to ship.',
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
            <p className="eyebrow">Carrier NW Operations Portfolio Project</p>
            <h1>NW Service Assurance Workbench</h1>
            <p className="hero-summary">
              Scenario-driven control tower for 5G access, transport, core, IDC, incident recovery,
              service-quality visibility, and AX-assisted operations playbooks.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#scenario-board">
                Review the active incident lane
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="secondary-action" href="#role-fit">
                Map this project to the role
              </a>
            </div>
            <div className="hero-chips" aria-label="Role alignment keywords">
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
                <p className="proof-label">What this project proves</p>
                <h2>Operations judgment, not dashboard theater</h2>
              </div>
            </div>
            <ul className="proof-points">
              <li>Turns device alarms into access, transport, core, IDC, and customer-impact decisions.</li>
              <li>Shows incident handling, VIP path protection, and change gates in one reviewer-safe surface.</li>
              <li>Uses AX support for classification, prioritization, and quality operations instead of generic chat UX.</li>
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
                <h2>Pick the strongest review lane</h2>
              </div>
            </div>
            <p className="section-copy">
              Every scenario is deterministic and reviewer-safe, but the decision language stays close to a carrier NOC:
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
                <span className="scenario-tab-fit">{scenario.strongestFor}</span>
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

          <div className="reviewer-note-box">
            <p className="section-kicker">Recruiter fast take</p>
            <ul>
              {activeScenario.recruiterNotes.map((note) => (
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
                <p className="section-kicker">Delivery posture</p>
                <h2>No extra resources required</h2>
              </div>
            </div>
            <p className="section-copy">
              This project is intentionally self-contained so you can ship it fast for the application. It does not need
              another backend, model key, or external data source to work as a credible portfolio proof.
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
            copy="Use this when you want to show operations understanding across access, transport, core, and IDC rather than isolated service charts."
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
            copy="This is the shortest way to show E2E visibility: network segments are meaningful only when the customer-facing outcome remains visible."
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
            copy="The table is intentionally action-first: severity, impact, owner, and next move. That makes it easier to discuss operational judgment in interviews."
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
            copy="A carrier operations role is not only about detecting faults. It is about deciding, communicating, protecting customers, and reopening clean operating windows."
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
            title="Interview-friendly recovery steps"
            copy="This makes the service feel less like a static dashboard and more like an operational product. Each step ties technical judgment to owner responsibility and expected outcome."
          >
            <div className="runbook-list">
              {activeScenario.runbook.map((entry) => (
                <RunbookCard key={`${entry.step}-${entry.owner}`} entry={entry} />
              ))}
            </div>
          </CardSection>

          <CardSection
            icon={sectionIcon.application}
            kicker="Application pack"
            title="Use this directly in your resume and interview"
            copy="These are the exact lines you can lift into your self-introduction, portfolio walkthrough, or role-specific resume bullets."
          >
            <div className="application-list">
              {activeScenario.applicationAssets.map((asset) => (
                <ApplicationAssetCard key={asset.label} asset={asset} />
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
            icon={sectionIcon.roleFit}
            kicker="Role fit"
            title="Why this maps to the posting"
            copy="This section keeps the project from drifting into generic DevOps or generic AI territory. It stays anchored to the actual network operations lane."
            id="role-fit"
          >
            <div className="role-fit-list">
              {activeScenario.roleMappings.map((mapping) => (
                <RoleFitCard key={mapping.keyword} mapping={mapping} />
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

function RoleFitCard({ mapping }: { mapping: RoleMapping }) {
  return (
    <article className="role-fit-card">
      <div className="role-fit-header">
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

function ApplicationAssetCard({ asset }: { asset: ApplicationAsset }) {
  return (
    <article className="application-card">
      <p className="section-kicker">{asset.label}</p>
      <p className="application-copy">{asset.text}</p>
    </article>
  );
}

export default App;

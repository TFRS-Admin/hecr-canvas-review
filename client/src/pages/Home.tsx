/**
 * Design: Operations Blueprint Ledger — source-faithful HECR canvas review.
 * This page uses a fixed review rail, technical route bands, and margin notes
 * to make the existing system inspectable without silently changing it.
 */
import { useState } from "react";
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleDotDashed,
  CreditCard,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Layers3,
  MessageSquareText,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  Waypoints,
  Workflow,
} from "lucide-react";

type Tone = "blue" | "green" | "orange" | "violet" | "slate" | "red";

type Step = {
  label: string;
  sub?: string;
  tone?: Tone;
  note?: string;
};

const canvases = [
  { id: "ecosystem", number: "01", title: "Ecosystem", subtitle: "The connected landscape", icon: Network },
  { id: "pipelines", number: "02", title: "Pipelines", subtitle: "Position and progression", icon: Waypoints },
  { id: "workflows", number: "03", title: "Workflows", subtitle: "Deterministic consequence paths", icon: Workflow },
  { id: "commercial", number: "04", title: "Commercial", subtitle: "Current ladder shown in canvas", icon: BadgeDollarSign },
  { id: "end-to-end", number: "05", title: "End-to-End", subtitle: "The cross-system route", icon: Route },
];

const ecosystemGroups = [
  {
    tone: "blue" as Tone,
    title: "GHL CRM Core",
    icon: Layers3,
    items: ["Schema: Tags + Custom Fields", "Pipelines", "Sales Credit Consult / Client Check-In", "Facebook / Dealership / Onboarding Forms"],
  },
  {
    tone: "violet" as Tone,
    title: "AI Stack",
    icon: Bot,
    items: ["Blair — Conversation AI", "Voice AI", "Reviews AI"],
  },
  {
    tone: "orange" as Tone,
    title: "Commercial Ladder",
    icon: BadgeDollarSign,
    items: ["Free Ecosystem", "DIY — $49 Course", "Monthly Full-Service", "$999 PIF"],
  },
  {
    tone: "green" as Tone,
    title: "External Integrations",
    icon: GitBranch,
    items: ["DisputeFox", "MyFreeScoreNow", "Meta / Facebook Ads", "Email / SMS / A2P / Payments"],
  },
];

const inboundSteps: Step[] = [
  { label: "New Lead", tone: "blue" },
  { label: "Attempting Contact", tone: "blue" },
  { label: "AI Engaged", tone: "violet" },
  { label: "Appointment Scheduled", tone: "green" },
  { label: "Proposal / Decision", tone: "orange" },
  { label: "Won / Onboarding", tone: "green" },
  { label: "Lost / Nurture", tone: "slate" },
];

const fulfilmentSteps: Step[] = [
  { label: "Onboarding", tone: "blue" },
  { label: "Round 1", tone: "blue" },
  { label: "Round 2", tone: "blue" },
  { label: "Round 3", tone: "blue" },
  { label: "Round 4", tone: "blue" },
  { label: "Round 5", tone: "blue" },
  { label: "Round 6", tone: "blue" },
  { label: "Graduate", tone: "green" },
];

const workflowGroups = [
  { title: "Intake", tone: "blue" as Tone, items: ["New Lead Setup", "Assign the Lead", "First Response", "Hand to Human"] },
  { title: "Appointment", tone: "green" as Tone, items: ["Confirm the Appointment", "Missed / Rescheduled Appointment"] },
  { title: "Nurture", tone: "slate" as Tone, items: ["Hail Mary — seq_hailmary", "Slow Drip — seq_slowdrip", "45-Day — seq_45day", "Reactivation — seq_reactivation", "24-Week Education — seq_24wk"] },
  { title: "Blair Control", tone: "violet" as Tone, items: ["Blair Bot Persona", "Bot Control", "Booking"] },
  { title: "Payment & Onboarding", tone: "orange" as Tone, items: ["Process Payment — HELD", "Payment Problem — HELD", "Onboarding Problem — HELD"] },
  { title: "Fulfilment", tone: "blue" as Tone, items: ["Run Client Through Service", "Client Questions", "24-Week Education Check-In", "Going-Quiet Check — sys_stale"] },
  { title: "Graduation", tone: "green" as Tone, items: ["Graduation Workflow", "Review Eligibility / Request", "Referral Reward Cycle"] },
  { title: "Dealership", tone: "orange" as Tone, items: ["Rapid Intake", "Same-Day Close", "Human Disposition", "Reporting"] },
  { title: "Voice AI", tone: "violet" as Tone, items: ["Inbound Voice Agent", "Post-Call Normalizer", "Transfer-Failure Handler"] },
];

const commercialSteps: Step[] = [
  { label: "Prospect Enters", sub: "ecosystem entry", tone: "blue" },
  { label: "Free Ecosystem", sub: "community · education · retail", tone: "green" },
  { label: "DIY $49 Course", sub: "course · book · free community", tone: "violet" },
  { label: "Monthly Full-Service", sub: "fulfilment · community · discount", tone: "orange" },
  { label: "$999 PIF", sub: "fulfilment · community · catalog", tone: "orange" },
];

const endToEndSteps: Step[] = [
  { label: "New Lead", sub: "Facebook · organic · dealership", tone: "blue" },
  { label: "Setup & Assign", sub: "New Lead Setup → Assign", tone: "blue" },
  { label: "Blair Engages", sub: "books or hands off", tone: "violet" },
  { label: "Appointment", sub: "confirmed / exception route", tone: "green" },
  { label: "Human Consultation", sub: "disposition is human", tone: "orange" },
  { label: "Commercial Terms", sub: "approved by human", tone: "orange" },
  { label: "Payment & Onboarding", sub: "HELD in current canvas", tone: "red" },
  { label: "Rounds 1–6", sub: "service lifecycle", tone: "blue" },
  { label: "Graduation", sub: "reviews · referrals", tone: "green" },
];

function ToneDot({ tone = "blue" }: { tone?: Tone }) {
  return <span className={`tone-dot tone-${tone}`} aria-hidden="true" />;
}

function RouteBand({ steps, compact = false }: { steps: Step[]; compact?: boolean }) {
  return (
    <div className={`route-band ${compact ? "route-band-compact" : ""}`}>
      {steps.map((step, index) => (
        <div className="route-fragment" key={`${step.label}-${index}`}>
          <article className={`route-node node-${step.tone ?? "blue"}`}>
            <ToneDot tone={step.tone} />
            <div>
              <h4>{step.label}</h4>
              {step.sub ? <p>{step.sub}</p> : null}
            </div>
          </article>
          {index !== steps.length - 1 ? <ArrowRight className="route-arrow" aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

function SectionKicker({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-kicker">
      <div className="kicker-number">{number}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
}

function MarginNote({ label, children, tone = "slate" }: { label: string; children: React.ReactNode; tone?: Tone }) {
  return (
    <aside className={`margin-note margin-${tone}`}>
      <span>{label}</span>
      <p>{children}</p>
    </aside>
  );
}

export default function Home() {
  const [activeCanvas, setActiveCanvas] = useState("ecosystem");
  const [railOpen, setRailOpen] = useState(false);

  const handleNav = (id: string) => {
    setActiveCanvas(id);
    setRailOpen(false);
    window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="review-shell">
      <aside className={`review-rail ${railOpen ? "rail-open" : ""}`} aria-label="Canvas navigation">
        <div className="rail-brand">
          <img src="/manus-storage/hecr-linked-nodes-mark_63e25152.png" alt="Linked node system mark" />
          <div>
            <strong>HECR</strong>
            <span>Canvas Review</span>
          </div>
        </div>

        <nav className="rail-nav" aria-label="Review canvases">
          <p className="rail-label">Five Lenses</p>
          {canvases.map((canvas) => {
            const Icon = canvas.icon;
            const isActive = activeCanvas === canvas.id;
            return (
              <button
                type="button"
                key={canvas.id}
                onClick={() => handleNav(canvas.id)}
                className={`rail-item ${isActive ? "rail-item-active" : ""}`}
              >
                <span className="rail-index">{canvas.number}</span>
                <Icon size={17} strokeWidth={1.8} />
                <span className="rail-item-copy"><strong>{canvas.title}</strong><small>{canvas.subtitle}</small></span>
                <ChevronRight size={15} />
              </button>
            );
          })}
        </nav>

        <div className="rail-key">
          <p className="rail-label">Reading Key</p>
          <div><ToneDot tone="blue" /> System / lifecycle</div>
          <div><ToneDot tone="violet" /> AI interpretation</div>
          <div><ToneDot tone="orange" /> Human / commercial</div>
          <div><ToneDot tone="red" /> Held / needs decision</div>
        </div>
        <div className="rail-footer">Existing canvas content<br />Visualized for review</div>
      </aside>

      <main className="review-main">
        <header className="mobile-header">
          <button type="button" className="menu-button" onClick={() => setRailOpen((open) => !open)} aria-label="Toggle canvas navigation">
            <Layers3 size={20} />
          </button>
          <span>HECR Canvas Review</span>
          <span className="header-count">05</span>
        </header>

        <section className="hero-section">
          <div className="hero-scrim" />
          <div className="hero-content">
            <div className="hero-wordmark"><img src="/manus-storage/hecr-linked-nodes-mark_63e25152.png" alt="" /><span>HECR / Canvas Review</span></div>
            <p className="hero-eyebrow"><CircleDotDashed size={14} /> Existing System Map · Review Surface</p>
            <h1>Five canvases.<br /><em>One system to inspect.</em></h1>
            <p className="hero-copy">This page turns the existing HECR canvases into one working review surface. It preserves what is actually drawn—including held paths, legacy terms, and pending decisions—so the team can decide what moves next.</p>
            <div className="hero-tags">
              <span><CheckCircle2 size={14} /> Source-faithful</span>
              <span><CircleAlert size={14} /> Pending labels preserved</span>
              <span><ShieldCheck size={14} /> Review before build</span>
            </div>
          </div>
          <div className="hero-map" aria-hidden="true">
            <div className="hero-map-node hero-map-node-a"><UsersRound size={22} /><span>Inputs</span></div>
            <div className="hero-map-line line-a" />
            <div className="hero-map-node hero-map-node-b"><Workflow size={22} /><span>Routes</span></div>
            <div className="hero-map-line line-b" />
            <div className="hero-map-node hero-map-node-c"><UserRound size={22} /><span>Decisions</span></div>
            <div className="hero-map-line line-c" />
            <div className="hero-map-node hero-map-node-d"><CheckCircle2 size={22} /><span>Proof</span></div>
          </div>
        </section>

        <section className="review-intro">
          <p className="eyebrow">Review Protocol</p>
          <div className="intro-row">
            <h2>Read the map before you revise the map.</h2>
            <p>Each lens below is intentionally separated. The goal is to make scope, sequencing, tooling, and commercial assumptions visible—not to make them look more finished than they are.</p>
          </div>
          <div className="protocol-strip">
            <span><b>01</b> Preserve the existing route</span>
            <span><b>02</b> Identify the real status</span>
            <span><b>03</b> Separate commercial from delivery</span>
            <span><b>04</b> Change only by decision</span>
          </div>
        </section>

        <section id="ecosystem" className="canvas-section canvas-paper" onMouseEnter={() => setActiveCanvas("ecosystem")}>
          <SectionKicker number="01" eyebrow="Canvas One" title="Ecosystem Overview" description="The business-level landscape: CRM core, AI, commercial model, and connected providers." />
          <div className="ecosystem-layout">
            <div className="ecosystem-spine">
              <span className="spine-tag">HECR</span>
              <div className="spine-line" />
              <span>GHL Core</span><ArrowRight size={16} />
              <span>AI Stack</span><ArrowRight size={16} />
              <span>Commercial</span><ArrowRight size={16} />
              <span>Integrations</span>
            </div>
            <div className="ecosystem-grid">
              {ecosystemGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article className={`lens-card lens-${group.tone}`} key={group.title}>
                    <div className="lens-card-head"><span><Icon size={20} /></span><h3>{group.title}</h3></div>
                    <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                );
              })}
            </div>
          </div>
          <MarginNote label="Current Canvas Language" tone="orange">The commercial branch retains the original <strong>$49 course / $999 PIF</strong> ladder shown in the source canvas. It is displayed for review, not recast as current approved commercial terms.</MarginNote>
        </section>

        <section id="pipelines" className="canvas-section" onMouseEnter={() => setActiveCanvas("pipelines")}>
          <SectionKicker number="02" eyebrow="Canvas Two" title="Pipelines Deep Dive" description="The positions customers move through. A pipeline is a working motion, not a loose label collection." />
          <div className="pipeline-board">
            <div className="board-topline"><span>POSITION LENS</span><span>Customer / opportunity progression</span></div>
            <div className="pipeline-track">
              <div className="track-label"><span className="track-index">A</span><div><strong>Inbound</strong><small>Lead-to-decision path</small></div></div>
              <RouteBand steps={inboundSteps} compact />
            </div>
            <div className="pipeline-track pipeline-track-accent">
              <div className="track-label"><span className="track-index">B</span><div><strong>Fulfilment</strong><small>Client delivery position</small></div></div>
              <RouteBand steps={fulfilmentSteps} compact />
              <div className="canceled-chip"><CircleAlert size={13} /> Canceled may exit from the service route</div>
            </div>
            <div className="pipeline-split-row">
              <article className="mini-pipeline mini-pipeline-orange">
                <div><HeartHandshake size={19} /><span>Dealership</span></div>
                <p>Handed Off <ArrowRight size={14} /> Contacted <ArrowRight size={14} /> Closed-Won / Closed-Lost</p>
              </article>
              <article className="mini-pipeline mini-pipeline-slate">
                <div><Sparkles size={19} /><span>Cold / Revival</span></div>
                <p>Stages not yet finalized</p>
              </article>
              <article className="mini-pipeline mini-pipeline-violet">
                <div><UsersRound size={19} /><span>Referral</span></div>
                <p>Graduated → Asked → Made → Converted → Rewarded</p>
              </article>
            </div>
          </div>
          <MarginNote label="Pending Item" tone="violet">The referral pipeline is explicitly marked <strong>proposed, pending confirmation</strong> in the source canvas. The reward cycle shown there is not presented as an active rule.</MarginNote>
        </section>

        <section id="workflows" className="canvas-section canvas-dark" onMouseEnter={() => setActiveCanvas("workflows")}>
          <SectionKicker number="03" eyebrow="Canvas Three" title="Workflow Deep Dive" description="The literal consequence paths: intake, appointment, nurture, AI control, billing, service, and exception routing." />
          <div className="workflow-ledger">
            {workflowGroups.map((group, index) => (
              <article className={`workflow-ledger-row workflow-${group.tone}`} key={group.title}>
                <div className="workflow-head"><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3></div>
                <div className="workflow-route-items">{group.items.map((item, itemIndex) => <span key={item}><ToneDot tone={group.tone} />{item}{itemIndex !== group.items.length - 1 ? <ChevronRight size={13} /> : null}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="workflow-footnote"><CircleAlert size={16} /><p><strong>Held path remains held:</strong> payment processing, payment problems, and onboarding problems are presented exactly as “HELD” in the underlying workflow canvas.</p></div>
        </section>

        <section id="commercial" className="canvas-section canvas-paper commercial-section" onMouseEnter={() => setActiveCanvas("commercial")}>
          <SectionKicker number="04" eyebrow="Canvas Four" title="Commercial Ladder" description="The commercial path shown in the existing canvas, including its entitlements, negotiated deal route, communities, courses, and Pro Shop." />
          <div className="legacy-banner"><CircleAlert size={18} /><div><strong>Existing commercial canvas</strong><span>Terms below are shown as drawn for review. They are not treated here as a new recommendation or approved replacement model.</span></div></div>
          <div className="commercial-route">
            <RouteBand steps={commercialSteps} />
          </div>
          <div className="commercial-detail-grid">
            <article className="entitlement-card"><h3><BookOpen size={19} /> Free / DIY Access</h3><p><b>Free:</b> community access, education / updates, Pro Shop at full retail.</p><p><b>DIY:</b> full digital course, complimentary book, free community access, Pro Shop at full retail.</p></article>
            <article className="entitlement-card"><h3><CreditCard size={19} /> Full-Service Access</h3><p><b>Monthly:</b> fulfilment, client fulfilment community, full course, Pro Shop member discount.</p><p><b>PIF:</b> fulfilment, client fulfilment community, full course, Pro Shop catalog complimentary.</p></article>
            <article className="entitlement-card entitlement-human"><h3><UserRound size={19} /> Human Negotiation Path</h3><p>Real objection <ArrowRight size={13} /> Human approves terms <ArrowRight size={13} /> Down payment plus monthly remainder <ArrowRight size={13} /> Automation executes the approved deal.</p></article>
            <article className="entitlement-card"><h3><Layers3 size={19} /> Supporting Products</h3><p><b>Communities:</b> Free / DIY, Client Fulfilment.</p><p><b>Courses:</b> Onboarding Course for new clients; HECR Credit Repair Digital Course as standalone product.</p><p><b>Pro Shop:</b> templates, letters, guides, calculators, and mini-courses.</p></article>
          </div>
        </section>

        <section id="end-to-end" className="canvas-section canvas-end" onMouseEnter={() => setActiveCanvas("end-to-end")}>
          <SectionKicker number="05" eyebrow="Canvas Five" title="End-to-End Flow" description="The cross-system sequence: source entry, conversation, human disposition, client service, and post-graduation paths." />
          <div className="end-to-end-map">
            <div className="map-head"><span>ONE CONNECTED OPERATING JOURNEY</span><span>Source → proof → service → retention</span></div>
            <RouteBand steps={endToEndSteps} />
            <div className="route-branches">
              <article><span className="branch-icon branch-violet"><MessageSquareText size={19} /></span><div><h3>Conversation Branch</h3><p>Blair books when appropriate; judgment routes to a human sales consultation.</p></div></article>
              <article><span className="branch-icon branch-red"><CalendarDays size={19} /></span><div><h3>Appointment Exceptions</h3><p>Missed, rescheduled, and no-show appointments return to the exception path.</p></div></article>
              <article><span className="branch-icon branch-orange"><UserRound size={19} /></span><div><h3>Human Disposition</h3><p>Won, Lost, Deferred, and No-show remain human-controlled sales outcomes.</p></div></article>
              <article><span className="branch-icon branch-green"><GraduationCap size={19} /></span><div><h3>Post-Graduation</h3><p>Graduation branches to review request and referral-pipeline entry.</p></div></article>
            </div>
          </div>
          <div className="end-summary">
            <div><span>Inputs</span><strong>Facebook · Organic · Dealership</strong></div>
            <div><span>Decision Rule</span><strong>Humans own commercial judgment</strong></div>
            <div><span>Current Hold</span><strong>Payment & onboarding path</strong></div>
            <div><span>Service Finish</span><strong>Graduation · review · referral</strong></div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-mark"><ShieldCheck size={30} /></div>
          <div><p className="eyebrow">Working Conclusion</p><h2>This is the map.<br />Now classify the reality.</h2></div>
          <p>The canvases reveal the intended architecture. The next work is to place each item into its real project home—current, held, legacy, planned, or blocked—before drawing anything new.</p>
        </section>
      </main>
    </div>
  );
}

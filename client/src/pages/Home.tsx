/**
 * Design: Operations Blueprint Ledger — source-faithful HECR canvas review.
 * This page uses a fixed review rail, technical route bands, and margin notes
 * to make the existing system inspectable without silently changing it.
 */
import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  Download,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Layers3,
  MessageSquareText,
  Network,
  Pencil,
  RotateCcw,
  Route,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  Upload,
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

type EditValues = Record<string, string>;

type EditContextValue = {
  editMode: boolean;
  edits: EditValues;
  setEditMode: (value: boolean) => void;
  updateEdit: (id: string, value: string) => void;
  replaceEdits: (values: EditValues) => void;
  resetEdits: () => void;
};

const EDIT_STORAGE_KEY = "hecr-canvas-review-edits-v1";

const EditContext = createContext<EditContextValue | null>(null);

function useEditContext() {
  const context = useContext(EditContext);
  if (!context) throw new Error("Editable content must be rendered inside EditContext");
  return context;
}

function EditableText({ id, children }: { id: string; children: string }) {
  const { editMode, edits, updateEdit } = useEditContext();
  const value = edits[id] ?? children;

  return (
    <span
      className={editMode ? "editable-text editable-text-active" : "editable-text"}
      contentEditable={editMode}
      suppressContentEditableWarning
      data-editable-id={id}
      title={editMode ? "Click to edit" : undefined}
      onBlur={(event) => updateEdit(id, event.currentTarget.textContent?.trim() || children)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
    >
      {value}
    </span>
  );
}

function EditToolbar() {
  const { editMode, edits, setEditMode, replaceEdits, resetEdits } = useEditContext();
  const fileInput = useRef<HTMLInputElement>(null);

  const exportEdits = () => {
    const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), edits }, null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "hecr-canvas-edits.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importEdits = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const incoming = parsed?.edits ?? parsed;
      if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) throw new Error("Invalid edit file");
      const safeValues = Object.fromEntries(Object.entries(incoming).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
      replaceEdits(safeValues);
    } catch {
      window.alert("That file is not a valid HECR canvas edit export.");
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <div className={`edit-toolbar ${editMode ? "edit-toolbar-active" : ""}`} aria-label="Canvas editing tools">
      <button type="button" className="edit-primary" onClick={() => setEditMode(!editMode)}>
        <Pencil size={16} /> {editMode ? "Finish editing" : "Edit canvas"}
      </button>
      {editMode ? <span className="edit-status">Edits save automatically on this device</span> : null}
      <button type="button" onClick={exportEdits} title="Download edits"><Download size={16} /><span>Export</span></button>
      <button type="button" onClick={() => fileInput.current?.click()} title="Import edits"><Upload size={16} /><span>Import</span></button>
      <button
        type="button"
        onClick={() => {
          if (Object.keys(edits).length && window.confirm("Reset all canvas text to the original version?")) resetEdits();
        }}
        title="Reset edits"
      ><RotateCcw size={16} /><span>Reset</span></button>
      <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(event) => importEdits(event.target.files?.[0])} />
    </div>
  );
}

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

function RouteBand({ steps, compact = false, idPrefix = "route" }: { steps: Step[]; compact?: boolean; idPrefix?: string }) {
  return (
    <div className={`route-band ${compact ? "route-band-compact" : ""}`}>
      {steps.map((step, index) => (
        <div className="route-fragment" key={`${step.label}-${index}`}>
          <article className={`route-node node-${step.tone ?? "blue"}`}>
            <ToneDot tone={step.tone} />
            <div>
              <h4><EditableText id={`${idPrefix}.${index}.label`}>{step.label}</EditableText></h4>
              {step.sub ? <p><EditableText id={`${idPrefix}.${index}.sub`}>{step.sub}</EditableText></p> : null}
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
      <div className="kicker-number"><EditableText id={`section.${number}.number`}>{number}</EditableText></div>
      <div>
        <p className="eyebrow"><EditableText id={`section.${number}.eyebrow`}>{eyebrow}</EditableText></p>
        <h2><EditableText id={`section.${number}.title`}>{title}</EditableText></h2>
        <p className="section-description"><EditableText id={`section.${number}.description`}>{description}</EditableText></p>
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

function CanvasReview() {
  const [activeCanvas, setActiveCanvas] = useState("ecosystem");
  const [railOpen, setRailOpen] = useState(false);

  const handleNav = (id: string) => {
    setActiveCanvas(id);
    setRailOpen(false);
    window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="review-shell">
      <EditToolbar />
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
                <span className="rail-index"><EditableText id={`nav.${canvas.id}.number`}>{canvas.number}</EditableText></span>
                <Icon size={17} strokeWidth={1.8} />
                <span className="rail-item-copy"><strong><EditableText id={`nav.${canvas.id}.title`}>{canvas.title}</EditableText></strong><small><EditableText id={`nav.${canvas.id}.subtitle`}>{canvas.subtitle}</EditableText></small></span>
                <ChevronRight size={15} />
              </button>
            );
          })}
        </nav>

        <div className="rail-key">
          <p className="rail-label">Reading Key</p>
          <div><ToneDot tone="blue" /> <EditableText id="key.blue">System / lifecycle</EditableText></div>
          <div><ToneDot tone="violet" /> <EditableText id="key.violet">AI interpretation</EditableText></div>
          <div><ToneDot tone="orange" /> <EditableText id="key.orange">Human / commercial</EditableText></div>
          <div><ToneDot tone="red" /> <EditableText id="key.red">Held / needs decision</EditableText></div>
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
            <h1><EditableText id="hero.title">Five canvases.</EditableText><br /><em><EditableText id="hero.subtitle">One system to inspect.</EditableText></em></h1>
            <p className="hero-copy"><EditableText id="hero.copy">This page turns the existing HECR canvases into one working review surface. It preserves what is actually drawn—including held paths, legacy terms, and pending decisions—so the team can decide what moves next.</EditableText></p>
            <div className="hero-tags">
              <span><CheckCircle2 size={14} /> <EditableText id="hero.tag.0">Source-faithful</EditableText></span>
              <span><CircleAlert size={14} /> <EditableText id="hero.tag.1">Pending labels preserved</EditableText></span>
              <span><ShieldCheck size={14} /> <EditableText id="hero.tag.2">Review before build</EditableText></span>
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
            <h2><EditableText id="intro.title">Read the map before you revise the map.</EditableText></h2>
            <p><EditableText id="intro.copy">Each lens below is intentionally separated. The goal is to make scope, sequencing, tooling, and commercial assumptions visible—not to make them look more finished than they are.</EditableText></p>
          </div>
          <div className="protocol-strip">
            <span><b>01</b> <EditableText id="protocol.0">Preserve the existing route</EditableText></span>
            <span><b>02</b> <EditableText id="protocol.1">Identify the real status</EditableText></span>
            <span><b>03</b> <EditableText id="protocol.2">Separate commercial from delivery</EditableText></span>
            <span><b>04</b> <EditableText id="protocol.3">Change only by decision</EditableText></span>
          </div>
        </section>

        <section id="ecosystem" className="canvas-section canvas-paper" onMouseEnter={() => setActiveCanvas("ecosystem")}>
          <SectionKicker number="01" eyebrow="Canvas One" title="Ecosystem Overview" description="The business-level landscape: CRM core, AI, commercial model, and connected providers." />
          <div className="ecosystem-layout">
            <div className="ecosystem-spine">
              <span className="spine-tag"><EditableText id="ecosystem.spine.brand">HECR</EditableText></span>
              <div className="spine-line" />
              <span><EditableText id="ecosystem.spine.0">GHL Core</EditableText></span><ArrowRight size={16} />
              <span><EditableText id="ecosystem.spine.1">AI Stack</EditableText></span><ArrowRight size={16} />
              <span><EditableText id="ecosystem.spine.2">Commercial</EditableText></span><ArrowRight size={16} />
              <span><EditableText id="ecosystem.spine.3">Integrations</EditableText></span>
            </div>
            <div className="ecosystem-grid">
              {ecosystemGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article className={`lens-card lens-${group.tone}`} key={group.title}>
                    <div className="lens-card-head"><span><Icon size={20} /></span><h3><EditableText id={`ecosystem.${group.title}.title`}>{group.title}</EditableText></h3></div>
                    <ul>{group.items.map((item, itemIndex) => <li key={item}><EditableText id={`ecosystem.${group.title}.item.${itemIndex}`}>{item}</EditableText></li>)}</ul>
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
              <div className="track-label"><span className="track-index">A</span><div><strong><EditableText id="pipelines.inbound.title">Inbound</EditableText></strong><small><EditableText id="pipelines.inbound.subtitle">Lead-to-decision path</EditableText></small></div></div>
              <RouteBand steps={inboundSteps} compact idPrefix="pipelines.inbound" />
            </div>
            <div className="pipeline-track pipeline-track-accent">
              <div className="track-label"><span className="track-index">B</span><div><strong><EditableText id="pipelines.fulfilment.title">Fulfilment</EditableText></strong><small><EditableText id="pipelines.fulfilment.subtitle">Client delivery position</EditableText></small></div></div>
              <RouteBand steps={fulfilmentSteps} compact idPrefix="pipelines.fulfilment" />
              <div className="canceled-chip"><CircleAlert size={13} /> Canceled may exit from the service route</div>
            </div>
            <div className="pipeline-split-row">
              <article className="mini-pipeline mini-pipeline-orange">
                <div><HeartHandshake size={19} /><span><EditableText id="pipelines.mini.dealership.title">Dealership</EditableText></span></div>
                <p><EditableText id="pipelines.mini.dealership.0">Handed Off</EditableText> <ArrowRight size={14} /> <EditableText id="pipelines.mini.dealership.1">Contacted</EditableText> <ArrowRight size={14} /> <EditableText id="pipelines.mini.dealership.2">Closed-Won / Closed-Lost</EditableText></p>
              </article>
              <article className="mini-pipeline mini-pipeline-slate">
                <div><Sparkles size={19} /><span><EditableText id="pipelines.mini.cold.title">Cold / Revival</EditableText></span></div>
                <p><EditableText id="pipelines.mini.cold.copy">Stages not yet finalized</EditableText></p>
              </article>
              <article className="mini-pipeline mini-pipeline-violet">
                <div><UsersRound size={19} /><span><EditableText id="pipelines.mini.referral.title">Referral</EditableText></span></div>
                <p><EditableText id="pipelines.mini.referral.copy">Graduated → Asked → Made → Converted → Rewarded</EditableText></p>
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
                <div className="workflow-head"><span>{String(index + 1).padStart(2, "0")}</span><h3><EditableText id={`workflow.${index}.title`}>{group.title}</EditableText></h3></div>
                <div className="workflow-route-items">{group.items.map((item, itemIndex) => <span key={item}><ToneDot tone={group.tone} /><EditableText id={`workflow.${index}.item.${itemIndex}`}>{item}</EditableText>{itemIndex !== group.items.length - 1 ? <ChevronRight size={13} /> : null}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="workflow-footnote"><CircleAlert size={16} /><p><strong><EditableText id="workflow.footnote.title">Held path remains held:</EditableText></strong> <EditableText id="workflow.footnote.copy">payment processing, payment problems, and onboarding problems are presented exactly as “HELD” in the underlying workflow canvas.</EditableText></p></div>
        </section>

        <section id="commercial" className="canvas-section canvas-paper commercial-section" onMouseEnter={() => setActiveCanvas("commercial")}>
          <SectionKicker number="04" eyebrow="Canvas Four" title="Commercial Ladder" description="The commercial path shown in the existing canvas, including its entitlements, negotiated deal route, communities, courses, and Pro Shop." />
          <div className="legacy-banner"><CircleAlert size={18} /><div><strong><EditableText id="commercial.banner.title">Existing commercial canvas</EditableText></strong><span><EditableText id="commercial.banner.copy">Terms below are shown as drawn for review. They are not treated here as a new recommendation or approved replacement model.</EditableText></span></div></div>
          <div className="commercial-route">
            <RouteBand steps={commercialSteps} idPrefix="commercial.route" />
          </div>
          <div className="commercial-detail-grid">
            <article className="entitlement-card"><h3><BookOpen size={19} /> <EditableText id="commercial.card.0.title">Free / DIY Access</EditableText></h3><p><b>Free:</b> <EditableText id="commercial.card.0.copy.0">community access, education / updates, Pro Shop at full retail.</EditableText></p><p><b>DIY:</b> <EditableText id="commercial.card.0.copy.1">full digital course, complimentary book, free community access, Pro Shop at full retail.</EditableText></p></article>
            <article className="entitlement-card"><h3><CreditCard size={19} /> <EditableText id="commercial.card.1.title">Full-Service Access</EditableText></h3><p><b>Monthly:</b> <EditableText id="commercial.card.1.copy.0">fulfilment, client fulfilment community, full course, Pro Shop member discount.</EditableText></p><p><b>PIF:</b> <EditableText id="commercial.card.1.copy.1">fulfilment, client fulfilment community, full course, Pro Shop catalog complimentary.</EditableText></p></article>
            <article className="entitlement-card entitlement-human"><h3><UserRound size={19} /> <EditableText id="commercial.card.2.title">Human Negotiation Path</EditableText></h3><p><EditableText id="commercial.card.2.copy.0">Real objection</EditableText> <ArrowRight size={13} /> <EditableText id="commercial.card.2.copy.1">Human approves terms</EditableText> <ArrowRight size={13} /> <EditableText id="commercial.card.2.copy.2">Down payment plus monthly remainder</EditableText> <ArrowRight size={13} /> <EditableText id="commercial.card.2.copy.3">Automation executes the approved deal.</EditableText></p></article>
            <article className="entitlement-card"><h3><Layers3 size={19} /> <EditableText id="commercial.card.3.title">Supporting Products</EditableText></h3><p><b>Communities:</b> <EditableText id="commercial.card.3.copy.0">Free / DIY, Client Fulfilment.</EditableText></p><p><b>Courses:</b> <EditableText id="commercial.card.3.copy.1">Onboarding Course for new clients; HECR Credit Repair Digital Course as standalone product.</EditableText></p><p><b>Pro Shop:</b> <EditableText id="commercial.card.3.copy.2">templates, letters, guides, calculators, and mini-courses.</EditableText></p></article>
          </div>
        </section>

        <section id="end-to-end" className="canvas-section canvas-end" onMouseEnter={() => setActiveCanvas("end-to-end")}>
          <SectionKicker number="05" eyebrow="Canvas Five" title="End-to-End Flow" description="The cross-system sequence: source entry, conversation, human disposition, client service, and post-graduation paths." />
          <div className="end-to-end-map">
            <div className="map-head"><span>ONE CONNECTED OPERATING JOURNEY</span><span>Source → proof → service → retention</span></div>
            <RouteBand steps={endToEndSteps} idPrefix="endToEnd.route" />
            <div className="route-branches">
              <article><span className="branch-icon branch-violet"><MessageSquareText size={19} /></span><div><h3><EditableText id="endToEnd.branch.0.title">Conversation Branch</EditableText></h3><p><EditableText id="endToEnd.branch.0.copy">Blair books when appropriate; judgment routes to a human sales consultation.</EditableText></p></div></article>
              <article><span className="branch-icon branch-red"><CalendarDays size={19} /></span><div><h3><EditableText id="endToEnd.branch.1.title">Appointment Exceptions</EditableText></h3><p><EditableText id="endToEnd.branch.1.copy">Missed, rescheduled, and no-show appointments return to the exception path.</EditableText></p></div></article>
              <article><span className="branch-icon branch-orange"><UserRound size={19} /></span><div><h3><EditableText id="endToEnd.branch.2.title">Human Disposition</EditableText></h3><p><EditableText id="endToEnd.branch.2.copy">Won, Lost, Deferred, and No-show remain human-controlled sales outcomes.</EditableText></p></div></article>
              <article><span className="branch-icon branch-green"><GraduationCap size={19} /></span><div><h3><EditableText id="endToEnd.branch.3.title">Post-Graduation</EditableText></h3><p><EditableText id="endToEnd.branch.3.copy">Graduation branches to review request and referral-pipeline entry.</EditableText></p></div></article>
            </div>
          </div>
          <div className="end-summary">
            <div><span><EditableText id="endToEnd.summary.0.label">Inputs</EditableText></span><strong><EditableText id="endToEnd.summary.0.value">Facebook · Organic · Dealership</EditableText></strong></div>
            <div><span><EditableText id="endToEnd.summary.1.label">Decision Rule</EditableText></span><strong><EditableText id="endToEnd.summary.1.value">Humans own commercial judgment</EditableText></strong></div>
            <div><span><EditableText id="endToEnd.summary.2.label">Current Hold</EditableText></span><strong><EditableText id="endToEnd.summary.2.value">Payment & onboarding path</EditableText></strong></div>
            <div><span><EditableText id="endToEnd.summary.3.label">Service Finish</EditableText></span><strong><EditableText id="endToEnd.summary.3.value">Graduation · review · referral</EditableText></strong></div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-mark"><ShieldCheck size={30} /></div>
          <div><p className="eyebrow"><EditableText id="closing.eyebrow">Working Conclusion</EditableText></p><h2><EditableText id="closing.title">This is the map.</EditableText><br /><EditableText id="closing.subtitle">Now classify the reality.</EditableText></h2></div>
          <p><EditableText id="closing.copy">The canvases reveal the intended architecture. The next work is to place each item into its real project home—current, held, legacy, planned, or blocked—before drawing anything new.</EditableText></p>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  const [editMode, setEditMode] = useState(false);
  const [edits, setEdits] = useState<EditValues>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(EDIT_STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    window.localStorage.setItem(EDIT_STORAGE_KEY, JSON.stringify(edits));
  }, [edits]);

  const updateEdit = (id: string, value: string) => setEdits((current) => ({ ...current, [id]: value }));
  const replaceEdits = (values: EditValues) => setEdits(values);
  const resetEdits = () => setEdits({});

  return (
    <EditContext.Provider value={{ editMode, edits, setEditMode, updateEdit, replaceEdits, resetEdits }}>
      <CanvasReview />
    </EditContext.Provider>
  );
}

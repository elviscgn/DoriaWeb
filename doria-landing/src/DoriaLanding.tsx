import { useState, useEffect, memo } from "react";
import Spline from "@splinetool/react-spline";
import { BrickWallShield } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --background: hsl(222, 20%, 7%);
    --foreground: hsl(214, 32%, 95%);
    --primary: hsl(43, 65%, 55%);
    --primary-foreground: hsl(222, 20%, 7%);
    --secondary: hsl(220, 16%, 10%);
    --muted: hsl(220, 14%, 12%);
    --muted-foreground: hsl(215, 16%, 47%);
    --border: hsl(220, 18%, 17%);
    --hero-bg: hsl(222, 22%, 6%);
    --nav-button: hsl(220, 16%, 10%);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Sora', sans-serif;
    background: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  .mono { font-family: 'JetBrains Mono', monospace; }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
  }

  @media (prefers-reduced-motion), (max-width: 768px) {
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
  }

  .animate-fade-up {
    opacity: 0;
    animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    background: transparent;
    padding: 20px 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 1024px) { nav { padding: 20px 32px; } }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    text-decoration: none;
    color: var(--foreground);
  }
  .logo-d { color: var(--primary); }

  .nav-links { display: flex; gap: 32px; list-style: none; }
  @media (max-width: 768px) { .nav-links { display: none; } .nav-btns { display: none !important; } }

  .nav-links a {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--foreground); }

  .nav-btns { display: flex; gap: 12px; }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 10px 24px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: filter 0.2s, transform 0.1s;
    white-space: nowrap;
  }
  .btn-ghost { background: var(--nav-button); color: var(--foreground); }
  .btn-ghost:hover { filter: brightness(1.2); }
  .btn-primary { background: var(--primary); color: var(--primary-foreground); }
  .btn-primary:hover { filter: brightness(1.1); }
  .btn-primary:active { transform: scale(0.97); }
  .btn-white { background: #fff; color: var(--background); }
  .btn-white:hover { filter: brightness(0.9); }
  .btn-white:active { transform: scale(0.97); }
  .btn-lg { font-size: 0.875rem; padding: 16px 32px; border-radius: 2px; }

  /* HERO */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: flex-end;
    background: var(--hero-bg);
    overflow: hidden;
  }

  .hero-spline {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    /* isolate compositing to this subtree */
    isolation: isolate;
  }

  /* fade spline in gracefully once loaded */
  .hero-spline.is-ready { animation: fade-in-spline 0.8s ease forwards; }
  @keyframes fade-in-spline { from { opacity: 0; } to { opacity: 1; } }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 1;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 10;
    pointer-events: none;
    width: 100%;
    max-width: min(90%, 48rem);
    padding: 128px 40px 40px;
  }
  @media (max-width: 640px) { .hero-content { padding: 128px 24px 40px; } }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--nav-button);
    border: 1px solid var(--border);
    border-radius: 9999px;
    padding: 8px 16px;
    font-size: 0.75rem;
    color: var(--muted-foreground);
    margin-bottom: 24px;
  }
  .badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--primary);
    flex-shrink: 0;
  }

  .hero-h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .hero-h1 .gold { color: var(--primary); }

  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.5rem);
    font-weight: 300;
    color: rgba(241,245,249,0.8);
    margin-bottom: 16px;
  }

  .hero-desc {
    font-size: clamp(0.875rem, 1.5vw, 1.125rem);
    font-weight: 300;
    color: var(--muted-foreground);
    margin-bottom: 24px;
    max-width: 36rem;
  }

  .hero-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    pointer-events: auto;
  }

  .hero-trust {
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(100,116,139,0.6);
    margin-top: 24px;
  }

  /* STATS */
  .stats-bar {
    background: var(--secondary);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 48px 64px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1024px) { .stats-bar { padding: 48px 32px; } }
  @media (max-width: 640px)  { .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 24px; } }

  .stat-item {
    padding: 0 24px;
    border-right: 1px solid var(--border);
  }
  .stat-item:first-child { padding-left: 0; }
  .stat-item:last-child  { border-right: none; }
  @media (max-width: 640px) {
    .stat-item { border-right: none; padding: 0; }
    .stat-item:nth-child(odd) { border-right: 1px solid var(--border); }
  }

  .stat-number {
    font-size: 2.25rem;
    font-weight: 700;
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
    display: block;
    margin-bottom: 6px;
  }
  .stat-label { font-size: 0.875rem; color: var(--muted-foreground); line-height: 1.4; }

  /* HOW IT WORKS */
  .how-section { padding: 96px 64px; background: var(--hero-bg); }
  @media (max-width: 1024px) { .how-section { padding: 96px 32px; } }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted-foreground);
    margin-bottom: 16px;
  }
  .section-heading {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: var(--foreground);
    margin-bottom: 64px;
    max-width: 32rem;
    line-height: 1.1;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  @media (max-width: 768px) { .cards-grid { grid-template-columns: 1fr; } }

  .feature-card {
    background: var(--secondary);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    transition: border-color 0.3s;
  }
  .feature-card:hover { border-color: rgba(193,154,77,0.35); }

  .card-num {
    font-size: 3.75rem;
    font-weight: 700;
    color: var(--border);
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 24px;
    display: block;
    line-height: 1;
  }
  .card-title { font-size: 1.25rem; font-weight: 600; color: var(--foreground); margin-bottom: 12px; }
  .card-desc  { font-size: 0.875rem; color: var(--muted-foreground); line-height: 1.7; }

  /* COMPETITOR */
  .competitor-section { padding: 96px 64px; background: var(--secondary); }
  @media (max-width: 1024px) { .competitor-section { padding: 96px 32px; } }

  .comp-table-wrap {
    max-width: 56rem;
    margin: 0 auto;
    background: var(--hero-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }

  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  thead tr { background: rgba(0,0,0,0.4); }

  th {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted-foreground);
    padding: 16px 24px;
    text-align: left;
    font-weight: 400;
  }
  th.doria-col { color: var(--primary); text-align: center; }
  th:not(:first-child) { text-align: center; }

  td {
    padding: 16px 24px;
    font-size: 0.875rem;
    border-bottom: 1px solid var(--border);
  }
  tr:last-child td { border-bottom: none; }
  td:first-child { color: var(--foreground); }
  td:not(:first-child) { text-align: center; }

  .check { color: #4ade80; font-size: 1rem; }
  .cross { color: #f87171; font-size: 1rem; }
  .dash  { color: var(--muted-foreground); }

  td.doria-cell { background: rgba(193,154,77,0.05); color: var(--primary); }

  @media (max-width: 640px) { th, td { padding: 12px 10px; font-size: 0.75rem; } }

  /* FINAL CTA */
  .cta-section {
    padding: 128px 64px;
    background: var(--hero-bg);
    text-align: center;
  }
  @media (max-width: 1024px) { .cta-section { padding: 128px 32px; } }

  .cta-heading {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
    font-weight: 700;
    color: var(--foreground);
    margin: 0 auto 24px;
    max-width: 48rem;
    line-height: 1.1;
  }
  .cta-sub  { color: var(--muted-foreground); font-size: 1.125rem; font-weight: 300; margin-bottom: 48px; }
  .cta-btns { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
  .cta-fine { font-size: 0.75rem; color: rgba(100,116,139,0.6); margin-top: 32px; }

  /* FOOTER */
  footer {
    background: var(--secondary);
    border-top: 1px solid var(--border);
    padding: 40px 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
  @media (max-width: 1024px) { footer { padding: 40px 32px; } }

  .footer-wordmark {
    display: flex; align-items: center; gap: 8px;
    font-size: 1rem; font-weight: 600; letter-spacing: -0.025em;
    color: var(--foreground); text-decoration: none;
  }
  .footer-tagline { font-size: 0.75rem; color: var(--muted-foreground); }
  .footer-gh {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.75rem; color: var(--muted-foreground);
    text-decoration: none; transition: color 0.2s;
  }
  .footer-gh:hover { color: var(--foreground); }
`;

/* ─── icons ─────────────────────────────────────────────────────────── */
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect
        x="1"
        y="1"
        width="6"
        height="6"
        rx="1.5"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="11"
        y="1"
        width="6"
        height="6"
        rx="1.5"
        fill="currentColor"
        opacity="0.4"
      />
      <rect
        x="1"
        y="11"
        width="6"
        height="6"
        rx="1.5"
        fill="currentColor"
        opacity="0.4"
      />
      <rect x="11" y="11" width="6" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── memoised Spline so parent re-renders never unmount/remount it ── */
const SplineBackground = memo(function SplineBackground({
  onLoad,
}: {
  onLoad: () => void;
}) {
  return (
    <Spline
      scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
      style={{ width: "100%", height: "100%" }}
      renderOnDemand={true}
    />
  );
});

/* ─── table data ─────────────────────────────────────────────────────── */
const tableRows = [
  {
    feature: "Detects known CVEs",
    snyk: true,
    dep: true,
    sock: true,
    doria: true,
  },
  {
    feature: "Catches typosquats",
    snyk: false,
    dep: false,
    sock: true,
    doria: true,
  },
  {
    feature: "Catches AI hallucinations (slopsquats)",
    snyk: false,
    dep: false,
    sock: false,
    doria: true,
  },
  {
    feature: "AST code analysis",
    snyk: false,
    dep: false,
    sock: true,
    doria: true,
  },
  {
    feature: "ML behavioral scoring",
    snyk: false,
    dep: false,
    sock: false,
    doria: true,
  },
  {
    feature: "Autonomous fix + PR",
    snyk: false,
    dep: true,
    sock: false,
    doria: true,
  },
  {
    feature: "Works offline",
    snyk: false,
    dep: false,
    sock: false,
    doria: true,
  },
  {
    feature: "Built for AI-assisted development",
    snyk: false,
    dep: false,
    sock: false,
    doria: true,
  },
];

function Cell({ val, isDoria }: { val: boolean; isDoria: boolean }) {
  const mark = val ? (
    <span
      className={isDoria ? "" : "check"}
      style={isDoria ? { color: "var(--primary)" } : {}}
    >
      ✓
    </span>
  ) : (
    <span className="cross">✗</span>
  );
  return <td className={isDoria ? "doria-cell" : ""}>{mark}</td>;
}

/* ─── main component ─────────────────────────────────────────────────── */
export default function DoriaLanding() {
  // mount Spline only after the browser is idle post-load
  const [showSpline, setShowSpline] = useState(false);
  const [splineReady, setSplineReady] = useState(false);

  useEffect(() => {
    const mount = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setShowSpline(true), {
          timeout: 2000,
        });
      } else {
        setTimeout(() => setShowSpline(true), 300);
      }
    };

    if (document.readyState === "complete") {
      mount();
    } else {
      window.addEventListener("load", mount, { once: true });
    }
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav>
        <a href="https://github.com/elviscgn/Doria" className="logo">
          <BrickWallShield size={20} strokeWidth={1.5} color="currentColor" />
          <span>
            <span className="logo-d">D</span>ORIA
          </span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#why">Why Doria</a>
          </li>
          <li>
            <a href="https://github.com/elviscgn/Doria">GitHub</a>
          </li>
        </ul>
        <div className="nav-btns">
          <a href="https://github.com/elviscgn/Doria" className="btn btn-ghost">
            Star on GitHub
          </a>
          <a
            href="https://github.com/elviscgn/Doria"
            className="btn btn-primary"
          >
            Request Access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className={`hero-spline${splineReady ? " is-ready" : ""}`}>
          {showSpline && (
            <SplineBackground onLoad={() => setSplineReady(true)} />
          )}
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div
            className="hero-badge animate-fade-up"
            style={{ animationDelay: "0s" }}
          >
            <span className="badge-dot" />
            Presenting at ITWeb Security Summit Hackathon 2026 · Sandton
            Convention Centre
          </div>

          <h1
            className="hero-h1 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            AI WRITES YOUR CODE.
            <br />
            <span className="gold">WE CHECK WHAT IT INSTALLS.</span>
          </h1>

          <p
            className="hero-sub animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            1 in 5 AI-suggested packages don't exist. Attackers register those
            names and wait.
          </p>

          <p
            className="hero-desc animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            Doria catches hallucinated and malicious packages before they touch
            your machine — then fixes it autonomously. No alerts. No waiting.
            Just clean code.
          </p>

          <div
            className="hero-ctas animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            <a
              href="https://github.com/elviscgn/Doria"
              className="btn btn-primary btn-lg"
            >
              Star on GitHub
            </a>
            <a
              href="https://github.com/elviscgn/Doria"
              className="btn btn-white btn-lg"
            >
              Request Access
            </a>
          </div>

          <p
            className="hero-trust animate-fade-up"
            style={{ animationDelay: "0.85s" }}
          >
            Open source · Built in Johannesburg · Doria means patrol in Swahili
          </p>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[
          { n: "19.7%", l: "of AI package suggestions are hallucinated" },
          { n: "$100B+", l: "estimated SolarWinds attack damages" },
          { n: "576K", l: "code samples in slopsquat research" },
          { n: "1.2s", l: "average Doria scan time" },
        ].map((s) => (
          <div className="stat-item" key={s.n}>
            <span className="stat-number mono">{s.n}</span>
            <span className="stat-label">{s.l}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <p className="section-label">How It Works</p>
        <h2 className="section-heading">Four layers. Zero blind spots.</h2>
        <div className="cards-grid" id="features">
          {[
            {
              n: "01",
              title: "AST Static Analysis",
              desc: "Rust-powered parser reads actual package source code. Detects shell execution, credential harvesting, obfuscation, and malicious install hooks in milliseconds.",
            },
            {
              n: "02",
              title: "ML Threat Intelligence",
              desc: "XGBoost model trained on real malware datasets. Not a CVE lookup — genuine machine learning on behavioral and metadata signals from thousands of confirmed malicious packages.",
            },
            {
              n: "03",
              title: "Slopsquat Detection",
              desc: "The only tool that catches AI-hallucinated package names. 1 in 5 AI suggestions don't exist. Attackers register those names. Doria identifies them before install.",
            },
            {
              n: "04",
              title: "Autonomous Remediation",
              desc: "Snyk tells you. Dependabot tells you. Doria fixes it. Pulls safe version, runs your tests, opens a PR with a full explanation. No human in the loop.",
            },
          ].map((c) => (
            <div className="feature-card" key={c.n}>
              <span className="card-num mono">{c.n}</span>
              <p className="card-title">{c.title}</p>
              <p className="card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPETITOR TABLE */}
      <section className="competitor-section" id="why">
        <p className="section-label">Why Doria</p>
        <h2 className="section-heading">
          The only tool built for the AI development era.
        </h2>
        <div className="comp-table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: "32%" }}>Feature</th>
                <th>Snyk</th>
                <th>Dependabot</th>
                <th>Socket.dev</th>
                <th className="doria-col">Doria</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <Cell val={row.snyk} isDoria={false} />
                  <Cell val={row.dep} isDoria={false} />
                  <Cell val={row.sock} isDoria={false} />
                  <Cell val={row.doria} isDoria={true} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section">
        <h2 className="cta-heading">Start patrolling your dependencies.</h2>
        <p className="cta-sub">
          Doria means patrol in Swahili. It never stops moving through your
          codebase.
        </p>
        <div className="cta-btns">
          <a
            href="https://github.com/elviscgn/Doria"
            className="btn btn-primary btn-lg"
          >
            Star on GitHub
          </a>
          <a
            href="https://github.com/elviscgn/Doria"
            className="btn btn-white btn-lg"
          >
            Request Access
          </a>
        </div>
        <p className="cta-fine">
          Built in Johannesburg · ITWeb Security Summit 2026 · Open source
        </p>
      </section>

      {/* FOOTER */}
      <footer>
        <a href="https://github.com/elviscgn/Doria" className="footer-wordmark">
          <BrickWallShield size={20} strokeWidth={1.5} color="currentColor" />

          <span>
            <span style={{ color: "var(--primary)" }}>D</span>ORIA
          </span>
        </a>
        <span className="footer-tagline">Doria means patrol in Swahili</span>
        <a href="https://github.com/elviscgn/Doria" className="footer-gh">
          <GithubIcon /> GitHub
        </a>
      </footer>
    </>
  );
}

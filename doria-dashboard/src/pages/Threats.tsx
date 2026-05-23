import React, { useState } from "react";
import {
  SquareTerminal,
  Download,
  ShieldCheck,
  CircleX,
  TriangleAlert,
  MoreVertical,
  GitBranch,
  FileJson,
  FileText,
  Clock,
  Cpu,
  Zap,
  Wrench,
  Search,
} from "lucide-react";

export default function Threats() {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [toastMsg, setToastMsg] = useState<{
    msg: string;
    type: string;
  } | null>(null);

  const showToast = (msg: string, type = "success") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const threats = [
    {
      id: 1,
      pkgName: "co1ors@1.0.0",
      severity: "critical",
      severityLabel: "CRITICAL",
      status: "blocked",
      statusLabel: "BLOCKED",
      StatusIcon: CircleX,
      branch: "main",
      file: "package.json",
      time: "Just now",
      risk: 94,
      riskDashOffset: 5.6,
      tags: ["Typosquat", "Slopsquat", "Malicious Code"],
      desc: "Impersonates `colors`. Executes hidden shell commands and attempts unauthorized network access during installation. High risk of credential theft.",
      scores: [
        { label: "Behavioral Pattern", score: 94, color: "var(--threat-red)" },
        { label: "Typo Proximity", score: 87, color: "var(--warn-high)" },
        {
          label: "AI Hallucination Match",
          score: 91,
          color: "var(--slop-blue)",
        },
      ],
      expandedData: {
        traces: [
          { type: "Shell Execution", code: "child_process.exec()" },
          { type: "Outbound Connection", code: "45.33.32.156:8080" },
          { type: "Obfuscated Eval", code: "Buffer.from(x).toString()" },
        ],
        timeline: [
          {
            status: "green",
            label: "AST Scan Completed",
            sub: "0.3s · Findings logged",
          },
          {
            status: "red",
            label: "Threat Confirmed & Blocked",
            sub: "0.8s · 94% behavioral score met",
          },
          {
            status: "red",
            label: "Safe Version Unresolved",
            sub: "1.1s · No safe replacement found",
          },
          {
            status: "yellow",
            label: "Awaiting Manual Review",
            sub: "Now · User intervention required",
          },
        ],
      },
    },
    {
      id: 2,
      pkgName: "huggingface-cli@0.1.0",
      severity: "critical",
      severityLabel: "CRITICAL",
      status: "blocked",
      statusLabel: "BLOCKED",
      StatusIcon: CircleX,
      branch: "develop",
      file: "requirements.txt",
      time: "12m ago",
      risk: 89,
      riskDashOffset: 10.3,
      tags: ["Slopsquat"],
      desc: "Matches known AI hallucination patterns. Package is newly created with no stars or documentation.",
      scores: [
        { label: "Behavioral Pattern", score: 89, color: "var(--threat-red)" },
        { label: "Typo Proximity", score: 96, color: "var(--threat-red)" },
        {
          label: "AI Hallucination Match",
          score: 94,
          color: "var(--slop-blue)",
        },
      ],
    },
    {
      id: 3,
      pkgName: "env-stealer@9.9.9",
      severity: "critical",
      severityLabel: "CRITICAL",
      status: "blocked",
      statusLabel: "BLOCKED",
      StatusIcon: CircleX,
      branch: "main",
      file: "package.json",
      time: "45m ago",
      risk: 99,
      riskDashOffset: 0.9,
      tags: ["Malicious Code"],
      desc: "Reads and exfiltrates environment variables to an external server. Confirmed credential harvesting.",
      scores: [
        { label: "Behavioral Pattern", score: 99, color: "var(--threat-red)" },
        { label: "Typo Proximity", score: 78, color: "var(--warn-high)" },
        {
          label: "AI Hallucination Match",
          score: 23,
          color: "var(--slop-blue)",
        },
      ],
    },
    {
      id: 4,
      pkgName: "lod4sh@4.17.21",
      severity: "high",
      severityLabel: "HIGH",
      status: "flagged",
      statusLabel: "FLAGGED",
      StatusIcon: TriangleAlert,
      branch: "main",
      file: "package.json",
      time: "2h ago",
      risk: 76,
      riskDashOffset: 22.6,
      tags: ["Typosquat"],
      desc: "Impersonates `lodash`. Newly created package with unusual download velocity spikes.",
      scores: [
        { label: "Behavioral Pattern", score: 76, color: "var(--warn-high)" },
        { label: "Typo Proximity", score: 82, color: "var(--warn-high)" },
        {
          label: "AI Hallucination Match",
          score: 67,
          color: "var(--slop-blue)",
        },
      ],
    },
    {
      id: 5,
      pkgName: "reqqest@2.88.0",
      severity: "high",
      severityLabel: "HIGH",
      status: "flagged",
      statusLabel: "FLAGGED",
      StatusIcon: TriangleAlert,
      branch: "api-v2",
      file: "package.json",
      time: "5h ago",
      risk: 79,
      riskDashOffset: 19.7,
      tags: ["Typosquat"],
      desc: "Impersonates `request`. Makes unauthorized HTTP calls during installation scripts.",
      scores: [
        { label: "Behavioral Pattern", score: 71, color: "var(--warn-high)" },
        { label: "Typo Proximity", score: 79, color: "var(--warn-high)" },
        {
          label: "AI Hallucination Match",
          score: 58,
          color: "var(--slop-blue)",
        },
      ],
    },
    {
      id: 6,
      pkgName: "axios@0.21.1",
      severity: "medium",
      severityLabel: "MEDIUM",
      status: "outdated",
      statusLabel: "OUTDATED",
      StatusIcon: Clock,
      branch: "legacy-app",
      file: "package.json",
      time: "1d ago",
      risk: 34,
      riskDashOffset: 62.1,
      tags: ["Outdated"],
      desc: "CVE-2023-45857 credential exposure via HTTP headers. Current version 0.21.1 vulnerable. Safe version 1.6.0 available. No malicious code detected.",
      scores: [
        { label: "Behavioral Pattern", score: 34, color: "var(--safe-green)" },
        { label: "Typo Proximity", score: 12, color: "var(--safe-green)" },
      ],
    },
    {
      id: 7,
      pkgName: "minimist@1.2.5",
      severity: "medium",
      severityLabel: "MEDIUM",
      status: "outdated",
      statusLabel: "OUTDATED",
      StatusIcon: Clock,
      branch: "main",
      file: "package-lock.json",
      time: "2d ago",
      risk: 28,
      riskDashOffset: 67.8,
      tags: ["Outdated"],
      desc: "CVE-2021-44906 prototype pollution. Current version 1.2.5 affected. Safe version 1.2.8 available. Widely used transitive dependency.",
      scores: [
        { label: "Behavioral Pattern", score: 28, color: "var(--safe-green)" },
        { label: "Typo Proximity", score: 9, color: "var(--safe-green)" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <header
        className="topbar"
        style={{
          height: 60,
          flexShrink: 0,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "var(--text-primary)",
            letterSpacing: 0.2,
          }}
        >
          Security Threats
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border-light)",
            borderRadius: 20,
            padding: "4px 5px 4px 16px",
            width: 320,
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <SquareTerminal size={14} color="var(--text-muted)" />
          <input
            type="text"
            className="mono"
            placeholder="doria scan repo..."
            spellCheck="false"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: 12,
            }}
          />
          <button
            onClick={() =>
              showToast("Scanning workspace for vulnerabilities...")
            }
            style={{
              background: "var(--doria-yellow)",
              color: "#2A2725",
              fontWeight: 600,
              fontSize: 11.5,
              borderRadius: 16,
              padding: "7px 16px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            Scan
          </button>
        </div>
      </header>

      <div
        className="content-area"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 32px 32px",
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Summary Bar */}
        <div
          className="glass-panel"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            margin: "16px 0 0",
            flex: "0 0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              className="mono"
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "var(--threat-red)",
                lineHeight: 1,
              }}
            >
              7
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#F1F5F9" }}>
                Active Threats
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, color: "#64748B" }}>
                Requires immediate attention
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              className="pill-badge"
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                background: "var(--threat-red-dim)",
                color: "var(--threat-red)",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--threat-red)",
                  boxShadow: "0 0 6px var(--threat-red)",
                }}
              ></span>{" "}
              3 Critical
            </div>
            <div
              className="pill-badge"
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                background: "var(--warn-high-dim)",
                color: "var(--warn-high)",
                border: "1px solid rgba(245,158,11,0.25)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--warn-high)",
                  boxShadow: "0 0 6px var(--warn-high)",
                }}
              ></span>{" "}
              2 High
            </div>
            <div
              className="pill-badge"
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                background: "var(--warn-med-dim)",
                color: "var(--warn-med)",
                border: "1px solid rgba(234,179,8,0.25)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--warn-med)",
                  boxShadow: "0 0 6px var(--warn-med)",
                }}
              ></span>{" "}
              2 Medium
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => showToast("Report downloaded to your machine.")}
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: 11.5,
                borderRadius: 16,
                padding: "7px 16px",
                border: "1px solid var(--border-highlight)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Download size={14} /> Export Report
            </button>
            <button
              onClick={() =>
                showToast("Resolving vulnerabilities with safe versions...")
              }
              style={{
                background: "var(--doria-yellow)",
                color: "#2A2725",
                fontWeight: 600,
                fontSize: 11.5,
                borderRadius: 16,
                padding: "7px 16px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <ShieldCheck size={14} /> Fix All with Doria
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
            padding: "0 4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[
              "all",
              "critical",
              "high",
              "medium",
              "slopsquat",
              "typosquat",
              "malicious code",
            ].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="filter-pill"
                style={{
                  background:
                    filter === f
                      ? "linear-gradient(90deg, rgba(255,254,203,0.08) 0%, transparent 100%)"
                      : "transparent",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: "pointer",
                  position: "relative",
                  fontWeight: filter === f ? 600 : 500,
                  color:
                    filter === f ? "var(--doria-yellow)" : "var(--text-muted)",
                  textTransform: "capitalize",
                  boxShadow:
                    filter === f ? "inset 3px 0 0 var(--doria-yellow)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,0,0,0.2)",
              border: "1px solid var(--border-light)",
              borderRadius: 8,
              padding: "6px 12px",
              width: 220,
            }}
          >
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              className="mono"
              placeholder="Search threats..."
              spellCheck="false"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: 12,
              }}
            />
          </div>
        </div>

        {/* Threat Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingBottom: 24,
          }}
        >
          {threats
            .filter(
              (t) =>
                filter === "all" ||
                t.severity === filter ||
                t.tags.map((tag) => tag.toLowerCase()).includes(filter),
            )
            .map((threat) => {
              const isExpanded = expandedId === threat.id;

              const cardAccent =
                threat.severity === "critical"
                  ? "var(--threat-red)"
                  : threat.severity === "high"
                    ? "var(--warn-high)"
                    : "var(--warn-med)";

              return (
                <div
                  key={threat.id}
                  className="glass-panel"
                  onClick={(e) => {
                    if (
                      (e.target as HTMLElement).closest("button") ||
                      (e.target as HTMLElement).closest(".action-dots")
                    )
                      return;
                    setExpandedId(isExpanded ? null : threat.id);
                  }}
                  style={{
                    position: "relative",
                    padding: "20px 24px",
                    cursor: "pointer",
                    borderLeft: `3px solid ${cardAccent}`,
                    background: isExpanded
                      ? "var(--bg-panel-hover)"
                      : "var(--bg-panel)",
                    borderColor: isExpanded
                      ? "rgba(255, 255, 255, 0.15)"
                      : "var(--border-light)",
                    borderLeftColor: cardAccent,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          marginBottom: 6,
                        }}
                      >
                        <div
                          className="mono"
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.2px",
                          }}
                        >
                          {threat.pkgName}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 800,
                              padding: "4px 8px",
                              borderRadius: 6,
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              letterSpacing: 0.5,
                              height: 22,
                              background: cardAccent,
                              color: "#fff",
                              boxShadow: `0 2px 6px ${cardAccent}40`,
                            }}
                          >
                            {threat.severityLabel}
                          </span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 800,
                              padding: "4px 8px",
                              borderRadius: 6,
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              letterSpacing: 0.5,
                              height: 22,
                              background:
                                threat.status === "blocked"
                                  ? "var(--threat-red-dim)"
                                  : threat.status === "flagged"
                                    ? "var(--warn-high-dim)"
                                    : "var(--warn-med-dim)",
                              color:
                                threat.status === "blocked"
                                  ? "var(--threat-red)"
                                  : threat.status === "flagged"
                                    ? "var(--warn-high)"
                                    : "var(--warn-med)",
                              border: `1px solid ${threat.status === "blocked" ? "rgba(239,68,68,0.3)" : threat.status === "flagged" ? "rgba(245,158,11,0.3)" : "rgba(234,179,8,0.3)"}`,
                            }}
                          >
                            <threat.StatusIcon size={12} />
                            {threat.statusLabel}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          marginBottom: 16,
                          marginTop: 4,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            color: "var(--text-muted)",
                          }}
                        >
                          <GitBranch size={14} style={{ opacity: 0.7 }} />
                          <span
                            className="mono"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              padding: "2px 8px",
                              borderRadius: 4,
                              fontSize: 11,
                              letterSpacing: 0.2,
                              fontWeight: 600,
                              color: "var(--text-primary)",
                            }}
                          >
                            {threat.branch}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            color: "var(--text-muted)",
                          }}
                        >
                          {threat.file.includes("json") ? (
                            <FileJson size={14} style={{ opacity: 0.7 }} />
                          ) : (
                            <FileText size={14} style={{ opacity: 0.7 }} />
                          )}
                          <span
                            className="mono"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              padding: "2px 8px",
                              borderRadius: 4,
                              fontSize: 11,
                              letterSpacing: 0.2,
                              fontWeight: 600,
                              color: "var(--text-primary)",
                            }}
                          >
                            {threat.file}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            color: "var(--text-muted)",
                          }}
                        >
                          <Clock size={14} style={{ opacity: 0.7 }} />
                          <span
                            style={{
                              color: "var(--text-primary)",
                              fontWeight: 500,
                              fontSize: 11.5,
                            }}
                          >
                            {threat.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 16 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: 34,
                            height: 34,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            viewBox="0 0 36 36"
                            style={{
                              transform: "rotate(-90deg)",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <circle
                              cx="18"
                              cy="18"
                              r="15"
                              stroke="rgba(255,255,255,0.06)"
                              strokeWidth="2.5"
                              fill="none"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="15"
                              stroke={cardAccent}
                              strokeWidth="2.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray="94.2"
                              strokeDashoffset={threat.riskDashOffset}
                            />
                          </svg>
                          <span
                            className="mono"
                            style={{
                              position: "absolute",
                              fontSize: 11,
                              fontWeight: 800,
                              color: cardAccent,
                            }}
                          >
                            {threat.risk}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 8,
                            fontWeight: 700,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          Risk
                        </span>
                      </div>
                      <MoreVertical
                        size={16}
                        className="action-dots"
                        style={{
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          padding: 2,
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {threat.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 9.5,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 4,
                          textTransform: "uppercase",
                          background: "rgba(255,255,255,0.06)",
                          color: "var(--text-secondary)",
                          letterSpacing: 0.5,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      fontSize: 13,
                      color: "#A1A1AA",
                      lineHeight: 1.5,
                      marginBottom: 20,
                      maxWidth: "92%",
                    }}
                  >
                    {threat.desc}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 32,
                      marginBottom: 16,
                      width: threat.scores.length === 2 ? "66%" : "100%",
                    }}
                  >
                    {threat.scores.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 9.5,
                              color: "var(--text-secondary)",
                              fontWeight: 600,
                              letterSpacing: 0.5,
                              textTransform: "uppercase",
                            }}
                          >
                            {s.label}
                          </span>
                          <span
                            className="mono"
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: s.color,
                            }}
                          >
                            {s.score}%
                          </span>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: 4,
                            background: "rgba(0,0,0,0.25)",
                            borderRadius: 2,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              borderRadius: 2,
                              width: `${s.score}%`,
                              background: s.color,
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: -2,
                                width: 8,
                                height: 8,
                                background: "inherit",
                                borderRadius: "50%",
                                boxShadow: `0 0 8px ${s.color}`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Details Section */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isExpanded ? "1fr" : "0fr",
                      transition:
                        "grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        opacity: isExpanded ? 1 : 0,
                        transition: "opacity 200ms ease",
                        transitionDelay: "50ms",
                      }}
                    >
                      {threat.expandedData && (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 40,
                            marginTop: 16,
                            borderTop: "1px solid var(--border-light)",
                            paddingTop: 24,
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                                color: "var(--text-secondary)",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 16,
                              }}
                            >
                              <Cpu size={14} /> Malicious Code Traces
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                              }}
                            >
                              {threat.expandedData.traces.map((trace, i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    background: "rgba(0,0,0,0.2)",
                                    border: "1px solid rgba(255,255,255,0.04)",
                                    padding: "10px 14px",
                                    borderRadius: 6,
                                    fontSize: 12,
                                    color: "var(--text-muted)",
                                    fontFamily: "'JetBrains Mono', monospace",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: "50%",
                                      flexShrink: 0,
                                      background: "var(--threat-red)",
                                      boxShadow: "0 0 6px var(--threat-red)",
                                    }}
                                  ></div>
                                  <div>
                                    <span
                                      style={{
                                        color: "var(--text-primary)",
                                        fontWeight: 600,
                                        fontFamily: "'Inter', sans-serif",
                                      }}
                                    >
                                      {trace.type}
                                    </span>{" "}
                                    &middot;{" "}
                                    <span
                                      style={{ color: "var(--threat-red)" }}
                                    >
                                      {trace.code}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                                color: "var(--text-secondary)",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 16,
                              }}
                            >
                              <Zap size={14} /> Automated Response
                            </div>
                            <ul
                              style={{
                                position: "relative",
                                listStyle: "none",
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                marginLeft: 6,
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  left: 5,
                                  top: 8,
                                  bottom: 8,
                                  width: 2,
                                  background:
                                    "linear-gradient(to bottom, var(--border-highlight) 80%, transparent)",
                                }}
                              ></div>
                              {threat.expandedData.timeline.map((step, i) => (
                                <li
                                  key={i}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 14,
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: "50%",
                                      background: "var(--bg-panel)",
                                      border: "2.5px solid",
                                      position: "relative",
                                      zIndex: 1,
                                      flexShrink: 0,
                                      marginTop: 2,
                                      borderColor:
                                        step.status === "green"
                                          ? "var(--safe-green)"
                                          : step.status === "red"
                                            ? "var(--threat-red)"
                                            : "var(--doria-yellow)",
                                      boxShadow: `0 0 6px ${step.status === "green" ? "rgba(34,197,94,0.3)" : step.status === "red" ? "rgba(239,68,68,0.3)" : "rgba(255,254,203,0.3)"}`,
                                    }}
                                  ></div>
                                  <div>
                                    <div
                                      style={{
                                        fontSize: 12.5,
                                        color: "var(--text-primary)",
                                        fontWeight: 500,
                                        lineHeight: 1.2,
                                      }}
                                    >
                                      {step.label}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: 11,
                                        color: "var(--text-muted)",
                                        marginTop: 4,
                                      }}
                                    >
                                      {step.sub}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 12,
                      borderTop: "1px solid var(--border-light)",
                      paddingTop: 16,
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(isExpanded ? null : threat.id);
                      }}
                      style={{
                        background: "transparent",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                        fontSize: 11.5,
                        borderRadius: 16,
                        padding: "7px 16px",
                        border: "1px solid var(--border-highlight)",
                        cursor: "pointer",
                      }}
                    >
                      {isExpanded ? "Collapse" : "View Details"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Threat ${threat.pkgName} remediated.`);
                      }}
                      style={{
                        background: "var(--doria-yellow)",
                        color: "#2A2725",
                        fontWeight: 600,
                        fontSize: 11.5,
                        borderRadius: 16,
                        padding: "7px 16px",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Wrench size={12} /> Fix with Doria
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Global Toast Component */}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 1000,
          pointerEvents: "none",
        }}
      >
        {toastMsg && (
          <div
            style={{
              background: "var(--bg-panel-hover)",
              border: "1px solid var(--border-highlight)",
              color: "var(--text-primary)",
              padding: "14px 20px",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              fontWeight: 500,
              boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
              pointerEvents: "auto",
              animation: "toastUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <ShieldCheck size={16} color="var(--safe-green)" />
            <span>{toastMsg.msg}</span>
          </div>
        )}
      </div>
    </div>
  );
}

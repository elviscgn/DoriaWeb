import React, { useState } from "react";
import {
  TerminalSquare,
  Download,
  ShieldCheck,
  XCircle,
  AlertTriangle,
  MoreVertical,
  GitBranch,
  FileJson,
  Clock,
  Cpu,
  Zap,
  Wrench,
} from "lucide-react";

export default function Threats() {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <header
        className="topbar"
        style={{
          height: 60,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 17, fontWeight: 500 }}>Security Threats</h1>
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
          }}
        >
          <TerminalSquare size={14} color="var(--text-muted)" />
          <input
            type="text"
            className="mono"
            placeholder="doria scan repo..."
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
            style={{
              background: "var(--doria-yellow)",
              color: "#2A2725",
              fontWeight: 600,
              fontSize: 11,
              borderRadius: 16,
              padding: "7px 16px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Scan
          </button>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 32px 32px",
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          className="glass-panel"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            margin: "16px 0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              className="mono"
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "var(--threat-red)",
              }}
            >
              7
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                Active Threats
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Requires immediate attention
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              style={{
                background: "var(--doria-yellow)",
                color: "#2A2725",
                fontWeight: 600,
                fontSize: 11.5,
                borderRadius: 16,
                padding: "7px 16px",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <ShieldCheck size={14} /> Fix All
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["all", "critical", "high", "medium"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background:
                  filter === f ? "rgba(255,254,203,0.08)" : "transparent",
                border: "none",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: filter === f ? 600 : 500,
                color:
                  filter === f ? "var(--doria-yellow)" : "var(--text-muted)",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Example Threat Card */}
          {(filter === "all" || filter === "critical") && (
            <div
              className={`glass-panel ${expandedId === 1 ? "expanded" : ""}`}
              onClick={() => setExpandedId(expandedId === 1 ? null : 1)}
              style={{
                padding: "20px 24px",
                cursor: "pointer",
                borderLeft: "3px solid var(--threat-red)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <span
                      className="mono"
                      style={{ fontSize: 17, fontWeight: 700 }}
                    >
                      co1ors@1.0.0
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        padding: "4px 8px",
                        borderRadius: 6,
                        background: "var(--threat-red)",
                        color: "#fff",
                      }}
                    >
                      CRITICAL
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      marginTop: 10,
                      fontSize: 12,
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <GitBranch size={14} /> <span className="mono">main</span>
                    </span>
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <FileJson size={14} />{" "}
                      <span className="mono">package.json</span>
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "#A1A1AA",
                  marginTop: 12,
                  marginBottom: 16,
                }}
              >
                Impersonates `colors`. Executes hidden shell commands and
                attempts unauthorized network access.
              </div>

              {expandedId === 1 && (
                <div
                  style={{
                    marginTop: 16,
                    borderTop: "1px solid var(--border-light)",
                    paddingTop: 24,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 40,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        marginBottom: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
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
                      <div
                        style={{
                          background: "rgba(0,0,0,0.2)",
                          padding: "10px 14px",
                          borderRadius: 6,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--threat-red)",
                          }}
                        />{" "}
                        <span
                          className="mono"
                          style={{ color: "var(--threat-red)" }}
                        >
                          child_process.exec()
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--text-secondary)",
                        marginBottom: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Zap size={14} /> Automated Response
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                        borderLeft: "2px solid var(--border-highlight)",
                        paddingLeft: 14,
                        marginLeft: 6,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 500 }}>
                          Threat Confirmed & Blocked
                        </div>
                        <div
                          style={{ fontSize: 11, color: "var(--text-muted)" }}
                        >
                          0.8s &middot; 94% behavioral score met
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Search,
  FolderCode,
  ArrowLeft,
  Play,
  Code,
  ShieldAlert,
  Box,
  Settings as SettingsIcon,
  ChevronRight,
  FileCode,
  Clock,
} from "lucide-react";

const mockRepo = {
  name: "data-pipeline",
  owner: "it-web-org",
  visibility: "Private",
  riskPercent: 82,
  threatsCount: 7,
  totalDeps: 89,
  outdatedCount: 12,
  files: [
    { name: "src", type: "folder", path: "src", depth: 0, isCollapsed: false },
    { name: "index.ts", type: "file", path: "src/index.ts", depth: 1 },
    {
      name: "package.json",
      type: "file",
      path: "package.json",
      depth: 0,
      status: "OUTDATED",
    },
    {
      name: ".env.example",
      type: "file",
      path: ".env.example",
      depth: 0,
      status: "FLAGGED",
    },
  ],
};

export default function Codebases() {
  const [view, setView] = useState<"list" | "detail">("list");
  const [activeTab, setActiveTab] = useState("code");
  const [activeSidePanel, setActiveSidePanel] = useState("risk");

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
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 600 }}>Codebases</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border-light)",
            borderRadius: 8,
            padding: "6px 14px",
            width: 280,
          }}
        >
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Filter connected repositories..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: 13,
            }}
          />
        </div>
      </header>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
        {view === "list" ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>
                1 repository connected
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 16,
              }}
            >
              {/* Repo Card */}
              <div
                className="glass-panel"
                onClick={() => setView("detail")}
                style={{
                  padding: 20,
                  cursor: "pointer",
                  background: "var(--bg-card)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      className="mono"
                      style={{ fontSize: 15.5, fontWeight: 600 }}
                    >
                      it-web-org / data-pipeline
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "var(--text-muted)",
                    marginBottom: 20,
                  }}
                >
                  <Clock
                    size={12}
                    style={{ display: "inline", marginRight: 6 }}
                  />{" "}
                  Last scanned 1 hour ago
                </div>
                <div
                  style={{
                    borderTop: "1px solid var(--border-light)",
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      marginBottom: 8,
                    }}
                  >
                    <span>Risk Score</span>
                    <span
                      style={{ color: "var(--threat-red)", fontWeight: 700 }}
                    >
                      HIGH
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 5,
                      background: "rgba(0,0,0,0.25)",
                      borderRadius: 2.5,
                    }}
                  >
                    <div
                      style={{
                        width: "82%",
                        height: "100%",
                        background: "var(--threat-red)",
                        borderRadius: 2.5,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13.5,
                color: "var(--text-muted)",
                marginBottom: 24,
              }}
            >
              <span
                onClick={() => setView("list")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ArrowLeft size={14} /> Codebases
              </span>
              <span>/</span>
              <span
                className="mono"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                data-pipeline
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 24,
                borderBottom: "1px solid var(--border-light)",
                marginBottom: 24,
              }}
            >
              {["code", "threats", "dependencies", "settings"].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 0",
                    fontSize: 13.5,
                    fontWeight: 500,
                    color:
                      activeTab === tab
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                    borderBottom: `2px solid ${activeTab === tab ? "var(--doria-yellow)" : "transparent"}`,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 300px",
                gap: 24,
              }}
            >
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: 8,
                }}
              >
                {/* Code Panel Simulation */}
                {activeTab === "code" && (
                  <div>
                    <div
                      style={{
                        padding: "12px 16px",
                        background: "rgba(0,0,0,0.15)",
                        borderBottom: "1px solid var(--border-light)",
                        fontSize: 12.5,
                      }}
                    >
                      Latest Commit:{" "}
                      <span
                        className="mono"
                        style={{ color: "var(--doria-yellow)" }}
                      >
                        a1b2c3d
                      </span>
                    </div>
                    {mockRepo.files.map((file, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          if (file.name === "package.json")
                            setActiveSidePanel("package");
                          if (file.name === ".env.example")
                            setActiveSidePanel("env");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "12px 16px",
                          borderBottom: "1px solid var(--border-light)",
                          cursor: "pointer",
                          background: file.status
                            ? "rgba(255, 123, 114, 0.05)"
                            : "transparent",
                        }}
                      >
                        <div
                          style={{
                            paddingLeft: file.depth * 20,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          {file.type === "folder" ? (
                            <FolderCode size={16} color="#60A5FA" />
                          ) : (
                            <FileCode size={16} />
                          )}
                          <span className="mono" style={{ fontSize: 13.5 }}>
                            {file.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar panels */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                {activeSidePanel === "risk" && (
                  <div
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 8,
                      padding: 20,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        marginBottom: 16,
                      }}
                    >
                      Risk Assessment
                    </h3>
                    <div
                      style={{
                        width: "100%",
                        height: 6,
                        background: "rgba(0,0,0,0.4)",
                        borderRadius: 3,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: "82%",
                          height: "100%",
                          background: "var(--threat-red)",
                          borderRadius: 3,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                {activeSidePanel === "package" && (
                  <div
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 8,
                      padding: 20,
                    }}
                  >
                    <h3
                      className="mono"
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      package.json
                    </h3>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--warning-amber)",
                        marginTop: 4,
                      }}
                    >
                      3 outdated dependencies
                    </div>
                  </div>
                )}
                {activeSidePanel === "env" && (
                  <div
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 8,
                      padding: 20,
                    }}
                  >
                    <h3
                      className="mono"
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      .env.example
                    </h3>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--threat-red)",
                        marginTop: 4,
                      }}
                    >
                      Secrets Exposed
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

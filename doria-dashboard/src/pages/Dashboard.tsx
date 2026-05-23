import React, { useEffect, useState, useRef } from "react";
import {
  SquareTerminal,
  Box,
  ShieldBan,
  Bot,
  Zap,
  Radio,
  Cpu,
  ShieldCheck,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Crosshair,
  CircleX, // FIXED: Added missing import here
} from "lucide-react";

const MOCK_SCANS = [
  { name: "react-dom@18.2.0", eco: "npm", v: "SAFE" },
  { name: "pandas@2.1.0", eco: "pip", v: "SAFE" },
  { name: "reaccct@1.0.0", eco: "npm", v: "BLOCKED" },
  { name: "env-stealer@9.9.9", eco: "npm", v: "BLOCKED" },
  { name: "eslint@8.48.0", eco: "npm", v: "SAFE" },
  { name: "reqquests@2.31.0", eco: "pip", v: "FLAGGED" },
];

export default function Dashboard() {
  const [feed, setFeed] = useState([
    { name: "pandas@2.1.0", eco: "pip", v: "SAFE", time: "2s" },
    { name: "co1ors@1.0.0", eco: "npm", v: "BLOCKED", time: "8s" },
    { name: "react-dom@18.2.0", eco: "npm", v: "SAFE", time: "14s" },
    { name: "eslint@8.48.0", eco: "npm", v: "SAFE", time: "31s" },
    { name: "reqqest@2.88.0", eco: "npm", v: "FLAGGED", time: "45s" },
  ]);

  const [timelineVisible, setTimelineVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live Feed Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const item = MOCK_SCANS[Math.floor(Math.random() * MOCK_SCANS.length)];
      setFeed((prev) =>
        [
          { name: item.name, eco: item.eco, v: item.v, time: "just now" },
          ...prev.map((f) => {
            if (f.time === "just now") return { ...f, time: "3s" };
            return f;
          }),
        ].slice(0, 10),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Timeline Animation Trigger
  useEffect(() => {
    const timer = setTimeout(() => setTimelineVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // High-DPI Donut Chart Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logicalSize = 116;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = logicalSize * dpr;
    canvas.height = logicalSize * dpr;
    canvas.style.width = logicalSize + "px";
    canvas.style.height = logicalSize + "px";
    ctx.scale(dpr, dpr);

    const cx = logicalSize / 2,
      cy = logicalSize / 2,
      outR = 54,
      inR = 40;

    const segments = [
      { val: 12, col: "#F2CC60" },
      { val: 9, col: "#FF7B72" },
      { val: 11, col: "#FFFECB" },
      { val: 5, col: "#D2A8FF" },
    ];
    const total = segments.reduce((s, seg) => s + seg.val, 0);

    let startT: number | null = null;
    const animate = (ts: number) => {
      if (!startT) startT = ts;
      const progress = Math.min((ts - startT) / 1000, 1);
      const sweep = (1 - Math.pow(1 - progress, 3)) * 2 * Math.PI;

      ctx.clearRect(0, 0, logicalSize, logicalSize);
      let startAngle = -Math.PI / 2;

      for (const seg of segments) {
        const segAngle = (seg.val / total) * 2 * Math.PI;
        const endAngle = startAngle + segAngle;
        if (startAngle < sweep - Math.PI / 2) {
          const drawEnd = Math.min(endAngle, sweep - Math.PI / 2);
          ctx.beginPath();
          ctx.arc(cx, cy, outR, startAngle, drawEnd);
          ctx.arc(cx, cy, inR, drawEnd, startAngle, true);
          ctx.closePath();
          ctx.fillStyle = seg.col;
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "#383431";
          ctx.stroke();
        }
        startAngle = endAngle;
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Topbar */}
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
        <h1
          className="page-title"
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "var(--text-primary)",
            letterSpacing: "0.2px",
          }}
        >
          Command Center
        </h1>
        <div
          className="scan-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.2)",
            border: "1px solid var(--border-light)",
            borderRadius: 20,
            padding: "4px 5px 4px 16px",
            width: 320,
            transition: "all 0.3s ease",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <SquareTerminal size={14} color="var(--text-muted)" />
          <input
            type="text"
            className="scan-input mono"
            placeholder="doria install ..."
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
            className="scan-btn"
            style={{
              background: "var(--doria-yellow)",
              color: "#2A2725",
              fontWeight: 600,
              fontSize: 11,
              borderRadius: 16,
              padding: "7px 16px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Scan Now
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div
        className="content-area"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "var(--gap-main)",
          padding: "0 32px 24px 32px",
          overflowY: "auto",
        }}
      >
        {/* Stats Row */}
        <div
          className="stats-row"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "var(--gap-main)",
            flexShrink: 0,
          }}
        >
          {/* Card 1 */}
          <div
            className="glass-panel stat-card card-packages"
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 18,
                width: 32,
                height: 1.5,
                background: "var(--doria-yellow)",
                boxShadow: "0 2px 10px var(--doria-yellow)",
              }}
            />
            <div
              className="stat-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Box size={14} color="var(--text-muted)" />
              <div
                className="stat-label"
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Packages Scanned
              </div>
            </div>
            <div
              className="stat-body"
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div
                className="stat-value mono"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                1,284
              </div>
              <div
                className="stat-badge"
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--safe-green)",
                }}
              >
                <ArrowUpRight size={12} /> +124/wk
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="glass-panel stat-card card-threats"
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 18,
                width: 32,
                height: 1.5,
                background: "var(--threat-red)",
                boxShadow: "0 2px 10px var(--threat-red)",
              }}
            />
            <div
              className="stat-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <ShieldBan size={14} color="var(--text-muted)" />
              <div
                className="stat-label"
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Threats Blocked
              </div>
            </div>
            <div
              className="stat-body"
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div
                className="stat-value mono"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                37
              </div>
              <div
                className="stat-badge"
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--threat-red)",
                }}
              >
                <AlertTriangle size={12} /> +3/day
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="glass-panel stat-card card-slopsquats"
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 18,
                width: 32,
                height: 1.5,
                background: "var(--warning-amber)",
                boxShadow: "0 2px 10px var(--warning-amber)",
              }}
            />
            <div
              className="stat-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Bot size={14} color="var(--text-muted)" />
              <div
                className="stat-label"
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Slopsquats
              </div>
            </div>
            <div
              className="stat-body"
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div
                className="stat-value mono"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                12
              </div>
              <div
                className="stat-badge"
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--warning-amber)",
                }}
              >
                <Crosshair size={12} /> +2/wk
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="glass-panel stat-card card-time"
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 18,
                width: 32,
                height: 1.5,
                background: "var(--safe-green)",
                boxShadow: "0 2px 10px var(--safe-green)",
              }}
            />
            <div
              className="stat-header"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <Zap size={14} color="var(--text-muted)" />
              <div
                className="stat-label"
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Avg Scan Time
              </div>
            </div>
            <div
              className="stat-body"
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div
                className="stat-value mono"
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                1.2s
              </div>
              <div
                className="stat-badge"
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--safe-green)",
                }}
              >
                <ArrowDownRight size={12} /> -0.3s
              </div>
            </div>
          </div>
        </div>

        {/* Panels Container */}
        <div
          className="main-panels-container"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-main)",
            minHeight: 0,
          }}
        >
          {/* SPLIT ROW 1 */}
          <div
            className="split-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--gap-main)",
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Telemetry Feed */}
            <div className="glass-panel">
              <div
                className="panel-header"
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              >
                <div
                  className="panel-title"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Radio size={14} /> Live Telemetry
                </div>
                <div
                  className="live-badge"
                  style={{
                    background: "var(--safe-green-dim)",
                    color: "var(--safe-green)",
                    borderRadius: 12,
                    padding: "2px 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  <div
                    className="live-dot"
                    style={{
                      width: 5,
                      height: 5,
                      background: "var(--safe-green)",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span>LIVE</span>
                </div>
              </div>
              <div
                className="panel-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="feed-list"
                  style={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {feed.map((item, index) => {
                    const statusClass =
                      item.v === "SAFE"
                        ? "status-safe"
                        : item.v === "BLOCKED"
                          ? "status-blocked"
                          : "status-flagged";
                    const statusColor =
                      item.v === "SAFE"
                        ? "var(--safe-green)"
                        : item.v === "BLOCKED"
                          ? "var(--threat-red)"
                          : "var(--warning-amber)";
                    const vBadgeClass =
                      item.v === "SAFE"
                        ? "v-safe"
                        : item.v === "BLOCKED"
                          ? "v-blocked"
                          : "v-flagged";
                    const isFirst = index === 0;

                    return (
                      <div
                        key={index}
                        className={`feed-row ${isFirst ? "active" : ""}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "8px 14px",
                          borderRadius: 6,
                          border: isFirst
                            ? "1px solid var(--border-light)"
                            : "1px solid transparent",
                          background: isFirst
                            ? "rgba(0,0,0,0.2)"
                            : "transparent",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div
                          className={`status-dot ${statusClass}`}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: statusColor,
                            boxShadow: `0 0 6px ${statusColor}`,
                          }}
                        ></div>
                        <div
                          className="pkg-name mono"
                          style={{
                            fontSize: 12,
                            color: isFirst
                              ? "var(--doria-yellow)"
                              : "var(--text-secondary)",
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: isFirst ? 500 : 400,
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          className="eco-badge"
                          style={{
                            fontSize: 8.5,
                            fontWeight: 600,
                            padding: "2px 6px",
                            borderRadius: 4,
                            textTransform: "uppercase",
                            background: "rgba(255,255,255,0.05)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {item.eco}
                        </div>
                        <div
                          className={`verdict-badge ${vBadgeClass}`}
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: 4,
                            width: 65,
                            textAlign: "center",
                            background:
                              item.v === "SAFE"
                                ? "var(--safe-green-dim)"
                                : item.v === "BLOCKED"
                                  ? "var(--threat-red-dim)"
                                  : "var(--warning-amber-dim)",
                            color: statusColor,
                          }}
                        >
                          {item.v}
                        </div>
                        <div
                          className="feed-time mono"
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            width: 45,
                            textAlign: "right",
                          }}
                        >
                          {item.time}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Security Analysis */}
            <div className="glass-panel">
              <div
                className="panel-header"
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              >
                <div
                  className="panel-title"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Cpu size={14} /> Security Analysis
                </div>
              </div>
              <div
                className="panel-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="threat-detail-content"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    className="threat-header"
                    style={{
                      padding: "0 4px 12px 4px",
                      borderBottom: "1px solid var(--border-light)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="threat-pkg-name mono"
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      co1ors@1.0.0
                    </div>
                    <div
                      className="threat-verdict blocked"
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "var(--threat-red-dim)",
                        color: "var(--threat-red)",
                        border: "1px solid rgba(255,123,114,0.25)",
                      }}
                    >
                      <CircleX size={10} />
                      BLOCKED
                    </div>
                  </div>

                  <div
                    className="threat-body-inner"
                    style={{
                      padding: "12px 4px 0 4px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      flex: 1,
                    }}
                  >
                    <div
                      className="ml-section"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        className="ml-label-row"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          className="ml-label"
                          style={{
                            fontSize: 9.5,
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                          }}
                        >
                          ML MODEL 1 — BEHAVIORAL
                        </span>
                        <span
                          className="ml-score mono"
                          style={{
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: "var(--threat-red)",
                          }}
                        >
                          94%
                        </span>
                      </div>
                      <div
                        className="progress-bg"
                        style={{
                          width: "100%",
                          height: 3,
                          background: "rgba(0,0,0,0.2)",
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        <div
                          className="progress-fill"
                          style={{
                            height: "100%",
                            borderRadius: 2,
                            width: "94%",
                            background: "var(--threat-red)",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              top: -1.5,
                              width: 6,
                              height: 6,
                              background: "inherit",
                              borderRadius: "50%",
                              boxShadow: "0 0 6px inherit",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="ml-desc"
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          marginTop: 6,
                          lineHeight: 1.4,
                        }}
                      >
                        Unexpected outbound network call detected. Shell
                        execution via{" "}
                        <span className="mono">child_process.exec</span>.
                      </div>
                    </div>

                    <div
                      className="ml-section"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        className="ml-label-row"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          marginBottom: 6,
                        }}
                      >
                        <span
                          className="ml-label"
                          style={{
                            fontSize: 9.5,
                            color: "var(--text-secondary)",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                          }}
                        >
                          SLOPSQUAT CONFIDENCE
                        </span>
                        <span
                          className="ml-score mono"
                          style={{
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: "var(--info-purple)",
                          }}
                        >
                          91%
                        </span>
                      </div>
                      <div
                        className="progress-bg"
                        style={{
                          width: "100%",
                          height: 3,
                          background: "rgba(0,0,0,0.2)",
                          borderRadius: 2,
                          position: "relative",
                        }}
                      >
                        <div
                          className="progress-fill"
                          style={{
                            height: "100%",
                            borderRadius: 2,
                            width: "91%",
                            background: "var(--info-purple)",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              top: -1.5,
                              width: 6,
                              height: 6,
                              background: "inherit",
                              borderRadius: "50%",
                              boxShadow: "0 0 6px inherit",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="ml-desc"
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          marginTop: 6,
                          lineHeight: 1.4,
                        }}
                      >
                        Matches documented LLM hallucination pattern. Package
                        age: 12 days. Stars: 0.
                      </div>
                    </div>

                    <div className="ml-section" style={{ marginTop: "auto" }}>
                      <div
                        className="ml-label"
                        style={{
                          fontSize: 9.5,
                          color: "var(--text-secondary)",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          marginBottom: 4,
                        }}
                      >
                        AST FINDINGS
                      </div>
                      <div
                        className="ast-pills"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          marginTop: 2,
                        }}
                      >
                        <div
                          className="ast-pill"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "rgba(0,0,0,0.15)",
                            border: "1px solid var(--border-light)",
                            padding: "6px 10px",
                            borderRadius: 6,
                            fontSize: 11,
                            color: "var(--text-secondary)",
                          }}
                        >
                          <div
                            className="status-dot status-blocked"
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--threat-red)",
                              boxShadow: "0 0 6px var(--threat-red)",
                            }}
                          ></div>
                          <span>
                            <span className="mono">shell_execution</span> —
                            child_process.exec line 14
                          </span>
                        </div>
                        <div
                          className="ast-pill"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "rgba(0,0,0,0.15)",
                            border: "1px solid var(--border-light)",
                            padding: "6px 10px",
                            borderRadius: 6,
                            fontSize: 11,
                            color: "var(--text-secondary)",
                          }}
                        >
                          <div
                            className="status-dot status-blocked"
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--threat-red)",
                              boxShadow: "0 0 6px var(--threat-red)",
                            }}
                          ></div>
                          <span>
                            <span className="mono">network_call</span> — POST to
                            45.33.32.156:8080
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SPLIT ROW 2 */}
          <div
            className="split-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--gap-main)",
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Autonomous Response */}
            <div
              className="glass-panel"
              style={{ background: "rgba(45, 42, 39, 0.45)" }}
            >
              <div
                className="panel-header"
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              >
                <div
                  className="panel-title"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Zap size={14} /> Autonomous Response
                </div>
              </div>
              <div
                className="panel-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Compact Target Card */}
                <div
                  className="target-card"
                  style={{
                    background: "rgba(0,0,0,0.15)",
                    border: "1px solid var(--border-light)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    margin: "0 0 12px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="target-card-left"
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <div
                      className="target-label"
                      style={{
                        fontSize: 8.5,
                        fontWeight: 700,
                        color: "var(--text-muted)",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Target Acquired
                    </div>
                    <div
                      className="target-name mono"
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      co1ors@1.0.0
                    </div>
                  </div>
                  <div
                    className="target-time-badge"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 9.5,
                      fontWeight: 600,
                      color: "var(--warning-amber)",
                      background: "var(--warning-amber-dim)",
                      padding: "3px 8px",
                      borderRadius: 10,
                      border: "1px solid rgba(242, 204, 96, 0.2)",
                    }}
                  >
                    <div
                      className="live-dot"
                      style={{
                        width: 5,
                        height: 5,
                        background: "var(--warning-amber)",
                        borderRadius: "50%",
                      }}
                    ></div>{" "}
                    14s ago
                  </div>
                </div>

                {/* Animated Timeline */}
                <div
                  className="timeline-container"
                  style={{
                    padding: "0 4px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <ul
                    className="timeline"
                    style={{
                      position: "relative",
                      listStyle: "none",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 6,
                        top: 8,
                        bottom: 8,
                        width: 1,
                        background:
                          "linear-gradient(to bottom, var(--border-highlight) 80%, transparent)",
                      }}
                    ></div>

                    {[
                      {
                        status: "green",
                        label: "AST Scan Completed",
                        sub: "0.3s — findings logged",
                      },
                      {
                        status: "red",
                        label: "Threat Confirmed & Blocked",
                        sub: "0.8s — 94% behavioral score",
                      },
                      {
                        status: "green",
                        label: "Safe Version Auto-Resolved",
                        sub: "1.1s — colors@4.1.1 selected",
                      },
                      {
                        status: "green",
                        label: "Test Suite Executed",
                        sub: "4.2s — 47/47 tests passed",
                      },
                      {
                        status: "yellow",
                        label: "PR Opened: doria/fix-co1ors #284",
                        sub: "4.9s — pending review",
                        link: true,
                      },
                    ].map((step, i) => (
                      <li
                        key={i}
                        className={`timeline-step ${timelineVisible ? "visible" : ""}`}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          position: "relative",
                          paddingBottom: i === 4 ? 0 : 8,
                          opacity: timelineVisible ? 1 : 0,
                          transform: timelineVisible
                            ? "translateY(0)"
                            : "translateY(4px)",
                          transition: "all 0.4s ease",
                        }}
                      >
                        <div
                          className={`step-dot ${step.status} ${step.status === "yellow" ? "in-progress" : ""}`}
                          style={{
                            width: 13,
                            height: 13,
                            borderRadius: "50%",
                            background: "var(--bg-panel)",
                            border: "2px solid",
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
                            boxShadow:
                              step.status === "green"
                                ? "0 0 6px rgba(126,231,135,0.3)"
                                : step.status === "red"
                                  ? "0 0 6px rgba(255,123,114,0.3)"
                                  : "0 0 6px rgba(255,254,203,0.3)",
                          }}
                        ></div>
                        <div>
                          <div
                            className="step-label"
                            style={{
                              fontSize: 11.5,
                              color: "var(--text-primary)",
                              fontWeight: 500,
                              lineHeight: 1.2,
                            }}
                          >
                            {step.link ? (
                              <a
                                href="#"
                                className="step-link"
                                style={{
                                  color: "var(--doria-yellow)",
                                  textDecoration: "none",
                                  borderBottom:
                                    "1px dashed rgba(255,254,203,0.4)",
                                  paddingBottom: 1,
                                }}
                              >
                                {step.label}
                              </a>
                            ) : (
                              step.label
                            )}
                          </div>
                          <div
                            className="step-sublabel mono"
                            style={{
                              fontSize: 9.5,
                              color: "var(--text-muted)",
                              marginTop: 2,
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
            </div>

            {/* Threat Distribution */}
            <div className="glass-panel">
              <div
                className="panel-header"
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0,0,0,0.1)",
                  flexShrink: 0,
                }}
              >
                <div
                  className="panel-title"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <PieChart size={14} /> Threat Distribution
                </div>
                <div
                  className="time-tabs"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: 6,
                    padding: 2,
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <span
                    className="time-tab"
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    24H
                  </span>
                  <span
                    className="time-tab"
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    1W
                  </span>
                  <span
                    className="time-tab active"
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      background: "var(--border-light)",
                      padding: "3px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    30D
                  </span>
                </div>
              </div>
              <div
                className="panel-body"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px 14px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="chart-layout"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 24,
                    padding: "8px 16px",
                    flex: 1,
                  }}
                >
                  {/* Canvas Container */}
                  <div
                    className="canvas-wrapper"
                    style={{
                      position: "relative",
                      width: 116,
                      height: 116,
                      flexShrink: 0,
                    }}
                  >
                    <canvas ref={canvasRef}></canvas>
                    <div
                      className="chart-center-text"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        className="chart-num mono"
                        style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}
                      >
                        37
                      </div>
                      <div
                        className="chart-lbl"
                        style={{
                          fontSize: 8,
                          color: "var(--text-muted)",
                          textTransform: "uppercase",
                          marginTop: 2,
                          letterSpacing: "0.5px",
                        }}
                      >
                        Threats
                      </div>
                    </div>
                  </div>

                  {/* Complete 1:1 Legend List */}
                  <ul
                    className="legend-list"
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      flex: 1,
                    }}
                  >
                    {[
                      {
                        label: "Slopsquats",
                        count: 12,
                        width: "32%",
                        color: "var(--warning-amber)",
                      },
                      {
                        label: "Typosquats",
                        count: 9,
                        width: "24%",
                        color: "var(--threat-red)",
                      },
                      {
                        label: "Malicious Code",
                        count: 11,
                        width: "29%",
                        color: "var(--doria-yellow)",
                      },
                      {
                        label: "Compromised",
                        count: 5,
                        width: "15%",
                        color: "var(--info-purple)",
                      },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="legend-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          className="legend-info"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            flex: 1,
                          }}
                        >
                          <div
                            className="legend-header"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <div
                              className="legend-label"
                              style={{
                                fontSize: 10.5,
                                fontWeight: 500,
                                color: "var(--text-secondary)",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <div
                                className="legend-color"
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: 2,
                                  backgroundColor: item.color,
                                }}
                              ></div>{" "}
                              {item.label}
                            </div>
                            <div
                              className="legend-count mono"
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "var(--text-primary)",
                              }}
                            >
                              {item.count}
                            </div>
                          </div>
                          <div
                            className="legend-bar-bg"
                            style={{
                              width: "100%",
                              height: 3,
                              background: "rgba(0,0,0,0.2)",
                              borderRadius: 2,
                            }}
                          >
                            <div
                              className="legend-bar-fill"
                              style={{
                                height: "100%",
                                borderRadius: 2,
                                width: item.width,
                                backgroundColor: item.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

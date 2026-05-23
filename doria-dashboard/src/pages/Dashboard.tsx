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
  const [feed, setFeed] = useState(MOCK_SCANS.slice(0, 5));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live Feed Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const item = MOCK_SCANS[Math.floor(Math.random() * MOCK_SCANS.length)];
      setFeed((prev) => [item, ...prev].slice(0, 6));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Donut Chart Drawing Logic
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
        <h1 style={{ fontSize: 17, fontWeight: 500 }}>Command Center</h1>
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
          <SquareTerminal size={14} color="var(--text-muted)" />
          <input
            type="text"
            className="mono"
            placeholder="doria install ..."
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
            Scan Now
          </button>
        </div>
      </header>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "0 32px 24px",
          overflowY: "auto",
        }}
      >
        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {[
            {
              label: "Packages Scanned",
              val: "1,284",
              icon: Box,
              col: "var(--doria-yellow)",
            },
            {
              label: "Threats Blocked",
              val: "37",
              icon: ShieldBan,
              col: "var(--threat-red)",
            },
            {
              label: "Slopsquats",
              val: "12",
              icon: Bot,
              col: "var(--warning-amber)",
            },
            {
              label: "Avg Scan Time",
              val: "1.2s",
              icon: Zap,
              col: "var(--safe-green)",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel"
              style={{ padding: "14px 18px", position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 18,
                  width: 32,
                  height: 1.5,
                  background: stat.col,
                  boxShadow: `0 2px 10px ${stat.col}`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <stat.icon size={14} color="var(--text-muted)" />
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>
                {stat.val}
              </div>
            </div>
          ))}
        </div>

        {/* Top Panels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            flex: 1,
          }}
        >
          <div className="glass-panel">
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid var(--border-light)",
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Radio size={14} /> Live Telemetry
              </div>
              <div
                style={{
                  background: "var(--safe-green-dim)",
                  color: "var(--safe-green)",
                  borderRadius: 12,
                  padding: "2px 8px",
                  fontSize: 9,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    background: "var(--safe-green)",
                    borderRadius: "50%",
                  }}
                ></div>{" "}
                LIVE
              </div>
            </div>
            <div
              style={{
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {feed.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 14px",
                    background: i === 0 ? "rgba(0,0,0,0.2)" : "transparent",
                    borderRadius: 6,
                    border: `1px solid ${i === 0 ? "var(--border-light)" : "transparent"}`,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        item.v === "SAFE"
                          ? "var(--safe-green)"
                          : item.v === "BLOCKED"
                            ? "var(--threat-red)"
                            : "var(--warning-amber)",
                    }}
                  />
                  <div
                    className="mono"
                    style={{
                      fontSize: 12,
                      flex: 1,
                      color:
                        i === 0
                          ? "var(--doria-yellow)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      padding: "2px 6px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 4,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.eco}
                  </div>
                  <div
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
                          : "var(--threat-red-dim)",
                      color:
                        item.v === "SAFE"
                          ? "var(--safe-green)"
                          : "var(--threat-red)",
                    }}
                  >
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel">
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid var(--border-light)",
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
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
              style={{
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="mono" style={{ fontSize: 14, fontWeight: 500 }}>
                  co1ors@1.0.0
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: "var(--threat-red-dim)",
                    color: "var(--threat-red)",
                    border: "1px solid rgba(255,123,114,0.25)",
                  }}
                >
                  BLOCKED
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 9.5,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>ML MODEL 1 — BEHAVIORAL</span>
                  <span className="mono" style={{ color: "var(--threat-red)" }}>
                    94%
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 3,
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "94%",
                      background: "var(--threat-red)",
                      borderRadius: 2,
                    }}
                  ></div>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  Unexpected outbound network call detected. Shell execution via{" "}
                  <span className="mono">child_process.exec</span>.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            flex: 1,
          }}
        >
          <div className="glass-panel">
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid var(--border-light)",
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Zap size={14} /> Autonomous Response
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  background: "rgba(0,0,0,0.15)",
                  border: "1px solid var(--border-light)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 8.5,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Target Acquired
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 13, fontWeight: 500 }}
                  >
                    co1ors@1.0.0
                  </div>
                </div>
                <div
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
                  }}
                >
                  14s ago
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <div
              style={{
                padding: "10px 16px",
                borderBottom: "1px solid var(--border-light)",
                display: "flex",
                justifyContent: "space-between",
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <PieChart size={14} /> Threat Distribution
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <div style={{ position: "relative", width: 116, height: 116 }}>
                <canvas ref={canvasRef}></canvas>
                <div
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
                    className="mono"
                    style={{ fontSize: 20, fontWeight: 600 }}
                  >
                    37
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Threats
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderCode,
  ShieldAlert,
  Settings,
  Bell,
  User,
  CreditCard,
  Zap,
  Shield,
  Book,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <aside
        className="sidebar"
        style={{
          width: 240,
          height: "100vh",
          background: "var(--bg-sidebar)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid var(--border-light)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div
          className="sidebar-header"
          style={{
            padding: "28px 24px 20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--doria-yellow)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14v-8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v2" />
            <path d="M4 10h12" />
            <path d="M10 4v10" />
            <path d="M4 18v-2h6" />
            <path d="M11 14.5l4.5 -2l4.5 2v4c0 3 -2.5 6 -4.5 7c-2 -1 -4.5 -4 -4.5 -7v-4z" />
          </svg>
          <div
            className="wordmark-text"
            style={{
              fontFamily: "'Major Mono Display', monospace",
              fontSize: 26,
              fontWeight: 600,
              color: "var(--doria-yellow)",
            }}
          >
            Doria
          </div>
        </div>

        <nav
          className="sidebar-nav"
          style={{
            flexGrow: 1,
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="nav-section-title"
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: 1.2,
              padding: "0 24px",
              margin: "16px 0 8px 0",
            }}
          >
            Platform
          </div>
          {/* FIX: Removed style={navStyle} inline style overrides */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <LayoutDashboard size={16} /> Overview
          </NavLink>
          <NavLink
            to="/codebases"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <FolderCode size={16} /> Codebases
          </NavLink>
          <NavLink
            to="/threats"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <ShieldAlert size={16} /> Threats
          </NavLink>

          <div
            className="nav-section-title"
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: 1.2,
              padding: "0 24px",
              margin: "16px 0 8px 0",
            }}
          >
            System
          </div>
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Settings size={16} /> Settings
          </NavLink>
        </nav>

        <div
          className="sidebar-bottom-container"
          style={{
            padding: "0 12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* Security Health Widget */}
          <div
            className="security-health-widget"
            style={{
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 12,
              padding: 14,
              display: "flex",
              gap: 14,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                style={{ position: "absolute", transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="3"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="#F2CC60"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="106.81"
                  strokeDashoffset="28.84"
                />
              </svg>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>
                73
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>
                Security Health
              </span>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                3 repos monitored
              </span>
            </div>
          </div>

          <div
            className="sidebar-row"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              margin: "4px 4px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <div className="row-icon" style={{ color: "var(--text-muted)" }}>
              <Bell size={17} />
            </div>
            <span
              className="row-text"
              style={{
                fontSize: 13,
                color: "var(--text-secondary)",
                fontWeight: 500,
                marginLeft: 12,
                flex: 1,
              }}
            >
              Alerts
            </span>
            <span
              className="row-badge"
              style={{
                background: "var(--threat-red)",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 800,
                borderRadius: 12,
                padding: "2px 7px",
              }}
            >
              3
            </span>
          </div>

          {/* Profile Card & Flyout Wrapper */}
          <div
            className="profile-card-wrapper"
            ref={flyoutRef}
            style={{ position: "relative", marginTop: 4 }}
          >
            {/* Flyout */}
            <div className={`profile-flyout ${isProfileOpen ? "open" : ""}`}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: 10,
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 8,
                  marginBottom: 6,
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/96030189?v=4"
                  alt="Avatar"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Elvis Chege
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: 10, color: "var(--text-muted)" }}
                  >
                    elvis@doria.dev
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <a href="#" style={flyoutItemStyle}>
                  <User size={14} /> Account Settings
                </a>
                <a href="#" style={flyoutItemStyle}>
                  <CreditCard size={14} /> Billing & Plan
                </a>
                <a href="#" style={flyoutItemStyle}>
                  <Zap size={14} /> Active Features
                  <span className="pro-badge" style={{ marginLeft: "auto" }}>
                    PRO
                  </span>
                </a>
                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                    margin: "4px 0",
                  }}
                ></div>
                <a href="#" style={flyoutItemStyle}>
                  <Shield size={14} /> Security Log
                </a>
                <a href="#" style={flyoutItemStyle}>
                  <Book size={14} /> Documentation
                </a>
                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                    margin: "4px 0",
                  }}
                ></div>
                <a
                  href="#"
                  style={{ ...flyoutItemStyle, color: "var(--threat-red)" }}
                >
                  <LogOut size={14} color="var(--threat-red)" /> Sign Out
                </a>
              </div>
            </div>

            {/* Profile Button */}
            <div
              className={`profile-card ${isProfileOpen ? "active" : ""}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 10px",
                borderRadius: 10,
                background: "rgba(0,0,0,0.15)",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src="https://avatars.githubusercontent.com/u/96030189?v=4"
                  style={{ width: 32, height: 32, borderRadius: "50%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 10,
                    height: 10,
                    background: "var(--safe-green)",
                    border: "2px solid var(--bg-base-bottom)",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: 10,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Elvis Chege
                  </span>
                  <span className="pro-badge">PRO</span>
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  Workspace Admin
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  padding: 6,
                }}
              >
                <ChevronsUpDown size={14} />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main
        className="main-wrapper"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {children}
      </main>
    </>
  );
}

const flyoutItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 10px",
  borderRadius: 6,
  fontSize: 11.5,
  color: "var(--text-secondary)",
  textDecoration: "none",
};

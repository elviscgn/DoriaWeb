import React, { useState, useEffect } from "react";
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
  Shield,
  Info,
  X,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  GitCommit,
  History,
  Loader2,
} from "lucide-react";

interface FileNode {
  name: string;
  displayName?: string;
  type: "folder" | "file";
  path: string;
  parentPath: string;
  depth: number;
  isCollapsed?: boolean;
  status: "SAFE" | "THREATS" | "OUTDATED" | "FLAGGED";
  msg: string;
  updated: string;
}

interface ThreatNode {
  title: string;
  desc: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  file: string;
}

interface DependencyNode {
  name: string;
  version: string;
  status: "SAFE" | "OUTDATED";
  license: string;
}

interface RepoData {
  name: string;
  owner: string;
  visibility: "Private" | "Public";
  languages: string[];
  lastScanned: string;
  riskLabel: "LOW" | "MEDIUM" | "HIGH";
  riskPercent: number;
  totalDeps: number;
  threatsCount: number;
  outdatedCount: number;
  commit: string;
  files: FileNode[];
  threats: ThreatNode[];
  dependencies: DependencyNode[];
}

const techLogos: Record<string, React.ReactNode> = {
  typescript: (
    <svg
      viewBox="0 0 100 100"
      style={{ borderRadius: 2, width: 14, height: 14 }}
    >
      <rect width="100" height="100" fill="#3178c6" />
      <text
        x="16"
        y="78"
        fill="#fff"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="800"
        fontSize="62px"
      >
        TS
      </text>
    </svg>
  ),
  nodejs: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#529F41"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 14, height: 14 }}
    >
      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" />
      <path d="M12 22V12" />
    </svg>
  ),
  python: (
    <img
      src="https://cdn.simpleicons.org/python/3776AB"
      alt="Python"
      style={{ width: 14, height: 14, flexShrink: 0 }}
    />
  ),
  fastapi: (
    <svg viewBox="0 0 24 24" fill="#009688" style={{ width: 14, height: 14 }}>
      <path
        d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z"
        fillOpacity="0.15"
        stroke="#009688"
        strokeWidth="1.5"
      />
      <path d="M13 6l-6 7.5h5V18l6-7.5h-5z" fill="#009688" />
    </svg>
  ),
  pytorch: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 14, height: 14 }}
    >
      <path
        d="M12.005.04l-7.03 7.03a9.832 9.832 0 0 0 0 13.975 9.833 9.833 0 0 0 13.976 0c3.97-3.887 3.972-10.171.084-13.976l-1.738 1.737c2.895 2.895 2.895 7.608 0 10.503-2.894 2.894-7.608 2.894-10.503 0C3.9 16.414 3.9 11.7 6.794 8.806l4.632-4.631.58-.663zm3.556 3.886a1.323 1.323 0 0 0-1.323 1.323 1.323 1.323 0 0 0 1.323 1.323 1.323 1.323 0 0 0 1.323-1.323 1.323 1.323 0 0 0-1.323-1.323z"
        fill="#EE4C2C"
      />
    </svg>
  ),
};

const INITIAL_CODEBASES: Record<string, RepoData> = {
  app: {
    name: "app",
    owner: "doria-org",
    visibility: "Private",
    languages: ["TypeScript", "Node.js"],
    lastScanned: "Just now",
    riskLabel: "LOW",
    riskPercent: 18,
    totalDeps: 147,
    threatsCount: 0,
    outdatedCount: 3,
    commit: "f1a238b",
    files: [
      {
        name: ".github/workflows",
        type: "folder",
        path: ".github/workflows",
        parentPath: "",
        depth: 0,
        isCollapsed: true,
        status: "SAFE",
        msg: "No issues found",
        updated: "3 days ago",
      },
      {
        name: "ci.yml",
        type: "file",
        path: ".github/workflows/ci.yml",
        parentPath: ".github/workflows",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "3 days ago",
      },
      {
        name: "deploy.yml",
        type: "file",
        path: ".github/workflows/deploy.yml",
        parentPath: ".github/workflows",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "3 days ago",
      },
      {
        name: "src",
        type: "folder",
        path: "src",
        parentPath: "",
        depth: 0,
        isCollapsed: false,
        status: "SAFE",
        msg: "No issues found",
        updated: "2 mins ago",
      },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        parentPath: "src",
        depth: 1,
        isCollapsed: false,
        status: "SAFE",
        msg: "No issues found",
        updated: "2 mins ago",
      },
      {
        name: "Button.tsx",
        type: "file",
        path: "src/components/Button.tsx",
        parentPath: "src/components",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "2 mins ago",
      },
      {
        name: "Nav.tsx",
        type: "file",
        path: "src/components/Nav.tsx",
        parentPath: "src/components",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "2 mins ago",
      },
      {
        name: "lib",
        type: "folder",
        path: "src/lib",
        parentPath: "src",
        depth: 1,
        isCollapsed: true,
        status: "SAFE",
        msg: "No issues found",
        updated: "1 day ago",
      },
      {
        name: "utils.ts",
        type: "file",
        path: "src/lib/utils.ts",
        parentPath: "src/lib",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "1 day ago",
      },
      {
        name: "index.ts",
        type: "file",
        path: "src/index.ts",
        parentPath: "src",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "5 days ago",
      },
      {
        name: "package.json",
        type: "file",
        path: "package.json",
        parentPath: "",
        depth: 0,
        status: "OUTDATED",
        msg: "3 vulnerable dependencies",
        updated: "2 mins ago",
      },
      {
        name: "tsconfig.json",
        type: "file",
        path: "tsconfig.json",
        parentPath: "",
        depth: 0,
        status: "SAFE",
        msg: "Verified",
        updated: "1 week ago",
      },
      {
        name: "env.example",
        displayName: ".env.example",
        type: "file",
        path: ".env.example",
        parentPath: "",
        depth: 0,
        status: "FLAGGED",
        msg: "Potential secret exposure",
        updated: "just now",
      },
    ],
    threats: [],
    dependencies: [
      { name: "react", version: "18.2.0", status: "SAFE", license: "MIT" },
      {
        name: "typescript",
        version: "5.1.3",
        status: "SAFE",
        license: "Apache-2.0",
      },
      {
        name: "express",
        version: "4.18.2",
        status: "OUTDATED",
        license: "MIT",
      },
      {
        name: "lodash",
        version: "4.17.21",
        status: "OUTDATED",
        license: "MIT",
      },
      { name: "jest", version: "29.5.0", status: "SAFE", license: "MIT" },
    ],
  },
  "data-pipeline": {
    name: "data-pipeline",
    owner: "it-web-org",
    visibility: "Private",
    languages: ["Python", "FastAPI"],
    lastScanned: "1 hour ago",
    riskLabel: "HIGH",
    riskPercent: 82,
    totalDeps: 89,
    threatsCount: 7,
    outdatedCount: 12,
    commit: "a1b2c3d",
    files: [
      {
        name: ".github/workflows",
        type: "folder",
        path: ".github/workflows",
        parentPath: "",
        depth: 0,
        isCollapsed: true,
        status: "SAFE",
        msg: "No issues found",
        updated: "3 days ago",
      },
      {
        name: "ci.yml",
        type: "file",
        path: ".github/workflows/ci.yml",
        parentPath: ".github/workflows",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "3 days ago",
      },
      {
        name: "deploy.yml",
        type: "file",
        path: ".github/workflows/deploy.yml",
        parentPath: ".github/workflows",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "3 days ago",
      },
      {
        name: "src",
        type: "folder",
        path: "src",
        parentPath: "",
        depth: 0,
        isCollapsed: false,
        status: "SAFE",
        msg: "No issues found",
        updated: "2 mins ago",
      },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        parentPath: "src",
        depth: 1,
        isCollapsed: false,
        status: "SAFE",
        msg: "No issues found",
        updated: "2 mins ago",
      },
      {
        name: "Button.tsx",
        type: "file",
        path: "src/components/Button.tsx",
        parentPath: "src/components",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "2 mins ago",
      },
      {
        name: "Nav.tsx",
        type: "file",
        path: "src/components/Nav.tsx",
        parentPath: "src/components",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "2 mins ago",
      },
      {
        name: "lib",
        type: "folder",
        path: "src/lib",
        parentPath: "src",
        depth: 1,
        isCollapsed: true,
        status: "SAFE",
        msg: "No issues found",
        updated: "1 day ago",
      },
      {
        name: "utils.ts",
        type: "file",
        path: "src/lib/utils.ts",
        parentPath: "src/lib",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "1 day ago",
      },
      {
        name: "index.ts",
        type: "file",
        path: "src/index.ts",
        parentPath: "src",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "5 days ago",
      },
      {
        name: "package.json",
        type: "file",
        path: "package.json",
        parentPath: "",
        depth: 0,
        status: "OUTDATED",
        msg: "3 vulnerable dependencies",
        updated: "2 mins ago",
      },
      {
        name: "tsconfig.json",
        type: "file",
        path: "tsconfig.json",
        parentPath: "",
        depth: 0,
        status: "SAFE",
        msg: "Verified",
        updated: "1 week ago",
      },
      {
        name: "env.example",
        displayName: ".env.example",
        type: "file",
        path: ".env.example",
        parentPath: "",
        depth: 0,
        status: "FLAGGED",
        msg: "Potential secret exposure",
        updated: "just now",
      },
    ],
    threats: [
      {
        title: "Dependency Confusion Target",
        desc: "Forced resolution to non-existent public index module",
        severity: "CRITICAL",
        file: "package.json",
      },
      {
        title: "Obfuscated payload loader",
        desc: "Detected base64 dynamic module code evaluation routine",
        severity: "HIGH",
        file: "src/lib/utils.ts",
      },
      {
        title: "Malicious inbound socket open",
        desc: "Outbound socket listener detected binding network tasks to /api",
        severity: "HIGH",
        file: "src/components/Nav.tsx",
      },
    ],
    dependencies: [
      { name: "fastapi", version: "0.95.0", status: "SAFE", license: "MIT" },
      { name: "uvicorn", version: "0.21.1", status: "SAFE", license: "BSD-3" },
      {
        name: "requests",
        version: "2.28.1",
        status: "OUTDATED",
        license: "Apache-2.0",
      },
      { name: "numpy", version: "1.22.0", status: "OUTDATED", license: "BSD" },
      {
        name: "cryptography",
        version: "39.0.1",
        status: "SAFE",
        license: "Apache-2.0",
      },
      {
        name: "lodash",
        version: "4.17.20",
        status: "OUTDATED",
        license: "MIT",
      },
      { name: "axios", version: "0.21.1", status: "OUTDATED", license: "MIT" },
      {
        name: "minimist",
        version: "1.2.5",
        status: "OUTDATED",
        license: "MIT",
      },
    ],
  },
  Portfolio: {
    name: "Portfolio",
    owner: "elviscgn",
    visibility: "Public",
    languages: ["Python", "PyTorch"],
    lastScanned: "3 hours ago",
    riskLabel: "MEDIUM",
    riskPercent: 47,
    totalDeps: 203,
    threatsCount: 2,
    outdatedCount: 8,
    commit: "bc87d12",
    files: [
      {
        name: ".github/workflows",
        type: "folder",
        path: ".github/workflows",
        parentPath: "",
        depth: 0,
        isCollapsed: true,
        status: "SAFE",
        msg: "No issues found",
        updated: "3 days ago",
      },
      {
        name: "ci.yml",
        type: "file",
        path: ".github/workflows/ci.yml",
        parentPath: ".github/workflows",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "3 days ago",
      },
      {
        name: "deploy.yml",
        type: "file",
        path: ".github/workflows/deploy.yml",
        parentPath: ".github/workflows",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "3 days ago",
      },
      {
        name: "src",
        type: "folder",
        path: "src",
        parentPath: "",
        depth: 0,
        isCollapsed: false,
        status: "SAFE",
        msg: "No issues found",
        updated: "2 mins ago",
      },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        parentPath: "src",
        depth: 1,
        isCollapsed: false,
        status: "SAFE",
        msg: "No issues found",
        updated: "2 mins ago",
      },
      {
        name: "Button.tsx",
        type: "file",
        path: "src/components/Button.tsx",
        parentPath: "src/components",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "2 mins ago",
      },
      {
        name: "Nav.tsx",
        type: "file",
        path: "src/components/Nav.tsx",
        parentPath: "src/components",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "2 mins ago",
      },
      {
        name: "lib",
        type: "folder",
        path: "src/lib",
        parentPath: "src",
        depth: 1,
        isCollapsed: true,
        status: "SAFE",
        msg: "No issues found",
        updated: "1 day ago",
      },
      {
        name: "utils.ts",
        type: "file",
        path: "src/lib/utils.ts",
        parentPath: "src/lib",
        depth: 2,
        status: "SAFE",
        msg: "Verified",
        updated: "1 day ago",
      },
      {
        name: "index.ts",
        type: "file",
        path: "src/index.ts",
        parentPath: "src",
        depth: 1,
        status: "SAFE",
        msg: "Verified",
        updated: "5 days ago",
      },
      {
        name: "package.json",
        type: "file",
        path: "package.json",
        parentPath: "",
        depth: 0,
        status: "OUTDATED",
        msg: "3 vulnerable dependencies",
        updated: "2 mins ago",
      },
      {
        name: "tsconfig.json",
        type: "file",
        path: "tsconfig.json",
        parentPath: "",
        depth: 0,
        status: "SAFE",
        msg: "Verified",
        updated: "1 week ago",
      },
      {
        name: "env.example",
        displayName: ".env.example",
        type: "file",
        path: ".env.example",
        parentPath: "",
        depth: 0,
        status: "FLAGGED",
        msg: "Potential secret exposure",
        updated: "just now",
      },
    ],
    threats: [
      {
        title: "Arbitrary deserialization via pickle",
        desc: "Insecure usage of unpickling module loading unsafe model data",
        severity: "HIGH",
        file: "models/weight_reader.py",
      },
      {
        title: "PyYAML loader exploit risk",
        desc: "Unrestricted dynamic code block parse trigger available",
        severity: "MEDIUM",
        file: "requirements.txt",
      },
    ],
    dependencies: [
      { name: "torch", version: "2.0.0", status: "SAFE", license: "BSD-3" },
      {
        name: "torchvision",
        version: "0.15.1",
        status: "SAFE",
        license: "BSD-3",
      },
      { name: "pyyaml", version: "5.4.1", status: "OUTDATED", license: "MIT" },
      {
        name: "scikit-learn",
        version: "1.2.1",
        status: "SAFE",
        license: "BSD-3",
      },
    ],
  },
};

const githubSvgString = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: 16, height: 16 }}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function Codebases() {
  const [codebases, setCodebases] =
    useState<Record<string, RepoData>>(INITIAL_CODEBASES);
  const [isGitHubConnected, setIsGitHubConnected] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "detail">("list");
  const [activeRepoKey, setActiveRepoKey] = useState<string>("data-pipeline");
  const [activeTab, setActiveTab] = useState<
    "code" | "threats" | "dependencies" | "settings"
  >("code");
  const [activeSidebarPanel, setActiveSidebarPanel] = useState<
    "risk" | "package" | "env"
  >("risk");
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleConnectGitHub = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsGitHubConnected(true);
      setIsConnecting(false);
      showNotification("GitHub successfully linked with Acme Corp Prod.");
    }, 1000);
  };

  const handleDisconnectGitHub = () => {
    setIsGitHubConnected(false);
    showNotification("GitHub workspace credentials disconnected.");
  };

  const activeRepo = codebases[activeRepoKey];

  const handleManualScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const updated = { ...codebases };
      updated[activeRepoKey].lastScanned = "Just now";
      setCodebases(updated);
      showNotification(
        `Manual scan finalized for ${activeRepo.name}. Integrity signatures updated.`,
      );
    }, 1800);
  };

  const toggleFolder = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFiles = activeRepo.files.map((f) => {
      if (f.path === path && f.type === "folder") {
        return { ...f, isCollapsed: !f.isCollapsed };
      }
      return f;
    });
    const updated = { ...codebases };
    updated[activeRepoKey].files = updatedFiles;
    setCodebases(updated);
  };

  const handleFileClick = (file: FileNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (file.name === "package.json") {
      setActiveSidebarPanel("package");
    } else if (file.name === "env.example" || file.name === ".env.example") {
      setActiveSidebarPanel("env");
    } else {
      setActiveSidebarPanel("risk");
    }
  };

  const fixDependency = (depName: string) => {
    showNotification(
      `Doria is opening a PR to upgrade ${depName} and resolve security alerts...`,
    );
  };

  const fixAllDependencies = () => {
    showNotification(
      `Doria is fixing all 3 vulnerable dependencies. Check your PR tab in a moment!`,
    );
  };

  const fixSecrets = () => {
    showNotification(
      `Doria is opening a PR to scrub secrets from .env.example and place placeholder configs.`,
    );
  };

  const remediateThreat = (index: number) => {
    const originalThreatName = activeRepo.threats[index].title;
    const updatedThreats = [...activeRepo.threats];
    updatedThreats.splice(index, 1);

    const updated = { ...codebases };
    updated[activeRepoKey].threats = updatedThreats;
    updated[activeRepoKey].threatsCount = updatedThreats.length;

    if (updatedThreats.length === 0) {
      updated[activeRepoKey].riskLabel = "LOW";
      updated[activeRepoKey].riskPercent = 15;
    } else {
      updated[activeRepoKey].riskPercent = Math.max(
        20,
        activeRepo.riskPercent - 20,
      );
    }

    updated[activeRepoKey].files = activeRepo.files.map((f) => {
      if (f.status === "THREATS") {
        return { ...f, status: "SAFE", msg: "Verified structural config" };
      }
      return f;
    });

    setCodebases(updated);
    showNotification(
      `Successfully patched vulnerability context: ${originalThreatName}`,
    );
  };

  const isNodeVisible = (node: FileNode, filesList: FileNode[]): boolean => {
    if (!node.parentPath) return true;
    const parent = filesList.find((f) => f.path === node.parentPath);
    if (!parent) return true;
    if (parent.isCollapsed) return false;
    return isNodeVisible(parent, filesList);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Topbar */}
      <header className="topbar">
        <h1 className="page-title">Codebases</h1>
        <div
          className={`repo-search-bar ${!isGitHubConnected ? "disabled" : ""}`}
          id="repo-search-wrapper"
        >
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            className="search-input"
            id="repo-search"
            placeholder="Filter connected repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!isGitHubConnected}
            spellCheck="false"
          />
        </div>
      </header>

      {/* VIEW 1: REPOSITORY LISTING */}
      {view === "list" && (
        <div id="view-codebases" className="view-section active">
          <div className="cb-header-row">
            <div className="cb-header-left">
              <span className="cb-subtitle" id="repo-count-sub">
                {isGitHubConnected
                  ? `${Object.keys(codebases).length} repositories connected to Acme Corp Prod`
                  : "Please connect a GitHub account to get started"}
              </span>
            </div>
            {isGitHubConnected ? (
              <button
                className="btn-github connected"
                id="btn-connect-github"
                onClick={handleDisconnectGitHub}
              >
                {githubSvgString} Connected
              </button>
            ) : (
              <button
                className="btn-github"
                id="btn-connect-github"
                onClick={handleConnectGitHub}
              >
                {isConnecting ? (
                  <Loader2
                    size={15}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  githubSvgString
                )}{" "}
                Connect GitHub
              </button>
            )}
          </div>

          {/* Mode 1: Empty State View */}
          {!isGitHubConnected && (
            <div id="empty-state-view" className="empty-state-container">
              <div className="empty-state-icon">{githubSvgString}</div>
              <h3 className="empty-state-title">
                Please connect a GitHub to get started
              </h3>
              <p className="empty-state-desc">
                Integrate your active team accounts, scan vulnerability
                histories, and verify build integrity instantly inside Acme Corp
                Prod.
              </p>
              <button
                className="btn-github"
                id="btn-empty-state-connect"
                onClick={handleConnectGitHub}
                style={{
                  background: "var(--doria-yellow)",
                  color: "#2A2725",
                  border: "none",
                  padding: "10px 22px",
                  fontWeight: 600,
                }}
              >
                {isConnecting ? (
                  <Loader2
                    size={15}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  githubSvgString
                )}{" "}
                Connect GitHub
              </button>
            </div>
          )}

          {/* Mode 2: Connected grid view */}
          {isGitHubConnected && (
            <div className="repo-grid" id="repositories-target-grid">
              {Object.keys(codebases).map((key) => {
                const repo = codebases[key];
                if (
                  !repo.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  !repo.owner.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return null;
                }
                const riskVal = repo.riskLabel.toLowerCase();
                return (
                  <div
                    key={key}
                    className="repo-card"
                    data-risk={riskVal}
                    onClick={() => {
                      setActiveRepoKey(key);
                      setView("detail");
                    }}
                  >
                    {repo.riskLabel === "HIGH" && (
                      <div className="repo-pulse"></div>
                    )}
                    <div className="repo-top">
                      <div className="repo-name-wrapper">
                        <div className="repo-name mono">
                          <span className="repo-owner">{repo.owner}</span>
                          <span className="repo-slash">/</span>
                          <span
                            className="repo-repo"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {repo.name}
                          </span>
                        </div>
                        <span className="repo-visibility">
                          {repo.visibility}
                        </span>
                      </div>
                    </div>

                    <div className="repo-badges">
                      {repo.languages.map((lang) => (
                        <span
                          key={lang}
                          className={`repo-badge badge-${lang.toLowerCase() === "typescript" ? "ts" : lang.toLowerCase() === "node.js" ? "node" : lang.toLowerCase() === "python" ? "py" : lang.toLowerCase() === "fastapi" ? "fastapi" : "pytorch"}`}
                        >
                          {techLogos[lang.toLowerCase().replace(".", "")] ||
                            null}
                          {lang}
                        </span>
                      ))}
                    </div>

                    <div className="repo-time">
                      <Clock size={12} /> Last scanned {repo.lastScanned}
                    </div>

                    <div className="risk-section">
                      <div className="risk-header">
                        <span className="risk-label">Risk Score</span>
                        <span className={`risk-badge ${riskVal}`}>
                          {repo.riskLabel}
                        </span>
                      </div>
                      <div className="risk-bar-bg">
                        <div
                          className={`risk-bar-fill ${riskVal}`}
                          style={{ width: `${repo.riskPercent}%` }}
                        ></div>
                      </div>
                      <div className="repo-stats">
                        <div className="stat-item">
                          <Box size={13} /> {repo.totalDeps} deps
                        </div>
                        {repo.threatsCount > 0 ? (
                          <div className="stat-item danger">
                            <ShieldAlert size={13} /> {repo.threatsCount}{" "}
                            threats
                          </div>
                        ) : (
                          <div className="stat-item safe">
                            <ShieldCheck size={13} /> 0 threats
                          </div>
                        )}
                        {repo.outdatedCount > 0 ? (
                          <div className="stat-item warning">
                            <History size={13} /> {repo.outdatedCount} outdated
                          </div>
                        ) : (
                          <div className="stat-item">
                            <History size={13} /> 0 outdated
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: DRILLDOWN DETAIL */}
      {view === "detail" && activeRepo && (
        <div id="view-repo-detail" className="view-section active">
          <div className="detail-header">
            <div className="breadcrumb">
              <a
                href="#"
                className="breadcrumb-link"
                onClick={(e) => {
                  e.preventDefault();
                  setView("list");
                }}
              >
                <ArrowLeft size={14} /> Codebases
              </a>
              <span>/</span>
              <span className="repo-owner mono" id="detail-owner-name">
                {activeRepo.owner}
              </span>
              <span className="repo-slash mono">/</span>
              <span
                className="repo-name mono"
                id="detail-repo-name"
                style={{ color: "var(--text-primary)", fontWeight: 600 }}
              >
                {activeRepo.name}
              </span>
              <span
                className="repo-visibility"
                id="detail-visibility"
                style={{ marginLeft: 8 }}
              >
                {activeRepo.visibility}
              </span>
            </div>

            <div className="detail-title-row">
              <div className="repo-badges" id="detail-badges-container">
                {activeRepo.languages.map((lang) => (
                  <span
                    key={lang}
                    className={`repo-badge badge-${lang.toLowerCase() === "typescript" ? "ts" : lang.toLowerCase() === "node.js" ? "node" : lang.toLowerCase() === "python" ? "py" : lang.toLowerCase() === "fastapi" ? "fastapi" : "pytorch"}`}
                  >
                    {techLogos[lang.toLowerCase().replace(".", "")] || null}
                    {lang}
                  </span>
                ))}
              </div>
              <button
                className="btn-github"
                id="btn-manual-scan"
                onClick={handleManualScan}
                style={{
                  background: "#3B82F6",
                  color: "white",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                }}
              >
                {isScanning ? (
                  <Loader2
                    size={14}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Play size={14} style={{ fill: "white" }} />
                )}{" "}
                Run Security Scan
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="repo-tabs" id="detail-tab-row">
            <div
              className={`repo-tab ${activeTab === "code" ? "active" : ""}`}
              onClick={() => setActiveTab("code")}
            >
              <Code size={16} /> Code
            </div>
            <div
              className={`repo-tab ${activeTab === "threats" ? "active" : ""}`}
              onClick={() => setActiveTab("threats")}
            >
              <ShieldAlert size={16} /> Security Threats
              <span
                className={`tab-count ${activeRepo.threatsCount > 0 ? "danger" : ""}`}
              >
                {activeRepo.threatsCount}
              </span>
            </div>
            <div
              className={`repo-tab ${activeTab === "dependencies" ? "active" : ""}`}
              onClick={() => setActiveTab("dependencies")}
            >
              <Box size={16} /> Dependencies
              <span className="tab-count">{activeRepo.totalDeps}</span>
            </div>
            <div
              className={`repo-tab ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <SettingsIcon size={16} /> Settings
            </div>
          </div>

          <div className="detail-grid">
            <div className="panel-container">
              {/* CODE EXPLORER PANEL */}
              {activeTab === "code" && (
                <div className="tab-panel active" id="panel-code">
                  <div className="explorer-panel">
                    <div className="explorer-header">
                      <div className="commit-info">
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Bot size={14} color="var(--doria-yellow)" />
                        </div>
                        <span>
                          <span className="commit-msg">
                            Latest Scan Commit:
                          </span>
                          <span
                            className="mono"
                            id="detail-commit-sha"
                            style={{ color: "var(--doria-yellow)" }}
                          >
                            {" "}
                            {activeRepo.commit}
                          </span>
                        </span>
                      </div>
                      <span
                        style={{ color: "var(--text-muted)" }}
                        id="detail-scan-time"
                      >
                        Last scanned {activeRepo.lastScanned}
                      </span>
                    </div>

                    <div
                      className="explorer-body"
                      id="explorer-files-container"
                    >
                      {activeRepo.files.map((file, idx) => {
                        if (!isNodeVisible(file, activeRepo.files)) return null;
                        const icon =
                          file.type === "folder" ? "folder" : "file-code";
                        const folderClass =
                          file.type === "folder" ? "folder" : "";

                        let statusPill = (
                          <span className="status-pill pill-safe">SAFE</span>
                        );
                        if (file.status === "THREATS") {
                          statusPill = (
                            <span className="status-pill pill-danger">
                              THREATS DETECTED
                            </span>
                          );
                        } else if (file.status === "OUTDATED") {
                          statusPill = (
                            <span className="status-pill pill-warn">
                              OUTDATED
                            </span>
                          );
                        } else if (file.status === "FLAGGED") {
                          statusPill = (
                            <span className="status-pill pill-warn">
                              FLAGGED
                            </span>
                          );
                        }

                        return (
                          <div
                            key={idx}
                            className="file-row"
                            style={{
                              background:
                                file.status === "THREATS"
                                  ? "rgba(255, 123, 114, 0.05)"
                                  : "transparent",
                              borderLeft:
                                file.status === "THREATS"
                                  ? "2px solid var(--threat-red)"
                                  : "none",
                            }}
                            onClick={(e) => {
                              if (file.type === "folder") {
                                toggleFolder(file.path, e);
                              } else {
                                handleFileClick(file, e);
                              }
                            }}
                          >
                            <div
                              className={`file-name ${folderClass}`}
                              style={{ paddingLeft: file.depth * 20 }}
                            >
                              {file.type === "folder" ? (
                                <div
                                  className={`folder-chevron ${!file.isCollapsed ? "expanded" : ""}`}
                                  style={{ marginRight: 6 }}
                                >
                                  <ChevronRight size={14} />
                                </div>
                              ) : (
                                <div className="chevron-spacer"></div>
                              )}
                              {file.type === "folder" ? (
                                <FolderCode
                                  size={16}
                                  color="#60A5FA"
                                  style={{ fill: "rgba(96, 165, 250, 0.2)" }}
                                />
                              ) : (
                                <FileCode size={16} />
                              )}
                              <span className="mono" style={{ marginLeft: 8 }}>
                                {file.displayName || file.name}
                              </span>
                            </div>
                            <div className="file-status">
                              {statusPill} {file.msg}
                            </div>
                            <div className="file-date">{file.updated}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Timeline Event Tracker widget */}
                    <div
                      style={{
                        borderTop: "1px solid var(--border-light)",
                        padding: "24px 20px",
                        background: "rgba(0,0,0,0.15)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 20,
                        }}
                      >
                        <h4
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <History size={13} color="var(--text-muted)" /> Recent
                          Scan Activity
                        </h4>
                        <span
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            background: "rgba(255,255,255,0.05)",
                            padding: "3px 8px",
                            borderRadius: 10,
                            fontWeight: 600,
                          }}
                        >
                          3 EVENTS LOGGED
                        </span>
                      </div>

                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 11,
                            top: 12,
                            bottom: 12,
                            width: 2,
                            background: "var(--border-strong)",
                            zIndex: 0,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            gap: 16,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: 24,
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: "var(--safe-green-dim)",
                                border: "1px solid rgba(126,231,135,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyBox: "center",
                                justifyContent: "center",
                                zIndex: 2,
                              }}
                            >
                              <ShieldCheck
                                size={12}
                                color="var(--safe-green)"
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              background: "rgba(255,255,255,0.02)",
                              padding: "10px 14px",
                              borderRadius: 8,
                              border: "1px solid var(--border-light)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 13,
                                color: "#F1F5F9",
                                fontWeight: 500,
                              }}
                            >
                              Full scan completed —{" "}
                              <span
                                style={{
                                  color: "var(--text-secondary)",
                                  fontWeight: 400,
                                }}
                              >
                                147 dependencies verified
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: 11.5,
                                color: "var(--text-muted)",
                                fontWeight: 500,
                              }}
                            >
                              2 mins ago
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 16,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: 24,
                              flexShrink: 0,
                            }}
                          >
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: "var(--warning-amber-dim)",
                                border: "1px solid rgba(242,204,96,0.25)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2,
                              }}
                            >
                              <KeyRound
                                size={12}
                                color="var(--warning-amber)"
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              background: "rgba(255,123,114,0.03)",
                              padding: "10px 14px",
                              borderRadius: 8,
                              border: "1px solid rgba(255,123,114,0.15)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 13,
                                color: "#F1F5F9",
                                fontWeight: 500,
                              }}
                            >
                              .env.example flagged —{" "}
                              <span style={{ color: "var(--threat-red)" }}>
                                3 hardcoded secrets exposed
                              </span>
                            </span>
                            <span
                              style={{
                                fontSize: 11.5,
                                color: "var(--text-muted)",
                                fontWeight: 500,
                              }}
                            >
                              2 mins ago
                            </span>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 16,
                            alignFiles: "flex-start",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: 24,
                              flexShrink: 0,
                              paddingFiles: 2,
                            }}
                          >
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid var(--border-strong)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2,
                              }}
                            >
                              <GitCommit
                                size={12}
                                color="var(--text-secondary)"
                              />
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "rgba(255,255,255,0.02)",
                                padding: "10px 14px",
                                borderRadius: 8,
                                border: "1px solid var(--border-light)",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 13,
                                  color: "#F1F5F9",
                                  fontWeight: 500,
                                }}
                              >
                                Scan initiated by push to main (
                                <span
                                  className="mono"
                                  style={{ color: "var(--doria-yellow)" }}
                                >
                                  f1a238b
                                </span>
                                )
                              </span>
                              <span
                                style={{
                                  fontSize: 11.5,
                                  color: "var(--text-muted)",
                                  fontWeight: 500,
                                }}
                              >
                                2 mins ago
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY THREATS PANEL */}
              {activeTab === "threats" && (
                <div className="tab-panel active" id="panel-threats">
                  <div className="explorer-panel">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Threat Vector</th>
                          <th>Severity</th>
                          <th>File Target</th>
                          <th style={{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeRepo.threats.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              style={{
                                textAlign: "center",
                                color: "var(--text-muted)",
                                padding: 40,
                              }}
                            >
                              No threats found inside {activeRepo.name}{" "}
                              codebase. All checks are verified clean.
                            </td>
                          </tr>
                        ) : (
                          activeRepo.threats.map((threat, idx) => (
                            <tr key={idx}>
                              <td>
                                <div
                                  className="threat-title"
                                  style={{
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    marginBottom: 4,
                                  }}
                                >
                                  {threat.title}
                                </div>
                                <div
                                  className="threat-desc"
                                  style={{
                                    fontSize: 12,
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  {threat.desc}
                                </div>
                              </td>
                              <td>
                                <span
                                  className={`status-pill ${threat.severity === "CRITICAL" ? "pill-danger" : "pill-warn"}`}
                                >
                                  {threat.severity}
                                </span>
                              </td>
                              <td>
                                <code className="mono" style={{ fontSize: 11 }}>
                                  {threat.file}
                                </code>
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <button
                                  className="btn-github"
                                  style={{
                                    padding: "4px 8px",
                                    fontSize: 11,
                                    display: "inline-block",
                                  }}
                                  onClick={() => remediateThreat(idx)}
                                >
                                  Remediate
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* DEPENDENCIES PANEL */}
              {activeTab === "dependencies" && (
                <div className="tab-panel active" id="panel-dependencies">
                  <div className="explorer-panel">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Dependency</th>
                          <th>Target Version</th>
                          <th>Status</th>
                          <th>License</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeRepo.dependencies.map((dep, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong style={{ color: "var(--text-primary)" }}>
                                {dep.name}
                              </strong>
                            </td>
                            <td className="mono">{dep.version}</td>
                            <td>
                              <span
                                className={`status-pill ${dep.status === "SAFE" ? "pill-safe" : "pill-warn"}`}
                              >
                                {dep.status}
                              </span>
                            </td>
                            <td>
                              <span
                                style={{
                                  color: "var(--text-muted)",
                                  fontSize: 11.5,
                                }}
                              >
                                {dep.license}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SETTINGS PANEL */}
              {activeTab === "settings" && (
                <div className="tab-panel active" id="panel-settings">
                  <div className="settings-card">
                    <div className="settings-row">
                      <div className="settings-label">
                        <span className="settings-title">
                          Automated Pull Request Scans
                        </span>
                        <span className="settings-desc">
                          Scan incoming changes automatically before merging
                          code into the default branch.
                        </span>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="settings-row">
                      <div className="settings-label">
                        <span className="settings-title">
                          Slack Notifications
                        </span>
                        <span className="settings-desc">
                          Receive immediate alerts inside Slack channels upon
                          detection of critical package threats.
                        </span>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            showNotification(
                              e.target.checked
                                ? "Slack notification delivery enabled."
                                : "Slack warnings deliver channel suspended.",
                            )
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div className="settings-row">
                      <div className="settings-label">
                        <span className="settings-title">
                          Fail Builds on Critical Threats
                        </span>
                        <span className="settings-desc">
                          Enforce standard build failures if malicious payloads
                          or active dependency confusion routes are found.
                        </span>
                      </div>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: DYNAMIC SIDEBARS */}
            <div className="detail-sidebar">
              {/* Sidebar 1: Risk Assessment Overview */}
              <div
                id="sidebar-risk-assessment"
                className={`about-section ${activeSidebarPanel === "risk" ? "active-panel" : ""}`}
              >
                <h3
                  className="about-title"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Shield size={16} color="var(--doria-yellow)" /> Risk
                  Assessment
                </h3>

                <div
                  className="risk-section"
                  style={{ border: "none", padding: 0, marginBottom: 20 }}
                >
                  <div className="risk-header">
                    <span
                      className="risk-label"
                      style={{ fontSize: 12, color: "var(--text-primary)" }}
                    >
                      Overall Score
                    </span>
                    <span
                      className={`risk-badge ${activeRepo.riskLabel.toLowerCase()}`}
                      style={{ fontSize: 12, padding: "4px 10px" }}
                    >
                      {activeRepo.riskLabel} - {activeRepo.riskPercent}%
                    </span>
                  </div>
                  <div
                    className="risk-bar-bg"
                    style={{ height: 6, background: "rgba(0,0,0,0.4)" }}
                  >
                    <div
                      className={`risk-bar-fill ${activeRepo.riskLabel.toLowerCase()}`}
                      style={{ width: `${activeRepo.riskPercent}%` }}
                    ></div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#64748B",
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Info size={13} color="#64748B" /> 18 of 147 dependencies
                    flagged for review
                  </div>
                </div>

                <div
                  className="repo-stats"
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  {activeRepo.threatsCount > 0 ? (
                    <div
                      className="stat-item danger"
                      style={{
                        fontSize: 13,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyBox: "center",
                        justifyContent: "space-between",
                        background: "rgba(255, 123, 114, 0.03)",
                        border: "1px solid rgba(255, 123, 114, 0.15)",
                        borderRadius: 6,
                        padding: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <ShieldAlert size={16} color="var(--threat-red)" />
                        <span>
                          <strong>{activeRepo.threatsCount}</strong> Active
                          Threats Blocked
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="stat-item safe"
                      style={{
                        fontSize: 13,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(126, 231, 135, 0.03)",
                        border: "1px solid rgba(126, 231, 135, 0.15)",
                        borderRadius: 6,
                        padding: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <ShieldCheck size={16} color="var(--safe-green)" />
                        <span>
                          <strong>0</strong> Active Threats Blocked
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    className="stat-item warning"
                    style={{
                      fontSize: 13,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(242, 204, 96, 0.03)",
                      border: "1px solid rgba(242, 204, 96, 0.15)",
                      padding: "10px 12px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setActiveTab("dependencies");
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <History size={16} color="var(--warning-amber)" />
                      <span>
                        <strong>{activeRepo.outdatedCount}</strong> Outdated
                        Dependencies
                      </span>
                    </div>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </div>

                  <div
                    className="stat-item"
                    style={{
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyBox: "center",
                      justifyContent: "space-between",
                      background: "rgba(255,255,255,0.01)",
                      border: "1px solid var(--border-light)",
                      padding: "10px 12px",
                      borderRadius: 6,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Box size={16} color="var(--text-muted)" />
                      <span>
                        <strong>{activeRepo.totalDeps}</strong> Total
                        Dependencies Monitored
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar 2: package.json Vulnerable details */}
              <div
                id="sidebar-package-details"
                className={`about-section ${activeSidebarPanel === "package" ? "active-panel" : ""}`}
              >
                <div style={{ marginBottom: 20 }}>
                  <X
                    size={16}
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "var(--text-muted)",
                    }}
                    onClick={() => setActiveSidebarPanel("risk")}
                  />
                  <h3
                    className="mono"
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--text-primary)",
                    }}
                  >
                    package.json
                  </h3>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--warning-amber)",
                      marginTop: 4,
                    }}
                  >
                    3 outdated dependencies found
                  </div>
                </div>

                <div
                  className="dep-fix-list"
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {/* Lodash */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--border-light)",
                    }}
                  >
                    <div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        lodash
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 4,
                          fontSize: 12,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--threat-red)",
                            fontWeight: 500,
                          }}
                        >
                          4.17.20
                        </span>
                        <ArrowRight size={12} color="var(--text-muted)" />
                        <span
                          style={{
                            color: "var(--safe-green)",
                            fontWeight: 500,
                          }}
                        >
                          4.17.21
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "#FF8A8A",
                          marginTop: 4,
                        }}
                      >
                        CVE-2021-23337
                      </div>
                    </div>
                    <button
                      className="btn-github"
                      style={{
                        background: "#3B82F6",
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        padding: "4px 12px",
                        fontSize: 11.5,
                        fontWeight: 600,
                      }}
                      onClick={() => fixDependency("lodash")}
                    >
                      Fix
                    </button>
                  </div>

                  {/* Axios */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--border-light)",
                    }}
                  >
                    <div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        axios
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 4,
                          fontSize: 12,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--threat-red)",
                            fontWeight: 500,
                          }}
                        >
                          0.21.1
                        </span>
                        <ArrowRight size={12} color="var(--text-muted)" />
                        <span
                          style={{
                            color: "var(--safe-green)",
                            fontWeight: 500,
                          }}
                        >
                          1.6.0
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "#FF8A8A",
                          marginTop: 4,
                        }}
                      >
                        CVE-2023-45857
                      </div>
                    </div>
                    <button
                      className="btn-github"
                      style={{
                        background: "#3B82F6",
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        padding: "4px 12px",
                        fontSize: 11.5,
                        fontWeight: 600,
                      }}
                      onClick={() => fixDependency("axios")}
                    >
                      Fix
                    </button>
                  </div>

                  {/* Minimist */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--border-light)",
                    }}
                  >
                    <div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        minimist
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 4,
                          fontSize: 12,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--threat-red)",
                            fontWeight: 500,
                          }}
                        >
                          1.2.5
                        </span>
                        <ArrowRight size={12} color="var(--text-muted)" />
                        <span
                          style={{
                            color: "var(--safe-green)",
                            fontWeight: 500,
                          }}
                        >
                          1.2.8
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11.5,
                          color: "#FF8A8A",
                          marginTop: 4,
                        }}
                      >
                        CVE-2021-44906
                      </div>
                    </div>
                    <button
                      className="btn-github"
                      style={{
                        background: "#3B82F6",
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        padding: "4px 12px",
                        fontSize: 11.5,
                        fontWeight: 600,
                      }}
                      onClick={() => fixDependency("minimist")}
                    >
                      Fix
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <button
                    className="btn-github"
                    style={{
                      width: "100%",
                      background: "#3B82F6",
                      color: "white",
                      border: "none",
                      fontWeight: 700,
                      padding: 10,
                      borderRadius: 8,
                      fontSize: 13.5,
                      justifyContent: "center",
                    }}
                    onClick={fixAllDependencies}
                  >
                    Fix All with Doria
                  </button>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      textAlign: "center",
                      marginTop: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    Doria will open a PR with all three fixes and run your test
                    suite automatically.
                  </div>
                </div>
              </div>

              {/* Sidebar 3: .env.example Code viewer / secrets scrubber */}
              <div
                id="sidebar-code-viewer"
                class-name="about-section"
                className={`about-section ${activeSidebarPanel === "env" ? "active-panel" : ""}`}
              >
                <div style={{ marginBottom: 16 }}>
                  <X
                    size={16}
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "var(--text-muted)",
                    }}
                    onClick={() => setActiveSidebarPanel("risk")}
                  />
                  <h3
                    className="mono"
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--text-primary)",
                      display: "inline-block",
                    }}
                  >
                    .env.example
                  </h3>
                </div>

                <div
                  style={{
                    background: "#0a0c10",
                    padding: "12px 8px",
                    borderRadius: 6,
                    border: "1px solid var(--border-light)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    overflowX: "auto",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {[
                      {
                        l: 1,
                        val: "DATABASE_URL=postgres://localhost:5432/mydb",
                      },
                      { l: 2, val: "PORT=3000" },
                      { l: 3, val: "NODE_ENV=development" },
                      {
                        l: 4,
                        val: "AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE",
                        flag: true,
                      },
                      {
                        l: 5,
                        val: "AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
                        flag: true,
                        truncate: true,
                      },
                      {
                        l: 6,
                        val: "STRIPE_SECRET_KEY=sk_live_abc123def456",
                        flag: true,
                      },
                    ].map((line, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "2px 4px",
                          borderLeft: line.flag ? "3px solid #EF4444" : "none",
                          background: line.flag
                            ? "rgba(239, 68, 68, 0.03)"
                            : "transparent",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <span
                            style={{
                              color: "#64748B",
                              width: 20,
                              display: "inline-block",
                              userSelect: "none",
                              textAlign: "right",
                              marginRight: 8,
                            }}
                          >
                            {line.l}
                          </span>
                          <span
                            style={{
                              color: "var(--text-secondary)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {line.truncate
                              ? "AWS_SECRET_ACCESS_KEY=wJalr..."
                              : line.val}
                          </span>
                        </div>
                        {line.flag && (
                          <span
                            style={{
                              fontSize: 8,
                              fontWeight: 700,
                              color: "#EF4444",
                              background: "rgba(239, 68, 68, 0.1)",
                              padding: "2px 6px",
                              borderRadius: 4,
                              whiteSpace: "nowrap",
                              marginLeft: 8,
                            }}
                          >
                            SECRET EXPOSED
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(245, 158, 11, 0.06)",
                    borderLeft: "3px solid #F59E0B",
                    padding: 12,
                    borderRadius: "0 4px 4px 0",
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    marginBottom: 16,
                  }}
                >
                  Doria detected 3 hardcoded secrets in this file. These should
                  be moved to a secrets manager immediately. Click Fix to have
                  Doria open a PR that removes these values and adds them to
                  your .env.example as empty placeholders.
                </div>

                <button
                  className="btn-github"
                  style={{
                    width: "100%",
                    background: "#3B82F6",
                    color: "white",
                    border: "none",
                    fontWeight: 700,
                    padding: 10,
                    borderRadius: 8,
                    fontSize: 13.5,
                    justifyContent: "center",
                  }}
                  onClick={fixSecrets}
                >
                  Fix with Doria
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast feedback notifications */}
      <div className="toast-container" id="toast-wrapper">
        {toast && (
          <div className="toast" style={{ opacity: 1, transform: "none" }}>
            <Info size={16} color="var(--doria-yellow)" /> <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Building2,
  Users,
  UserCheck,
  BrainCircuit,
  FileBarChart2,
  Bell,
  Settings,
  LogOut,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Download,
  TrendingUp,
  MapPin,
} from "lucide-react";
import {
  Complaint,
  ComplaintPriority,
  ComplaintStatus,
  Department,
  NotificationItem,
  Officer,
} from "../types";
import { COMPLAINT_CATEGORIES_LIST } from "../data/mockData";
import { NivaranLogo, ActivePage } from "./Navbar";

interface AdminPortalProps {
  complaints: Complaint[];
  departments: Department[];
  officers: Officer[];
  notifications: NotificationItem[];
  onUpdateComplaint: (
    id: string,
    updates: {
      status?: ComplaintStatus;
      priority?: ComplaintPriority;
      department?: string;
      assignedOfficer?: string;
      remarks?: string;
    }
  ) => void;
  onExitAdmin: (targetPage?: ActivePage) => void;
}

type AdminSection =
  | "dashboard"
  | "complaints"
  | "complaint-detail"
  | "departments"
  | "users"
  | "officers"
  | "ai-analytics"
  | "reports"
  | "notifications"
  | "settings";

export const AdminPortal: React.FC<AdminPortalProps> = ({
  complaints,
  departments,
  officers,
  notifications,
  onUpdateComplaint,
  onExitAdmin,
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>(
    complaints[0]?.id || "NVR-2026-10452"
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");

  const [adminRemarks, setAdminRemarks] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const selectedComplaint =
    complaints.find((c) => c.id === selectedComplaintId) || complaints[0];

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (c) =>
      c.status === "Complaint Submitted" ||
      c.status === "AI Analysis Completed" ||
      c.status === "Department Assigned"
  ).length;
  const inProgressComplaints = complaints.filter(
    (c) =>
      c.status === "Officer Assigned" ||
      c.status === "Work in Progress" ||
      c.status === "Resolution Submitted"
  ).length;
  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Complaint Closed" || c.status === "Citizen Verification"
  ).length;
  const highPriorityComplaints = complaints.filter(
    (c) => c.priority === "Critical" || c.priority === "High"
  ).length;
  const overdueComplaints = complaints.filter((c) => c.isOverdue).length || 1;

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      !searchQuery.trim() ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = filterCategory === "All" || c.category === filterCategory;
    const matchesDept =
      filterDepartment === "All" || c.department === filterDepartment;
    const matchesPrio = filterPriority === "All" || c.priority === filterPriority;
    const matchesStat = filterStatus === "All" || c.status === filterStatus;
    const matchesLoc =
      filterLocation === "All" ||
      c.ward.toLowerCase().includes(filterLocation.toLowerCase()) ||
      c.area.toLowerCase().includes(filterLocation.toLowerCase());

    return (
      matchesSearch &&
      matchesCat &&
      matchesDept &&
      matchesPrio &&
      matchesStat &&
      matchesLoc
    );
  });

  const handleExportCsv = () => {
    const headers = [
      "Complaint ID",
      "Citizen",
      "Category",
      "Priority",
      "Department",
      "Officer",
      "Status",
      "Area",
      "Submitted Date",
    ];
    const rows = complaints.map((c) => [
      c.id,
      `"${c.citizenName}"`,
      `"${c.category}"`,
      c.priority,
      `"${c.department}"`,
      `"${c.assignedOfficer}"`,
      `"${c.status}"`,
      `"${c.area}"`,
      `"${c.submittedAt}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "NIVARAN_AI_Municipal_Report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Municipal CSV Ledger exported successfully.");
  };

  const sidebarItems: {
    id: AdminSection;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "complaints",
      label: "Complaints",
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      id: "departments",
      label: "Departments",
      icon: <Building2 className="w-4 h-4" />,
    },
    { id: "users", label: "Users (Citizens)", icon: <Users className="w-4 h-4" /> },
    {
      id: "officers",
      label: "Officers",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "ai-analytics",
      label: "AI Analytics",
      icon: <BrainCircuit className="w-4 h-4" />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileBarChart2 className="w-4 h-4" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] text-slate-900">
      {/* 13. OFFICIAL ICCC ADMIN SIDEBAR */}
      <aside className="w-64 bg-[#0A2540] text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          <div className="h-1 w-full gov-tricolor-bar" />
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <NivaranLogo className="w-8 h-8" />
              <div>
                <span className="text-sm font-bold tracking-tight text-white block leading-none font-serif-gov">
                  NIVARAN AI
                </span>
                <span className="text-[10px] font-mono text-amber-400">
                  ICCC DIRECTORATE
                </span>
              </div>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {sidebarItems.map((item) => {
              const isActive =
                activeSection === item.id ||
                (activeSection === "complaint-detail" && item.id === "complaints");
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#EA580C] text-white shadow-2xs"
                      : "text-slate-300 hover:text-white hover:bg-[#06182C]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="px-3 py-2 rounded bg-[#06182C] border border-slate-700 text-xs">
            <div className="font-bold text-white">Vikramjit Singh, IAS</div>
            <div className="text-[11px] text-amber-400">Municipal Commissioner</div>
          </div>
          <button
            onClick={() => onExitAdmin("home")}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-xs font-bold text-red-300 hover:bg-red-950/60 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout / Citizen View</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE CANVAS */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-300 px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <span className="font-bold text-[#0A2540]">
              Integrated Command & Control Centre (ICCC)
            </span>
            <span>/</span>
            <span className="capitalize text-[#EA580C] font-bold">
              {activeSection.replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 text-xs font-bold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Ledger</span>
            </button>
            <button
              onClick={() => onExitAdmin("home")}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Return to Citizen Portal
            </button>
          </div>
        </header>

        {toast && (
          <div className="mx-6 mt-4 p-3.5 rounded-md bg-[#0A2540] text-white text-xs font-bold flex items-center justify-between shadow-lg border-l-4 border-[#EA580C]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {toast}
            </span>
            <button onClick={() => setToast(null)} className="text-slate-300 hover:text-white">
              Dismiss
            </button>
          </div>
        )}

        <main className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* 14. ADMIN DASHBOARD */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* 6 Executive KPI Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white border border-slate-300 border-t-4 border-t-[#0A2540] rounded-md p-4">
                  <div className="text-xs font-bold text-slate-600">Total Complaints</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
                    12,504
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Active session: {totalComplaints}
                  </div>
                </div>

                <div className="bg-white border border-slate-300 border-t-4 border-t-amber-500 rounded-md p-4">
                  <div className="text-xs font-bold text-[#B45309]">Pending Complaints</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
                    1,420
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Live queue: {pendingComplaints}
                  </div>
                </div>

                <div className="bg-white border border-slate-300 border-t-4 border-t-[#1E3A8A] rounded-md p-4">
                  <div className="text-xs font-bold text-[#1E3A8A]">In Progress</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
                    1,234
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Field squads: {inProgressComplaints}
                  </div>
                </div>

                <div className="bg-white border border-slate-300 border-t-4 border-t-[#15803D] rounded-md p-4">
                  <div className="text-xs font-bold text-[#15803D]">Resolved</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#15803D] mt-1">
                    9,850
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    92.1% SLA Rate ({resolvedComplaints})
                  </div>
                </div>

                <div className="bg-white border border-slate-300 border-t-4 border-t-[#EA580C] rounded-md p-4">
                  <div className="text-xs font-bold text-[#EA580C]">High Priority</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-[#EA580C] mt-1">
                    {highPriorityComplaints}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    AI Critical/High Alert
                  </div>
                </div>

                <div className="bg-white border border-slate-300 border-t-4 border-t-red-700 rounded-md p-4">
                  <div className="text-xs font-bold text-red-700">Overdue</div>
                  <div className="text-2xl font-bold font-mono tabular-nums text-red-700 mt-1">
                    {overdueComplaints}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Escalated to Commissioner
                  </div>
                </div>
              </div>

              {/* 6 Analytical Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h3 className="text-sm font-bold text-[#0A2540]">
                      01. Complaints by Category
                    </h3>
                    <span className="text-xs font-mono text-slate-500">FY 2026</span>
                  </div>
                  <div className="space-y-3">
                    {COMPLAINT_CATEGORIES_LIST.slice(0, 6).map((cat) => {
                      const pct = Math.min(100, Math.round((cat.count / 3500) * 100));
                      return (
                        <div key={cat.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-700">{cat.name}</span>
                            <span className="font-mono font-bold text-[#0A2540] tabular-nums">
                              {cat.count.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-[#0A2540]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h3 className="text-sm font-bold text-[#0A2540]">
                      02. Complaints by Department & SLA Resolution
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#15803D]">
                      Avg 92% Resolved
                    </span>
                  </div>
                  <div className="space-y-3">
                    {departments.map((d) => {
                      const resPct = Math.round(
                        (d.resolvedComplaints / d.totalComplaints) * 100
                      );
                      return (
                        <div key={d.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-700 truncate pr-2">
                              {d.name}
                            </span>
                            <span className="font-mono font-bold text-[#0A2540] tabular-nums shrink-0">
                              {d.resolvedComplaints}/{d.totalComplaints} ({resPct}%)
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-[#15803D]"
                              style={{ width: `${resPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h3 className="text-sm font-bold text-[#0A2540]">
                      03. Monthly Complaint Trends (Registered vs Resolved)
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#0A2540]">
                      May – Oct 2026
                    </span>
                  </div>
                  <div className="pt-2">
                    <svg viewBox="0 0 500 170" className="w-full h-40">
                      {[30, 70, 110, 145].map((y) => (
                        <line
                          key={y}
                          x1="30"
                          y1={y}
                          x2="480"
                          y2={y}
                          stroke="#E2E8F0"
                          strokeWidth="1"
                        />
                      ))}
                      {[
                        { m: "May", reg: 85, res: 80, x: 60 },
                        { m: "Jun", reg: 105, res: 96, x: 135 },
                        { m: "Jul", reg: 130, res: 118, x: 210 },
                        { m: "Aug", reg: 122, res: 115, x: 285 },
                        { m: "Sep", reg: 110, res: 104, x: 360 },
                        { m: "Oct", reg: 95, res: 90, x: 435 },
                      ].map((bar) => (
                        <g key={bar.m}>
                          <rect
                            x={bar.x - 14}
                            y={145 - bar.reg}
                            width="12"
                            height={bar.reg}
                            rx="2"
                            fill="#0A2540"
                          />
                          <rect
                            x={bar.x + 2}
                            y={145 - bar.res}
                            width="12"
                            height={bar.res}
                            rx="2"
                            fill="#15803D"
                          />
                          <text
                            x={bar.x}
                            y="163"
                            textAnchor="middle"
                            fontSize="11"
                            fill="#475569"
                            fontFamily="monospace"
                          >
                            {bar.m}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="bg-white border border-slate-300 rounded-md p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h3 className="text-sm font-bold text-[#0A2540]">
                      04. Area-Wise Distribution, Resolution Rate & SLA Speed
                    </h3>
                    <span className="text-xs font-mono text-slate-500">Ward Audit</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-md bg-slate-50 border border-slate-300">
                      <div className="text-xs font-semibold text-slate-600">Overall Resolution Rate</div>
                      <div className="text-2xl font-bold font-mono text-[#15803D] mt-1">
                        92.4%
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        +4.2% vs previous quarter
                      </div>
                    </div>
                    <div className="p-3.5 rounded-md bg-slate-50 border border-slate-300">
                      <div className="text-xs font-semibold text-slate-600">Average Resolution Time</div>
                      <div className="text-2xl font-bold font-mono text-[#0A2540] mt-1">
                        14.6 Hrs
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Down from 38.0 Hrs pre-AI
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-[#0A2540]">
                      Area-Wise Complaint Distribution (Top Municipal Wards)
                    </div>
                    {[
                      { ward: "Ward 7 · Shivaji Nagar & Main Road", count: 412 },
                      { ward: "Ward 12 · MG Road & Camp Central", count: 368 },
                      { ward: "Ward 3 · Kothrud Residential Zone", count: 295 },
                      { ward: "Ward 21 · Hadapsar IT Corridor", count: 264 },
                    ].map((w) => (
                      <div key={w.ward} className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 font-medium">{w.ward}</span>
                        <span className="font-mono font-bold text-[#0A2540]">
                          {w.count} dockets
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#0A2540] font-serif-gov">
                    Active Public Grievance Dockets Requiring Action
                  </h3>
                  <button
                    onClick={() => setActiveSection("complaints")}
                    className="text-xs font-bold text-[#0A2540] hover:underline cursor-pointer"
                  >
                    Open Full Complaint Management Ledger →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b-2 border-slate-300 bg-slate-50 text-[#0A2540] font-bold uppercase">
                        <th className="py-2.5 px-3">Complaint ID</th>
                        <th className="py-2.5 px-3">Citizen</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Priority</th>
                        <th className="py-2.5 px-3">Department</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {complaints.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-mono font-bold text-[#0A2540]">
                            {c.id}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {c.citizenName}
                          </td>
                          <td className="py-3 px-3 text-slate-700">{c.category}</td>
                          <td className="py-3 px-3 font-bold">
                            <span
                              className={
                                c.priority === "Critical"
                                  ? "text-red-700"
                                  : c.priority === "High"
                                  ? "text-[#EA580C]"
                                  : "text-[#0A2540]"
                              }
                            >
                              {c.priority}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-700">{c.department}</td>
                          <td className="py-3 px-3 font-bold text-[#0A2540]">
                            {c.status}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedComplaintId(c.id);
                                setActiveSection("complaint-detail");
                              }}
                              className="px-3 py-1 font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded cursor-pointer"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 15. ADMIN COMPLAINT MANAGEMENT TABLE */}
          {activeSection === "complaints" && (
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
                    Municipal Complaint Management Ledger
                  </h2>
                  <p className="text-xs text-slate-600">
                    Filter by Category, Department, Priority, Status, or Location. Click any docket to assign officers, update status, or close.
                  </p>
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Docket ID, citizen, ward..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-md"
                  >
                    <option value="All">All Categories</option>
                    {COMPLAINT_CATEGORIES_LIST.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Department
                  </label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-md"
                  >
                    <option value="All">All Departments</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-md"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-md"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Department Assigned">Department Assigned</option>
                    <option value="Officer Assigned">Officer Assigned</option>
                    <option value="Work in Progress">Work in Progress</option>
                    <option value="Resolution Submitted">Resolution Submitted</option>
                    <option value="Complaint Closed">Complaint Closed</option>
                    <option value="Reopened">Reopened</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Location / Ward
                  </label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-md"
                  >
                    <option value="All">All Wards</option>
                    <option value="Ward 12">Ward 12 (MG Road)</option>
                    <option value="Ward 7">Ward 7 (Shivaji Nagar)</option>
                    <option value="Ward 3">Ward 3 (Kothrud)</option>
                    <option value="Ward 9">Ward 9 (Baner)</option>
                    <option value="Ward 21">Ward 21 (Hadapsar)</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-50 text-[#0A2540] font-bold uppercase">
                      <th className="py-3 px-3">Complaint ID</th>
                      <th className="py-3 px-3">Citizen</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Priority</th>
                      <th className="py-3 px-3">Department</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredComplaints.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-3 font-mono font-bold text-[#0A2540] whitespace-nowrap">
                          {c.id}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-900">
                          {c.citizenName}
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">{c.category}</td>
                        <td className="py-3.5 px-3 text-slate-600">
                          {c.area}, {c.ward.split(" - ")[0]}
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            value={c.priority}
                            onChange={(e) => {
                              onUpdateComplaint(c.id, {
                                priority: e.target.value as ComplaintPriority,
                              });
                              triggerToast(`Updated ${c.id} priority to ${e.target.value}.`);
                            }}
                            className="px-2 py-1 rounded border border-slate-300 bg-white font-bold text-slate-800"
                          >
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3 text-slate-700 max-w-[170px] truncate">
                          {c.department}
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            value={c.status}
                            onChange={(e) => {
                              onUpdateComplaint(c.id, {
                                status: e.target.value as ComplaintStatus,
                              });
                              triggerToast(`Updated ${c.id} status to ${e.target.value}.`);
                            }}
                            className="px-2 py-1 rounded border border-slate-300 bg-white font-bold text-[#0A2540]"
                          >
                            <option value="Complaint Submitted">Complaint Submitted</option>
                            <option value="AI Analysis Completed">AI Analysis Completed</option>
                            <option value="Department Assigned">Department Assigned</option>
                            <option value="Officer Assigned">Officer Assigned</option>
                            <option value="Work in Progress">Work in Progress</option>
                            <option value="Resolution Submitted">Resolution Submitted</option>
                            <option value="Citizen Verification">Citizen Verification</option>
                            <option value="Complaint Closed">Complaint Closed</option>
                            <option value="Reopened">Reopened</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                          {c.submittedAt.split(" ")[0]}
                        </td>
                        <td className="py-3.5 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedComplaintId(c.id);
                              setActiveSection("complaint-detail");
                            }}
                            className="px-3 py-1.5 font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded transition-colors cursor-pointer"
                          >
                            View / Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 16. COMPLAINT DETAIL ADMIN PAGE */}
          {activeSection === "complaint-detail" && selectedComplaint && (
            <div className="space-y-6">
              <button
                onClick={() => setActiveSection("complaints")}
                className="text-xs font-bold text-[#0A2540] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Complaints</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#EA580C]">
                          {selectedComplaint.id}
                        </span>
                        <h2 className="text-lg font-bold text-[#0A2540] mt-0.5 font-serif-gov">
                          {selectedComplaint.title}
                        </h2>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-600">
                        {selectedComplaint.submittedAt}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedComplaint.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200 text-xs">
                      <div>
                        <span className="text-slate-500 block">Citizen Name</span>
                        <span className="font-bold text-slate-900">
                          {selectedComplaint.citizenName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Contact Mobile</span>
                        <span className="font-mono font-bold text-slate-900">
                          {selectedComplaint.citizenMobile}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Category</span>
                        <span className="font-bold text-[#0A2540]">
                          {selectedComplaint.category}
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-3">
                        <span className="text-slate-500 block">Location & Ward</span>
                        <span className="font-bold text-slate-900">
                          {selectedComplaint.address}, {selectedComplaint.area}, {selectedComplaint.city} - {selectedComplaint.pincode} ({selectedComplaint.ward})
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-600 block mb-2">
                        Citizen Uploaded Evidence
                      </span>
                      <div className="rounded-md overflow-hidden border border-slate-300 bg-slate-900 max-h-64">
                        <img
                          src={selectedComplaint.images[0]}
                          alt={selectedComplaint.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A2540] text-white border-l-4 border-[#EA580C] rounded-md p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-amber-400" />
                        <h3 className="text-sm font-bold">NIVARAN AI Analysis</h3>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">
                        Confidence Score: {selectedComplaint.aiAnalysis.confidence}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-[#06182C] border border-slate-700 p-3 rounded">
                        <span className="text-slate-400 block">Detected Category</span>
                        <span className="font-bold text-white">
                          {selectedComplaint.aiAnalysis.category}
                        </span>
                      </div>
                      <div className="bg-[#06182C] border border-slate-700 p-3 rounded">
                        <span className="text-slate-400 block">Confidence Score</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {selectedComplaint.aiAnalysis.confidence}%
                        </span>
                      </div>
                      <div className="bg-[#06182C] border border-slate-700 p-3 rounded">
                        <span className="text-slate-400 block">AI Priority</span>
                        <span className="font-bold text-amber-400">
                          {selectedComplaint.aiAnalysis.priority}
                        </span>
                      </div>
                      <div className="bg-[#06182C] border border-slate-700 p-3 rounded">
                        <span className="text-slate-400 block">Recommended Dept</span>
                        <span className="font-bold text-white">
                          {selectedComplaint.aiAnalysis.recommendedDepartment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                    <h3 className="text-base font-bold text-[#0A2540] border-b border-slate-200 pb-3 font-serif-gov">
                      Department & Officer Assignment
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Assign / Reassign Department
                        </label>
                        <select
                          value={selectedComplaint.department}
                          onChange={(e) => {
                            onUpdateComplaint(selectedComplaint.id, {
                              department: e.target.value,
                            });
                            triggerToast(`Reassigned ${selectedComplaint.id} to ${e.target.value}`);
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md"
                        >
                          {departments.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Assign Nodal Field Officer
                        </label>
                        <select
                          value={selectedComplaint.assignedOfficer}
                          onChange={(e) => {
                            onUpdateComplaint(selectedComplaint.id, {
                              assignedOfficer: e.target.value,
                            });
                            triggerToast(`Assigned Officer ${e.target.value}`);
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md"
                        >
                          {officers.map((o) => (
                            <option key={o.id} value={o.name}>
                              {o.name} ({o.department.split(" ")[0]})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Change Priority
                          </label>
                          <select
                            value={selectedComplaint.priority}
                            onChange={(e) => {
                              onUpdateComplaint(selectedComplaint.id, {
                                priority: e.target.value as ComplaintPriority,
                              });
                              triggerToast(`Priority updated to ${e.target.value}`);
                            }}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md"
                          >
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Update Status
                          </label>
                          <select
                            value={selectedComplaint.status}
                            onChange={(e) => {
                              onUpdateComplaint(selectedComplaint.id, {
                                status: e.target.value as ComplaintStatus,
                              });
                              triggerToast(`Status updated to ${e.target.value}`);
                            }}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md"
                          >
                            <option value="Department Assigned">Department Assigned</option>
                            <option value="Officer Assigned">Officer Assigned</option>
                            <option value="Work in Progress">Work in Progress</option>
                            <option value="Resolution Submitted">Resolution Submitted</option>
                            <option value="Citizen Verification">Citizen Verification</option>
                            <option value="Complaint Closed">Complaint Closed</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Add Official Engineer / Resolution Remarks
                        </label>
                        <textarea
                          rows={2}
                          value={adminRemarks}
                          onChange={(e) => setAdminRemarks(e.target.value)}
                          placeholder="Enter field inspection notes or resolution compliance proof..."
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            if (!adminRemarks.trim()) {
                              triggerToast("Please enter remarks before saving.");
                              return;
                            }
                            onUpdateComplaint(selectedComplaint.id, {
                              remarks: adminRemarks.trim(),
                            });
                            setAdminRemarks("");
                            triggerToast("Official engineer remarks logged to timeline.");
                          }}
                          className="flex-1 py-2.5 px-3 text-xs font-bold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md cursor-pointer"
                        >
                          Add Remarks
                        </button>
                        <button
                          onClick={() => {
                            onUpdateComplaint(selectedComplaint.id, {
                              status: "Complaint Closed",
                              remarks:
                                adminRemarks.trim() ||
                                "Verified and closed by Municipal Command Center.",
                            });
                            setAdminRemarks("");
                            triggerToast(`Docket ${selectedComplaint.id} marked as Closed.`);
                          }}
                          className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-[#15803D] hover:bg-emerald-800 rounded-md cursor-pointer"
                        >
                          Close Complaint
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                    <h3 className="text-sm font-bold text-[#0A2540] border-b border-slate-200 pb-3">
                      Activity Timeline
                    </h3>
                    <div className="space-y-3 text-xs">
                      {selectedComplaint.timeline.map((t) => (
                        <div
                          key={t.step}
                          className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100 last:border-none"
                        >
                          <div>
                            <span
                              className={`font-bold ${
                                t.completed || t.active
                                  ? "text-[#0A2540]"
                                  : "text-slate-400"
                              }`}
                            >
                              {t.completed ? "✓ " : t.active ? "● " : "○ "}
                              {t.step}
                            </span>
                            {t.note && (
                              <p className="text-slate-600 mt-0.5">{t.note}</p>
                            )}
                          </div>
                          {t.timestamp && (
                            <span className="font-mono text-[11px] text-slate-500 shrink-0">
                              {t.timestamp.split(",")[0]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 17. ADMIN AI ANALYTICS */}
          {activeSection === "ai-analytics" && (
            <div className="space-y-6">
              <div className="bg-[#0A2540] text-white border-b-4 border-[#EA580C] rounded-md p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-5">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase">
                      ICCC PREDICTIVE GOVERNANCE ENGINE
                    </span>
                    <h2 className="text-2xl font-bold mt-1 font-serif-gov">
                      Smart City AI Analytics & Predictive Insights
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#06182C] border border-slate-700 rounded-md p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>Predictive Trend Alert</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      “Garbage-related complaints increased by 24% in Zone 3 this month.”
                    </p>
                    <p className="text-xs text-slate-300">
                      Directive: Deploy 2 additional compactor trucks on Kothrud morning route.
                    </p>
                  </div>

                  <div className="bg-[#06182C] border border-slate-700 rounded-md p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                      <MapPin className="w-4 h-4" />
                      <span>Hotspot Detection</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      “Ward 7 has the highest concentration of road-related complaints.”
                    </p>
                    <p className="text-xs text-slate-300">
                      Directive: Schedule preventive hot-mix resurfacing along Main Road & Hospital corridor.
                    </p>
                  </div>

                  <div className="bg-[#06182C] border border-slate-700 rounded-md p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Priority Prediction</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      “Drainage desilting in Ward 21 predicted to cut monsoon flooding tickets by 68%.”
                    </p>
                    <p className="text-xs text-slate-300">
                      Directive: Pre-monsoon jetting deployment in Hadapsar IT Corridor.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#0A2540] font-serif-gov">
                    AI Complaint Trends (Increasing vs Decreasing Categories)
                  </h3>
                  <div className="space-y-3 text-xs">
                    {[
                      {
                        cat: "Garbage & Waste (Zone 3)",
                        trend: "+24% Surge",
                        status: "Increasing",
                        color: "text-red-700",
                      },
                      {
                        cat: "Road & Potholes (Ward 7 & 12)",
                        trend: "+18% Post-Rain",
                        status: "Increasing",
                        color: "text-[#EA580C]",
                      },
                      {
                        cat: "Water Supply Leakage (Ward 9)",
                        trend: "-14% Reduction",
                        status: "Stabilizing",
                        color: "text-[#15803D]",
                      },
                      {
                        cat: "Street Lights Outage (City-Wide)",
                        trend: "-31% Reduction",
                        status: "Improving",
                        color: "text-[#15803D]",
                      },
                    ].map((row) => (
                      <div
                        key={row.cat}
                        className="p-3.5 rounded bg-slate-50 border border-slate-300 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-[#0A2540]">{row.cat}</div>
                          <div className="text-slate-500 mt-0.5">
                            AI Anomaly Status: {row.status}
                          </div>
                        </div>
                        <span className={`font-mono font-bold ${row.color}`}>
                          {row.trend}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
                  <h3 className="text-base font-bold text-[#0A2540] font-serif-gov">
                    Department Performance & SLA Comparison
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b-2 border-slate-300 bg-slate-50 text-[#0A2540] font-bold uppercase">
                          <th className="py-2.5 px-2">Department</th>
                          <th className="py-2.5 px-2">Avg Response</th>
                          <th className="py-2.5 px-2 text-right">SLA Compliance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {departments.map((d) => (
                          <tr key={d.id}>
                            <td className="py-3 px-2 font-bold text-slate-900">
                              {d.name}
                            </td>
                            <td className="py-3 px-2 font-mono text-slate-700">
                              {d.avgResponseTime}
                            </td>
                            <td className="py-3 px-2 text-right font-mono font-bold text-[#15803D]">
                              {d.slaComplianceRate}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEPARTMENTS SUB-VIEW */}
          {activeSection === "departments" && (
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
                Connected Municipal Departments Directory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map((d) => (
                  <div
                    key={d.id}
                    className="p-4 rounded-md border border-slate-300 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0A2540]">{d.name}</span>
                      <span className="text-xs font-mono font-bold text-[#EA580C]">
                        {d.shortCode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{d.description}</p>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200 font-mono">
                      <span>Total: {d.totalComplaints}</span>
                      <span className="text-[#15803D] font-bold">
                        Resolved: {d.resolvedComplaints}
                      </span>
                      <span>SLA: {d.avgResponseTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OFFICERS SUB-VIEW */}
          {activeSection === "officers" && (
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
                Nodal Field Officers & Engineers Roster
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-50 text-[#0A2540] font-bold uppercase">
                      <th className="py-3 px-3">Officer ID</th>
                      <th className="py-3 px-3">Name & Designation</th>
                      <th className="py-3 px-3">Department</th>
                      <th className="py-3 px-3">Assigned Ward</th>
                      <th className="py-3 px-3">Active / Resolved</th>
                      <th className="py-3 px-3 text-right">Field Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {officers.map((o) => (
                      <tr key={o.id}>
                        <td className="py-3.5 px-3 font-mono font-bold text-[#0A2540]">
                          {o.id}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-900">{o.name}</div>
                          <div className="text-slate-500">{o.designation}</div>
                        </td>
                        <td className="py-3.5 px-3 text-slate-700">{o.department}</td>
                        <td className="py-3.5 px-3 text-slate-700">{o.ward}</td>
                        <td className="py-3.5 px-3 font-mono">
                          {o.activeCases} active · {o.resolvedCases} closed
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-[#15803D]">
                          {o.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USERS SUB-VIEW */}
          {activeSection === "users" && (
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
                Registered Citizens Directory
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-50 text-[#0A2540] font-bold uppercase">
                      <th className="py-3 px-3">Citizen Name</th>
                      <th className="py-3 px-3">Mobile Number</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Ward / Locality</th>
                      <th className="py-3 px-3 text-right">Latest Docket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {complaints.map((c) => (
                      <tr key={c.id}>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          {c.citizenName}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-700">
                          {c.citizenMobile}
                        </td>
                        <td className="py-3 px-3 text-slate-600">{c.citizenEmail}</td>
                        <td className="py-3 px-3 text-slate-700">
                          {c.area} ({c.ward})
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-[#0A2540] font-bold">
                          {c.id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* REPORTS, NOTIFICATIONS & SETTINGS */}
          {(activeSection === "reports" ||
            activeSection === "notifications" ||
            activeSection === "settings") && (
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0A2540] capitalize font-serif-gov">
                    Municipal {activeSection} Center
                  </h2>
                  <p className="text-xs text-slate-600">
                    Integrated Command & Control Centre (ICCC) Governance Module
                  </p>
                </div>
                <button
                  onClick={handleExportCsv}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md cursor-pointer"
                >
                  Download Full Audit CSV
                </button>
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-md bg-slate-50 border border-slate-300 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#0A2540]">🔔 {n.title}: </span>
                      <span className="text-slate-700">{n.message}</span>
                    </div>
                    <span className="font-mono text-slate-500 shrink-0 ml-4">
                      {n.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

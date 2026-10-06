import React, { useState } from "react";
import {
  PlusCircle,
  Bell,
  UserCheck,
  Landmark,
} from "lucide-react";
import { Complaint, NotificationItem, UserAccount } from "../types";
import { ActivePage } from "./Navbar";

interface CitizenDashboardProps {
  user: UserAccount;
  complaints: Complaint[];
  notifications: NotificationItem[];
  onNavigate: (page: ActivePage, param?: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  user,
  complaints,
  notifications,
  onNavigate,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const myComplaints = complaints;

  const totalCount = myComplaints.length;
  const pendingCount = myComplaints.filter(
    (c) =>
      c.status === "Complaint Submitted" ||
      c.status === "AI Analysis Completed" ||
      c.status === "Department Assigned"
  ).length;
  const inProgressCount = myComplaints.filter(
    (c) =>
      c.status === "Officer Assigned" ||
      c.status === "Work in Progress" ||
      c.status === "Resolution Submitted"
  ).length;
  const resolvedCount = myComplaints.filter(
    (c) => c.status === "Complaint Closed" || c.status === "Citizen Verification"
  ).length;
  const reopenedCount = myComplaints.filter((c) => c.status === "Reopened").length;

  const filteredList = myComplaints.filter((c) => {
    if (statusFilter === "All") return true;
    if (statusFilter === "Pending") {
      return (
        c.status === "Complaint Submitted" ||
        c.status === "AI Analysis Completed" ||
        c.status === "Department Assigned"
      );
    }
    if (statusFilter === "In Progress") {
      return (
        c.status === "Officer Assigned" ||
        c.status === "Work in Progress" ||
        c.status === "Resolution Submitted"
      );
    }
    if (statusFilter === "Resolved") {
      return c.status === "Complaint Closed";
    }
    if (statusFilter === "Reopened") {
      return c.status === "Reopened";
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Official Citizen Desk Banner */}
      <div className="bg-[#0A2540] text-white border-b-4 border-[#EA580C] rounded-md p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <UserCheck className="w-4 h-4" />
            <span>VERIFIED CITIZEN PROFILE · {user.ward || "Ward 12 - Central"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-gov">
            Welcome, {user.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200">
            Audit your registered civic grievances, verify municipal field work, and receive official SMS/Portal dispatches.
          </p>
        </div>

        <button
          onClick={() => onNavigate("submit")}
          className="px-5 py-3 text-sm font-bold text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md shadow-sm transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Report New Complaint</span>
        </button>
      </div>

      {/* 5 Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <button
          onClick={() => setStatusFilter("All")}
          className={`text-left p-5 rounded-md border transition-all cursor-pointer ${
            statusFilter === "All"
              ? "bg-white border-2 border-[#0A2540]"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="text-xs font-bold text-slate-600">My Complaints</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Total Dockets</div>
        </button>

        <button
          onClick={() => setStatusFilter("Pending")}
          className={`text-left p-5 rounded-md border transition-all cursor-pointer ${
            statusFilter === "Pending"
              ? "bg-white border-2 border-[#0A2540]"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="text-xs font-bold text-[#B45309]">Pending</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
            {pendingCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Assigned / Queued</div>
        </button>

        <button
          onClick={() => setStatusFilter("In Progress")}
          className={`text-left p-5 rounded-md border transition-all cursor-pointer ${
            statusFilter === "In Progress"
              ? "bg-white border-2 border-[#0A2540]"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="text-xs font-bold text-[#1E3A8A]">In Progress</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
            {inProgressCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Field Work Active</div>
        </button>

        <button
          onClick={() => setStatusFilter("Resolved")}
          className={`text-left p-5 rounded-md border transition-all cursor-pointer ${
            statusFilter === "Resolved"
              ? "bg-white border-2 border-[#0A2540]"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="text-xs font-bold text-[#15803D]">Resolved</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
            {resolvedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Verified & Closed</div>
        </button>

        <button
          onClick={() => setStatusFilter("Reopened")}
          className={`text-left p-5 rounded-md border transition-all cursor-pointer ${
            statusFilter === "Reopened"
              ? "bg-white border-2 border-[#0A2540]"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="text-xs font-bold text-red-700">Reopened</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#0A2540] mt-1">
            {reopenedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Escalated Appeal</div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-slate-300 rounded-md p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
                Recent Complaints ({filteredList.length})
              </h2>
              <p className="text-xs text-slate-600">
                Select any docket to inspect the 8-stage timeline or submit citizen verification feedback.
              </p>
            </div>
            {statusFilter !== "All" && (
              <button
                onClick={() => setStatusFilter("All")}
                className="text-xs font-bold text-[#0A2540] hover:underline"
              >
                Show All ({statusFilter})
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold text-[#0A2540] uppercase">
                  <th className="py-3 px-3">Complaint ID</th>
                  <th className="py-3 px-3">Category & Subject</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {filteredList.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#0A2540] whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {c.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {c.category} · {c.department}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-xs text-slate-600 whitespace-nowrap">
                      {c.submittedAt.split(" ")[0]}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-xs text-[#0A2540] whitespace-nowrap">
                      {c.status}
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate("track", c.id)}
                        className="px-3 py-1.5 text-xs font-bold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors cursor-pointer"
                      >
                        Track / Verify →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-300 rounded-md p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#EA580C]" />
              <h2 className="text-base font-bold text-[#0A2540] font-serif-gov">
                Official Dispatches
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">SMS & Portal</span>
          </div>

          <div className="divide-y divide-slate-200 space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onNavigate("track", n.complaintId)}
                className="pt-3 first:pt-0 cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-[#0A2540] group-hover:text-[#EA580C]">
                    🔔 {n.title}
                  </span>
                  <span className="font-mono">{n.timestamp}</span>
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import {
  Wrench,
  Trash2,
  Droplets,
  Lightbulb,
  Waves,
  Trees,
  ArrowRight,
  Phone,
  Mail,
  UserCheck,
  X,
  Landmark,
} from "lucide-react";
import { Department, Complaint } from "../types";
import { ActivePage } from "./Navbar";

interface DepartmentsPageProps {
  departments: Department[];
  complaints: Complaint[];
  onNavigate: (page: ActivePage, param?: string) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  departments,
  complaints,
  onNavigate,
}) => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const deptIcons: Record<string, React.ReactNode> = {
    "dept-pwd": <Wrench className="w-6 h-6 text-[#0A2540]" />,
    "dept-sanitation": <Trash2 className="w-6 h-6 text-[#15803D]" />,
    "dept-water": <Droplets className="w-6 h-6 text-[#0369A1]" />,
    "dept-electrical": <Lightbulb className="w-6 h-6 text-[#B45309]" />,
    "dept-drainage": <Waves className="w-6 h-6 text-[#1E3A8A]" />,
    "dept-env": <Trees className="w-6 h-6 text-[#15803D]" />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Official Header */}
      <div className="bg-white border border-slate-300 border-l-4 border-l-[#0A2540] rounded-md p-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>Municipal Corporation Directorate · Connected Wings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
            Smart City Nodal Departments
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Official directory of municipal departments integrated with the NIVARAN AI automated routing and Citizen Charter SLA system.
          </p>
        </div>
        <button
          onClick={() => onNavigate("submit")}
          className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors self-start md:self-auto cursor-pointer whitespace-nowrap"
        >
          Lodge Grievance with Nodal Wing →
        </button>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const resolutionPct = Math.round(
            (dept.resolvedComplaints / dept.totalComplaints) * 100
          );

          return (
            <div
              key={dept.id}
              className="bg-white border border-slate-300 rounded-md p-6 flex flex-col justify-between hover:border-[#0A2540] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                    {deptIcons[dept.id] || <Wrench className="w-6 h-6 text-[#0A2540]" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    CODE: {dept.shortCode}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
                    {dept.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-center">
                  <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
                    <div className="text-sm font-mono font-bold text-[#0A2540] tabular-nums">
                      {dept.totalComplaints.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500">Total Dockets</div>
                  </div>
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded p-2.5">
                    <div className="text-sm font-mono font-bold text-[#15803D] tabular-nums">
                      {dept.resolvedComplaints.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-[#15803D]">
                      Resolved ({resolutionPct}%)
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded p-2.5">
                    <div className="text-sm font-mono font-bold text-[#0A2540] tabular-nums">
                      {dept.avgResponseTime}
                    </div>
                    <div className="text-[11px] text-slate-500">Avg SLA</div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#0A2540]" />
                    <span className="truncate font-medium">{dept.headOfficer}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#0A2540]" />
                    <span>Helpline: {dept.helpline}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedDept(dept)}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors cursor-pointer"
                >
                  View Department
                </button>
                <button
                  onClick={() =>
                    onNavigate("submit", dept.categoriesCovered[0] || "Road & Potholes")
                  }
                  className="py-2.5 px-3.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                  title="Report Issue to this Department"
                >
                  <span>Lodge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-300 rounded-md max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#EA580C]">
                  {selectedDept.shortCode} · SLA COMPLIANCE: {selectedDept.slaComplianceRate}%
                </span>
                <h2 className="text-xl font-bold text-[#0A2540] mt-1 font-serif-gov">
                  {selectedDept.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedDept.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-300 rounded-md p-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block">Nodal Head of Department</span>
                <span className="font-bold text-[#0A2540]">{selectedDept.headOfficer}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Average Response Time</span>
                <span className="font-mono font-bold text-[#0A2540]">
                  {selectedDept.avgResponseTime}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Control Room Email</span>
                <span className="font-mono text-slate-800 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {selectedDept.contactEmail}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Toll-Free Helpline</span>
                <span className="font-mono text-slate-800 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {selectedDept.helpline}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Public Dockets Assigned to {selectedDept.shortCode}
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-300 rounded-md">
                {complaints
                  .filter((c) => c.department === selectedDept.name)
                  .map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 flex items-center justify-between gap-4 text-xs hover:bg-slate-50"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#0A2540]">{c.id}</span>
                        <span className="mx-2 text-slate-300">·</span>
                        <span className="font-semibold text-slate-900">{c.title}</span>
                        <div className="text-slate-500 mt-0.5">
                          {c.area}, {c.city} · Nodal Officer: {c.assignedOfficer}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedDept(null);
                          onNavigate("track", c.id);
                        }}
                        className="px-3 py-1.5 font-bold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md shrink-0 cursor-pointer"
                      >
                        Audit →
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedDept(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const cat = selectedDept.categoriesCovered[0] || "Road & Potholes";
                  setSelectedDept(null);
                  onNavigate("submit", cat);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md cursor-pointer"
              >
                Lodge Grievance with {selectedDept.shortCode}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

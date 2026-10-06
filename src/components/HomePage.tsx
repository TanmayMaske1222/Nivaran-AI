import React from "react";
import {
  ArrowRight,
  Search,
  BrainCircuit,
  Camera,
  AlertTriangle,
  GitFork,
  CopyCheck,
  BarChart3,
  CheckCircle2,
  MapPin,
  Building2,
  FileText,
  Wrench,
  Trash2,
  Lightbulb,
  Droplets,
  Waves,
  Trees,
  TrafficCone,
  Zap,
  Compass,
  Landmark,
} from "lucide-react";
import { ActivePage } from "./Navbar";
import { COMPLAINT_CATEGORIES_LIST } from "../data/mockData";
import { Complaint } from "../types";

interface HomePageProps {
  onNavigate: (page: ActivePage, param?: string) => void;
  complaints: Complaint[];
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, complaints }) => {
  const categoryIcons: Record<string, React.ReactNode> = {
    "Road & Potholes": <Wrench className="w-5 h-5 text-[#0A2540]" />,
    "Garbage & Waste": <Trash2 className="w-5 h-5 text-[#15803D]" />,
    "Street Lights": <Lightbulb className="w-5 h-5 text-[#B45309]" />,
    "Water Supply": <Droplets className="w-5 h-5 text-[#0369A1]" />,
    Drainage: <Waves className="w-5 h-5 text-[#1E3A8A]" />,
    "Public Environment": <Trees className="w-5 h-5 text-[#15803D]" />,
    "Traffic & Signals": <TrafficCone className="w-5 h-5 text-[#EA580C]" />,
    "Public Infrastructure": <Building2 className="w-5 h-5 text-[#0A2540]" />,
    Electricity: <Zap className="w-5 h-5 text-[#B45309]" />,
    "Other Civic Issues": <Compass className="w-5 h-5 text-[#0A2540]" />,
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. INSTITUTIONAL GOVERNMENT HERO SECTION */}
      <section className="relative bg-[#0A2540] text-white border-b-4 border-[#EA580C]">
        {/* Official Operational Sub-Banner inside Hero */}
        <div className="bg-[#06182C] border-b border-slate-700/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium">
                Government of India · Smart Cities Mission · Integrated Civic Grievance Redressal System
              </span>
            </div>
            <div className="font-mono text-[11px] text-amber-400">
              Citizen Charter SLA Mandate · 24×7 Toll-Free: 1800-233-155304
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Official Proposition & Direct Citizen Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 border-l-2 border-[#EA580C] pl-3">
                NIVARAN AI · “Your Complaint, Our Solution.”
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white balance-text leading-tight font-serif-gov">
                Report. Track. <span className="text-amber-400">Resolve.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                An AI-powered civic complaint platform that connects citizens with the right department, prioritizes issues intelligently, and helps authorities resolve complaints faster under strict municipal SLA accountability.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate("submit")}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Report a Complaint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate("track")}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Track Complaint Status</span>
                </button>
              </div>

              {/* Official Sample Docket Numbers */}
              <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Verify Public Docket IDs:</span>
                {["NVR-2026-10452", "NVR-2026-10021", "NVR-2026-10389"].map((id, idx) => (
                  <React.Fragment key={id}>
                    {idx > 0 && <span aria-hidden="true">·</span>}
                    <button
                      onClick={() => onNavigate("track", id)}
                      className="font-mono text-amber-300 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      {id}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Column: Official 4-Stage Automated Processing Ledger */}
            <div className="lg:col-span-5">
              <div className="bg-white text-slate-900 border-2 border-slate-300 rounded-md p-6 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
                  <div>
                    <h2 className="text-sm font-bold text-[#0A2540] uppercase tracking-wide">
                      Automated Grievance Processing Protocol
                    </h2>
                    <p className="text-xs text-slate-600">
                      Citizen → AI Analysis → Department → Resolution
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#15803D]">
                    ACTIVE SLA
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Stage 1: Citizen */}
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="p-2 rounded bg-[#0A2540] text-white shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-[#0A2540]">01. Citizen Filing</span>
                        <span className="font-mono">Geo-Tagged Docket</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">
                        “Deep pothole near MG Road Metro Pillar 114 causing commuter risk…”
                      </p>
                    </div>
                  </div>

                  {/* Stage 2: AI Analysis */}
                  <div className="p-3 rounded-md bg-blue-50/70 border border-blue-200 flex items-start gap-3">
                    <div className="p-2 rounded bg-[#1E3A8A] text-white shrink-0">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1E3A8A]">02. NIVARAN AI Triage</span>
                        <span className="font-mono font-semibold text-[#1E3A8A]">96% Confidence</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">
                        Detected: Pothole · Category: Road & Infrastructure · Priority: High
                      </p>
                    </div>
                  </div>

                  {/* Stage 3: Department */}
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <div className="p-2 rounded bg-slate-800 text-white shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-slate-900">03. Nodal Dispatch</span>
                        <span className="font-mono">SLA: 24–48 Hrs</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">
                        Routed to Public Works Department (PWD) · Er. Rajesh Deshmukh
                      </p>
                    </div>
                  </div>

                  {/* Stage 4: Resolution */}
                  <div className="p-3 rounded-md bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                    <div className="p-2 rounded bg-[#15803D] text-white shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#15803D]">04. Verified Closure</span>
                        <span className="font-mono font-semibold text-[#15803D]">Citizen Signed Off</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">
                        Resurfacing completed with geo-tagged engineer compliance report.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HOME PAGE OFFICIAL STATISTICS LEDGER */}
          <div className="mt-12 pt-8 border-t border-slate-700/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#06182C] border border-slate-700 rounded-md p-5">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
                12,500+
              </div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold">
                Complaints Registered
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Across 24 Municipal Wards
              </div>
            </div>

            <div className="bg-[#06182C] border border-slate-700 rounded-md p-5">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-amber-400">
                9,850+
              </div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold">
                Complaints Resolved
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Citizen-verified closures
              </div>
            </div>

            <div className="bg-[#06182C] border border-slate-700 rounded-md p-5">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
                32
              </div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold">
                Departments Connected
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Unified ICCC Directorate
              </div>
            </div>

            <div className="bg-[#06182C] border border-slate-700 rounded-md p-5">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-400">
                92%
              </div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold">
                Resolution Rate
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Within Citizen Charter SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW NIVARAN AI WORKS (5-STEP CITIZEN CHARTER WORKFLOW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-[#0A2540] pl-4 max-w-2xl">
          <p className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
            Standard Operating Procedure (SOP)
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
            How NIVARAN AI Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Five-stage institutional redressal workflow from citizen grievance registration to verified field closure.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: "Step 1 – Report",
              title: "Lodge Grievance",
              desc: "Citizen submits complaint using text description, photo evidence, and ward location.",
            },
            {
              step: "Step 2 – AI Analysis",
              title: "AI Classification",
              desc: "AI analyzes the complaint and identifies the issue category and public safety priority.",
            },
            {
              step: "Step 3 – Smart Routing",
              title: "Nodal Dispatch",
              desc: "Complaint is automatically assigned to the responsible municipal department.",
            },
            {
              step: "Step 4 – Track",
              title: "Real-Time Audit",
              desc: "Citizen can track the complaint status and assigned officer actions in real time.",
            },
            {
              step: "Step 5 – Resolve",
              title: "Citizen Verification",
              desc: "Authority resolves the issue and citizen verifies the resolution before closure.",
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="bg-white border border-slate-300 rounded-md p-5 flex flex-col justify-between hover:border-[#0A2540] transition-colors"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#EA580C]">
                  STAGE 0{index + 1} · {item.step}
                </div>
                <h3 className="text-base font-bold text-[#0A2540] mt-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Citizen Charter</span>
                <span className="font-mono font-semibold text-[#0A2540]">Mandated</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI FEATURES SECTION (Powered by Artificial Intelligence) */}
      <section className="bg-white border-y border-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="border-l-4 border-[#EA580C] pl-4 max-w-2xl">
              <p className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                National Digital Public Infrastructure
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
                Powered by Artificial Intelligence
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Automated decision-support modules deployed at the Integrated Command & Control Centre (ICCC).
              </p>
            </div>
            <button
              onClick={() => onNavigate("submit")}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors self-start md:self-auto whitespace-nowrap cursor-pointer"
            >
              Launch AI Grievance Filing →
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#0A2540] text-white flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                AI Complaint Classification
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automatically identify complaint categories from citizen descriptions using natural language understanding.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#0A2540] text-white flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Image-Based Issue Detection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Analyze uploaded images to identify problems such as potholes, garbage accumulation, water leaks, and damaged infrastructure.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#EA580C] text-white flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Smart Priority Detection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Determine complaint priority based on structural severity, hospital/school zone proximity, and public impact.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#0A2540] text-white flex items-center justify-center">
                <GitFork className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Automatic Department Routing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Send complaints to the appropriate municipal department and ward engineer automatically without manual clerical delay.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#15803D] text-white flex items-center justify-center">
                <CopyCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Duplicate Complaint Detection
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Identify multiple complaints referring to the same geo-spatial issue and link them under a master work order.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#0A2540] text-white flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Smart Analytics
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generate ward-level hotspot insights and SLA compliance audits from complaint data to help authorities make better decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLAINT CATEGORIES (10 MUNICIPAL GRIEVANCE SCHEDULES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="border-l-4 border-[#0A2540] pl-4">
            <p className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
              Municipal Citizen Charter Schedules
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
              Civic Complaint Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Select a category below to lodge an official geo-tagged grievance directly with the nodal wing.
            </p>
          </div>
          <button
            onClick={() => onNavigate("departments")}
            className="text-sm font-bold text-[#0A2540] hover:underline flex items-center gap-1 whitespace-nowrap cursor-pointer"
          >
            <span>View All 32 Connected Departments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COMPLAINT_CATEGORIES_LIST.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate("submit", cat.name)}
              className="group bg-white border border-slate-300 hover:border-[#0A2540] rounded-md p-5 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
                  {categoryIcons[cat.name] || <MapPin className="w-5 h-5 text-[#0A2540]" />}
                </div>
                <h3 className="text-sm font-bold text-[#0A2540] mt-3.5 group-hover:text-[#EA580C] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>SLA: {cat.sla}</span>
                <span className="font-mono font-bold text-[#0A2540]">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PUBLIC GRIEVANCE DISCLOSURE LEDGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0A2540] font-serif-gov">
                Public Grievance Disclosure & SLA Ledger
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Proactive disclosure under Section 4 of the Right to Information (RTI) & Smart City Citizen Charter.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("map")}
                className="px-4 py-2 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors cursor-pointer"
              >
                Open GIS Ward Map
              </button>
              <button
                onClick={() => onNavigate("track")}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors cursor-pointer"
              >
                Search Docket ID
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50 text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                  <th className="py-3 px-3">Docket ID</th>
                  <th className="py-3 px-3">Subject & Category</th>
                  <th className="py-3 px-3">Municipal Ward</th>
                  <th className="py-3 px-3">Nodal Department</th>
                  <th className="py-3 px-3">Priority</th>
                  <th className="py-3 px-3">Current Status</th>
                  <th className="py-3 px-3 text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {complaints.slice(0, 5).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-mono font-bold text-[#0A2540] whitespace-nowrap">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-900 line-clamp-1">{c.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {c.category} · AI Confidence: <span className="font-mono">{c.aiAnalysis.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-700 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{c.area}, {c.city}</div>
                      <div className="text-slate-500">{c.ward}</div>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-700 font-medium">
                      {c.department}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs font-bold">
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
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs font-semibold text-slate-900">
                      {c.status}
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate("track", c.id)}
                        className="text-xs font-bold text-[#0A2540] hover:text-[#EA580C] underline cursor-pointer"
                      >
                        View Docket →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

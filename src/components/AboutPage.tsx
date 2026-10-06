import React from "react";
import {
  BrainCircuit,
  ShieldCheck,
  Target,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Users,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { ActivePage } from "./Navbar";

interface AboutPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-20">
      {/* Official Institutional Hero Banner */}
      <section className="bg-[#0A2540] text-white py-14 border-b-4 border-[#EA580C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Citizen Charter & Mission Directorate · NIVARAN AI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl balance-text font-serif-gov">
            Making Civic Governance Smarter with AI
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            NIVARAN AI is designed to bridge the gap between citizens and municipal authorities by transforming public grievances into structured, prioritized, and time-bound departmental work orders.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-300 border-t-4 border-t-[#EA580C] rounded-md p-8 space-y-3">
            <div className="w-10 h-10 rounded bg-slate-100 text-[#0A2540] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
              Our Mission
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] leading-snug font-serif-gov">
              “To make civic complaint resolution faster, transparent and citizen-centric.”
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Eliminating manual clerical sorting bottlenecks, opaque paper trails, and unverified closures through automated AI classification and mandatory citizen verification.
            </p>
          </div>

          <div className="bg-white border border-slate-300 border-t-4 border-t-[#15803D] rounded-md p-8 space-y-3">
            <div className="w-10 h-10 rounded bg-slate-100 text-[#15803D] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-[#15803D] uppercase tracking-wider">
              Our Vision
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540] leading-snug font-serif-gov">
              “To build smarter cities where every genuine civic complaint receives timely attention and resolution.”
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Empowering Urban Local Bodies (ULBs) and Smart City Integrated Command & Control Centres (ICCC) with predictive analytics and geo-spatial accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Problem vs Our Solution vs AI Innovation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
            <div className="w-10 h-10 rounded bg-red-50 text-red-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0A2540]">
              01. The Civic Problem
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
              <li>• Citizens often do not know which of the 30+ municipal departments handles a specific issue.</li>
              <li>• Manual sorting leads to 48–72 hour delays before a field engineer even views the ticket.</li>
              <li>• Critical hazards (open manholes, live wires, arterial potholes) get buried under routine requests.</li>
              <li>• Lack of real-time tracking erodes public trust when complaints are closed without ground repair.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
            <div className="w-10 h-10 rounded bg-emerald-50 text-[#15803D] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0A2540]">
              02. Our Solution
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
              <li>• Unified single-window reporting with geo-tagged photo evidence and live GPS coordinates.</li>
              <li>• Zero-touch routing straight to the responsible ward engineer’s console within seconds.</li>
              <li>• 8-stage transparent tracking ledger accessible via unique Docket IDs (e.g., NVR-2026-10452).</li>
              <li>• Two-way citizen verification allowing citizens to rate or reopen unsatisfactory closures.</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
            <div className="w-10 h-10 rounded bg-slate-100 text-[#0A2540] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0A2540]">
              03. AI Innovation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed">
              <li>• Multimodal NLP + Computer Vision inspection of both citizen descriptions and street photos.</li>
              <li>• Dynamic Priority Calibration considering hospital/school proximity and public safety impact.</li>
              <li>• Spatial Duplicate Clustering to group multiple reports of the same pothole or pipeline burst.</li>
              <li>• Predictive Ward Hotspot Analytics alerting commissioners before monsoon or seasonal spikes.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Citizen Benefits & Government Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#0A2540] font-bold text-base">
              <Users className="w-5 h-5 text-[#EA580C]" />
              <span>Citizen Benefits</span>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] font-serif-gov">
              Effortless Reporting & Guaranteed Accountability
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>No Departmental Confusion:</strong> Simply upload a photo and describe the problem—NIVARAN AI identifies whether PWD, Sanitation, Jal Board, or Electrical is responsible.
              </p>
              <p>
                <strong>End-to-End Visibility:</strong> Track every milestone from AI Analysis and Officer Assignment to Field Work in Progress.
              </p>
              <p>
                <strong>Citizen Verification Power:</strong> Authorities cannot unilaterally close grievances without giving the citizen an opportunity to verify and rate the resolution.
              </p>
            </div>
          </div>

          <div className="space-y-4 lg:border-l lg:border-slate-200 lg:pl-10">
            <div className="flex items-center gap-2.5 text-[#0A2540] font-bold text-base">
              <Building2 className="w-5 h-5 text-[#15803D]" />
              <span>Government & Municipal Benefits</span>
            </div>
            <h3 className="text-xl font-bold text-[#0A2540] font-serif-gov">
              Data-Driven Urban Governance & SLA Compliance
            </h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>85% Faster Triage:</strong> Eliminates manual clerical sorting across thousands of daily civic tickets.
              </p>
              <p>
                <strong>Smart Resource Allocation:</strong> Focuses emergency repair squads on Critical & High priority hazards first.
              </p>
              <p>
                <strong>Executive Command Dashboard:</strong> Real-time visibility into ward-wise backlogs, officer workloads, and preventive maintenance trends.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-[#0A2540] text-white border-l-4 border-[#EA580C] rounded-md p-6 sm:p-8">
          <div>
            <h3 className="text-xl font-bold font-serif-gov">
              Access NIVARAN AI Citizen & ICCC Services
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Lodge an official public grievance or inspect the Municipal Command Center dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("submit")}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold bg-[#EA580C] text-white hover:bg-[#C2410C] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Lodge Public Grievance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("admin")}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Open ICCC Admin Console</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from "react";
import { NivaranLogo, ActivePage } from "./Navbar";

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A2540] text-slate-300 border-t-4 border-[#EA580C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700/80">
          {/* Column 1: Institutional Identity */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <NivaranLogo className="w-9 h-9" />
              <div>
                <span className="text-lg font-bold tracking-tight text-white font-serif-gov block leading-none">
                  NIVARAN AI
                </span>
                <span className="text-[11px] text-amber-400 font-medium">
                  “Your Complaint, Our Solution.”
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              National Smart City Mission · Centralized Public Grievance Redressal & AI Monitoring System (CPGRAMS-Urban).
            </p>
            <p className="text-[11px] font-mono text-slate-400">
              Ministry of Housing & Urban Affairs · Digital Public Infrastructure
            </p>
          </div>

          {/* Column 2: Citizen Services */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3 border-l-2 border-[#EA580C] pl-2">
              Citizen Services
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Portal Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("submit")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Lodge Public Grievance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("track")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Check Grievance Status
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("map")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Municipal GIS Grievance Map
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional & Nodal */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3 border-l-2 border-[#EA580C] pl-2">
              Institutional Directory
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => onNavigate("about")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Citizen Charter & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("departments")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  Nodal Municipal Departments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("admin")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  ICCC Command Center (Admin)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("auth")} className="hover:text-white hover:underline transition-colors cursor-pointer">
                  e-Pramaan / Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Nodal Control Room */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3 border-l-2 border-[#EA580C] pl-2">
              24×7 Municipal Control Room
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Integrated Command & Control Centre (ICCC), Smart City Mission Directorate
            </p>
            <p className="text-sm font-mono font-bold text-amber-400 mb-3">
              Toll-Free Helpline: 1800-233-155304
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <button onClick={() => onNavigate("about")} className="hover:text-white underline cursor-pointer">
                Privacy Policy
              </button>
              <span>·</span>
              <button onClick={() => onNavigate("about")} className="hover:text-white underline cursor-pointer">
                Citizen Charter SLA
              </button>
              <span>·</span>
              <button onClick={() => onNavigate("about")} className="hover:text-white underline cursor-pointer">
                Terms
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 NIVARAN AI — National Smart City Civic Redressal Portal. All Rights Reserved.</p>
          <p className="font-mono text-[11px] text-slate-400">
            Compliant with GIGW (Guidelines for Indian Government Websites) & WCAG 2.1 AA
          </p>
        </div>
      </div>
    </footer>
  );
};

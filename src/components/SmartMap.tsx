import React, { useState } from "react";
import {
  MapPin,
  ArrowRight,
  AlertTriangle,
  Compass,
  Landmark,
} from "lucide-react";
import { Complaint } from "../types";
import { ActivePage } from "./Navbar";

interface SmartMapProps {
  complaints: Complaint[];
  onNavigate: (page: ActivePage, param?: string) => void;
}

type MapFilter =
  | "All"
  | "High Priority"
  | "Roads"
  | "Garbage"
  | "Water"
  | "Electricity"
  | "Drainage";

export const SmartMap: React.FC<SmartMapProps> = ({ complaints, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<MapFilter>("All");
  const [selectedMarker, setSelectedMarker] = useState<Complaint | null>(
    complaints[0] || null
  );

  const filterList: MapFilter[] = [
    "All",
    "High Priority",
    "Roads",
    "Garbage",
    "Water",
    "Electricity",
    "Drainage",
  ];

  const filteredComplaints = complaints.filter((c) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "High Priority") {
      return c.priority === "Critical" || c.priority === "High";
    }
    if (activeFilter === "Roads") return c.category.toLowerCase().includes("road");
    if (activeFilter === "Garbage") return c.category.toLowerCase().includes("garbage");
    if (activeFilter === "Water") return c.category.toLowerCase().includes("water");
    if (activeFilter === "Electricity") {
      return (
        c.category.toLowerCase().includes("light") ||
        c.category.toLowerCase().includes("electric")
      );
    }
    if (activeFilter === "Drainage") return c.category.toLowerCase().includes("drain");
    return true;
  });

  const getMarkerPosition = (c: Complaint, index: number) => {
    const presetPositions: Record<string, { x: number; y: number }> = {
      "NVR-2026-10452": { x: 52, y: 48 },
      "NVR-2026-10021": { x: 42, y: 34 },
      "NVR-2026-10022": { x: 24, y: 62 },
      "NVR-2026-10023": { x: 66, y: 28 },
      "NVR-2026-10389": { x: 28, y: 26 },
      "NVR-2026-10410": { x: 76, y: 58 },
    };
    if (presetPositions[c.id]) return presetPositions[c.id];
    return {
      x: 20 + ((index * 19) % 60),
      y: 22 + ((index * 23) % 55),
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Interactive Filter Bar */}
      <div className="bg-white border border-slate-300 border-l-4 border-l-[#0A2540] rounded-md p-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>Municipal GIS Surveillance & Ward Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
            Interactive Smart City Grievance Map
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Inspect active complaint markers across municipal wards by category and priority.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-md border border-slate-300">
          {filterList.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                const nextList = complaints.filter((c) => {
                  if (f === "All") return true;
                  if (f === "High Priority") return c.priority === "Critical" || c.priority === "High";
                  if (f === "Roads") return c.category.toLowerCase().includes("road");
                  if (f === "Garbage") return c.category.toLowerCase().includes("garbage");
                  if (f === "Water") return c.category.toLowerCase().includes("water");
                  if (f === "Electricity") return c.category.toLowerCase().includes("light") || c.category.toLowerCase().includes("electric");
                  if (f === "Drainage") return c.category.toLowerCase().includes("drain");
                  return true;
                });
                if (nextList.length > 0) setSelectedMarker(nextList[0]);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === f
                  ? "bg-[#0A2540] text-white"
                  : "text-slate-700 hover:text-[#0A2540]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-[#0A2540] border-2 border-slate-300 rounded-md overflow-hidden shadow-md relative">
          <div className="px-5 py-3.5 bg-[#06182C] border-b border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">
                PUNE MUNICIPAL CORPORATION · ICCC GIS LAYER
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                Critical / High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                Medium
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                Resolved
              </span>
            </div>
          </div>

          <div className="relative w-full h-[460px] bg-[#0B1221] select-none overflow-hidden">
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full object-cover"
              aria-label="Smart City GIS Map"
            >
              <g stroke="#1E293B" strokeWidth="1">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
                  <line key={`vx-${x}`} x1={x} y1="0" x2={x} y2="600" />
                ))}
                {[100, 200, 300, 400, 500].map((y) => (
                  <line key={`hy-${y}`} x1="0" y1={y} x2="1000" y2={y} />
                ))}
              </g>

              <g fill="#0F172A" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4">
                <polygon points="80,60 450,50 480,280 110,310" />
                <polygon points="450,50 890,70 860,310 480,280" />
                <polygon points="110,310 480,280 510,540 90,520" />
                <polygon points="480,280 860,310 910,550 510,540" />
              </g>

              <path
                d="M 0,340 Q 260,290 500,260 T 1000,190"
                fill="none"
                stroke="#0284C7"
                strokeWidth="22"
                strokeOpacity="0.25"
              />
              <path
                d="M 0,340 Q 260,290 500,260 T 1000,190"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3"
                strokeOpacity="0.5"
              />

              <g fill="none" stroke="#475569" strokeWidth="5">
                <path d="M 140,0 L 520,600" />
                <path d="M 0,180 L 1000,420" />
                <path d="M 220,600 L 780,0" />
              </g>

              <g fill="#94A3B8" fontFamily="monospace" fontSize="13" fontWeight="bold">
                <text x="150" y="110">WARD 9 · BANER-BALEWADI</text>
                <text x="580" y="115">WARD 15 · VIMAN NAGAR / EAST</text>
                <text x="380" y="245">WARD 7 · SHIVAJI NAGAR</text>
                <text x="520" y="340">WARD 12 · MG ROAD / CENTRAL</text>
                <text x="150" y="460">WARD 3 · KOTHRUD ZONE</text>
                <text x="670" y="485">WARD 21 · HADAPSAR IT CORRIDOR</text>
              </g>

              <circle
                cx="520"
                cy="288"
                r="55"
                fill="#EF4444"
                fillOpacity="0.12"
                stroke="#EF4444"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle
                cx="760"
                cy="348"
                r="48"
                fill="#F59E0B"
                fillOpacity="0.12"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>

            {filteredComplaints.map((c, idx) => {
              const pos = getMarkerPosition(c, idx);
              const isSelected = selectedMarker?.id === c.id;
              const isResolved = c.status === "Complaint Closed";
              const isCriticalOrHigh =
                c.priority === "Critical" || c.priority === "High";

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedMarker(c)}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer transition-transform ${
                    isSelected ? "scale-125 z-30" : "hover:scale-110 z-20"
                  }`}
                >
                  <div
                    className={`px-2.5 py-1 rounded font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-lg border ${
                      isResolved
                        ? "bg-[#15803D] text-white border-emerald-300"
                        : isCriticalOrHigh
                        ? "bg-red-700 text-white border-red-300"
                        : "bg-amber-500 text-slate-950 border-amber-200"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{c.id.replace("NVR-2026-", "#")}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="px-5 py-3 bg-[#06182C] border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span>
              Displaying <strong className="text-white">{filteredComplaints.length}</strong> geo-tagged dockets for filter:{" "}
              <strong className="text-amber-400">{activeFilter}</strong>
            </span>
            <span className="font-mono">CRS: WGS84 · 18.5204° N, 73.8567° E</span>
          </div>
        </div>

        {/* Selected Marker Inspector Panel */}
        <div className="lg:col-span-4 space-y-6">
          {selectedMarker ? (
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0A2540]">
                    {selectedMarker.id}
                  </span>
                  <h2 className="text-base font-bold text-[#0A2540] mt-0.5 font-serif-gov">
                    Docket GIS Telemetry
                  </h2>
                </div>
                <span
                  className={`text-xs font-bold ${
                    selectedMarker.priority === "Critical"
                      ? "text-red-700"
                      : selectedMarker.priority === "High"
                      ? "text-[#EA580C]"
                      : "text-[#0A2540]"
                  }`}
                >
                  {selectedMarker.priority} Priority
                </span>
              </div>

              <div className="rounded-md overflow-hidden border border-slate-300 bg-slate-900 aspect-video">
                <img
                  src={selectedMarker.images[0]}
                  alt={selectedMarker.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Complaint Title</span>
                  <span className="text-sm font-bold text-slate-900">
                    {selectedMarker.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500 block">Category</span>
                    <span className="font-bold text-slate-900">
                      {selectedMarker.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Current Status</span>
                    <span className="font-bold text-[#EA580C]">
                      {selectedMarker.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Location</span>
                    <span className="font-bold text-slate-900">
                      {selectedMarker.address}, {selectedMarker.area}, {selectedMarker.city} ({selectedMarker.ward})
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Assigned Department & Officer</span>
                    <span className="font-bold text-slate-900">
                      {selectedMarker.department} · {selectedMarker.assignedOfficer}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("track", selectedMarker.id)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Complete Docket Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-300 rounded-md p-6 text-center text-sm text-slate-500">
              Select any complaint marker on the map to inspect details.
            </div>
          )}

          <div className="bg-[#0A2540] text-white border-l-4 border-[#EA580C] rounded-md p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>ICCC Geo-Spatial Hotspot Advisory</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Ward 7 (Shivaji Nagar) and Ward 12 (MG Road Corridor) show elevated road surface and stormwater drainage dockets post-monsoon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

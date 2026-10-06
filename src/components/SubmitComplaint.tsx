import React, { useState, useEffect } from "react";
import {
  BrainCircuit,
  MapPin,
  CheckCircle2,
  Sparkles,
  Upload,
  LocateFixed,
  ArrowRight,
  Copy,
  Check,
  ShieldAlert,
  Building2,
  Clock,
  FileCheck2,
  Landmark,
} from "lucide-react";
import {
  AIAnalysisResult,
  Complaint,
  ComplaintCategoryName,
  ComplaintPriority,
  UserAccount,
} from "../types";
import {
  COMPLAINT_CATEGORIES_LIST,
  EVIDENCE_SVG_GARBAGE,
  EVIDENCE_SVG_POTHOLE,
  EVIDENCE_SVG_STREETLIGHT,
  EVIDENCE_SVG_WATER,
} from "../data/mockData";
import { ActivePage } from "./Navbar";

interface SubmitComplaintProps {
  initialCategory?: string;
  currentUser: UserAccount | null;
  onComplaintCreated: (newComplaint: Complaint) => void;
  onNavigate: (page: ActivePage, param?: string) => void;
}

const PRESET_SCENARIOS = [
  {
    label: "Pothole on Arterial Road",
    title: "Deep waterlogged pothole near MG Road Metro Pillar 118 causing two-wheeler skids",
    description:
      "A dangerous 3.5-foot wide pothole has formed in the center lane of MG Road after last night's rain. Multiple riders almost lost balance. Urgent asphalt patching required.",
    category: "Road & Potholes",
    priority: "High" as ComplaintPriority,
    address: "MG Road, Near Metro Station Gate 2",
    area: "Camp / MG Road",
    city: "Pune",
    pincode: "411001",
    image: EVIDENCE_SVG_POTHOLE,
  },
  {
    label: "Garbage Overflow near School",
    title: "Uncollected garbage pile and overflowing bin outside Municipal Public School",
    description:
      "Solid waste has not been cleared for 4 days outside the school gate. Foul odor and stray dogs are posing a severe hygiene risk to students.",
    category: "Garbage & Waste",
    priority: "High" as ComplaintPriority,
    address: "100 Feet Road, Near Municipal School",
    area: "Indiranagar / Kothrud",
    city: "Pune",
    pincode: "411038",
    image: EVIDENCE_SVG_GARBAGE,
  },
  {
    label: "Major Water Pipeline Burst",
    title: "Drinking water main pipeline ruptured and flooding residential crossroad",
    description:
      "Treated municipal drinking water is gushing rapidly onto the road from an underground main pipe joint since 6:30 AM. Thousands of liters wasted.",
    category: "Water Supply",
    priority: "Critical" as ComplaintPriority,
    address: "Baner Main Road, Near Smart Bazaar",
    area: "Baner",
    city: "Pune",
    pincode: "411045",
    image: EVIDENCE_SVG_WATER,
  },
];

export const SubmitComplaint: React.FC<SubmitComplaintProps> = ({
  initialCategory,
  currentUser,
  onComplaintCreated,
  onNavigate,
}) => {
  const [fullName, setFullName] = useState(currentUser?.name || "Aarav Sharma");
  const [mobile, setMobile] = useState(currentUser?.mobile || "+91 98204 51290");
  const [email, setEmail] = useState(currentUser?.email || "aarav.sharma@citizen.in");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(
    initialCategory || "Road & Potholes"
  );
  const [priority, setPriority] = useState<ComplaintPriority>("High");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Pune");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [gpsCoords, setGpsCoords] = useState({ lat: 18.5204, lng: 73.8567 });
  const [gpsStatus, setGpsStatus] = useState<string>("18.5204° N, 73.8567° E (Verified)");

  const [images, setImages] = useState<string[]>([EVIDENCE_SVG_POTHOLE]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);

  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImages((prev) => [reader.result as string, ...prev.slice(0, 3)]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDetectGps = () => {
    setGpsStatus("Acquiring satellite lock...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = Number(pos.coords.latitude.toFixed(4));
          const lng = Number(pos.coords.longitude.toFixed(4));
          setGpsCoords({ lat, lng });
          setGpsStatus(`${lat}° N, ${lng}° E (Live GPS Locked)`);
        },
        () => {
          setGpsCoords({ lat: 18.5236, lng: 73.8478 });
          setGpsStatus("18.5236° N, 73.8478° E (Municipal Ward 12 Geo-Grid)");
        },
        { timeout: 4000 }
      );
    } else {
      setGpsStatus("18.5236° N, 73.8478° E (Municipal Ward 12 Geo-Grid)");
    }
  };

  const applyPreset = (preset: (typeof PRESET_SCENARIOS)[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setCategory(preset.category);
    setPriority(preset.priority);
    setAddress(preset.address);
    setArea(preset.area);
    setCity(preset.city);
    setPincode(preset.pincode);
    setImages([preset.image]);
    setFormError(null);
  };

  const runAiAnalysis = async (): Promise<AIAnalysisResult> => {
    setIsAnalyzing(true);
    setAnalysisStepIndex(0);

    const stepTimer = setInterval(() => {
      setAnalysisStepIndex((prev) => (prev < 3 ? prev + 1 : prev));
    }, 450);

    try {
      const response = await fetch("/api/ai/analyze-complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || "Pothole & Damaged Road Surface",
          description: description || "Civic issue reported by citizen with geo-tagged evidence.",
          category,
          location: `${address}, ${area}, ${city}`,
          imageBase64: images[0] || "",
        }),
      });
      const data: AIAnalysisResult = await response.json();
      await new Promise((r) => setTimeout(r, 1500));
      clearInterval(stepTimer);
      setIsAnalyzing(false);
      setAiResult(data);
      setCategory(data.category);
      setPriority(data.priority as ComplaintPriority);
      return data;
    } catch {
      clearInterval(stepTimer);
      setIsAnalyzing(false);
      const fallback: AIAnalysisResult = {
        detectedIssue: "Pothole",
        category: "Road & Potholes",
        priority: "High",
        confidence: 94,
        recommendedDepartment: "Public Works Department (PWD)",
        estimatedResponse: "24–48 Hours",
        reasoning: "AI analyzed structural road hazard and commuter safety exposure.",
        duplicateMatch: null,
        publicImpactScore: 88,
      };
      setAiResult(fallback);
      return fallback;
    }
  };

  const handleAnalyzeOnly = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) {
      setFormError("Please enter a complaint title or description (or click a Sample Scenario above) before running AI Analysis.");
      return;
    }
    setFormError(null);
    await runAiAnalysis();
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobile.trim() || !title.trim() || !description.trim() || !address.trim()) {
      setFormError("Please complete all mandatory fields (Citizen Name, Mobile, Complaint Title, Description, and Street Address).");
      return;
    }
    setFormError(null);

    const finalAi = aiResult || (await runAiAnalysis());
    const randomNum = Math.floor(10453 + Math.random() * 8900);
    const newId = `NVR-2026-${randomNum}`;
    const nowStr = "05 Oct 2026, 02:15 PM";

    const officerByDept: Record<string, { name: string; title: string }> = {
      "Public Works Department (PWD)": {
        name: "Er. Rajesh Deshmukh",
        title: "Executive Engineer (Roads - Zone 2)",
      },
      "Sanitation & Solid Waste Management": {
        name: "Smt. Meenakshi Iyer",
        title: "Chief Sanitary Inspector",
      },
      "Water Supply & Jal Board": {
        name: "Er. Prakash Joshi",
        title: "Deputy Hydraulic Engineer",
      },
      "Electrical & Street Lighting Department": {
        name: "Er. Siddharth Verma",
        title: "Assistant Electrical Engineer",
      },
      "Drainage & Sewerage Department": {
        name: "Er. Kunal Sawant",
        title: "Assistant Engineer (Sewerage)",
      },
      "Environment & Urban Forestry Department": {
        name: "Dr. Sunita Kulkarni",
        title: "Environmental Nodal Officer",
      },
    };

    const assignedOff = officerByDept[finalAi.recommendedDepartment] || {
      name: "Er. Rajesh Deshmukh",
      title: "Nodal Municipal Engineer",
    };

    const newComplaint: Complaint = {
      id: newId,
      citizenName: fullName,
      citizenMobile: mobile,
      citizenEmail: email,
      title,
      description,
      category: finalAi.category as ComplaintCategoryName,
      priority: finalAi.priority,
      status: "Department Assigned",
      department: finalAi.recommendedDepartment,
      assignedOfficer: assignedOff.name,
      officerDesignation: assignedOff.title,
      address,
      area: area || "Central Ward",
      city: city || "Pune",
      pincode: pincode || "411001",
      ward: "Ward 12 - Smart City Zone",
      coordinates: gpsCoords,
      submittedAt: nowStr,
      updatedAt: nowStr,
      expectedSla: finalAi.estimatedResponse,
      images: images.length > 0 ? images : [EVIDENCE_SVG_POTHOLE],
      aiAnalysis: finalAi,
      timeline: [
        {
          step: "Complaint Submitted",
          completed: true,
          active: false,
          timestamp: nowStr,
          actor: `${fullName} (Citizen)`,
          note: "Registered via NIVARAN AI Official Portal with geo-tagged evidence.",
        },
        {
          step: "AI Analysis Completed",
          completed: true,
          active: false,
          timestamp: nowStr,
          actor: "NIVARAN AI Engine",
          note: `Detected Issue: ${finalAi.detectedIssue} (${finalAi.confidence}% confidence). Priority: ${finalAi.priority}.`,
        },
        {
          step: "Department Assigned",
          completed: true,
          active: true,
          timestamp: nowStr,
          actor: "Smart Routing Engine",
          note: `Automatically routed to ${finalAi.recommendedDepartment} (${assignedOff.name}).`,
        },
        { step: "Officer Assigned", completed: false, active: false },
        { step: "Work in Progress", completed: false, active: false },
        { step: "Resolution Submitted", completed: false, active: false },
        { step: "Citizen Verification", completed: false, active: false },
        { step: "Complaint Closed", completed: false, active: false },
      ],
    };

    onComplaintCreated(newComplaint);
    setSubmittedComplaint(newComplaint);
  };

  if (isAnalyzing) {
    const steps = [
      "Extracting NLP entities & location context from citizen description…",
      "Running computer vision object detection on uploaded evidence…",
      "Calculating public safety impact & priority index…",
      "Matching Citizen Charter SLA & routing to nodal department…",
    ];

    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#0A2540] text-white border-2 border-[#EA580C] rounded-md p-8 sm:p-12 shadow-xl space-y-8 text-center">
          <div className="w-16 h-16 rounded-md bg-white/10 border border-amber-400/50 text-amber-400 flex items-center justify-center mx-auto animate-pulse">
            <BrainCircuit className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
              ICCC AUTOMATED TRIAGE ENGINE
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-gov">
              “NIVARAN AI is analyzing your complaint…”
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Inspecting textual description, visual evidence, and geo-spatial coordinates to classify and route your grievance.
            </p>
          </div>

          <div className="max-w-md mx-auto text-left space-y-3 bg-[#06182C] border border-slate-700 rounded-md p-5">
            {steps.map((stepText, idx) => {
              const isDone = idx < analysisStepIndex;
              const isCurrent = idx === analysisStepIndex;
              return (
                <div
                  key={stepText}
                  className={`flex items-center gap-3 text-xs sm:text-sm transition-opacity ${
                    idx <= analysisStepIndex ? "opacity-100" : "opacity-35"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-sm flex items-center justify-center shrink-0 text-xs font-mono ${
                      isDone
                        ? "bg-[#15803D] text-white font-bold"
                        : isCurrent
                        ? "bg-[#EA580C] text-white font-bold"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isDone ? "✓" : idx + 1}
                  </div>
                  <span className={isDone ? "text-slate-200" : isCurrent ? "text-amber-300 font-semibold" : "text-slate-500"}>
                    {stepText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (submittedComplaint) {
    const ai = submittedComplaint.aiAnalysis;
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="bg-white border-2 border-slate-300 rounded-md overflow-hidden shadow-md">
          {/* Official Top Tricolor Bar */}
          <div className="h-1.5 w-full gov-tricolor-bar" />

          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-emerald-50 border border-emerald-300 text-[#15803D] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#15803D] uppercase tracking-wider">
                    Official Citizen Charter Acknowledgement Receipt
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-0.5 font-serif-gov">
                    Complaint Successfully Registered
                  </h1>
                  <p className="text-sm text-slate-600 mt-1">
                    Your grievance has been indexed by NIVARAN AI and dispatched to the nodal department.
                  </p>
                </div>
              </div>

              <div className="bg-[#0A2540] text-white px-4 py-3 rounded-md flex items-center gap-3 self-start border border-slate-700">
                <div>
                  <div className="text-[11px] text-slate-300 uppercase">Official Docket ID</div>
                  <div className="text-base font-mono font-bold text-amber-400">
                    {submittedComplaint.id}
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(submittedComplaint.id);
                    setCopiedId(true);
                    setTimeout(() => setCopiedId(false), 2000);
                  }}
                  className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Copy Complaint ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* AI Analysis Result Panel */}
            <div className="bg-[#F8FAFC] border border-slate-300 rounded-md p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[#0A2540]" />
                  <h2 className="text-base font-bold text-[#0A2540]">
                    AI Analysis Result
                  </h2>
                </div>
                <span className="text-xs font-mono font-bold text-[#15803D]">
                  Confidence: {ai.confidence}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-300 rounded-md p-3.5">
                  <div className="text-xs text-slate-500">Detected Issue</div>
                  <div className="text-sm font-bold text-[#0A2540] mt-1">{ai.detectedIssue}</div>
                </div>
                <div className="bg-white border border-slate-300 rounded-md p-3.5">
                  <div className="text-xs text-slate-500">Category</div>
                  <div className="text-sm font-bold text-[#1E3A8A] mt-1">{ai.category}</div>
                </div>
                <div className="bg-white border border-slate-300 rounded-md p-3.5">
                  <div className="text-xs text-slate-500">Priority</div>
                  <div className="text-sm font-bold text-[#EA580C] mt-1">{ai.priority}</div>
                </div>
                <div className="bg-white border border-slate-300 rounded-md p-3.5">
                  <div className="text-xs text-slate-500">Confidence</div>
                  <div className="text-sm font-mono font-bold text-[#15803D] mt-1">
                    {ai.confidence}%
                  </div>
                </div>
                <div className="bg-white border border-slate-300 rounded-md p-3.5">
                  <div className="text-xs text-slate-500">Recommended Department</div>
                  <div className="text-sm font-bold text-[#0A2540] mt-1">
                    {ai.recommendedDepartment}
                  </div>
                </div>
                <div className="bg-white border border-slate-300 rounded-md p-3.5">
                  <div className="text-xs text-slate-500">Estimated Response</div>
                  <div className="text-sm font-mono font-bold text-[#0A2540] mt-1">
                    {ai.estimatedResponse}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                <span className="font-bold text-[#0A2540]">AI Assessment Note:</span> {ai.reasoning}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2 text-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">
                  Docket Routing & Assignment Details
                </div>
                <p className="text-slate-800">
                  <span className="font-semibold">Assigned Department:</span> {submittedComplaint.department}
                </p>
                <p className="text-slate-800">
                  <span className="font-semibold">Nodal Officer:</span> {submittedComplaint.assignedOfficer}
                </p>
                <p className="text-slate-800">
                  <span className="font-semibold">Location:</span> {submittedComplaint.address}, {submittedComplaint.area}, {submittedComplaint.city} - {submittedComplaint.pincode}
                </p>
                <p className="text-slate-800">
                  <span className="font-semibold">Current Status:</span>{" "}
                  <span className="text-[#0A2540] font-bold">{submittedComplaint.status}</span>
                </p>
              </div>

              <div className="flex flex-col justify-end items-start md:items-end gap-3">
                <button
                  onClick={() => onNavigate("track", submittedComplaint.id)}
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Track Live Docket Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSubmittedComplaint(null);
                    setAiResult(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors cursor-pointer"
                >
                  Lodge Another Grievance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Official Form Header */}
      <div className="bg-white border border-slate-300 rounded-md p-6 border-l-4 border-l-[#0A2540] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
            <Landmark className="w-3.5 h-3.5" />
            <span>Form CPGRAMS-U1 · Public Grievance Filing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
            Submit a Civic Complaint
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            All complaints are automatically classified, prioritized, and routed to the nodal municipal department under the Citizen Charter SLA.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5">
          <span className="text-xs font-semibold text-slate-600">
            Pre-Fill Sample Grievance:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SCENARIOS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors cursor-pointer whitespace-nowrap"
              >
                + {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {formError && (
        <div className="p-4 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmitForm} className="space-y-6">
        {/* SECTION 1: CITIZEN INFORMATION */}
        <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
          <h2 className="text-base font-bold text-[#0A2540] border-b border-slate-200 pb-3">
            Part A: Citizen Applicant Particulars
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Aarav Sharma"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mobile Number (SMS Alerts) *
              </label>
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91 98204 51290"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540] font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@example.in"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: COMPLAINT INFORMATION */}
        <div className="bg-white border border-slate-300 rounded-md p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-[#0A2540]">
              Part B: Grievance Subject & Description
            </h2>
            <button
              type="button"
              onClick={handleAnalyzeOnly}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Analyze Complaint with AI</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Complaint Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of the issue (e.g., Deep pothole near MG Road Metro Pillar 114)"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Complaint Description *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the exact problem, landmarks, duration, and public safety impact..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category (Auto-Detected by AI or Manual)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                >
                  {COMPLAINT_CATEGORIES_LIST.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Priority / Severity (AI Calibrated)
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                >
                  <option value="Critical">Critical (Immediate Public Hazard)</option>
                  <option value="High">High (24–48 Hours SLA)</option>
                  <option value="Medium">Medium (Standard Municipal SLA)</option>
                  <option value="Low">Low (Routine Maintenance)</option>
                </select>
              </div>
            </div>
          </div>

          {aiResult && (
            <div className="p-5 rounded-md bg-[#0A2540] text-white space-y-3 border-l-4 border-[#EA580C]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <BrainCircuit className="w-4 h-4" />
                  <span>NIVARAN AI Pre-Submission Assessment</span>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  {aiResult.confidence}% Confidence
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-300 block">Detected Issue</span>
                  <span className="font-bold text-white">{aiResult.detectedIssue}</span>
                </div>
                <div>
                  <span className="text-slate-300 block">Category</span>
                  <span className="font-bold text-amber-300">{aiResult.category}</span>
                </div>
                <div>
                  <span className="text-slate-300 block">Recommended Dept</span>
                  <span className="font-bold text-white">{aiResult.recommendedDepartment}</span>
                </div>
                <div>
                  <span className="text-slate-300 block">Estimated Response</span>
                  <span className="font-mono font-bold text-emerald-300">{aiResult.estimatedResponse}</span>
                </div>
              </div>
              <p className="text-xs text-slate-200 border-t border-slate-700 pt-2">
                {aiResult.reasoning}
              </p>
            </div>
          )}
        </div>

        {/* SECTION 3: LOCATION */}
        <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-[#0A2540]">
              Part C: Incident Location & Ward Geo-Tagging
            </h2>
            <button
              type="button"
              onClick={handleDetectGps}
              className="px-3 py-1.5 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <LocateFixed className="w-3.5 h-3.5" />
              <span>Fetch GPS Coordinates</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Street Address & Landmark *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., Opposite Metro Pillar 114, MG Road"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Area / Locality *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g., Shivaji Nagar / Kothrud"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="411001"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540] font-mono"
                />
              </div>
            </div>

            <div className="sm:col-span-2 bg-slate-50 border border-slate-300 rounded-md p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs text-slate-800">
                <MapPin className="w-4 h-4 text-[#0A2540] shrink-0" />
                <span>
                  <strong className="font-bold">Map Location / GPS:</strong>{" "}
                  <span className="font-mono">{gpsStatus}</span>
                </span>
              </div>
              <span className="text-xs font-mono text-[#15803D] font-bold">
                GIS Verified
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 4: PHOTO EVIDENCE */}
        <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-[#0A2540]">
              Part D: Photographic Evidence Upload
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload one or multiple images of the issue for computer vision verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <label className="border-2 border-dashed border-slate-300 hover:border-[#0A2540] rounded-md p-6 text-center cursor-pointer transition-colors bg-slate-50 flex flex-col items-center justify-center min-h-[170px]">
              <Upload className="w-8 h-8 text-[#0A2540] mb-2" />
              <span className="text-sm font-bold text-[#0A2540]">
                Click to Attach Photo Evidence
              </span>
              <span className="text-xs text-slate-500 mt-1">
                JPG, PNG, WebP · Multiple Images Supported
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Attached Evidence ({images.length})</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setImages([EVIDENCE_SVG_POTHOLE])}
                    className="text-[11px] text-[#0A2540] hover:underline cursor-pointer"
                  >
                    Sample Pothole
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setImages([EVIDENCE_SVG_GARBAGE])}
                    className="text-[11px] text-[#0A2540] hover:underline cursor-pointer"
                  >
                    Sample Garbage
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setImages([EVIDENCE_SVG_STREETLIGHT])}
                    className="text-[11px] text-[#0A2540] hover:underline cursor-pointer"
                  >
                    Sample Light
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {images.slice(0, 2).map((imgSrc, i) => (
                  <div
                    key={i}
                    className="relative rounded-md overflow-hidden border border-slate-300 bg-slate-900 aspect-video"
                  >
                    <img
                      src={imgSrc}
                      alt={`Uploaded civic issue evidence ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4 text-[#0A2540]" />
              32 Connected Nodal Departments
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#0A2540]" />
              Citizen Charter SLA Bound
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleAnalyzeOnly}
              className="flex-1 sm:flex-initial px-5 py-3 text-sm font-semibold text-[#0A2540] bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Analyze Complaint with AI
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-initial px-7 py-3 text-sm font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>Register Official Grievance</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

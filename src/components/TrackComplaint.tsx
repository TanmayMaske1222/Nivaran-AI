import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Building2,
  UserCheck,
  BrainCircuit,
  RotateCcw,
  Star,
  AlertCircle,
  FileText,
  Landmark,
} from "lucide-react";
import { CitizenFeedback, Complaint } from "../types";
import { ActivePage } from "./Navbar";

interface TrackComplaintProps {
  complaints: Complaint[];
  initialComplaintId?: string;
  onReopenComplaint: (id: string, reason: string) => void;
  onSubmitFeedback: (id: string, feedback: CitizenFeedback, reopenIfUnsatisfied: boolean) => void;
  onNavigate: (page: ActivePage, param?: string) => void;
}

export const TrackComplaint: React.FC<TrackComplaintProps> = ({
  complaints,
  initialComplaintId,
  onReopenComplaint,
  onSubmitFeedback,
}) => {
  const [searchId, setSearchId] = useState(initialComplaintId || "NVR-2026-10452");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [notFoundError, setNotFoundError] = useState(false);

  const [showReopenBox, setShowReopenBox] = useState(false);
  const [reopenReason, setReopenReason] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [satisfaction, setSatisfaction] = useState<
    "Satisfied" | "Partially Satisfied" | "Not Satisfied"
  >("Satisfied");
  const [feedbackComment, setFeedbackComment] = useState("");

  useEffect(() => {
    const targetId = (initialComplaintId || searchId).trim().toUpperCase();
    const found = complaints.find((c) => c.id.toUpperCase() === targetId);
    if (found) {
      setSelectedComplaint(found);
      setSearchId(found.id);
      setNotFoundError(false);
    } else if (complaints.length > 0 && !initialComplaintId) {
      setSelectedComplaint(complaints[0]);
    }
  }, [initialComplaintId, complaints]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchId.trim().toUpperCase();
    const match = complaints.find((c) => c.id.toUpperCase() === clean);
    if (match) {
      setSelectedComplaint(match);
      setNotFoundError(false);
    } else {
      setNotFoundError(true);
    }
  };

  const handleConfirmReopen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !reopenReason.trim()) return;
    onReopenComplaint(selectedComplaint.id, reopenReason.trim());
    setShowReopenBox(false);
    setReopenReason("");
    setToastMsg(`Reopen appeal registered for Docket ${selectedComplaint.id}. Escalated to Zonal Nodal Authority.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    const shouldReopen = satisfaction === "Not Satisfied";
    onSubmitFeedback(
      selectedComplaint.id,
      {
        rating,
        satisfaction,
        comment:
          feedbackComment.trim() ||
          (shouldReopen
            ? "Citizen reported incomplete resolution during verification."
            : "Verified resolution on site."),
        submittedAt: "05 Oct 2026, 02:30 PM",
      },
      shouldReopen
    );
    setToastMsg(
      shouldReopen
        ? `Feedback recorded & Docket ${selectedComplaint.id} reopened for field re-inspection.`
        : `Citizen verification & ${rating}★ rating recorded for Docket ${selectedComplaint.id}.`
    );
    setTimeout(() => setToastMsg(null), 4500);
    setFeedbackComment("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Search Bar */}
      <div className="bg-white border border-slate-300 border-l-4 border-l-[#0A2540] rounded-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>Public Grievance Docket Audit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2540] mt-1 font-serif-gov">
              Track Complaint Status
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Enter your unique NIVARAN AI Complaint ID to inspect the 8-stage official timeline, assigned engineer, and resolution compliance.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g., NVR-2026-10452"
                className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Search Docket
            </button>
          </form>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-600 font-semibold">Select Public Docket ID:</span>
          {complaints.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSearchId(c.id);
                setSelectedComplaint(c);
                setNotFoundError(false);
              }}
              className={`px-3 py-1.5 rounded-md font-mono border transition-colors cursor-pointer ${
                selectedComplaint?.id === c.id
                  ? "bg-[#0A2540] text-white border-[#0A2540] font-bold"
                  : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100"
              }`}
            >
              {c.id} ({c.status})
            </button>
          ))}
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-md bg-emerald-50 border border-emerald-300 text-[#15803D] text-sm font-semibold flex items-center justify-between">
          <span>{toastMsg}</span>
          <button
            onClick={() => setToastMsg(null)}
            className="text-xs font-bold underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {notFoundError && (
        <div className="bg-white border border-red-300 rounded-md p-8 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-700 mx-auto" />
          <h2 className="text-lg font-bold text-[#0A2540]">
            No Grievance Docket Found Matching “{searchId}”
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Please verify the Complaint ID format (e.g., NVR-2026-10452) or select one of the public docket IDs above.
          </p>
        </div>
      )}

      {selectedComplaint && !notFoundError && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-mono font-bold text-sm text-[#0A2540]">
                    {selectedComplaint.id}
                  </span>
                  <span>·</span>
                  <span>Filed: {selectedComplaint.submittedAt}</span>
                  <span>·</span>
                  <span>Updated: {selectedComplaint.updatedAt}</span>
                </div>
                <span className="text-xs font-bold text-[#0A2540]">
                  Current Status: <span className="text-[#EA580C]">{selectedComplaint.status}</span>
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0A2540] font-serif-gov">
                  {selectedComplaint.title}
                </h2>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                  {selectedComplaint.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Assigned Nodal Department</span>
                    <span className="font-bold text-slate-900">
                      {selectedComplaint.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Assigned Nodal Officer</span>
                    <span className="font-bold text-slate-900">
                      {selectedComplaint.assignedOfficer}
                    </span>
                    <span className="text-slate-500 block">
                      {selectedComplaint.officerDesignation}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Incident Location</span>
                    <span className="font-bold text-slate-900">
                      {selectedComplaint.address}, {selectedComplaint.area}
                    </span>
                    <span className="text-slate-500 block font-mono">
                      {selectedComplaint.city} - {selectedComplaint.pincode} ({selectedComplaint.ward})
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#0A2540] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block">Priority & SLA Mandate</span>
                    <span className="font-bold text-slate-900">
                      {selectedComplaint.priority} Priority · SLA {selectedComplaint.expectedSla}
                    </span>
                    <span className="text-slate-500 block">
                      Complainant: {selectedComplaint.citizenName}
                    </span>
                  </div>
                </div>
              </div>

              {selectedComplaint.resolutionRemarks && (
                <div className="p-4 rounded-md bg-emerald-50 border border-emerald-300 space-y-1">
                  <div className="text-xs font-bold text-[#15803D] flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>Official Nodal Engineer Compliance Report</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {selectedComplaint.resolutionRemarks}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-600 block mb-2">
                    Uploaded Geo-Tagged Evidence
                  </span>
                  <div className="rounded-md overflow-hidden border border-slate-300 bg-slate-900 aspect-video">
                    <img
                      src={selectedComplaint.images[0]}
                      alt={selectedComplaint.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="bg-[#0A2540] text-white rounded-md p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5">
                        <BrainCircuit className="w-4 h-4" />
                        NIVARAN AI Assessment
                      </span>
                      <span className="font-mono text-emerald-400">
                        {selectedComplaint.aiAnalysis.confidence}% Conf
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {selectedComplaint.aiAnalysis.detectedIssue}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedComplaint.aiAnalysis.reasoning}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-300">
                    <span>Impact Index: {selectedComplaint.aiAnalysis.publicImpactScore}/100</span>
                    <span className="font-mono font-bold text-amber-400">
                      {selectedComplaint.aiAnalysis.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Unsatisfied with field progress or resolution quality?
                </div>
                <button
                  onClick={() => setShowReopenBox((prev) => !prev)}
                  className="px-4 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Raise Reopen Request</span>
                </button>
              </div>

              {showReopenBox && (
                <form
                  onSubmit={handleConfirmReopen}
                  className="p-4 rounded-md bg-slate-50 border border-slate-300 space-y-3"
                >
                  <label className="block text-xs font-bold text-[#0A2540]">
                    State Grounds for Reopening Docket {selectedComplaint.id}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={reopenReason}
                    onChange={(e) => setReopenReason(e.target.value)}
                    placeholder="e.g., Patchwork washed away after rain / Garbage bin still overflowing..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReopenBox(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-md cursor-pointer"
                    >
                      Confirm & Reopen Complaint
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* CITIZEN FEEDBACK & VERIFICATION */}
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-[#0A2540]">
                  Citizen Verification & Resolution Feedback
                </h3>
                <p className="text-xs text-slate-600">
                  Rate the municipal resolution quality. Selecting “Not Satisfied” automatically reopens the docket.
                </p>
              </div>

              {selectedComplaint.feedback ? (
                <div className="p-4 rounded-md bg-slate-50 border border-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0A2540]">
                      Citizen Rating: {"★".repeat(selectedComplaint.feedback.rating)} (
                      {selectedComplaint.feedback.rating}/5)
                    </span>
                    <span className="font-bold text-[#15803D]">
                      {selectedComplaint.feedback.satisfaction}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic">
                    “{selectedComplaint.feedback.comment}”
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs font-bold text-slate-700 mb-1.5">
                        Rating (1 to 5 Stars)
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 focus:outline-none cursor-pointer"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating
                                  ? "fill-amber-500 text-amber-500"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-bold text-slate-700 mb-1.5">
                        Resolution Satisfaction
                      </span>
                      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-md border border-slate-300">
                        {(
                          ["Satisfied", "Partially Satisfied", "Not Satisfied"] as const
                        ).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSatisfaction(opt)}
                            className={`px-3 py-1.5 text-xs font-bold rounded transition-colors cursor-pointer whitespace-nowrap ${
                              satisfaction === opt
                                ? opt === "Not Satisfied"
                                  ? "bg-red-700 text-white"
                                  : "bg-[#0A2540] text-white"
                                : "text-slate-700 hover:text-slate-900"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Citizen Verification Remarks
                    </label>
                    <input
                      type="text"
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Enter citizen verification notes on field work quality..."
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md transition-colors cursor-pointer"
                    >
                      {satisfaction === "Not Satisfied"
                        ? "Submit Feedback & Reopen Docket"
                        : "Verify & Submit Citizen Feedback"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: 8-STAGE COMPLAINT TIMELINE */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-300 rounded-md p-6 space-y-6 sticky top-24">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-base font-bold text-[#0A2540] font-serif-gov">
                  Official 8-Stage Grievance Timeline
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chronological Citizen Charter status log
                </p>
              </div>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
                {selectedComplaint.timeline.map((stepItem) => {
                  const isCompleted = stepItem.completed;
                  const isActive = stepItem.active;

                  return (
                    <div key={stepItem.step} className="relative group">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center absolute -left-6 top-0.5 ring-4 ring-white ${
                          isCompleted
                            ? "bg-[#15803D] text-white"
                            : isActive
                            ? "bg-[#EA580C] text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : isActive ? (
                          <Clock className="w-3.5 h-3.5" />
                        ) : (
                          <Circle className="w-3 h-3" />
                        )}
                      </div>

                      <div className="pl-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-sm font-bold ${
                              isCompleted || isActive
                                ? "text-[#0A2540]"
                                : "text-slate-400"
                            }`}
                          >
                            {isCompleted ? "✓ " : isActive ? "● " : "○ "}
                            {stepItem.step}
                          </span>
                          {stepItem.timestamp && (
                            <span className="text-[11px] font-mono text-slate-500">
                              {stepItem.timestamp}
                            </span>
                          )}
                        </div>

                        {stepItem.actor && (
                          <div className="text-xs font-semibold text-[#1E3A8A] mt-0.5">
                            {stepItem.actor}
                          </div>
                        )}

                        {stepItem.note && (
                          <p className="text-xs text-slate-700 mt-1 bg-slate-50 border border-slate-200 rounded p-2.5 leading-relaxed">
                            {stepItem.note}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

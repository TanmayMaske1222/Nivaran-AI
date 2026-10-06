/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar, ActivePage } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { SubmitComplaint } from "./components/SubmitComplaint";
import { TrackComplaint } from "./components/TrackComplaint";
import { AboutPage } from "./components/AboutPage";
import { DepartmentsPage } from "./components/DepartmentsPage";
import { SmartMap } from "./components/SmartMap";
import { CitizenDashboard } from "./components/CitizenDashboard";
import { AuthPage } from "./components/AuthPage";
import { AdminPortal } from "./components/AdminPortal";
import {
  INITIAL_COMPLAINTS,
  INITIAL_DEPARTMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_OFFICERS,
  DEMO_USERS,
} from "./data/mockData";
import {
  CitizenFeedback,
  Complaint,
  ComplaintPriority,
  ComplaintStatus,
  NotificationItem,
  UserAccount,
} from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(
    DEMO_USERS[0]
  );

  // Navigation context parameters (e.g., preselected category for Submit or preselected ID for Track)
  const [selectedCategoryParam, setSelectedCategoryParam] = useState<
    string | undefined
  >(undefined);
  const [selectedComplaintIdParam, setSelectedComplaintIdParam] = useState<
    string | undefined
  >("NVR-2026-10452");

  const handleNavigate = (page: ActivePage, param?: string) => {
    if (page === "submit" && param) {
      setSelectedCategoryParam(param);
    } else if (page === "track" && param) {
      setSelectedComplaintIdParam(param);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleComplaintCreated = (newComplaint: Complaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
    setSelectedComplaintIdParam(newComplaint.id);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      complaintId: newComplaint.id,
      title: "AI Triage & Routing Complete",
      message: `Your complaint ${newComplaint.id} (${newComplaint.aiAnalysis.detectedIssue}) has been assigned to ${newComplaint.department}.`,
      timestamp: "Just now",
      read: false,
      type: "assignment",
      targetRole: "both",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleReopenComplaint = (id: string, reason: string) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          status: "Reopened",
          updatedAt: "05 Oct 2026, 02:35 PM",
          timeline: [
            ...c.timeline.map((t) => ({ ...t, active: false })),
            {
              step: "Reopened",
              completed: false,
              active: true,
              timestamp: "05 Oct 2026, 02:35 PM",
              actor: `${c.citizenName} (Citizen Escalation)`,
              note: `Reopen Reason: ${reason}`,
            },
          ],
        };
      })
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        complaintId: id,
        title: "Complaint Reopened by Citizen",
        message: `Complaint ${id} has been reopened and escalated for priority re-inspection.`,
        timestamp: "Just now",
        read: false,
        type: "escalation",
        targetRole: "both",
      },
      ...prev,
    ]);
  };

  const handleSubmitFeedback = (
    id: string,
    feedback: CitizenFeedback,
    reopenIfUnsatisfied: boolean
  ) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus: ComplaintStatus = reopenIfUnsatisfied
          ? "Reopened"
          : "Complaint Closed";
        const updatedTimeline = c.timeline.map((step) => {
          if (
            !reopenIfUnsatisfied &&
            (step.step === "Citizen Verification" ||
              step.step === "Complaint Closed")
          ) {
            return {
              ...step,
              completed: true,
              active: step.step === "Complaint Closed",
              timestamp: feedback.submittedAt,
              actor: c.citizenName,
              note:
                step.step === "Citizen Verification"
                  ? `Citizen rated ${feedback.rating}★ (${feedback.satisfaction}): "${feedback.comment}"`
                  : "Verified & Closed.",
            };
          }
          return step;
        });

        return {
          ...c,
          status: nextStatus,
          feedback,
          updatedAt: feedback.submittedAt,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const handleAdminUpdateComplaint = (
    id: string,
    updates: {
      status?: ComplaintStatus;
      priority?: ComplaintPriority;
      department?: string;
      assignedOfficer?: string;
      remarks?: string;
    }
  ) => {
    const ALL_STEPS: ComplaintStatus[] = [
      "Complaint Submitted",
      "AI Analysis Completed",
      "Department Assigned",
      "Officer Assigned",
      "Work in Progress",
      "Resolution Submitted",
      "Citizen Verification",
      "Complaint Closed",
    ];

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const nextStatus = updates.status || c.status;
        const statusIdx = ALL_STEPS.indexOf(nextStatus);

        const nextTimeline = c.timeline.map((step) => {
          const stepIdx = ALL_STEPS.indexOf(step.step);
          if (statusIdx !== -1 && stepIdx !== -1) {
            if (stepIdx < statusIdx) {
              return { ...step, completed: true, active: false };
            }
            if (stepIdx === statusIdx) {
              return {
                ...step,
                completed: nextStatus === "Complaint Closed",
                active: true,
                timestamp: "05 Oct 2026, 02:40 PM",
                actor: updates.assignedOfficer || c.assignedOfficer,
                note: updates.remarks || step.note,
              };
            }
            return { ...step, completed: false, active: false };
          }
          return step;
        });

        return {
          ...c,
          status: nextStatus,
          priority: updates.priority || c.priority,
          department: updates.department || c.department,
          assignedOfficer: updates.assignedOfficer || c.assignedOfficer,
          resolutionRemarks: updates.remarks || c.resolutionRemarks,
          updatedAt: "05 Oct 2026, 02:40 PM",
          timeline: nextTimeline,
        };
      })
    );

    if (updates.status || updates.department) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          complaintId: id,
          title: "Municipal Status Update",
          message: `Complaint ${id} updated by Command Center (${
            updates.status || updates.department
          }).`,
          timestamp: "Just now",
          read: false,
          type: "progress",
          targetRole: "both",
        },
        ...prev,
      ]);
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Dedicated Admin Portal Layout (separate from Citizen Portal)
  if (activePage === "admin") {
    return (
      <AdminPortal
        complaints={complaints}
        departments={INITIAL_DEPARTMENTS}
        officers={INITIAL_OFFICERS}
        notifications={notifications}
        onUpdateComplaint={handleAdminUpdateComplaint}
        onExitAdmin={(target) => setActivePage(target || "home")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setActivePage("home");
        }}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      <main className="flex-1">
        {activePage === "home" && (
          <HomePage onNavigate={handleNavigate} complaints={complaints} />
        )}

        {activePage === "submit" && (
          <SubmitComplaint
            initialCategory={selectedCategoryParam}
            currentUser={currentUser}
            onComplaintCreated={handleComplaintCreated}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === "track" && (
          <TrackComplaint
            complaints={complaints}
            initialComplaintId={selectedComplaintIdParam}
            onReopenComplaint={handleReopenComplaint}
            onSubmitFeedback={handleSubmitFeedback}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === "about" && <AboutPage onNavigate={handleNavigate} />}

        {activePage === "departments" && (
          <DepartmentsPage
            departments={INITIAL_DEPARTMENTS}
            complaints={complaints}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === "map" && (
          <SmartMap complaints={complaints} onNavigate={handleNavigate} />
        )}

        {activePage === "citizen-dashboard" && (
          <CitizenDashboard
            user={currentUser || DEMO_USERS[0]}
            complaints={complaints}
            notifications={notifications}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === "auth" && (
          <AuthPage
            onLoginSuccess={(loggedInUser) => {
              setCurrentUser(loggedInUser);
              setActivePage(
                loggedInUser.role === "admin" ? "admin" : "citizen-dashboard"
              );
            }}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

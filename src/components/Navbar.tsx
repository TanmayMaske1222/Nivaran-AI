import React, { useState } from "react";
import {
  Bell,
  Menu,
  X,
  PlusCircle,
  ShieldCheck,
  UserCheck,
  LogOut,
} from "lucide-react";
import { NotificationItem, UserAccount } from "../types";

export type ActivePage =
  | "home"
  | "about"
  | "departments"
  | "track"
  | "submit"
  | "map"
  | "citizen-dashboard"
  | "admin"
  | "auth";

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, param?: string) => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NivaranLogo: React.FC<{ className?: string }> = ({ className = "w-9 h-9" }) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Institutional Navy Crest Base */}
    <rect width="44" height="44" rx="8" fill="#0A2540" />
    {/* Top Tricolor Accent Band inside Crest */}
    <rect x="4" y="4" width="12" height="2.5" rx="1" fill="#EA580C" />
    <rect x="16" y="4" width="12" height="2.5" fill="#FFFFFF" />
    <rect x="28" y="4" width="12" height="2.5" rx="1" fill="#15803D" />
    {/* Ashoka-inspired Civic Shield & Chakra Node */}
    <path
      d="M22 10L11 14.5V22.5C11 29.8 15.7 36.2 22 38.5C28.3 36.2 33 29.8 33 22.5V14.5L22 10Z"
      stroke="#F8FAFC"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="#1E3A8A"
      fillOpacity="0.45"
    />
    <circle cx="22" cy="23" r="6.5" stroke="#38BDF8" strokeWidth="1.6" strokeDasharray="2 2" />
    <path
      d="M18.8 23.2L21.1 25.5L25.8 20.5"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  currentUser,
  onLogout,
  notifications,
  onMarkAllRead,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: ActivePage; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Mission" },
    { id: "departments", label: "Departments" },
    { id: "track", label: "Track Grievance" },
    { id: "map", label: "GIS Map" },
    { id: "admin", label: "ICCC Admin" },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setNotifOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 shadow-2xs">
      {/* Subtle 3px National Tricolor Top Rule */}
      <div className="h-1 w-full gov-tricolor-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0 cursor-pointer"
        >
          <NivaranLogo className="w-9 h-9" />
          <span className="text-lg font-bold tracking-tight text-[#0A2540] whitespace-nowrap font-serif-gov">
            NIVARAN AI
          </span>
        </button>

        {/* Zone 2: Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-5 whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? "text-[#0A2540] border-[#EA580C] font-semibold"
                    : "border-transparent hover:text-[#0A2540] hover:border-slate-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {currentUser?.role === "citizen" && (
            <button
              onClick={() => handleNavClick("citizen-dashboard")}
              className={`py-5 whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activePage === "citizen-dashboard"
                  ? "text-[#0A2540] border-[#EA580C] font-semibold"
                  : "border-transparent hover:text-[#0A2540] hover:border-slate-300"
              }`}
            >
              Citizen Desk
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Official Notifications"
              className="relative p-2 text-slate-700 hover:text-[#0A2540] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA580C] ring-2 ring-white" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md border border-slate-300 shadow-xl py-3 z-50">
                <div className="px-4 pb-2.5 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0A2540]">
                    Official Grievance Dispatch ({unreadCount})
                  </span>
                  <button
                    onClick={onMarkAllRead}
                    className="text-xs font-semibold text-blue-800 hover:underline cursor-pointer"
                  >
                    Acknowledge All
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-200">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No pending dispatches.
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setNotifOpen(false);
                          onNavigate("track", item.complaintId);
                        }}
                        className={`px-4 py-3 text-left cursor-pointer hover:bg-slate-50 transition-colors ${
                          !item.read ? "bg-amber-50/40" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span className="font-bold text-[#0A2540]">{item.title}</span>
                          <span className="font-mono">{item.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{item.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() =>
                  handleNavClick(
                    currentUser.role === "admin" ? "admin" : "citizen-dashboard"
                  )
                }
                className="px-3 py-2 text-xs font-semibold text-[#0A2540] bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                {currentUser.role === "admin" ? (
                  <ShieldCheck className="w-4 h-4 text-[#0A2540]" />
                ) : (
                  <UserCheck className="w-4 h-4 text-[#15803D]" />
                )}
                <span>{currentUser.name.split(" ")[0]}</span>
              </button>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick("auth")}
              className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-[#0A2540] bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              Citizen / Official Login
            </button>
          )}

          <button
            onClick={() => handleNavClick("submit")}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0A2540] hover:bg-[#1E3A8A] border border-[#0A2540] rounded-md shadow-2xs transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#EA580C]" />
            <span>Lodge Grievance</span>
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#0A2540] rounded-md"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-300 bg-white px-4 pt-3 pb-5 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                activePage === item.id
                  ? "bg-slate-100 text-[#0A2540] font-bold border-l-4 border-[#EA580C]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
          {currentUser ? (
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() =>
                  handleNavClick(
                    currentUser.role === "admin" ? "admin" : "citizen-dashboard"
                  )
                }
                className="text-sm font-bold text-[#0A2540] px-3 py-2"
              >
                Open {currentUser.role === "admin" ? "ICCC Admin Console" : "Citizen Desk"} ({currentUser.name})
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-red-700 px-3 py-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => handleNavClick("auth")}
                className="w-full py-2.5 text-center text-sm font-semibold text-[#0A2540] border border-slate-300 rounded-md"
              >
                Citizen / Official Login
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

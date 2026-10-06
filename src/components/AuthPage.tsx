import React, { useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Landmark,
} from "lucide-react";
import { UserAccount } from "../types";
import { DEMO_USERS } from "../data/mockData";
import { NivaranLogo } from "./Navbar";

interface AuthPageProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [roleTab, setRoleTab] = useState<"citizen" | "admin">("citizen");
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  const [name, setName] = useState("Aarav Sharma");
  const [identifier, setIdentifier] = useState("aarav.sharma@citizen.in");
  const [mobile, setMobile] = useState("+91 98204 51290");
  const [password, setPassword] = useState("••••••••••••");
  const [ward, setWard] = useState("Ward 12 - Central");
  const [message, setMessage] = useState<string | null>(null);

  const handleRoleSwitch = (nextRole: "citizen" | "admin") => {
    setRoleTab(nextRole);
    setMode("login");
    setMessage(null);
    if (nextRole === "admin") {
      setIdentifier("commissioner@nivaran.gov.in");
      setName("Vikramjit Singh, IAS");
    } else {
      setIdentifier("aarav.sharma@citizen.in");
      setName("Aarav Sharma");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setMessage(
        `OTP & password reset link dispatched to ${identifier}. Please check your SMS/email.`
      );
      return;
    }

    if (roleTab === "admin") {
      onLoginSuccess(DEMO_USERS[1]);
    } else {
      const citizenAccount: UserAccount = {
        id: "USR-CIT-01",
        name: mode === "register" ? name : "Aarav Sharma",
        email: identifier.includes("@") ? identifier : "aarav.sharma@citizen.in",
        mobile: mobile || "+91 98204 51290",
        role: "citizen",
        ward,
        city: "Pune",
      };
      onLoginSuccess(citizenAccount);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border-2 border-slate-300 rounded-md overflow-hidden shadow-md">
        {/* Left Brand & Security Assurance Panel */}
        <div className="lg:col-span-5 bg-[#0A2540] text-white p-8 flex flex-col justify-between space-y-8 border-r border-slate-700">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <NivaranLogo className="w-9 h-9" />
              <span className="text-lg font-bold tracking-tight font-serif-gov">
                NIVARAN AI
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5" />
              <span>National e-Pramaan Single Sign-On</span>
            </div>
            <h1 className="text-2xl font-bold leading-snug font-serif-gov">
              {roleTab === "citizen"
                ? "Citizen Grievance & Verification Desk"
                : "Municipal Command & Control Centre (ICCC)"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {roleTab === "citizen"
                ? "Sign in to register geo-tagged civic dockets, receive official SMS alerts, and verify field resolutions."
                : "Restricted access for Municipal Commissioners, Nodal Department Heads, and Zonal Executive Engineers."}
            </p>
          </div>

          <div className="bg-[#06182C] border border-slate-700 rounded-md p-4 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase">
              Demonstration Quick Sign-In
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => onLoginSuccess(DEMO_USERS[0])}
                className="w-full py-2 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Sign In as Demo Citizen (Aarav Sharma)
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess(DEMO_USERS[1])}
                className="w-full py-2 px-3 text-xs font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white rounded flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  Sign In as Municipal Commissioner (IAS)
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 p-1 bg-slate-100 border border-slate-300 rounded-md">
            <button
              type="button"
              onClick={() => handleRoleSwitch("citizen")}
              className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                roleTab === "citizen"
                  ? "bg-[#0A2540] text-white"
                  : "text-slate-700 hover:text-[#0A2540]"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Citizen Portal Login</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch("admin")}
              className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                roleTab === "admin"
                  ? "bg-[#0A2540] text-white"
                  : "text-slate-700 hover:text-[#0A2540]"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Official / Admin Login</span>
            </button>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-[#0A2540] font-serif-gov">
              {roleTab === "admin"
                ? "Municipal Authority Authentication"
                : mode === "register"
                ? "Citizen Portal Registration"
                : mode === "forgot"
                ? "Recover Citizen Credentials"
                : "Citizen Sign In"}
            </h2>
            {roleTab === "citizen" && (
              <div className="flex items-center gap-3 text-xs font-bold text-[#0A2540]">
                {mode !== "login" && (
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="hover:underline cursor-pointer"
                  >
                    Back to Login
                  </button>
                )}
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="hover:underline cursor-pointer"
                  >
                    New Citizen? Register
                  </button>
                )}
              </div>
            )}
          </div>

          {message && (
            <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-300 text-[#15803D] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {roleTab === "citizen" && mode === "register" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {roleTab === "admin"
                  ? "Official Government Email / NIC ID *"
                  : "Mobile Number or Email Address *"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                />
              </div>
            </div>

            {roleTab === "citizen" && mode === "register" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (SMS Alerts) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Residential Municipal Ward
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>
            )}

            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password *
                  </label>
                  {roleTab === "citizen" && mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs font-semibold text-[#0A2540] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0A2540]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-5 text-sm font-bold text-white bg-[#0A2540] hover:bg-[#1E3A8A] rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {mode === "forgot"
                  ? "Dispatch Recovery OTP"
                  : mode === "register"
                  ? "Register & Enter Citizen Desk"
                  : roleTab === "admin"
                  ? "Authorize & Enter ICCC Admin Console"
                  : "Sign In to Citizen Desk"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

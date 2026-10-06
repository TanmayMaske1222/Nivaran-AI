export type ComplaintPriority = "Critical" | "High" | "Medium" | "Low";

export type ComplaintStatus =
  | "Complaint Submitted"
  | "AI Analysis Completed"
  | "Department Assigned"
  | "Officer Assigned"
  | "Work in Progress"
  | "Resolution Submitted"
  | "Citizen Verification"
  | "Complaint Closed"
  | "Reopened";

export type ComplaintCategoryName =
  | "Road & Potholes"
  | "Garbage & Waste"
  | "Street Lights"
  | "Water Supply"
  | "Drainage"
  | "Public Environment"
  | "Traffic & Signals"
  | "Public Infrastructure"
  | "Electricity"
  | "Other Civic Issues";

export interface TimelineStep {
  step: ComplaintStatus;
  completed: boolean;
  active: boolean;
  timestamp?: string;
  actor?: string;
  note?: string;
}

export interface AIAnalysisResult {
  detectedIssue: string;
  category: ComplaintCategoryName | string;
  priority: ComplaintPriority;
  confidence: number;
  recommendedDepartment: string;
  estimatedResponse: string;
  reasoning: string;
  duplicateMatch?: string | null;
  publicImpactScore: number;
}

export interface CitizenFeedback {
  rating: number;
  satisfaction: "Satisfied" | "Partially Satisfied" | "Not Satisfied";
  comment: string;
  submittedAt: string;
}

export interface Complaint {
  id: string;
  citizenName: string;
  citizenMobile: string;
  citizenEmail: string;
  title: string;
  description: string;
  category: ComplaintCategoryName | string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  department: string;
  assignedOfficer: string;
  officerDesignation: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  ward: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  submittedAt: string;
  updatedAt: string;
  expectedSla: string;
  images: string[];
  aiAnalysis: AIAnalysisResult;
  timeline: TimelineStep[];
  resolutionRemarks?: string;
  feedback?: CitizenFeedback;
  isOverdue?: boolean;
}

export interface Department {
  id: string;
  name: string;
  shortCode: string;
  description: string;
  headOfficer: string;
  contactEmail: string;
  helpline: string;
  totalComplaints: number;
  resolvedComplaints: number;
  inProgressComplaints: number;
  avgResponseTime: string;
  slaComplianceRate: number;
  categoriesCovered: string[];
}

export interface Officer {
  id: string;
  name: string;
  designation: string;
  department: string;
  ward: string;
  phone: string;
  email: string;
  activeCases: number;
  resolvedCases: number;
  rating: number;
  status: "Available" | "On Field Inspection" | "In Emergency Response";
}

export interface NotificationItem {
  id: string;
  complaintId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "assignment" | "progress" | "resolved" | "escalation" | "ai";
  targetRole: "citizen" | "admin" | "both";
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: "citizen" | "admin";
  ward?: string;
  city?: string;
  designation?: string;
  department?: string;
}

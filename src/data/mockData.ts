import {
  Complaint,
  Department,
  Officer,
  NotificationItem,
  UserAccount,
} from "../types";

// Embedded SVG Data URIs for zero-broken-image guarantee in hermetic sandboxes
export const EVIDENCE_SVG_POTHOLE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#sky)"/>
  <polygon points="180,140 620,140 800,500 0,500" fill="url(#road)"/>
  <line x1="400" y1="150" x2="400" y2="500" stroke="#f59e0b" stroke-width="8" stroke-dasharray="32 24"/>
  <!-- Pothole Crater -->
  <ellipse cx="430" cy="350" rx="135" ry="58" fill="#090d16" stroke="#475569" stroke-width="6"/>
  <ellipse cx="435" cy="356" rx="110" ry="42" fill="#1e293b"/>
  <ellipse cx="425" cy="360" rx="85" ry="28" fill="#0284c7" fill-opacity="0.45"/>
  <!-- AI Bounding Box Detection Overlay -->
  <rect x="275" y="275" width="310" height="150" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="10 6" rx="8"/>
  <rect x="275" y="243" width="250" height="32" fill="#ef4444" rx="4"/>
  <text x="288" y="264" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">POTHOLE DETECTED · 96.4% CONF</text>
  <text x="28" y="468" fill="#94a3b8" font-family="monospace" font-size="13">CAM-EVIDENCE // MG ROAD JUNCTION, PUNE · LAT 18.5204° N, 73.8567° E</text>
</svg>
`)}`;

export const EVIDENCE_SVG_GARBAGE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#0f172a"/>
  <rect y="320" width="800" height="180" fill="#1e293b"/>
  <!-- Dumpster & Waste Mounds -->
  <rect x="210" y="190" width="190" height="145" fill="#047857" stroke="#34d399" stroke-width="3" rx="6"/>
  <circle cx="460" cy="310" r="55" fill="#334155"/>
  <circle cx="525" cy="325" r="45" fill="#475569"/>
  <circle cx="395" cy="330" r="40" fill="#1f2937"/>
  <!-- AI Bounding Box -->
  <rect x="190" y="165" width="395" height="205" fill="none" stroke="#f59e0b" stroke-width="3" stroke-dasharray="10 6" rx="8"/>
  <rect x="190" y="133" width="285" height="32" fill="#f59e0b" rx="4"/>
  <text x="202" y="154" fill="#0f172a" font-family="monospace" font-size="14" font-weight="bold">SOLID WASTE OVERFLOW · 94.8%</text>
  <text x="28" y="468" fill="#94a3b8" font-family="monospace" font-size="13">CAM-EVIDENCE // INDIRANAGAR 100FT RD, BENGALURU · WARD 78</text>
</svg>
`)}`;

export const EVIDENCE_SVG_STREETLIGHT = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#090d16"/>
  <!-- Pole -->
  <rect x="388" y="110" width="18" height="360" fill="#475569"/>
  <path d="M397 115 Q480 95 540 125" fill="none" stroke="#64748b" stroke-width="12"/>
  <ellipse cx="545" cy="130" rx="28" ry="12" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
  <!-- Spark / Fault indicator -->
  <circle cx="545" cy="130" r="45" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 6"/>
  <rect x="340" y="65" width="265" height="120" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="10 6" rx="8"/>
  <rect x="340" y="33" width="265" height="32" fill="#0284c7" rx="4"/>
  <text x="352" y="54" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">LUMINAIRE FAULT · 93.2% CONF</text>
  <text x="28" y="468" fill="#94a3b8" font-family="monospace" font-size="13">CAM-EVIDENCE // SECTOR 18 MARKET ROAD, NOIDA · POLE #EL-409</text>
</svg>
`)}`;

export const EVIDENCE_SVG_WATER = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <rect width="800" height="500" fill="#0f172a"/>
  <rect y="300" width="800" height="200" fill="#1e293b"/>
  <!-- Pipe & Water Gush -->
  <ellipse cx="400" cy="360" rx="220" ry="55" fill="#0284c7" fill-opacity="0.5"/>
  <path d="M400 350 Q360 210 310 260" fill="none" stroke="#38bdf8" stroke-width="10"/>
  <path d="M400 350 Q440 190 495 255" fill="none" stroke="#7dd3fc" stroke-width="8"/>
  <rect x="240" y="180" width="320" height="230" fill="none" stroke="#06b6d4" stroke-width="3" stroke-dasharray="10 6" rx="8"/>
  <rect x="240" y="148" width="290" height="32" fill="#0891b2" rx="4"/>
  <text x="252" y="169" fill="#ffffff" font-family="monospace" font-size="14" font-weight="bold">PIPELINE RUPTURE · 97.1% CONF</text>
  <text x="28" y="468" fill="#94a3b8" font-family="monospace" font-size="13">CAM-EVIDENCE // SHIVAJI NAGAR MAIN LINE · WARD 14</text>
</svg>
`)}`;

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: "NVR-2026-10452",
    citizenName: "Aarav Sharma",
    citizenMobile: "+91 98204 51290",
    citizenEmail: "aarav.sharma@citizen.in",
    title: "Deep pothole cluster near MG Road Metro Pillar 114 causing two-wheeler accidents",
    description:
      "A 4-foot wide, 8-inch deep pothole has formed directly in the right lane near Metro Pillar 114 on MG Road after heavy rain. Water is pooled inside making the depth invisible to commuters at night. Three two-wheelers skidded yesterday evening.",
    category: "Road & Potholes",
    priority: "High",
    status: "Work in Progress",
    department: "Public Works Department (PWD)",
    assignedOfficer: "Er. Rajesh Deshmukh",
    officerDesignation: "Executive Engineer (Roads - Zone 2)",
    address: "Near Metro Pillar 114, MG Road, Camp Area",
    area: "MG Road / Camp",
    city: "Pune",
    pincode: "411001",
    ward: "Ward 12 - Central",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    submittedAt: "2026-10-03 09:14 AM",
    updatedAt: "2026-10-05 11:30 AM",
    expectedSla: "24–48 Hours",
    images: [EVIDENCE_SVG_POTHOLE],
    aiAnalysis: {
      detectedIssue: "Pothole & Asphalt Crater Hazard",
      category: "Road & Potholes",
      priority: "High",
      confidence: 96,
      recommendedDepartment: "Public Works Department (PWD)",
      estimatedResponse: "24–48 Hours",
      reasoning:
        "Computer vision detected a high-severity road surface depression (approx. 1.2m diameter) on an arterial metro corridor with high commuter risk.",
      duplicateMatch: "Linked with 2 nearby reports within 50m radius",
      publicImpactScore: 89,
    },
    timeline: [
      {
        step: "Complaint Submitted",
        completed: true,
        active: false,
        timestamp: "03 Oct 2026, 09:14 AM",
        actor: "Aarav Sharma (Citizen)",
        note: "Submitted with geo-tagged photo evidence and GPS coordinates.",
      },
      {
        step: "AI Analysis Completed",
        completed: true,
        active: false,
        timestamp: "03 Oct 2026, 09:14 AM",
        actor: "NIVARAN AI Engine",
        note: "Classified as Road & Potholes (96% confidence). Priority elevated to High due to two-wheeler safety risk.",
      },
      {
        step: "Department Assigned",
        completed: true,
        active: false,
        timestamp: "03 Oct 2026, 09:15 AM",
        actor: "Smart Routing System",
        note: "Automatically routed to Public Works Department (PWD) — Zone 2.",
      },
      {
        step: "Officer Assigned",
        completed: true,
        active: false,
        timestamp: "03 Oct 2026, 10:40 AM",
        actor: "Er. Rajesh Deshmukh",
        note: "Field inspection squad dispatched with cold-mix asphalt unit.",
      },
      {
        step: "Work in Progress",
        completed: false,
        active: true,
        timestamp: "04 Oct 2026, 02:15 PM",
        actor: "Er. Rajesh Deshmukh",
        note: "Barricading completed; sub-base dewatering and hot-mix resurfacing underway.",
      },
      {
        step: "Resolution Submitted",
        completed: false,
        active: false,
      },
      {
        step: "Citizen Verification",
        completed: false,
        active: false,
      },
      {
        step: "Complaint Closed",
        completed: false,
        active: false,
      },
    ],
  },
  {
    id: "NVR-2026-10021",
    citizenName: "Priya Nair",
    citizenMobile: "+91 98451 22310",
    citizenEmail: "priya.nair@citizen.in",
    title: "Pothole near Main Road bus terminus entrance blocking ambulances",
    description:
      "Large broken road patch right at the Main Road junction outside the civil hospital gate. Vehicles are forced to swerve into oncoming traffic.",
    category: "Road & Potholes",
    priority: "High",
    status: "Work in Progress",
    department: "Public Works Department (PWD)",
    assignedOfficer: "Er. Rajesh Deshmukh",
    officerDesignation: "Executive Engineer (Roads - Zone 2)",
    address: "Main Road Junction, Civil Hospital Gate No. 2",
    area: "Shivaji Nagar",
    city: "Pune",
    pincode: "411005",
    ward: "Ward 7 - Shivaji Nagar",
    coordinates: { lat: 18.5314, lng: 73.8446 },
    submittedAt: "2026-10-02 04:20 PM",
    updatedAt: "2026-10-04 05:10 PM",
    expectedSla: "24 Hours",
    images: [EVIDENCE_SVG_POTHOLE],
    aiAnalysis: {
      detectedIssue: "Arterial Road Crater near Hospital Zone",
      category: "Road & Potholes",
      priority: "High",
      confidence: 94,
      recommendedDepartment: "Public Works Department (PWD)",
      estimatedResponse: "12–24 Hours",
      reasoning: "Proximity to hospital emergency gate increases priority index to High.",
      duplicateMatch: null,
      publicImpactScore: 86,
    },
    timeline: [
      {
        step: "Complaint Submitted",
        completed: true,
        active: false,
        timestamp: "02 Oct 2026, 04:20 PM",
        actor: "Priya Nair (Citizen)",
      },
      {
        step: "AI Analysis Completed",
        completed: true,
        active: false,
        timestamp: "02 Oct 2026, 04:20 PM",
        actor: "NIVARAN AI Engine",
      },
      {
        step: "Department Assigned",
        completed: true,
        active: false,
        timestamp: "02 Oct 2026, 04:21 PM",
        actor: "Smart Routing System",
      },
      {
        step: "Officer Assigned",
        completed: true,
        active: false,
        timestamp: "02 Oct 2026, 05:05 PM",
        actor: "Er. Rajesh Deshmukh",
      },
      {
        step: "Work in Progress",
        completed: false,
        active: true,
        timestamp: "03 Oct 2026, 11:00 AM",
        actor: "Er. Rajesh Deshmukh",
        note: "Wet-mix macadam laid; final bitumen layer scheduled tonight.",
      },
      { step: "Resolution Submitted", completed: false, active: false },
      { step: "Citizen Verification", completed: false, active: false },
      { step: "Complaint Closed", completed: false, active: false },
    ],
  },
  {
    id: "NVR-2026-10022",
    citizenName: "Vikramaditya Kulkarni",
    citizenMobile: "+91 97650 88123",
    citizenEmail: "vikram.k@citizen.in",
    title: "Garbage accumulation near residential area & overflowing secondary bin",
    description:
      "Uncollected municipal waste has piled up outside Green Valley Society Gate 1 for 3 days. Stray cattle and foul odor are affecting senior citizens and school children.",
    category: "Garbage & Waste",
    priority: "Medium",
    status: "Complaint Closed",
    department: "Sanitation & Solid Waste Management",
    assignedOfficer: "Smt. Meenakshi Iyer",
    officerDesignation: "Chief Sanitary Inspector (Zone 3)",
    address: "Green Valley Co-op Housing Society, Kothrud",
    area: "Kothrud",
    city: "Pune",
    pincode: "411038",
    ward: "Ward 3 - Kothrud",
    coordinates: { lat: 18.5074, lng: 73.8077 },
    submittedAt: "2026-10-01 08:05 AM",
    updatedAt: "2026-10-02 03:45 PM",
    expectedSla: "12–24 Hours",
    images: [EVIDENCE_SVG_GARBAGE],
    resolutionRemarks:
      "Compactor truck #MH-12-SW-408 cleared 1.8 tonnes of mixed waste. Bleaching powder and bio-enzyme sanitization sprayed around the collection point.",
    feedback: {
      rating: 5,
      satisfaction: "Satisfied",
      comment: "Cleared within 18 hours and the area was properly sanitized. Great transparency!",
      submittedAt: "2026-10-02 06:00 PM",
    },
    aiAnalysis: {
      detectedIssue: "Solid Waste Overflow & Hygiene Hazard",
      category: "Garbage & Waste",
      priority: "Medium",
      confidence: 95,
      recommendedDepartment: "Sanitation & Solid Waste Management",
      estimatedResponse: "12–24 Hours",
      reasoning: "Image segmentation confirmed overflowing community bin in high-density residential zone.",
      duplicateMatch: null,
      publicImpactScore: 74,
    },
    timeline: [
      { step: "Complaint Submitted", completed: true, active: false, timestamp: "01 Oct 2026, 08:05 AM", actor: "Vikramaditya Kulkarni" },
      { step: "AI Analysis Completed", completed: true, active: false, timestamp: "01 Oct 2026, 08:05 AM", actor: "NIVARAN AI Engine" },
      { step: "Department Assigned", completed: true, active: false, timestamp: "01 Oct 2026, 08:06 AM", actor: "Smart Routing System" },
      { step: "Officer Assigned", completed: true, active: false, timestamp: "01 Oct 2026, 09:30 AM", actor: "Smt. Meenakshi Iyer" },
      { step: "Work in Progress", completed: true, active: false, timestamp: "01 Oct 2026, 02:15 PM", actor: "Sanitation Squad B" },
      { step: "Resolution Submitted", completed: true, active: false, timestamp: "02 Oct 2026, 11:20 AM", actor: "Smt. Meenakshi Iyer", note: "Site cleaned and geo-tagged completion photo uploaded." },
      { step: "Citizen Verification", completed: true, active: false, timestamp: "02 Oct 2026, 03:40 PM", actor: "Vikramaditya Kulkarni", note: "Verified and rated 5 stars." },
      { step: "Complaint Closed", completed: true, active: true, timestamp: "02 Oct 2026, 03:45 PM", actor: "NIVARAN System" },
    ],
  },
  {
    id: "NVR-2026-10023",
    citizenName: "Ananya Chatterjee",
    citizenMobile: "+91 98112 44901",
    citizenEmail: "ananya.c@citizen.in",
    title: "Streetlight not working on dark pedestrian stretch near Women's College",
    description:
      "Four consecutive LED streetlight poles (#EL-408 to #EL-411) are completely dark for the past 4 nights near Symbiosis / Women's Hostel Road, creating a severe safety concern.",
    category: "Street Lights",
    priority: "Medium",
    status: "Department Assigned",
    department: "Electrical & Street Lighting Department",
    assignedOfficer: "Er. Siddharth Verma",
    officerDesignation: "Assistant Electrical Engineer",
    address: "Senapati Bapat Road, Near Women's College Hostel",
    area: "Viman Nagar / SB Road",
    city: "Pune",
    pincode: "411016",
    ward: "Ward 15 - East",
    coordinates: { lat: 18.5362, lng: 73.8299 },
    submittedAt: "2026-10-04 07:45 PM",
    updatedAt: "2026-10-04 08:15 PM",
    expectedSla: "24–36 Hours",
    images: [EVIDENCE_SVG_STREETLIGHT],
    aiAnalysis: {
      detectedIssue: "Multi-Pole LED Streetlight Outage",
      category: "Street Lights",
      priority: "Medium",
      confidence: 93,
      recommendedDepartment: "Electrical & Street Lighting Department",
      estimatedResponse: "24–36 Hours",
      reasoning: "NLP identified feeder outage affecting 4 consecutive poles in pedestrian student zone.",
      duplicateMatch: null,
      publicImpactScore: 78,
    },
    timeline: [
      { step: "Complaint Submitted", completed: true, active: false, timestamp: "04 Oct 2026, 07:45 PM", actor: "Ananya Chatterjee" },
      { step: "AI Analysis Completed", completed: true, active: false, timestamp: "04 Oct 2026, 07:45 PM", actor: "NIVARAN AI Engine" },
      { step: "Department Assigned", completed: true, active: true, timestamp: "04 Oct 2026, 07:46 PM", actor: "Smart Routing System", note: "Assigned to Electrical & Street Lighting Department." },
      { step: "Officer Assigned", completed: false, active: false },
      { step: "Work in Progress", completed: false, active: false },
      { step: "Resolution Submitted", completed: false, active: false },
      { step: "Citizen Verification", completed: false, active: false },
      { step: "Complaint Closed", completed: false, active: false },
    ],
  },
  {
    id: "NVR-2026-10389",
    citizenName: "Mohammed Farhan",
    citizenMobile: "+91 99231 67019",
    citizenEmail: "farhan.m@citizen.in",
    title: "Major drinking water pipeline leakage flooding Baner High Street",
    description:
      "Clean treated water is gushing out of a ruptured underground main valve near Baner High Street since 6 AM. Thousands of liters are being wasted and pressure in nearby apartments has dropped.",
    category: "Water Supply",
    priority: "Critical",
    status: "Resolution Submitted",
    department: "Water Supply & Jal Board",
    assignedOfficer: "Er. Prakash Joshi",
    officerDesignation: "Deputy Hydraulic Engineer",
    address: "Baner High Street, Opposite Smart Superstore",
    area: "Baner",
    city: "Pune",
    pincode: "411045",
    ward: "Ward 9 - Baner-Balewadi",
    coordinates: { lat: 18.559, lng: 73.7868 },
    submittedAt: "2026-10-04 06:30 AM",
    updatedAt: "2026-10-05 09:00 AM",
    expectedSla: "6–12 Hours",
    images: [EVIDENCE_SVG_WATER],
    resolutionRemarks:
      "300mm DI pipeline collar clamp installed and pressure tested. Road trench backfilled with murum; water supply restored at normal pressure.",
    aiAnalysis: {
      detectedIssue: "High-Volume Potable Water Main Rupture",
      category: "Water Supply",
      priority: "Critical",
      confidence: 97,
      recommendedDepartment: "Water Supply & Jal Board",
      estimatedResponse: "6–12 Hours",
      reasoning: "Critical water loss and supply disruption detected; immediate hydraulic shutoff & repair required.",
      duplicateMatch: "3 residents reported low pressure in Ward 9",
      publicImpactScore: 95,
    },
    timeline: [
      { step: "Complaint Submitted", completed: true, active: false, timestamp: "04 Oct 2026, 06:30 AM", actor: "Mohammed Farhan" },
      { step: "AI Analysis Completed", completed: true, active: false, timestamp: "04 Oct 2026, 06:30 AM", actor: "NIVARAN AI Engine" },
      { step: "Department Assigned", completed: true, active: false, timestamp: "04 Oct 2026, 06:31 AM", actor: "Smart Routing System" },
      { step: "Officer Assigned", completed: true, active: false, timestamp: "04 Oct 2026, 07:00 AM", actor: "Er. Prakash Joshi" },
      { step: "Work in Progress", completed: true, active: false, timestamp: "04 Oct 2026, 09:15 AM", actor: "Emergency Hydraulic Team" },
      { step: "Resolution Submitted", completed: true, active: true, timestamp: "05 Oct 2026, 09:00 AM", actor: "Er. Prakash Joshi", note: "Valve replaced and leak sealed. Awaiting citizen verification." },
      { step: "Citizen Verification", completed: false, active: false },
      { step: "Complaint Closed", completed: false, active: false },
    ],
  },
  {
    id: "NVR-2026-10410",
    citizenName: "Rohan Deshpande",
    citizenMobile: "+91 98901 33412",
    citizenEmail: "rohan.d@citizen.in",
    title: "Overflowing storm drain & open manhole cover near Hadapsar IT Park",
    description:
      "Sewage mixed with stormwater is overflowing onto the pedestrian walkway outside Magarpatta / Hadapsar IT Park gate. The concrete manhole lid is broken on one side.",
    category: "Drainage",
    priority: "Critical",
    status: "Officer Assigned",
    department: "Drainage & Sewerage Department",
    assignedOfficer: "Er. Kunal Sawant",
    officerDesignation: "Assistant Engineer (Sewerage Operations)",
    address: "Magarpatta Road, Gate No. 3, Hadapsar",
    area: "Hadapsar",
    city: "Pune",
    pincode: "411028",
    ward: "Ward 21 - Hadapsar",
    coordinates: { lat: 18.5089, lng: 73.9259 },
    submittedAt: "2026-10-04 01:15 PM",
    updatedAt: "2026-10-04 04:00 PM",
    expectedSla: "6–12 Hours",
    images: [EVIDENCE_SVG_WATER],
    isOverdue: true,
    aiAnalysis: {
      detectedIssue: "Damaged Manhole & Sewage Backflow",
      category: "Drainage",
      priority: "Critical",
      confidence: 95,
      recommendedDepartment: "Drainage & Sewerage Department",
      estimatedResponse: "6–12 Hours",
      reasoning: "Pedestrian fall hazard from broken manhole cover combined with bio-hazard sewage overflow.",
      duplicateMatch: null,
      publicImpactScore: 92,
    },
    timeline: [
      { step: "Complaint Submitted", completed: true, active: false, timestamp: "04 Oct 2026, 01:15 PM", actor: "Rohan Deshpande" },
      { step: "AI Analysis Completed", completed: true, active: false, timestamp: "04 Oct 2026, 01:15 PM", actor: "NIVARAN AI Engine" },
      { step: "Department Assigned", completed: true, active: false, timestamp: "04 Oct 2026, 01:16 PM", actor: "Smart Routing System" },
      { step: "Officer Assigned", completed: true, active: true, timestamp: "04 Oct 2026, 04:00 PM", actor: "Er. Kunal Sawant", note: "Jetting suction machine scheduled for deployment." },
      { step: "Work in Progress", completed: false, active: false },
      { step: "Resolution Submitted", completed: false, active: false },
      { step: "Citizen Verification", completed: false, active: false },
      { step: "Complaint Closed", completed: false, active: false },
    ],
  },
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: "dept-pwd",
    name: "Public Works Department (PWD)",
    shortCode: "PWD-ROADS",
    description: "Roads, potholes, footpaths, bridges, road dividers and arterial public infrastructure maintenance.",
    headOfficer: "Er. Rajesh Deshmukh, Chief Engineer",
    contactEmail: "pwd.control@nivaran.gov.in",
    helpline: "1800-233-4001",
    totalComplaints: 3420,
    resolvedComplaints: 3112,
    inProgressComplaints: 308,
    avgResponseTime: "18.4 Hours",
    slaComplianceRate: 91.0,
    categoriesCovered: ["Road & Potholes", "Public Infrastructure"],
  },
  {
    id: "dept-sanitation",
    name: "Sanitation & Solid Waste Management",
    shortCode: "SWM-CLEAN",
    description: "Door-to-door garbage collection, secondary waste bins, street sweeping, dead animal removal and urban cleanliness.",
    headOfficer: "Smt. Meenakshi Iyer, Joint Commissioner (SWM)",
    contactEmail: "sanitation@nivaran.gov.in",
    helpline: "1800-233-4002",
    totalComplaints: 2890,
    resolvedComplaints: 2745,
    inProgressComplaints: 145,
    avgResponseTime: "9.2 Hours",
    slaComplianceRate: 95.0,
    categoriesCovered: ["Garbage & Waste"],
  },
  {
    id: "dept-water",
    name: "Water Supply & Jal Board",
    shortCode: "JAL-WATER",
    description: "Potable water supply scheduling, underground pipeline ruptures, pressure regulation and water quality testing.",
    headOfficer: "Er. Prakash Joshi, Superintending Engineer",
    contactEmail: "jalboard@nivaran.gov.in",
    helpline: "1800-233-4003",
    totalComplaints: 2150,
    resolvedComplaints: 1988,
    inProgressComplaints: 162,
    avgResponseTime: "11.5 Hours",
    slaComplianceRate: 92.5,
    categoriesCovered: ["Water Supply"],
  },
  {
    id: "dept-electrical",
    name: "Electrical & Street Lighting Department",
    shortCode: "ELEC-LIGHT",
    description: "Smart LED streetlights, high-mast junction lighting, feeder pillar maintenance and exposed civic cabling.",
    headOfficer: "Er. Siddharth Verma, Chief Electrical Engineer",
    contactEmail: "electrical@nivaran.gov.in",
    helpline: "1800-233-4004",
    totalComplaints: 1680,
    resolvedComplaints: 1554,
    inProgressComplaints: 126,
    avgResponseTime: "14.8 Hours",
    slaComplianceRate: 92.5,
    categoriesCovered: ["Street Lights", "Electricity"],
  },
  {
    id: "dept-drainage",
    name: "Drainage & Sewerage Department",
    shortCode: "DRN-SEWER",
    description: "Stormwater drain desilting, sewage blockage clearance, manhole cover replacement and monsoon waterlogging control.",
    headOfficer: "Er. Kunal Sawant, Executive Engineer",
    contactEmail: "drainage@nivaran.gov.in",
    helpline: "1800-233-4005",
    totalComplaints: 1490,
    resolvedComplaints: 1326,
    inProgressComplaints: 164,
    avgResponseTime: "16.1 Hours",
    slaComplianceRate: 89.0,
    categoriesCovered: ["Drainage"],
  },
  {
    id: "dept-env",
    name: "Environment & Urban Forestry Department",
    shortCode: "ENV-GREEN",
    description: "Illegal garbage burning, air/noise pollution monitoring, fallen tree clearance and public park conservation.",
    headOfficer: "Dr. Sunita Kulkarni, Director (Environment)",
    contactEmail: "environment@nivaran.gov.in",
    helpline: "1800-233-4006",
    totalComplaints: 870,
    resolvedComplaints: 812,
    inProgressComplaints: 58,
    avgResponseTime: "21.0 Hours",
    slaComplianceRate: 93.3,
    categoriesCovered: ["Public Environment", "Traffic & Signals", "Other Civic Issues"],
  },
];

export const INITIAL_OFFICERS: Officer[] = [
  {
    id: "OFF-101",
    name: "Er. Rajesh Deshmukh",
    designation: "Executive Engineer (Roads)",
    department: "Public Works Department (PWD)",
    ward: "Ward 7 & Ward 12",
    phone: "+91 94220 11201",
    email: "r.deshmukh@nivaran.gov.in",
    activeCases: 6,
    resolvedCases: 142,
    rating: 4.8,
    status: "On Field Inspection",
  },
  {
    id: "OFF-102",
    name: "Smt. Meenakshi Iyer",
    designation: "Chief Sanitary Inspector",
    department: "Sanitation & Solid Waste Management",
    ward: "Ward 3 - Kothrud",
    phone: "+91 94220 11202",
    email: "m.iyer@nivaran.gov.in",
    activeCases: 3,
    resolvedCases: 219,
    rating: 4.9,
    status: "Available",
  },
  {
    id: "OFF-103",
    name: "Er. Prakash Joshi",
    designation: "Deputy Hydraulic Engineer",
    department: "Water Supply & Jal Board",
    ward: "Ward 9 - Baner",
    phone: "+91 94220 11203",
    email: "p.joshi@nivaran.gov.in",
    activeCases: 4,
    resolvedCases: 168,
    rating: 4.7,
    status: "In Emergency Response",
  },
  {
    id: "OFF-104",
    name: "Er. Siddharth Verma",
    designation: "Assistant Electrical Engineer",
    department: "Electrical & Street Lighting Department",
    ward: "Ward 15 - East",
    phone: "+91 94220 11204",
    email: "s.verma@nivaran.gov.in",
    activeCases: 5,
    resolvedCases: 134,
    rating: 4.6,
    status: "Available",
  },
  {
    id: "OFF-105",
    name: "Er. Kunal Sawant",
    designation: "Assistant Engineer (Sewerage)",
    department: "Drainage & Sewerage Department",
    ward: "Ward 21 - Hadapsar",
    phone: "+91 94220 11205",
    email: "k.sawant@nivaran.gov.in",
    activeCases: 7,
    resolvedCases: 118,
    rating: 4.5,
    status: "On Field Inspection",
  },
  {
    id: "OFF-106",
    name: "Dr. Sunita Kulkarni",
    designation: "Environmental Nodal Officer",
    department: "Environment & Urban Forestry Department",
    ward: "City-Wide Nodal",
    phone: "+91 94220 11206",
    email: "s.kulkarni@nivaran.gov.in",
    activeCases: 2,
    resolvedCases: 94,
    rating: 4.9,
    status: "Available",
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    complaintId: "NVR-2026-10452",
    title: "Department Assigned",
    message: "Your complaint NVR-2026-10452 has been assigned to the Public Works Department (PWD).",
    timestamp: "10 mins ago",
    read: false,
    type: "assignment",
    targetRole: "both",
  },
  {
    id: "notif-2",
    complaintId: "NVR-2026-10452",
    title: "Resolution In Progress",
    message: "Your complaint NVR-2026-10452 is currently being resolved by field squad under Er. Rajesh Deshmukh.",
    timestamp: "1 hour ago",
    read: false,
    type: "progress",
    targetRole: "citizen",
  },
  {
    id: "notif-3",
    complaintId: "NVR-2026-10389",
    title: "Verification Requested",
    message: "Complaint NVR-2026-10389 has been marked as resolved. Please verify the resolution and submit feedback.",
    timestamp: "3 hours ago",
    read: false,
    type: "resolved",
    targetRole: "both",
  },
  {
    id: "notif-4",
    complaintId: "NVR-2026-10410",
    title: "SLA Escalation Alert",
    message: "Complaint NVR-2026-10410 (Drainage - Ward 21) has been escalated due to delayed resolution.",
    timestamp: "5 hours ago",
    read: true,
    type: "escalation",
    targetRole: "admin",
  },
];

export const DEMO_USERS: UserAccount[] = [
  {
    id: "USR-CIT-01",
    name: "Aarav Sharma",
    email: "aarav.sharma@citizen.in",
    mobile: "+91 98204 51290",
    role: "citizen",
    ward: "Ward 12 - Central",
    city: "Pune",
  },
  {
    id: "USR-ADM-01",
    name: "Vikramjit Singh, IAS",
    email: "commissioner@nivaran.gov.in",
    mobile: "+91 94220 00100",
    role: "admin",
    designation: "Smart City Mission Director & Municipal Commissioner",
    department: "Integrated Command & Control Centre (ICCC)",
  },
];

export const COMPLAINT_CATEGORIES_LIST = [
  {
    id: "cat-roads",
    name: "Road & Potholes",
    description: "Potholes, damaged asphalt, broken dividers, unscientific speed breakers and footpath hazards.",
    sla: "24–48 Hours",
    department: "Public Works Department (PWD)",
    count: 3420,
  },
  {
    id: "cat-garbage",
    name: "Garbage & Waste",
    description: "Uncollected garbage, overflowing community bins, missed door-to-door pickup and construction debris.",
    sla: "12–24 Hours",
    department: "Sanitation & Solid Waste Management",
    count: 2890,
  },
  {
    id: "cat-lights",
    name: "Street Lights",
    description: "Non-functional LED streetlights, flickering poles, timer faults and dark pedestrian stretches.",
    sla: "24–36 Hours",
    department: "Electrical & Street Lighting Department",
    count: 1680,
  },
  {
    id: "cat-water",
    name: "Water Supply",
    description: "Pipeline leakage, contaminated water supply, low water pressure and valve bursts.",
    sla: "6–18 Hours",
    department: "Water Supply & Jal Board",
    count: 2150,
  },
  {
    id: "cat-drainage",
    name: "Drainage",
    description: "Blocked stormwater drains, overflowing sewage lines, missing manhole covers and waterlogging.",
    sla: "6–12 Hours",
    department: "Drainage & Sewerage Department",
    count: 1490,
  },
  {
    id: "cat-environment",
    name: "Public Environment",
    description: "Open garbage burning, fallen trees blocking roads, illegal tree felling and park maintenance.",
    sla: "24–48 Hours",
    department: "Environment & Urban Forestry Department",
    count: 520,
  },
  {
    id: "cat-traffic",
    name: "Traffic & Signals",
    description: "Malfunctioning traffic signals, faded zebra crossings, damaged road signage and junction bottlenecks.",
    sla: "4–12 Hours",
    department: "Smart City Traffic & Mobility Cell",
    count: 410,
  },
  {
    id: "cat-infra",
    name: "Public Infrastructure",
    description: "Damaged bus shelters, public toilets, pedestrian foot-overbridges and municipal boundary walls.",
    sla: "48–72 Hours",
    department: "Public Works Department (PWD)",
    count: 390,
  },
  {
    id: "cat-electricity",
    name: "Electricity",
    description: "Exposed live wires, sparking feeder pillars, leaning electric poles and transformer hazards.",
    sla: "2–6 Hours",
    department: "Electrical & Street Lighting Department",
    count: 310,
  },
  {
    id: "cat-other",
    name: "Other Civic Issues",
    description: "Stray cattle menace, encroachment on public walkways, noise pollution and general civic grievances.",
    sla: "48 Hours",
    department: "Environment & Urban Forestry Department",
    count: 240,
  },
];

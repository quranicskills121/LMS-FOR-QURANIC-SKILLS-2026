"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  GraduationCap,
  Eye,
  Users,
  Settings,
  Plus,
  Printer,
  LogOut,
  Video,
  Send,
  Lock,
  Building2,
  DollarSign,
  ClipboardList,
  Search,
  RotateCcw,
  EyeOff
} from "lucide-react";
import { OFFICIAL_STUDENTS_LIST, Student, StudentHistoryEntry } from "@/lib/studentsData";

interface AcademySettings {
  academyName: string;
  tagline: string;
  phone: string;
  email: string;
  bankName: string;
  accountTitle: string;
  bankIBAN: string;
  easyPaisa: string;
  jazzCash: string;
  overseasNote: string;
  adminPin: string;
  teacherPin: string;
  supervisorPin: string;
}

interface SupervisorReport {
  id: number;
  teacher: string;
  batch: string;
  date: string;
  rating: string;
  strengths: string;
  improvements: string;
}

interface TeacherProfile {
  id: string;
  name: string;
  gender: "Male" | "Female";
  designation: string;
  email: string;
  specialization: string;
}

const OFFICIAL_TEACHERS: TeacherProfile[] = [
  // 👨‍🏫 Male Teachers (8)
  {
    id: "QSK-EMP-001",
    name: "Muallim Mufti Junaid Shams",
    gender: "Male",
    designation: "Senior Muallim & Fiqh / Tajweed Lead",
    email: "junaid.shams@quranicskills.com",
    specialization: "Advanced Tajweed, Qira'at & Fiqh"
  },
  {
    id: "QSK-EMP-002",
    name: "Muallim Aryan Jahangir",
    gender: "Male",
    designation: "Muallim (Hifz & Nazra Specialist)",
    email: "aryan.jahangir@quranicskills.com",
    specialization: "Hifz Ul Quran & Revision"
  },
  {
    id: "QSK-EMP-003",
    name: "Muallim Maulana Sami Ullah",
    gender: "Male",
    designation: "Muallim (Tajweed & Islamic Studies)",
    email: "sami.ullah@quranicskills.com",
    specialization: "Tajweed Rules & Islamic Etiquettes"
  },
  {
    id: "QSK-EMP-004",
    name: "Muallim Muhammad Ibrar",
    gender: "Male",
    designation: "Muallim (Quran Recitation & Qaida)",
    email: "muhammad.ibrar@quranicskills.com",
    specialization: "Noorani Qaida & Nazra Recitation"
  },
  {
    id: "QSK-EMP-005",
    name: "Muallim Maulana Inzimam ul Haq",
    gender: "Male",
    designation: "Muallim (Hifz Ul Quran Lead)",
    email: "inzimam.ulhaq@quranicskills.com",
    specialization: "Intensive Hifz & Manzil Review"
  },
  {
    id: "QSK-EMP-006",
    name: "Muallim Salim",
    gender: "Male",
    designation: "Muallim (Noorani Qaida & Nazra)",
    email: "salim@quranicskills.com",
    specialization: "Beginner Quran Reading & Makharij"
  },
  {
    id: "QSK-EMP-007",
    name: "Muallim Maulana Majid Ur Rehman",
    gender: "Male",
    designation: "Muallim (Advanced Tajweed & Qira'at)",
    email: "majid.rehman@quranicskills.com",
    specialization: "Ten Qira'at & Recitation Articulation"
  },
  {
    id: "QSK-EMP-008",
    name: "Muallim Maulana Muhammad Afaq Ajmal",
    gender: "Male",
    designation: "Muallim (Tafseer & Quranic Arabic)",
    email: "afaq.ajmal@quranicskills.com",
    specialization: "Quranic Arabic, Grammar & Tafseer"
  },

  // 👩‍🏫 Female Teachers (3)
  {
    id: "QSK-EMP-009",
    name: "Mualima Zainab Riaz",
    gender: "Female",
    designation: "Senior Mualima (Tajweed & Hifz Lead)",
    email: "zainab.riaz@quranicskills.com",
    specialization: "Female Tajweed & Youth Hifz"
  },
  {
    id: "QSK-EMP-010",
    name: "Mualima Sumayyah Riaz",
    gender: "Female",
    designation: "Mualima (Girls Nazra & Islamic Etiquettes)",
    email: "sumayyah.riaz@quranicskills.com",
    specialization: "Girls Quran, Duas & Sunnah Studies"
  },
  {
    id: "QSK-EMP-011",
    name: "Mualima Faiza Riaz",
    gender: "Female",
    designation: "Mualima (Noorani Qaida & Kids Specialist)",
    email: "faiza.riaz@quranicskills.com",
    specialization: "Early Childhood Quranic Foundations"
  }
];

const initialStudents: Student[] = OFFICIAL_STUDENTS_LIST;


const initialReports: SupervisorReport[] = [
  {
    id: 1,
    teacher: "Muallim Mufti Junaid Shams",
    batch: "1-on-1 Individual Session",
    date: "2026-10-01",
    rating: "4.9 / 5.0",
    strengths: "Exceptional mastery of Tajweed rules; precise articulation feedback and inspiring Islamic mannerism.",
    improvements: "Continue encouraging student to record self-practice audio."
  },
  {
    id: 2,
    teacher: "Mualima Zainab Riaz",
    batch: "1-on-1 Individual Session",
    date: "2026-10-01",
    rating: "4.8 / 5.0",
    strengths: "Gentle and patient pedagogical style with young child; respectful observance of camera privacy policy.",
    improvements: "Send WhatsApp progress report immediately after lesson wrap-up."
  }
];

const initialSettings: AcademySettings = {
  academyName: "Quranic Skills Academy",
  tagline: "Global Online Quran & Arabic Learning Institute",
  phone: "+92 300 1234567",
  email: "billing@quranicskills.com",
  bankName: "Meezan Bank Ltd",
  accountTitle: "Quranic Skills Academy",
  bankIBAN: "PK12MEZN0001234567890101",
  easyPaisa: "0300-1234567 (Title: Academy Admin)",
  jazzCash: "0321-7654321 (Title: Academy Admin)",
  overseasNote: "International payments accepted via Wise, Remitly, WorldRemit, and Direct Wire Transfer.",
  adminPin: "7860",
  teacherPin: "1234",
  supervisorPin: "9900"
};

export default function RealLMSApp() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: "admin" | "teacher" | "supervisor" | "student";
    teacherId?: string;
  } | null>(null);

  // Login Authentication & Passcode States
  const [activeLoginRole, setActiveLoginRole] = useState<"admin" | "teacher" | "supervisor" | "student">("admin");
  const [adminPinInput, setAdminPinInput] = useState<string>("");
  const [teacherPinInput, setTeacherPinInput] = useState<string>("");
  const [supervisorPinInput, setSupervisorPinInput] = useState<string>("");
  const [studentSearchInput, setStudentSearchInput] = useState<string>("");
  const [selectedStudentLoginId, setSelectedStudentLoginId] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // App Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [reports, setReports] = useState<SupervisorReport[]>([]);
  const [settings, setSettings] = useState<AcademySettings>(initialSettings);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);

  // Teacher & Admin Tab Controls
  const [selectedLoginTeacherId, setSelectedLoginTeacherId] = useState<string>("QSK-EMP-001");
  const [adminActiveTab, setAdminActiveTab] = useState<"students" | "faculty" | "dispatch">("students");
  const [teacherFilterOnlyMine, setTeacherFilterOnlyMine] = useState<boolean>(true);
  const [adminSearchQuery, setAdminSearchQuery] = useState<string>("");
  const [teacherSearchQuery, setTeacherSearchQuery] = useState<string>("");

  // Modals State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isQuranLogOpen, setIsQuranLogOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);

  // Form Temp States
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedVoucherStudent, setSelectedVoucherStudent] = useState<Student | null>(null);
  const [logCategory, setLogCategory] = useState<"tajweed" | "hifz" | "qaida" | "islamic">("tajweed");

  // Load persistent data
  useEffect(() => {
    const savedUser = localStorage.getItem("qs_auth_user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const savedStudents = localStorage.getItem("qs_lms_students");
    if (savedStudents) {
      let parsed: Student[] = JSON.parse(savedStudents);
      // Migrate to Official Teacher-wise Timetable (112 allocated to 8 male teachers, 15 pending female schedule)
      if (
        parsed.some((s) => s.id === "QS-101" || s.id === "QS-102" || s.id === "QS-103") ||
        parsed.length <= 4 ||
        localStorage.getItem("qs_timetable_version") !== "2026-10-01-v2"
      ) {
        parsed = OFFICIAL_STUDENTS_LIST;
        localStorage.setItem("qs_lms_students", JSON.stringify(OFFICIAL_STUDENTS_LIST));
        localStorage.setItem("qs_timetable_version", "2026-10-01-v2");
      }
      setStudents(parsed);
      if (parsed.length > 0) setActiveStudentId(parsed[0].id);
    } else {
      setStudents(OFFICIAL_STUDENTS_LIST);
      setActiveStudentId(OFFICIAL_STUDENTS_LIST[0].id);
      localStorage.setItem("qs_lms_students", JSON.stringify(OFFICIAL_STUDENTS_LIST));
      localStorage.setItem("qs_timetable_version", "2026-10-01-v2");
    }

    const savedReports = localStorage.getItem("qs_lms_reports");
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      setReports(initialReports);
      localStorage.setItem("qs_lms_reports", JSON.stringify(initialReports));
    }

    const savedSettings = localStorage.getItem("qs_lms_settings");
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  const saveStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    localStorage.setItem("qs_lms_students", JSON.stringify(newStudents));
  };

  const saveReports = (newReports: SupervisorReport[]) => {
    setReports(newReports);
    localStorage.setItem("qs_lms_reports", JSON.stringify(newReports));
  };

  const saveAcademySettings = (newSettings: AcademySettings) => {
    setSettings(newSettings);
    localStorage.setItem("qs_lms_settings", JSON.stringify(newSettings));
  };

  const loginAs = (
    role: "admin" | "teacher" | "supervisor" | "student",
    name: string,
    email: string,
    teacherId?: string,
    studentId?: string
  ) => {
    const user = { role, name, email, teacherId, studentId };
    setCurrentUser(user);
    if (studentId) setActiveStudentId(studentId);
    localStorage.setItem("qs_auth_user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setAdminPinInput("");
    setTeacherPinInput("");
    setSupervisorPinInput("");
    setStudentSearchInput("");
    setAuthError(null);
    localStorage.removeItem("qs_auth_user");
  };

  const handleAdminAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctPin = settings.adminPin || "7860";
    if (adminPinInput.trim() === correctPin.trim()) {
      setAuthError(null);
      setAdminPinInput("");
      loginAs("admin", "Principal Admin", "admin@quranicskills.com");
    } else {
      setAuthError("❌ غلط ایڈمن پن کوڈ! (Incorrect Admin PIN) — ڈیفالٹ کوڈ: 7860");
    }
  };

  const handleTeacherAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctPin = settings.teacherPin || "1234";
    if (teacherPinInput.trim() === correctPin.trim()) {
      setAuthError(null);
      setTeacherPinInput("");
      const t = OFFICIAL_TEACHERS.find((x) => x.id === selectedLoginTeacherId) || OFFICIAL_TEACHERS[0];
      loginAs("teacher", t.name, t.email, t.id);
    } else {
      setAuthError("❌ غلط ٹیچر پن کوڈ! (Incorrect Teacher PIN) — ڈیفالٹ کوڈ: 1234");
    }
  };

  const handleSupervisorAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctPin = settings.supervisorPin || "9900";
    if (supervisorPinInput.trim() === correctPin.trim()) {
      setAuthError(null);
      setSupervisorPinInput("");
      loginAs("supervisor", "Ustadh Tariq (QA Auditor)", "supervisor@quranicskills.com");
    } else {
      setAuthError("❌ غلط سپروائزر پن کوڈ! (Incorrect Supervisor PIN) — ڈیفالٹ کوڈ: 9900");
    }
  };

  const handleStudentAuth = (targetStudentId?: string) => {
    const query = (targetStudentId || selectedStudentLoginId || studentSearchInput).trim().toLowerCase();
    if (!query) {
      setAuthError("⚠️ براہ کرم طالب علم کا نام یا Student ID منتخب کریں۔");
      return;
    }
    const found = students.find(
      (s) =>
        s.id.toLowerCase() === query ||
        s.name.toLowerCase().includes(query) ||
        query.includes(s.name.toLowerCase())
    );
    if (found) {
      setAuthError(null);
      setActiveStudentId(found.id);
      loginAs("student", `${found.name} (${found.id})`, "student@quranicskills.com", undefined, found.id);
    } else {
      setAuthError("❌ طالب علم نہیں ملا! براہ کرم درست نام یا Student ID منتخب کریں۔");
    }
  };

  // 1-Click WhatsApp Progress Report Sender
  const sendWhatsAppProgress = (st: Student) => {
    const dateStr = st.lastLogDate || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const isSubstitute =
      currentUser?.role === "teacher" &&
      currentUser.name &&
      st.teacher &&
      !st.teacher.includes(currentUser.name) &&
      currentUser.name !== st.teacher;

    const teacherLine = isSubstitute
      ? `👨‍🏫 *Regular Instructor:* ${st.teacher}\n🔄 *Taught Today by:* ${currentUser.name} (Substitute / Cover Class)\n`
      : `👨‍🏫 *Instructor:* ${st.teacher || "Assigned Instructor"}\n`;

    const msg = encodeURIComponent(
      `*Assalamu Alaikum wa Rahmatullah!*\n` +
      `Respected Guardian *${st.guardian}*,\n\n` +
      `Here is today's *Daily Quran Progress Report* for *${st.name}*:\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📅 *Date:* ${dateStr}\n` +
      `📚 *Course:* ${st.batch}\n` +
      teacherLine +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📖 *Sabaq (New Lesson):* ${st.sabaq || "Lesson completed"}\n` +
      (st.sabqi && st.sabqi !== "N/A" && st.sabqi !== "None" ? `🔄 *Sabqi (Recent Revision):* ${st.sabqi}\n` : "") +
      (st.manzil && st.manzil !== "N/A" && st.manzil !== "None" ? `🕋 *Manzil (Juz Revision):* ${st.manzil}\n` : "") +
      `⭐ *Daily Performance:* ${st.grade || "⭐⭐⭐⭐⭐ A+ (Excellent)"}\n` +
      (st.mistakes ? `🎯 *Recitation Feedback:* ${st.mistakes}\n` : "") +
      `✅ *Attendance Status:* ${(st.attendance || "present").toUpperCase()}\n` +
      (st.homework ? `📝 *Homework & Practice:* ${st.homework}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `⏰ Next Session: ${st.classDays} @ ${st.timeSlot} (${st.timezone})\n\n` +
      `May Allah Ta'ala grant the student barakah, love for the Holy Quran, and steadfastness. Ameen!\n\n` +
      `*${settings.academyName}*\n` +
      `Helpline: ${settings.phone}`
    );
    window.open(`https://wa.me/${st.whatsapp}?text=${msg}`, "_blank");
  };

  // WhatsApp Fee Reminder
  const sendWhatsAppFee = (st: Student) => {
    const symbol = st.currency === "USD" ? "$" : st.currency === "GBP" ? "£" : st.currency === "SAR" ? "﷼ " : st.currency === "EUR" ? "€" : "Rs ";
    const msg = encodeURIComponent(
      `Assalamu Alaikum respected ${st.guardian}!\n\n` +
      `This is a polite reminder from ${settings.academyName} regarding monthly tuition fee for ${st.name} (${st.batch}).\n\n` +
      `• Schedule: ${st.classDays} (${st.timeSlot} - ${st.timezone})\n` +
      `• Amount Due: ${symbol}${st.fee} ${st.currency}\n` +
      `• Due Date: 10th of this month\n\n` +
      `Official Payment Details:\n` +
      `Bank: ${settings.bankName}\n` +
      `Account Title: ${settings.accountTitle}\n` +
      `IBAN: ${settings.bankIBAN}\n` +
      `EasyPaisa: ${settings.easyPaisa}\n` +
      `JazzCash: ${settings.jazzCash}\n\n` +
      `• Overseas Instructions: ${settings.overseasNote}\n\n` +
      `Please share receipt screenshot once transferred. Jazakum Allahu Khairan!\n` +
      `${settings.phone}`
    );
    window.open(`https://wa.me/${st.whatsapp}?text=${msg}`, "_blank");
  };

  // Waiting Alert
  const sendWaitingAlert = (st: Student) => {
    const msg = encodeURIComponent(
      `Assalamu Alaikum respected ${st.guardian}!\n\n` +
      `${st.teacher} is currently waiting in the live Zoom classroom for ${st.name}'s scheduled lesson.\n\n` +
      `• Schedule: ${st.timeSlot} (${st.timezone})\n\n` +
      `Please connect the student right away so valuable recitation time is not lost. Thank you!\n\n` +
      `${settings.academyName}`
    );
    window.open(`https://wa.me/${st.whatsapp}?text=${msg}`, "_blank");
  };

  // =========================================================================
  // VIEW: AUTHENTICATION / LOGIN PORTAL
  // =========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-black border border-emerald-500/40 p-1 mx-auto shadow-xl shadow-emerald-950/60 overflow-hidden flex items-center justify-center">
              <img src="/logo.qs.jpeg" alt="Quranic Skills Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">{settings.academyName}</h1>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">{settings.tagline}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 mt-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secure Passcode-Protected Portals</span>
            </div>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900/80 rounded-2xl border border-slate-700">
            <button
              type="button"
              onClick={() => {
                setActiveLoginRole("admin");
                setAuthError(null);
              }}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                activeLoginRole === "admin"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveLoginRole("teacher");
                setAuthError(null);
              }}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                activeLoginRole === "teacher"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              👨‍🏫 Teacher
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveLoginRole("supervisor");
                setAuthError(null);
              }}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                activeLoginRole === "supervisor"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              👁️ Supervisor
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveLoginRole("student");
                setAuthError(null);
              }}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                activeLoginRole === "student"
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🎓 Student
            </button>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs font-bold flex items-center gap-2 animate-shake">
              <span>⚠️</span>
              <span>{authError}</span>
            </div>
          )}

          {/* TAB 1: SUPER ADMIN LOGIN */}
          {activeLoginRole === "admin" && (
            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Super Admin Access</h3>
                    <p className="text-[11px] text-purple-300">Confidential directory, fees, bank accounts & PIN settings</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-300">
                    Enter Admin Passcode / PIN (ایڈمن کوڈ):
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={adminPinInput}
                      onChange={(e) => setAdminPinInput(e.target.value)}
                      placeholder="••••"
                      autoFocus
                      required
                      className="w-full bg-slate-900 border border-purple-500/50 rounded-xl px-3 py-2.5 text-white font-mono text-base tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 pt-0.5">
                    <span>Default PIN: <strong className="text-purple-300 font-mono">7860</strong></span>
                    <span>Admin Only</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-950/60 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Verify PIN & Enter Super Admin</span>
              </button>
            </form>
          )}

          {/* TAB 2: FACULTY & TEACHER LOGIN */}
          {activeLoginRole === "teacher" && (
            <form onSubmit={handleTeacherAuth} className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Faculty & Teacher Login</h3>
                    <p className="text-[11px] text-emerald-300">11 Official Teachers • Mark Sabaq & Attendance</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-300">Select Your Teacher Profile:</label>
                  <select
                    value={selectedLoginTeacherId}
                    onChange={(e) => setSelectedLoginTeacherId(e.target.value)}
                    className="w-full bg-slate-900 border border-emerald-500/50 text-white text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    <optgroup label="👨‍🏫 Male Teachers (8)">
                      {OFFICIAL_TEACHERS.filter((t) => t.gender === "Male").map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.id} • {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="👩‍🏫 Female Teachers (3)">
                      {OFFICIAL_TEACHERS.filter((t) => t.gender === "Female").map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.id} • {t.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    Enter Teacher Passcode / PIN (ٹیچر پن کوڈ):
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={teacherPinInput}
                      onChange={(e) => setTeacherPinInput(e.target.value)}
                      placeholder="••••"
                      required
                      className="w-full bg-slate-900 border border-emerald-500/50 rounded-xl px-3 py-2.5 text-white font-mono text-base tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 pt-0.5">
                    <span>Default PIN: <strong className="text-emerald-300 font-mono">1234</strong></span>
                    <span>Faculty Shield Active</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950/60 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Verify PIN & Enter Teacher Portal</span>
              </button>
            </form>
          )}

          {/* TAB 3: SUPERVISOR LOGIN */}
          {activeLoginRole === "supervisor" && (
            <form onSubmit={handleSupervisorAuth} className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Quality Supervisor Portal</h3>
                    <p className="text-[11px] text-blue-300">Tajweed Audits & Classroom Scorecards</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-300">
                    Enter Supervisor Passcode / PIN:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={supervisorPinInput}
                      onChange={(e) => setSupervisorPinInput(e.target.value)}
                      placeholder="••••"
                      required
                      className="w-full bg-slate-900 border border-blue-500/50 rounded-xl px-3 py-2.5 text-white font-mono text-base tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 pt-0.5">
                    <span>Default PIN: <strong className="text-blue-300 font-mono">9900</strong></span>
                    <span>Auditor Access</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-950/60 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Verify PIN & Enter Supervisor Portal</span>
              </button>
            </form>
          )}

          {/* TAB 4: STUDENT & PARENT LOGIN */}
          {activeLoginRole === "student" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Student & Parent Portal</h3>
                    <p className="text-[11px] text-amber-300">View daily Quran sabaq, Zoom classroom & fee voucher</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-300">
                    Select Enrolled Student (127 Students):
                  </label>
                  <select
                    value={selectedStudentLoginId}
                    onChange={(e) => {
                      setSelectedStudentLoginId(e.target.value);
                      setStudentSearchInput(e.target.value);
                    }}
                    className="w-full bg-slate-900 border border-amber-500/50 text-white text-xs rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="">-- Choose Enrolled Student --</option>
                    {students.slice(0, 50).map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.id} • {st.name} ({st.timeSlot})
                      </option>
                    ))}
                    {students.length > 50 && (
                      <optgroup label="More Students...">
                        {students.slice(50).map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.id} • {st.name} ({st.timeSlot})
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">
                    Or Type Student Name / ID:
                  </label>
                  <input
                    type="text"
                    value={studentSearchInput}
                    onChange={(e) => setStudentSearchInput(e.target.value)}
                    placeholder="e.g. QSK-STU-001 or Arzoo Wazir"
                    className="w-full bg-slate-900 border border-amber-500/50 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <p className="text-[10px] text-amber-200/80">
                    Parents can only view their own student&apos;s recitation progress &amp; voucher.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStudentAuth()}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-950/60 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Open Student Dashboard →</span>
              </button>
            </div>
          )}

          <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-700/60">
            Quranic Skills Academy • Next.js 15 & Prisma Enterprise LMS
          </div>
        </div>
      </div>
    );
  }

  // Active student object
  const currentStudent = students.find((s) => s.id === activeStudentId) || students[0] || null;

  // Filtered students for Admin search
  const filteredAdminStudents = students.filter((s) => {
    if (!adminSearchQuery.trim()) return true;
    const q = adminSearchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      (s.teacher && s.teacher.toLowerCase().includes(q)) ||
      (s.country && s.country.toLowerCase().includes(q)) ||
      (s.batch && s.batch.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* ========================================================================= */}
      {/* HEADER */}
      {/* ========================================================================= */}
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-black border border-emerald-500/40 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
              <img src="/logo.qs.jpeg" alt="Quranic Skills Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight">{settings.academyName}</h1>
              <p className="text-xs text-emerald-200 hidden sm:block">{settings.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser.role === "admin" && (
              <>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold border border-emerald-600 flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Bank & Academy Settings</span>
                </button>
                <button
                  onClick={() => setIsAdmissionOpen(true)}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Admission</span>
                </button>
              </>
            )}

            <div className="flex items-center gap-2 pl-2 border-l border-emerald-800">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">{currentUser.name}</div>
                <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">
                  Role: {currentUser.role}
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 bg-emerald-950/80 hover:bg-rose-900/80 text-white rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* ROLE SWITCHER NAVIGATION BAR */}
      {/* ========================================================================= */}
      {currentUser.email === "admin@quranicskills.com" ? (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 sm:space-x-6 overflow-x-auto py-2">
                <button
                  onClick={() => setCurrentUser({ ...currentUser, role: "admin" })}
                  className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all ${
                    currentUser.role === "admin"
                      ? "border-b-2 border-emerald-700 text-emerald-700 bg-emerald-50/50"
                      : "text-slate-600 hover:text-emerald-700"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Super Admin</span>
                </button>
                <button
                  onClick={() => setCurrentUser({ ...currentUser, role: "teacher" })}
                  className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all ${
                    currentUser.role === "teacher"
                      ? "border-b-2 border-emerald-700 text-emerald-700 bg-emerald-50/50"
                      : "text-slate-600 hover:text-emerald-700"
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Teacher Portal (Preview)</span>
                </button>
                <button
                  onClick={() => setCurrentUser({ ...currentUser, role: "supervisor" })}
                  className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all ${
                    currentUser.role === "supervisor"
                      ? "border-b-2 border-emerald-700 text-emerald-700 bg-emerald-50/50"
                      : "text-slate-600 hover:text-emerald-700"
                  }`}
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Supervisor Portal</span>
                </button>
                <button
                  onClick={() => setCurrentUser({ ...currentUser, role: "student" })}
                  className={`px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 rounded-lg transition-all ${
                    currentUser.role === "student"
                      ? "border-b-2 border-emerald-700 text-emerald-700 bg-emerald-50/50"
                      : "text-slate-600 hover:text-emerald-700"
                  }`}
                >
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Student & Fee Portal</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-800 font-bold">Admin Master Session</span>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-slate-900 border-b border-slate-800 text-white py-2 px-4 sm:px-8 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">
                {currentUser.role === "teacher" && `👨‍🏫 Teacher Portal: ${currentUser.name}`}
                {currentUser.role === "supervisor" && `👁️ QA Supervisor Portal: ${currentUser.name}`}
                {currentUser.role === "student" && `🎓 Student Portal: ${currentUser.name}`}
              </span>
            </div>
            <button
              onClick={logout}
              className="text-xs font-bold text-rose-300 hover:text-rose-100 bg-rose-950/80 px-3 py-1 rounded-lg border border-rose-800/60 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out / لاگ آؤٹ</span>
            </button>
          </div>
        </nav>
      )}

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* ======================================================================= */}
        {/* 1. SUPER ADMIN VIEW */}
        {/* ======================================================================= */}
        {currentUser.role === "admin" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Total Students</p>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{students.length}</h3>
                  </div>
                  <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-lg">🎓</span>
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  {students.filter((s) => s.classMode === "1-on-1").length} 1-on-1 •{" "}
                  {students.filter((s) => s.classMode !== "1-on-1").length} Group Students
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Academy Faculty</p>
                    <h3 className="text-2xl font-extrabold text-teal-800 mt-1">11 Teachers</h3>
                  </div>
                  <span className="p-2.5 bg-teal-50 text-teal-700 rounded-xl text-lg">👨‍🏫</span>
                </div>
                <div className="mt-3 text-xs text-slate-500 font-medium">
                  8 Male • 3 Female Faculty
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Configured Bank</p>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-1 truncate">{settings.bankName}</h3>
                  </div>
                  <Building2 className="w-7 h-7 text-blue-600 p-1 bg-blue-50 rounded-xl" />
                </div>
                <div className="mt-3 text-xs text-slate-500 font-medium truncate">
                  Title: {settings.accountTitle}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Total Fee Collected</p>
                    <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">
                      $
                      {students
                        .filter((s) => s.status === "paid")
                        .reduce((acc, s) => acc + Number(s.fee), 0)
                        .toLocaleString()}
                    </h3>
                  </div>
                  <DollarSign className="w-7 h-7 text-emerald-600 p-1 bg-emerald-50 rounded-xl" />
                </div>
                <div className="mt-3 text-xs text-slate-500 font-medium">Multi-Currency (USD, GBP, PKR, SAR)</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Supervisor Audits</p>
                    <h3 className="text-2xl font-extrabold text-purple-700 mt-1">{reports.length} Reports</h3>
                  </div>
                  <ClipboardList className="w-7 h-7 text-purple-600 p-1 bg-purple-50 rounded-xl" />
                </div>
                <div className="mt-3 text-xs text-slate-500 font-medium">Quality Inspection Scorecards</div>
              </div>
            </div>

            {/* View Switcher: Students vs Faculty */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setAdminActiveTab("students")}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
                  adminActiveTab === "students"
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <span>🎓 Enrolled Students & Ledger</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  adminActiveTab === "students" ? "bg-emerald-700 text-emerald-100" : "bg-slate-100 text-slate-700"
                }`}>
                  {students.length}
                </span>
              </button>

              <button
                onClick={() => setAdminActiveTab("faculty")}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
                  adminActiveTab === "faculty"
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <span>👨‍🏫 Official Faculty Directory</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  adminActiveTab === "faculty" ? "bg-emerald-700 text-emerald-100" : "bg-emerald-50 text-emerald-800"
                }`}>
                  11 Teachers
                </span>
              </button>

              <button
                onClick={() => setAdminActiveTab("dispatch")}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 ${
                  adminActiveTab === "dispatch"
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <span>📱 Central WhatsApp Dispatch</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  adminActiveTab === "dispatch" ? "bg-emerald-700 text-emerald-100" : "bg-amber-100 text-amber-900"
                }`}>
                  {students.filter(s => s.dispatchStatus === "pending" || s.isWaitingAlert).length} Queued
                </span>
              </button>
            </div>

            {/* Students Directory */}
            {adminActiveTab === "students" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Student Directory & Tuition Fee Ledger</h3>
                  <p className="text-xs text-slate-500">
                    Track student schedules, current Sabaq, teacher assignments, and fee status
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Configure Bank & Accounts</span>
                  </button>
                  <button
                    onClick={() => setIsAdmissionOpen(true)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Enroll New Student</span>
                  </button>
                </div>
              </div>

              {/* Search Bar & Reset Toolbar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search 127 students by Roll No, Name, Teacher, Country..."
                    value={adminSearchQuery}
                    onChange={(e) => setAdminSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                  />
                  {adminSearchQuery && (
                    <button
                      onClick={() => setAdminSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs w-full md:w-auto justify-between md:justify-end">
                  <span className="text-slate-600">
                    Showing <strong className="text-emerald-800 font-bold">{filteredAdminStudents.length}</strong> of {students.length} Students
                  </span>
                  <button
                    onClick={() => {
                      if (confirm("Restore all 127 Official Students to the Master List?")) {
                        saveStudents(OFFICIAL_STUDENTS_LIST);
                        alert("✅ 127 Official Students restored successfully!");
                      }
                    }}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                    title="Reload original 127 official students list"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset 127 Master List</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase">
                      <th className="py-3 px-4">Roll No</th>
                      <th className="py-3 px-4">Student & Age</th>
                      <th className="py-3 px-4">Guardian & Country</th>
                      <th className="py-3 px-4">Mode, Slot & Timezone</th>
                      <th className="py-3 px-4">Days & Teacher</th>
                      <th className="py-3 px-4">Current Sabaq</th>
                      <th className="py-3 px-4">Recording Policy</th>
                      <th className="py-3 px-4">Fee Status</th>
                      <th className="py-3 px-4 text-center">Voucher</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdminStudents.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-12 text-center text-slate-400">
                          <div className="text-3xl mb-2">🎓</div>
                          <div className="font-bold text-sm text-slate-700">No matching students found</div>
                          <p className="text-xs text-slate-500 mt-1">
                            Try searching with a different name or roll number, or click &quot;Reset 127 Master List&quot;.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredAdminStudents.map((st) => {
                        const symbol =
                          st.currency === "USD"
                            ? "$"
                            : st.currency === "GBP"
                            ? "£"
                            : st.currency === "SAR"
                            ? "﷼ "
                            : st.currency === "EUR"
                            ? "€"
                            : "Rs ";
                        const isOneOnOne = st.classMode === "1-on-1";
                        const isRecAllowed = st.recordingPolicy !== "disabled";

                        return (
                          <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-slate-700">{st.id}</td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900">{st.name}</div>
                              <div className="text-[11px] text-slate-500">
                                Age: <span className="font-semibold text-emerald-800">{st.age || "N/A"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900">{st.guardian}</div>
                              <div className="text-[11px] text-slate-500">{st.country}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                                  isOneOnOne
                                    ? "bg-purple-100 text-purple-800 border border-purple-200"
                                    : "bg-blue-100 text-blue-800 border border-blue-200"
                                }`}
                              >
                                {isOneOnOne ? "👤 1-on-1" : "👥 Group"}
                              </span>
                              <div className="text-[11px] text-slate-700 font-semibold mt-0.5 font-mono">
                                ⏰ {st.timeSlot}
                              </div>
                              <div className="text-[10px] text-slate-500 font-medium">🌐 {st.timezone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-800 text-xs">{st.teacher}</div>
                              <div className="text-[11px] text-emerald-700 font-medium">📅 {st.classDays}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900 text-xs truncate max-w-[160px]">
                                📖 {st.sabaq || "Pending"}
                              </div>
                              <div className="text-[11px] text-amber-700 font-bold">
                                {st.grade ? st.grade.split("(")[0] : "⭐⭐⭐⭐⭐ A+"}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                  isRecAllowed
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                              >
                                {isRecAllowed ? "🎥 Allowed" : "🚫 Off (Privacy)"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-emerald-700">
                                {symbol}
                                {st.fee} {st.currency}
                              </div>
                              <button
                                onClick={() => {
                                  const updated = students.map((s) =>
                                    s.id === st.id ? { ...s, status: s.status === "paid" ? "unpaid" : "paid" } : s
                                  );
                                  saveStudents(updated as Student[]);
                                }}
                                className={`mt-1 px-2 py-0.5 rounded text-[11px] font-bold block ${
                                  st.status === "paid"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {st.status === "paid" ? "✓ Paid" : "Unpaid"}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => {
                                  setSelectedVoucherStudent(st);
                                  setIsVoucherOpen(true);
                                }}
                                className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 font-bold px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                              >
                                📄 Voucher
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setEditingStudent({ ...st })}
                                  title="Edit Student Details, Teacher Allocation & Timetable"
                                  className="text-xs bg-amber-500 hover:bg-amber-600 font-bold px-2.5 py-1 rounded text-white shadow-sm flex items-center gap-1 transition-all"
                                >
                                  <span>✏️</span>
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => sendWhatsAppFee(st)}
                                  title="Send WhatsApp Fee Reminder"
                                  className="text-xs bg-emerald-600 hover:bg-emerald-700 font-bold px-2.5 py-1 rounded text-white shadow-sm"
                                >
                                  💬 Remind
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Remove student ${st.name}?`)) {
                                      saveStudents(students.filter((s) => s.id !== st.id));
                                    }
                                  }}
                                  className="text-xs text-red-500 hover:text-red-700 font-bold p-1"
                                >
                                  ✕
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Official Faculty Directory View */}
            {adminActiveTab === "faculty" && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-900">Quranic Skills Academy — Official Faculty Roster</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        11 Total Teachers
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      8 Male Faculty Members (Muallim) • 3 Female Faculty Members (Mualima)
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAdmissionOpen(true)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Assign Student to Faculty</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase">
                        <th className="py-3 px-4">Employee ID</th>
                        <th className="py-3 px-4">Teacher Name & Gender</th>
                        <th className="py-3 px-4">Designation & Department</th>
                        <th className="py-3 px-4">Specialization</th>
                        <th className="py-3 px-4">Official Contact</th>
                        <th className="py-3 px-4 text-center">Assigned Students</th>
                        <th className="py-3 px-4 text-right">Faculty Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {OFFICIAL_TEACHERS.map((teacher) => {
                        const assignedStudents = students.filter(
                          (s) => s.teacher === teacher.name || s.teacher.includes(teacher.name)
                        );
                        const isMale = teacher.gender === "Male";

                        return (
                          <tr key={teacher.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
                                {teacher.id}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{isMale ? "👨‍🏫" : "👩‍🏫"}</span>
                                <span>{teacher.name}</span>
                              </div>
                              <div className="mt-1">
                                <span
                                  className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    isMale
                                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                                      : "bg-purple-50 text-purple-700 border border-purple-200"
                                  }`}
                                >
                                  {isMale ? "Male Faculty (Muallim)" : "Female Faculty (Mualima)"}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800 text-xs">{teacher.designation}</div>
                              <div className="text-[11px] text-slate-500 font-medium">Status: 🟢 Active Faculty</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-xs text-slate-700 font-medium">{teacher.specialization}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-mono text-xs text-slate-600">{teacher.email}</div>
                              <div className="text-[10px] text-slate-400">Quranic Skills Enterprise Portal</div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                  assignedStudents.length > 0
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                }`}
                              >
                                {assignedStudents.length} Active {assignedStudents.length === 1 ? "Student" : "Students"}
                              </span>
                              {assignedStudents.length > 0 && (
                                <div className="text-[10px] text-slate-500 mt-1 max-w-[140px] truncate mx-auto">
                                  {assignedStudents.map((s) => s.name).join(", ")}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => loginAs("teacher", teacher.name, teacher.email, teacher.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all inline-flex items-center gap-1"
                              >
                                <span>Open Portal</span>
                                <span>→</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Official Central WhatsApp Dispatch Queue */}
            {adminActiveTab === "dispatch" && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-900">
                        📱 Central Academy WhatsApp Dispatch Queue
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {students.filter(s => s.dispatchStatus === "pending" || s.isWaitingAlert).length} Queued
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      🛡️ <strong className="text-emerald-800">Privacy Shield Active:</strong> Teachers submit daily recitation logs to this queue without viewing parents&apos; phone numbers. Super Admin dispatches reports from the official helpline.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase">
                        <th className="py-3 px-4">Student & Guardian</th>
                        <th className="py-3 px-4">Instructor</th>
                        <th className="py-3 px-4">Parent WhatsApp</th>
                        <th className="py-3 px-4">Today&apos;s Sabaq & Rating</th>
                        <th className="py-3 px-4 text-center">Dispatch Status</th>
                        <th className="py-3 px-4 text-right">Official 1-Click Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((st) => {
                        const isPending = st.dispatchStatus === "pending";
                        const isAlert = st.isWaitingAlert;

                        return (
                          <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{st.name}</div>
                              <div className="text-[11px] text-slate-500">
                                Guardian: <strong className="text-slate-700">{st.guardian}</strong> ({st.country})
                              </div>
                              {isAlert && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300 mt-1 animate-pulse">
                                  🚨 Student Late on Zoom
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-800 text-xs">{st.teacher}</div>
                              <div className="text-[11px] text-emerald-700 font-medium">Batch: {st.batch}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                              +{st.whatsapp}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-900 text-xs truncate max-w-[200px]">
                                📖 {st.sabaq || "Lesson Completed"}
                              </div>
                              <div className="text-[11px] text-amber-700 font-bold">
                                {st.grade ? st.grade.split("(")[0] : "⭐⭐⭐⭐⭐ A+"}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {isPending ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  ⏳ Queued for Send
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  ✓ Dispatched
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    sendWhatsAppProgress(st);
                                    const updated = students.map((s) =>
                                      s.id === st.id ? { ...s, dispatchStatus: "sent", isWaitingAlert: false } : s
                                    );
                                    saveStudents(updated);
                                  }}
                                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  <span>Send Official WhatsApp</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* 2. TEACHER PORTAL */}
        {/* ======================================================================= */}
        {currentUser.role === "teacher" && (() => {
          const currentTeacherProfile =
            OFFICIAL_TEACHERS.find(
              (t) => t.id === currentUser.teacherId || t.name === currentUser.name || currentUser.name.includes(t.name)
            ) || OFFICIAL_TEACHERS[0];

          const myAssignedCount = students.filter(
            (s) => s.teacher === currentTeacherProfile.name || s.teacher.includes(currentTeacherProfile.name)
          ).length;

          const visibleTeacherStudents = teacherFilterOnlyMine
            ? students.filter(
                (s) => s.teacher === currentTeacherProfile.name || s.teacher.includes(currentTeacherProfile.name)
              )
            : students;

          const filteredTeacherStudents = visibleTeacherStudents.filter((s) => {
            if (!teacherSearchQuery.trim()) return true;
            const q = teacherSearchQuery.toLowerCase();
            return (
              s.name.toLowerCase().includes(q) ||
              s.id.toLowerCase().includes(q) ||
              (s.sabaq && s.sabaq.toLowerCase().includes(q))
            );
          });

          return (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl p-6 text-white shadow-md space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 bg-white/20 text-white rounded-md text-xs font-bold uppercase tracking-wider">
                      Faculty Portal
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 rounded text-xs font-mono font-bold">
                      {currentTeacherProfile.id}
                    </span>
                    <span className="px-2 py-0.5 bg-teal-900/70 border border-teal-400/40 text-teal-200 rounded text-xs font-semibold">
                      {currentTeacherProfile.gender === "Male" ? "👨‍🏫 Male Faculty (Muallim)" : "👩‍🏫 Female Faculty (Mualima)"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mt-2">{currentTeacherProfile.name}</h2>
                  <p className="text-sm text-emerald-100 mt-0.5">
                    {currentTeacherProfile.designation} • Specialization: {currentTeacherProfile.specialization}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://us05web.zoom.us/j/2843243400?pwd=NHhHY204bnRXazJtaHdBTndBZVI2dz09"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Launch Quranic Skills Official Zoom Meeting Room"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow flex items-center gap-1.5 transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Official Zoom</span>
                  </a>
                  <div className="hidden sm:flex flex-col text-[10px] text-emerald-100 bg-emerald-950/70 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-mono">
                    <span>ID: 284 324 3400</span>
                    <span>Pass: 72820</span>
                  </div>
                </div>
              </div>

              {/* Quick Switch Teacher & Filter Bar */}
              <div className="pt-3 border-t border-emerald-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-emerald-200">Switch Faculty Member:</span>
                  <select
                    value={currentTeacherProfile.id}
                    onChange={(e) => {
                      const t = OFFICIAL_TEACHERS.find((x) => x.id === e.target.value);
                      if (t) loginAs("teacher", t.name, t.email, t.id);
                    }}
                    className="bg-emerald-950/80 border border-emerald-500/60 text-white rounded-lg px-2.5 py-1 text-xs font-bold"
                  >
                    <optgroup label="👨‍🏫 Male Faculty (8)">
                      {OFFICIAL_TEACHERS.filter((t) => t.gender === "Male").map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.id} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="👩‍🏫 Female Faculty (3)">
                      {OFFICIAL_TEACHERS.filter((t) => t.gender === "Female").map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.id} — {t.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-200 font-medium">Class View:</span>
                  <button
                    onClick={() => setTeacherFilterOnlyMine(true)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      teacherFilterOnlyMine
                        ? "bg-white text-emerald-900 shadow"
                        : "bg-emerald-900/70 text-emerald-200 hover:bg-emerald-900"
                    }`}
                  >
                    <span>👤 My Assigned Students</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-900">
                      {myAssignedCount}
                    </span>
                  </button>
                  <button
                    onClick={() => setTeacherFilterOnlyMine(false)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      !teacherFilterOnlyMine
                        ? "bg-purple-600 text-white shadow"
                        : "bg-emerald-900/70 text-emerald-200 hover:bg-emerald-900"
                    }`}
                  >
                    <span>🔄 Substitute / Cover Mode</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-200 text-purple-900">
                      {students.length} All
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Substitute Mode Alert */}
            {!teacherFilterOnlyMine && (
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center font-bold text-base shrink-0">
                    🔄
                  </div>
                  <div>
                    <strong className="font-bold text-sm text-purple-900">
                      Substitute Teaching Mode Active (متبادل تدریس)
                    </strong>
                    <p className="text-purple-700 text-xs mt-0.5">
                      You are viewing all academy classes. You can conduct live Zoom lessons, take attendance, and log Sabaq for absent colleagues. Reports will reflect you as the substitute instructor.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setTeacherFilterOnlyMine(true)}
                  className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-sm text-xs whitespace-nowrap transition-all"
                >
                  ← Return to My Students
                </button>
              </div>
            )}

            {/* Timetable Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Today&apos;s Class Schedule ({new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Watch for the <strong className="text-rose-600">&quot;🚫 DO NOT RECORD&quot;</strong> badge for privacy-sensitive
                    students
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search assigned students..."
                    value={teacherSearchQuery}
                    onChange={(e) => setTeacherSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {teacherSearchQuery && (
                    <button
                      onClick={() => setTeacherSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold text-xs uppercase">
                      <th className="py-2.5 px-3">Session & Time</th>
                      <th className="py-2.5 px-3">Student & Privacy Status</th>
                      <th className="py-2.5 px-3">Attendance</th>
                      <th className="py-2.5 px-3">Daily Quran Lesson (سبق، سبقی، منزل)</th>
                      <th className="py-2.5 px-3 text-right">Actions & WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTeacherStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-slate-400">
                          {teacherSearchQuery ? (
                            <div>No students match &quot;{teacherSearchQuery}&quot;</div>
                          ) : teacherFilterOnlyMine ? (
                            <div className="space-y-1">
                              <div className="text-2xl">📅</div>
                              <div className="font-bold text-slate-700">No students assigned to {currentTeacherProfile.name} yet</div>
                              <p className="text-xs text-slate-500">
                                Click <button onClick={() => setTeacherFilterOnlyMine(false)} className="text-purple-700 font-bold underline">&quot;Substitute / Cover Mode&quot;</button> to view and teach other classes, or enroll a student under this teacher in Super Admin.
                              </p>
                            </div>
                          ) : (
                            <div>No students enrolled yet. Enroll students in Super Admin portal to manage sessions here.</div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredTeacherStudents.map((st) => {
                        const isOneOnOne = st.classMode === "1-on-1";
                        const isRecAllowed = st.recordingPolicy !== "disabled";
                        const isMyStudent = st.teacher === currentTeacherProfile.name || st.teacher.includes(currentTeacherProfile.name);

                        return (
                          <tr key={st.id} className="hover:bg-slate-50/80">
                            <td className="py-3 px-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${
                                  isOneOnOne ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {isOneOnOne ? "👤 1-on-1" : "👥 Group"}
                              </span>
                              <div className="text-[11px] text-slate-700 font-mono font-bold mt-0.5">{st.timeSlot}</div>
                              <div className="text-[10px] text-slate-500">🌐 {st.timezone}</div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="font-bold text-slate-900">
                                {st.name} <span className="text-xs text-slate-500 font-normal">({st.age})</span>
                              </div>
                              {isMyStudent ? (
                                <div className="text-[11px] text-emerald-800 font-medium">
                                  Instructor: {st.teacher} • {st.classDays}
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                                  <span className="text-[11px] text-slate-600 font-medium">
                                    Regular: <strong className="text-slate-800">{st.teacher}</strong>
                                  </span>
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                    🔄 Cover Class
                                  </span>
                                </div>
                              )}
                              <div className="mt-1">
                                {isRecAllowed ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    🎥 Cloud Recording Permitted
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                    🚫 DO NOT RECORD (Parental Request)
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                                {(["present", "absent", "late", "excused"] as const).map((att) => (
                                  <button
                                    key={att}
                                    onClick={() => {
                                      const updated = students.map((s) => (s.id === st.id ? { ...s, attendance: att } : s));
                                      saveStudents(updated);
                                    }}
                                    className={`px-2 py-1 text-xs font-bold rounded capitalize ${
                                      st.attendance === att
                                        ? att === "present"
                                          ? "bg-emerald-600 text-white"
                                          : att === "absent"
                                          ? "bg-red-600 text-white"
                                          : att === "late"
                                          ? "bg-amber-500 text-white"
                                          : "bg-blue-600 text-white"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {att}
                                  </button>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-slate-900 text-xs truncate max-w-[210px]">
                                    📖 {st.sabaq || "Lesson pending"}
                                  </span>
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                                    {st.grade ? st.grade.split("(")[0] : "⭐⭐⭐⭐⭐ A+"}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                                  <span>
                                    🔄 Sabqi: <strong className="text-slate-700">{st.sabqi || "None"}</strong>
                                  </span>
                                  <span>•</span>
                                  <span>
                                    🕋 Manzil: <strong className="text-slate-700">{st.manzil || "N/A"}</strong>
                                  </span>
                                </div>
                                <div className="pt-1 flex items-center justify-between border-t border-slate-200/60 mt-1">
                                  <span className="text-[10px] text-slate-400">Date: {st.lastLogDate || "Today"}</span>
                                  <button
                                    onClick={() => {
                                      setEditingStudentId(st.id);
                                      setIsQuranLogOpen(true);
                                    }}
                                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-0.5 rounded-lg border border-emerald-300 transition-all flex items-center gap-1 shadow-sm"
                                  >
                                    <span>📝</span> <span>Update Sabaq</span>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex flex-col items-end gap-1.5">
                                {st.dispatchStatus === "sent" ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                                    ✓ Dispatched by Admin
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => {
                                      const updated = students.map((s) =>
                                        s.id === st.id ? { ...s, dispatchStatus: "pending" } : s
                                      );
                                      saveStudents(updated);
                                      alert(`✅ Daily Sabaq for ${st.name} submitted to Academy Admin dispatch queue!\n\nSuper Admin will dispatch the progress report to parents from the Academy's official helpline.`);
                                    }}
                                    title="Submit report to Academy Admin for official dispatch"
                                    className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1"
                                  >
                                    <Send className="w-3 h-3" />
                                    <span>Submit to Academy</span>
                                  </button>
                                )}
                                {isOneOnOne && (
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => {
                                        const updated = students.map((s) =>
                                          s.id === st.id ? { ...s, isWaitingAlert: !s.isWaitingAlert } : s
                                        );
                                        saveStudents(updated);
                                        alert(st.isWaitingAlert ? `Waiting alert cleared for ${st.name}.` : `⏳ Alert Sent to Admin!\n\nSuper Admin has been alerted that you are waiting in Zoom for ${st.name}.\nAdmin will contact the guardian from the official academy helpline.`);
                                      }}
                                      title="Notify Admin that student is late"
                                      className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-sm ${
                                        st.isWaitingAlert
                                          ? "bg-red-600 text-white animate-pulse"
                                          : "bg-amber-500 hover:bg-amber-600 text-white"
                                      }`}
                                    >
                                      {st.isWaitingAlert ? "🚨 Admin Alerted" : "⏳ Student Late"}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingStudentId(st.id);
                                        setIsRescheduleOpen(true);
                                      }}
                                      title="Schedule Make-up class"
                                      className="text-[11px] bg-purple-600 hover:bg-purple-700 text-white font-bold px-2 py-0.5 rounded shadow-sm"
                                    >
                                      🔄 Reschedule
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          );
        })()}

        {/* ======================================================================= */}
        {/* 3. SUPERVISOR PORTAL */}
        {/* ======================================================================= */}
        {currentUser.role === "supervisor" && (
          <div className="space-y-6">
            <div className="bg-purple-900 text-white rounded-2xl p-6 shadow-md">
              <span className="px-2.5 py-1 bg-white/20 text-white rounded-md text-xs font-bold uppercase tracking-wider">
                Quality Assurance
              </span>
              <h2 className="text-2xl font-bold mt-2">Class Inspection & Supervision Portal</h2>
              <p className="text-xs sm:text-sm text-purple-200 mt-1">
                Audit 1-on-1 and Group classes, evaluate teacher pedagogy, and log inspection scorecards
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
                Teacher Observation Scorecard
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const teacher = (form.elements.namedItem("supTeacher") as HTMLSelectElement).value;
                  const batch = (form.elements.namedItem("supBatch") as HTMLSelectElement).value;
                  const date = (form.elements.namedItem("supDate") as HTMLInputElement).value;
                  const strengths = (form.elements.namedItem("supStrengths") as HTMLTextAreaElement).value;
                  const improvements = (form.elements.namedItem("supImprovements") as HTMLTextAreaElement).value;

                  const newReport: SupervisorReport = {
                    id: Date.now(),
                    teacher,
                    batch,
                    date: date || new Date().toISOString().split("T")[0],
                    rating: "4.8 / 5.0",
                    strengths: strengths || "Accurate Tajweed correction and punctual start.",
                    improvements: improvements || "Keep reinforcing Makharij practice."
                  };

                  saveReports([newReport, ...reports]);
                  form.reset();
                  alert("✅ Inspection Report saved successfully!");
                }}
                className="space-y-4 text-xs sm:text-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Teacher / Instructor</label>
                    <select
                      name="supTeacher"
                      className="w-full border border-slate-300 rounded-lg p-2 font-medium bg-white"
                    >
                      <optgroup label="👨‍🏫 Male Teachers (8)">
                        {OFFICIAL_TEACHERS.filter((t) => t.gender === "Male").map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.id} — {t.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="👩‍🏫 Female Teachers (3)">
                        {OFFICIAL_TEACHERS.filter((t) => t.gender === "Female").map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.id} — {t.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Class Type</label>
                    <select
                      name="supBatch"
                      className="w-full border border-slate-300 rounded-lg p-2 font-medium bg-white"
                    >
                      <option>1-on-1 Individual Session</option>
                      <option>Group Cohort Batch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">Inspection Date</label>
                    <input
                      name="supDate"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full border border-slate-300 rounded-lg p-2 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Observed Strengths</label>
                    <textarea
                      name="supStrengths"
                      rows={2}
                      placeholder="e.g. Excellent articulation explanation; patient demeanor."
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Action Items / Recommendations</label>
                    <textarea
                      name="supImprovements"
                      rows={2}
                      placeholder="e.g. Ensure WhatsApp progress report is dispatched immediately after session."
                      className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-md"
                >
                  💾 Save Inspection Report
                </button>
              </form>
            </div>

            {/* Historical Reports */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
              <h3 className="font-bold text-base text-slate-900 mb-2">Historical Inspection Reports</h3>
              {reports.length === 0 ? (
                <p className="text-slate-400 text-xs">No inspection reports recorded yet.</p>
              ) : (
                reports.map((r) => (
                  <div key={r.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-slate-900">
                        {r.teacher} • <span className="text-slate-600 font-normal">{r.batch}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
                        {r.rating}
                      </span>
                    </div>
                    <div className="text-slate-500">Date: {r.date}</div>
                    <div className="text-slate-700">
                      <strong>Strengths:</strong> {r.strengths}
                    </div>
                    <div className="text-emerald-800">
                      <strong>Recommendations:</strong> {r.improvements}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 4. STUDENT & PARENT PORTAL */}
        {/* ======================================================================= */}
        {currentUser.role === "student" && (
          <div className="space-y-6">
            {/* Student Banner */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-xs font-bold">
                    {currentStudent?.classMode === "1-on-1" ? "👤 1-on-1 Private Session" : "👥 Group Batch"}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">
                    {currentStudent?.recordingPolicy === "disabled"
                      ? "🔒 Recording: OFF (Privacy Mode)"
                      : "🎥 Recording: Active"}
                  </span>
                  {students.length > 1 && (
                    <div className="flex items-center gap-1.5 ml-1">
                      <label className="text-xs font-bold text-slate-500">Select Profile:</label>
                      <select
                        value={currentStudent?.id || ""}
                        onChange={(e) => setActiveStudentId(e.target.value)}
                        className="border border-emerald-400 bg-emerald-50 text-emerald-950 font-bold rounded-lg px-2.5 py-1 text-xs"
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.id})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  Course: {currentStudent?.batch || "Quranic Tajweed Essentials"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Student: <strong className="text-slate-800">{currentStudent?.name || "New Student"}</strong> •
                  Instructor: {currentStudent?.teacher || "Sheikh Ahmad"} • Schedule:{" "}
                  {currentStudent?.classDays || "Mon-Thu"} ({currentStudent?.timeSlot || "04:00 PM"})
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => alert("Joining live Zoom classroom...")}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Zoom</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Daily Quran Lesson Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800">
                          📖 Daily Quran Progress
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Recorded: {currentStudent?.lastLogDate || "Today"}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mt-1">Today&apos;s Recitation, Sabaq & Grade</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      ✓ Present
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200/80 space-y-3.5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                          📖 Current Sabaq (نیا سبق)
                        </span>
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                          {currentStudent?.sabaq || "Surah Al-Fatihah (Ayat 1-7)"}
                        </h4>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Teacher Evaluation
                        </span>
                        <div className="text-xs sm:text-sm font-extrabold text-amber-700 mt-0.5 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {currentStudent?.grade || "⭐⭐⭐⭐⭐ A+ (Excellent)"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-medium">🔄 Sabqi (Recent Revision):</span>
                        <div className="font-bold text-slate-900 mt-0.5">
                          {currentStudent?.sabqi || "Initial assessment completed"}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-500 font-medium">🕋 Manzil (Juz Revision):</span>
                        <div className="font-bold text-slate-900 mt-0.5">{currentStudent?.manzil || "N/A"}</div>
                      </div>
                    </div>

                    {currentStudent?.homework && (
                      <div className="bg-emerald-100/60 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                        <span className="text-base">📝</span>
                        <div>
                          <strong>Teacher Homework & Instructions:</strong>
                          <p className="mt-0.5">{currentStudent.homework}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cloud Recordings */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
                    Class Recordings (دہرائی کے لیے ریکارڈنگز)
                  </h3>
                  {currentStudent?.recordingPolicy === "disabled" ? (
                    <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-950 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-rose-600 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm">Class Recording Disabled (Privacy Mode Active)</h4>
                        <p className="text-xs text-rose-700 mt-0.5">
                          As per parental instructions, live Zoom sessions for this student are confidential and never
                          recorded.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">Yesterday&apos;s Tajweed Session</div>
                        <div className="text-slate-500">Instructor: {currentStudent?.teacher} • 30 mins</div>
                      </div>
                      <button
                        onClick={() => alert("Playing protected video player...")}
                        className="px-3 py-1.5 bg-purple-700 text-white rounded-lg font-bold"
                      >
                        ▶ Watch Class
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Fee Voucher Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">Monthly Tuition Status</h3>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Billing Month:</span>
                    <span className="font-bold text-slate-900">October 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Amount Due:</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ${currentStudent?.fee || 50}.00 {currentStudent?.currency || "USD"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Due Date:</span>
                    <span className="font-bold text-red-600">10 Oct 2026</span>
                  </div>
                  <div className="pt-2">
                    <span
                      className={`w-full block text-center py-1 rounded-full text-xs font-bold ${
                        currentStudent?.status === "paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {currentStudent?.status === "paid" ? "✓ Tuition Fee Paid" : "Payment Pending (Unpaid)"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (currentStudent) {
                        setSelectedVoucherStudent(currentStudent);
                        setIsVoucherOpen(true);
                      }
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Official Fee Voucher</span>
                  </button>
                  <button
                    onClick={() => alert("Redirecting to Stripe / Debit Card Checkout...")}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    💳 Pay Online (Card / Stripe)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: SABAQ / QURAN PROGRESS LOGGER */}
      {/* ========================================================================= */}
      {isQuranLogOpen && editingStudentId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
            {(() => {
              const target = students.find((s) => s.id === editingStudentId);
              if (!target) return null;

              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const sabaq = (form.elements.namedItem("logSabaq") as HTMLInputElement).value;
                    const sabqi = (form.elements.namedItem("logSabqi") as HTMLInputElement).value || "None";
                    const manzil = (form.elements.namedItem("logManzil") as HTMLInputElement).value || "N/A";
                    const grade = (form.elements.namedItem("logGrade") as HTMLSelectElement).value;
                    const mistakes = (form.elements.namedItem("logMistakes") as HTMLSelectElement).value;
                    const homework = (form.elements.namedItem("logHomework") as HTMLTextAreaElement).value;
                    const dateStr = new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    });

                    const updated = students.map((s) => {
                      if (s.id === target.id) {
                        return {
                          ...s,
                          sabaq,
                          sabqi,
                          manzil,
                          grade,
                          mistakes,
                          homework,
                          lastLogDate: dateStr,
                          history: [{ date: dateStr, sabaq, sabqi, manzil, grade, mistakes, homework }, ...(s.history || [])]
                        };
                      }
                      return s;
                    });

                    saveStudents(updated);
                    setIsQuranLogOpen(false);
                    alert(`✅ Lesson log saved for ${target.name}!`);
                  }}
                  className="space-y-4 text-xs sm:text-sm"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        Roll: {target.id}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">Daily Quran Progress: {target.name}</h3>
                      <p className="text-xs text-slate-500">
                        Instructor: {target.teacher} • {target.batch}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsQuranLogOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-xl font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Category Pills */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Curriculum Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(["tajweed", "hifz", "qaida", "islamic"] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setLogCategory(cat)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                            logCategory === cat
                              ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                              : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          {cat === "tajweed"
                            ? "📖 Tajweed"
                            : cat === "hifz"
                            ? "🕋 Hifz"
                            : cat === "qaida"
                            ? "📗 Qaida"
                            : "🤲 Islamic"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sabaq */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                    <label className="font-bold text-emerald-950 flex items-center justify-between">
                      <span>📖 Sabaq / New Lesson (آج کا نیا سبق) *</span>
                      <span className="text-[11px] text-emerald-700 font-normal">Surah / Ayahs</span>
                    </label>
                    <input
                      name="logSabaq"
                      required
                      defaultValue={target.sabaq}
                      placeholder={
                        logCategory === "qaida"
                          ? "e.g. Noorani Qaida Lesson 5: Tanween"
                          : logCategory === "hifz"
                          ? "e.g. Para 15: Surah Al-Isra (Page 282, 1 Page)"
                          : "e.g. Surah Al-Mulk (Ayat 1-14)"
                      }
                      className="w-full border border-emerald-300 rounded-xl p-2.5 bg-white font-semibold text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">🔄 Sabqi (Recent Revision)</label>
                      <input
                        name="logSabqi"
                        defaultValue={target.sabqi}
                        placeholder="e.g. Surah Al-Jumu'ah / Last 3 pages"
                        className="w-full border border-slate-300 rounded-xl p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">🕋 Manzil (Juz Revision)</label>
                      <input
                        name="logManzil"
                        defaultValue={target.manzil}
                        placeholder="e.g. Para 28 (Quarter 1)"
                        className="w-full border border-slate-300 rounded-xl p-2.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Performance Grade</label>
                      <select
                        name="logGrade"
                        defaultValue={target.grade || "⭐⭐⭐⭐⭐ A+ (Excellent / ممتاز)"}
                        className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-bold text-emerald-800"
                      >
                        <option value="⭐⭐⭐⭐⭐ A+ (Excellent / ممتاز)">⭐⭐⭐⭐⭐ A+ (Excellent / ممتاز)</option>
                        <option value="⭐⭐⭐⭐ A (Very Good / جید جداً)">⭐⭐⭐⭐ A (Very Good / جید جداً)</option>
                        <option value="⭐⭐⭐ B (Good / جید)">⭐⭐⭐ B (Good / جید)</option>
                        <option value="⭐⭐ C (Needs Revision / اعادہ)">⭐⭐ C (Needs Revision / اعادہ)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mistakes / Pauses</label>
                      <select
                        name="logMistakes"
                        defaultValue={target.mistakes || "0 Mistakes (Flawless Recitation)"}
                        className="w-full border border-slate-300 rounded-xl p-2.5 bg-white font-medium"
                      >
                        <option value="0 Mistakes (Flawless Recitation)">0 Mistakes (Flawless Recitation)</option>
                        <option value="1-2 Minor Corrections">1-2 Minor Corrections</option>
                        <option value="3-4 Mistakes (Needs revision)">3-4 Mistakes (Needs revision)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Homework & Articulation Notes</label>
                    <textarea
                      name="logHomework"
                      rows={2}
                      defaultValue={target.homework}
                      placeholder="e.g. Practice heavy letters (ص, ض, ط, ظ) 3 times at home."
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsQuranLogOpen(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md"
                    >
                      💾 Save Daily Log
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RESCHEDULE MAKE-UP CLASS */}
      {/* ========================================================================= */}
      {isRescheduleOpen && editingStudentId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            {(() => {
              const target = students.find((s) => s.id === editingStudentId);
              if (!target) return null;

              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const newDate = (form.elements.namedItem("resDate") as HTMLInputElement).value;
                    const newSlot = (form.elements.namedItem("resSlot") as HTMLInputElement).value;
                    const reason = (form.elements.namedItem("resReason") as HTMLInputElement).value || "Informed absence";

                    const updated = students.map((s) => {
                      if (s.id === target.id) {
                        return {
                          ...s,
                          attendance: "excused" as const,
                          homework: `Rescheduled to ${newDate} (${newSlot}) - ${reason}`
                        };
                      }
                      return s;
                    });

                    saveStudents(updated);
                    setIsRescheduleOpen(false);

                    const msg = encodeURIComponent(
                      `Assalamu Alaikum respected ${target.guardian}!\n\n` +
                      `Your 1-on-1 make-up class for ${target.name} with ${target.teacher} has been rescheduled:\n\n` +
                      `• New Date: ${newDate}\n` +
                      `• New Time Slot: ${newSlot} (${target.timezone})\n` +
                      `• Reason: ${reason}\n\n` +
                      `${settings.academyName}`
                    );

                    if (confirm("Class rescheduled! Would you like to notify the parent on WhatsApp now?")) {
                      window.open(`https://wa.me/${target.whatsapp}?text=${msg}`, "_blank");
                    }
                  }}
                  className="space-y-3 text-xs sm:text-sm"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Reschedule 1-on-1 Class (قضاء کلاس)</h3>
                      <p className="text-xs text-slate-500">Student: {target.name} ({target.timeSlot})</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRescheduleOpen(false)}
                      className="text-slate-400 text-xl font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Make-up Class Date *</label>
                    <input
                      name="resDate"
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full border p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New 30-Min Time Slot *</label>
                    <input
                      name="resSlot"
                      required
                      defaultValue="06:00 PM - 06:30 PM (Saturday)"
                      className="w-full border p-2.5 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reason for Rescheduling</label>
                    <input
                      name="resReason"
                      placeholder="e.g. Student informed beforehand due to exam"
                      className="w-full border p-2.5 rounded-xl"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsRescheduleOpen(false)}
                      className="px-4 py-2 border rounded-xl font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-purple-700 text-white rounded-xl font-bold shadow-md"
                    >
                      Confirm &amp; Notify Parent
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NEW ADMISSION */}
      {/* ========================================================================= */}
      {isAdmissionOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student Admission & Enrollment</h3>
                <p className="text-xs text-slate-500">Configure schedule, timezone, instructor, and privacy</p>
              </div>
              <button onClick={() => setIsAdmissionOpen(false)} className="text-slate-400 text-xl font-bold">
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem("stName") as HTMLInputElement).value;
                const age = (form.elements.namedItem("stAge") as HTMLInputElement).value;
                const guardian = (form.elements.namedItem("stGuardian") as HTMLInputElement).value;
                const whatsapp = (form.elements.namedItem("stWhatsApp") as HTMLInputElement).value;
                const country = (form.elements.namedItem("stCountry") as HTMLInputElement).value;
                const timezone = (form.elements.namedItem("stTimezone") as HTMLSelectElement).value;
                const classMode = (form.elements.namedItem("stMode") as HTMLSelectElement).value;
                const timeSlot = (form.elements.namedItem("stSlot") as HTMLInputElement).value;
                const classDays = (form.elements.namedItem("stDays") as HTMLSelectElement).value;
                const teacher = (form.elements.namedItem("stTeacher") as HTMLSelectElement).value;
                const batch = (form.elements.namedItem("stBatch") as HTMLSelectElement).value;
                const currency = (form.elements.namedItem("stCurrency") as HTMLSelectElement).value;
                const fee = Number((form.elements.namedItem("stFee") as HTMLInputElement).value) || 50;
                const recordingPolicy = (form.elements.namedItem("recPolicy") as RadioNodeList).value || "allowed";

                const newId = "QS-" + (100 + students.length + 1);
                const newStudent: Student = {
                  id: newId,
                  name,
                  age,
                  guardian,
                  whatsapp,
                  country,
                  timezone,
                  classMode,
                  timeSlot,
                  classDays,
                  teacher,
                  recordingPolicy,
                  batch,
                  currency,
                  fee,
                  status: "unpaid",
                  attendance: "present",
                  sabaqCategory: batch.includes("Qaida") ? "qaida" : batch.includes("Hifz") ? "hifz" : "tajweed",
                  sabaq: batch.includes("Qaida")
                    ? "Noorani Qaida Lesson 1: Individual Letters"
                    : batch.includes("Hifz")
                    ? "Para 30: Surah An-Naba (Ayat 1-10)"
                    : "Surah Al-Fatihah (Ayat 1-7)",
                  sabqi: "Assessment completed",
                  manzil: "N/A",
                  grade: "⭐⭐⭐⭐⭐ A+ (Excellent / ممتاز)",
                  mistakes: "0 Mistakes (Flawless Recitation)",
                  homework: "Practice daily recitation with Tajweed rules",
                  lastLogDate: new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  }),
                  history: []
                };

                saveStudents([...students, newStudent]);
                setIsAdmissionOpen(false);
                alert(`🎉 Student "${name}" enrolled successfully! Roll No: ${newId}`);
              }}
              className="space-y-3 text-xs sm:text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input name="stName" required placeholder="e.g. Abdullah Khan" className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age / DOB *</label>
                  <input name="stAge" required placeholder="e.g. 10 Years" className="w-full border p-2.5 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Guardian / Father Name *</label>
                  <input
                    name="stGuardian"
                    required
                    placeholder="e.g. Muhammad Khan"
                    className="w-full border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Number *</label>
                  <input
                    name="stWhatsApp"
                    required
                    placeholder="e.g. 923001234567 or 447700..."
                    className="w-full border p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country / City *</label>
                  <input
                    name="stCountry"
                    required
                    placeholder="e.g. United Kingdom (London)"
                    className="w-full border p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Timezone *</label>
                  <select name="stTimezone" className="w-full border p-2.5 rounded-xl bg-white">
                    <option>🇬🇧 UK / GMT (London Time)</option>
                    <option>🇺🇸 US Eastern (EST)</option>
                    <option>🇺🇸 US Central (CST)</option>
                    <option>🇺🇸 US Pacific (PST)</option>
                    <option>🇵🇰 PKT (Pakistan Time)</option>
                    <option>🇸🇦 Gulf / Saudi Time (AST)</option>
                    <option>🇦🇺 Australia (AEST)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Class Mode</label>
                  <select name="stMode" className="w-full border p-2 rounded-lg bg-white font-bold text-emerald-900">
                    <option value="1-on-1">👤 1-on-1 Individual Session</option>
                    <option value="Group">👥 Group Cohort Batch</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Time Slot</label>
                  <input
                    name="stSlot"
                    defaultValue="04:00 PM - 04:30 PM"
                    className="w-full border p-2 rounded-lg bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Days</label>
                  <select name="stDays" className="w-full border p-2.5 rounded-xl bg-white">
                    <option>Mon to Thu (4 Days / Week)</option>
                    <option>Mon, Wed, Fri (3 Days / Week)</option>
                    <option>Sat & Sun (Weekend Only)</option>
                    <option>Daily (Except Friday - 6 Days)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Teacher *</label>
                  <select name="stTeacher" defaultValue={OFFICIAL_TEACHERS[0].name} className="w-full border p-2.5 rounded-xl bg-white font-medium">
                    <optgroup label="👨‍🏫 Male Teachers (8)">
                      {OFFICIAL_TEACHERS.filter((t) => t.gender === "Male").map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.id} — {t.name} ({t.specialization})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="👩‍🏫 Female Teachers (3)">
                      {OFFICIAL_TEACHERS.filter((t) => t.gender === "Female").map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.id} — {t.name} ({t.specialization})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Recording Policy */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block font-bold text-slate-800 mb-1">Class Recording Permission *</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <label className="flex items-center gap-2 p-2 rounded-lg border bg-white cursor-pointer">
                    <input type="radio" name="recPolicy" value="allowed" defaultChecked />
                    <span className="text-xs font-bold text-emerald-900">✅ Allow Recording</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg border bg-white cursor-pointer">
                    <input type="radio" name="recPolicy" value="disabled" />
                    <span className="text-xs font-bold text-rose-900">🚫 Turn OFF (Privacy)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program / Course</label>
                  <select name="stBatch" className="w-full border p-2.5 rounded-xl bg-white">
                    <option>Quranic Tajweed Essentials</option>
                    <option>Quran Memorization (Hifz)</option>
                    <option>Noorani Qaida for Beginners</option>
                    <option>Arabic Grammar & Tafseer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Tuition Fee</label>
                  <div className="flex gap-1">
                    <select name="stCurrency" className="w-24 border p-2 rounded-xl bg-white font-bold">
                      <option value="USD">$ USD</option>
                      <option value="GBP">£ GBP</option>
                      <option value="PKR">Rs PKR</option>
                      <option value="SAR">﷼ SAR</option>
                    </select>
                    <input name="stFee" type="number" defaultValue={50} className="flex-1 border p-2.5 rounded-xl font-bold" />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdmissionOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold shadow-md">
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT STUDENT & ALLOCATION */}
      {/* ========================================================================= */}
      {editingStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Edit Student & Allocation</h3>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    {editingStudent.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Update teacher allocation, class schedule, tuition fee, and personal details
                </p>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = students.map((s) => (s.id === editingStudent.id ? editingStudent : s));
                saveStudents(updated);
                alert(
                  `✅ Student "${editingStudent.name}" updated successfully!\n\n👨‍🏫 Teacher: ${editingStudent.teacher}\n📅 Schedule: ${editingStudent.classDays}\n⏰ Time: ${editingStudent.timeSlot}`
                );
                setEditingStudent(null);
              }}
              className="space-y-3 text-xs sm:text-sm"
            >
              {/* Student Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="w-full border p-2.5 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age / Category</label>
                  <input
                    type="text"
                    value={editingStudent.age}
                    onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })}
                    className="w-full border p-2.5 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Guardian & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Guardian / Parent Name</label>
                  <input
                    type="text"
                    value={editingStudent.guardian}
                    onChange={(e) => setEditingStudent({ ...editingStudent, guardian: e.target.value })}
                    className="w-full border p-2.5 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    WhatsApp Number <span className="text-[11px] text-emerald-700 font-normal">(Admin Only)</span>
                  </label>
                  <input
                    type="text"
                    value={editingStudent.whatsapp}
                    onChange={(e) => setEditingStudent({ ...editingStudent, whatsapp: e.target.value })}
                    className="w-full border p-2.5 rounded-xl text-slate-800 font-mono"
                  />
                </div>
              </div>

              {/* Country & Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country / City</label>
                  <input
                    type="text"
                    value={editingStudent.country}
                    onChange={(e) => setEditingStudent({ ...editingStudent, country: e.target.value })}
                    className="w-full border p-2.5 rounded-xl text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Local Timezone</label>
                  <input
                    type="text"
                    value={editingStudent.timezone}
                    onChange={(e) => setEditingStudent({ ...editingStudent, timezone: e.target.value })}
                    className="w-full border p-2.5 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              {/* TEACHER ALLOCATION DROPDOWN */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <label className="block font-bold text-emerald-950">
                  👨‍🏫 Assigned Faculty Member (استاد تفویض کریں) *
                </label>
                <select
                  value={editingStudent.teacher}
                  onChange={(e) => setEditingStudent({ ...editingStudent, teacher: e.target.value })}
                  className="w-full border border-emerald-300 p-2.5 rounded-xl bg-white font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Unassigned (Awaiting Female Schedule)">
                    ⚠️ Unassigned (Awaiting Female Schedule)
                  </option>
                  <optgroup label="👨‍🏫 Male Faculty (8 Teachers)">
                    {OFFICIAL_TEACHERS.filter((t) => t.gender === "Male").map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.id} — {t.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="👩‍🏫 Female Faculty (3 Teachers)">
                    {OFFICIAL_TEACHERS.filter((t) => t.gender === "Female").map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.id} — {t.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-[11px] text-emerald-700">
                  Changing the teacher will instantly move this student into that teacher&apos;s personal timetable portal.
                </p>
              </div>

              {/* Class Days & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Days (ہفتہ وار دن)</label>
                  <input
                    type="text"
                    value={editingStudent.classDays}
                    onChange={(e) => setEditingStudent({ ...editingStudent, classDays: e.target.value })}
                    placeholder="e.g. Monday–Friday or Saturday, Sunday"
                    className="w-full border p-2.5 rounded-xl font-medium text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Time Slot (کلاس کا وقت)</label>
                  <input
                    type="text"
                    value={editingStudent.timeSlot}
                    onChange={(e) => setEditingStudent({ ...editingStudent, timeSlot: e.target.value })}
                    placeholder="e.g. 07:00–07:30 PM or 04:00–05:10 AM"
                    className="w-full border p-2.5 rounded-xl font-medium font-mono text-slate-800"
                  />
                </div>
              </div>

              {/* Class Mode & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Mode</label>
                  <select
                    value={editingStudent.classMode}
                    onChange={(e) => setEditingStudent({ ...editingStudent, classMode: e.target.value })}
                    className="w-full border p-2.5 rounded-xl bg-white font-medium"
                  >
                    <option value="1-on-1">👤 1-on-1 Individual Session</option>
                    <option value="Group">👥 Group Session (2+ Students)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course / Batch</label>
                  <select
                    value={editingStudent.batch}
                    onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
                    className="w-full border p-2.5 rounded-xl bg-white font-medium"
                  >
                    <option value="Nazra Quran & Tajweed">Nazra Quran &amp; Tajweed</option>
                    <option value="Hifz Ul Quran (Memorization)">Hifz Ul Quran (Memorization)</option>
                    <option value="Noorani Qaida & Basic Arabic">Noorani Qaida &amp; Basic Arabic</option>
                    <option value="Islamic Ethics & Character Building">Islamic Ethics &amp; Character Building</option>
                    <option value="Urdu Reading & Quranic Basics">Urdu Reading &amp; Quranic Basics</option>
                  </select>
                </div>
              </div>

              {/* Tuition Fee & Payment Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Fee</label>
                  <input
                    type="number"
                    value={editingStudent.fee}
                    onChange={(e) => setEditingStudent({ ...editingStudent, fee: Number(e.target.value) || 0 })}
                    className="w-full border p-2 rounded-lg font-bold text-slate-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Currency</label>
                  <select
                    value={editingStudent.currency}
                    onChange={(e) => setEditingStudent({ ...editingStudent, currency: e.target.value })}
                    className="w-full border p-2 rounded-lg bg-white font-bold"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="SAR">SAR (﷼)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="PKR">PKR (Rs)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
                  <select
                    value={editingStudent.status}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, status: e.target.value as "paid" | "unpaid" })
                    }
                    className={`w-full border p-2 rounded-lg font-bold ${
                      editingStudent.status === "paid" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
                    }`}
                  >
                    <option value="paid">✓ Paid (ادا شدہ)</option>
                    <option value="unpaid">✗ Unpaid (باقی)</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md transition-colors"
                >
                  💾 Save Changes (محفوظ کریں)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BANK & ACADEMY SETTINGS */}
      {/* ========================================================================= */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Academy & Bank Details Configuration</h3>
                <p className="text-xs text-slate-500">Configure bank accounts and branding for fee vouchers</p>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 text-xl font-bold">
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const newSettings: AcademySettings = {
                  academyName: (form.elements.namedItem("setAcademyName") as HTMLInputElement).value,
                  tagline: (form.elements.namedItem("setTagline") as HTMLInputElement).value,
                  phone: (form.elements.namedItem("setPhone") as HTMLInputElement).value,
                  email: (form.elements.namedItem("setEmail") as HTMLInputElement).value,
                  bankName: (form.elements.namedItem("setBankName") as HTMLInputElement).value,
                  accountTitle: (form.elements.namedItem("setAccountTitle") as HTMLInputElement).value,
                  bankIBAN: (form.elements.namedItem("setBankIBAN") as HTMLInputElement).value,
                  easyPaisa: (form.elements.namedItem("setEasyPaisa") as HTMLInputElement).value,
                  jazzCash: (form.elements.namedItem("setJazzCash") as HTMLInputElement).value,
                  overseasNote: (form.elements.namedItem("setOverseas") as HTMLInputElement).value,
                  adminPin: (form.elements.namedItem("setAdminPin") as HTMLInputElement)?.value || settings.adminPin || "7860",
                  teacherPin: (form.elements.namedItem("setTeacherPin") as HTMLInputElement)?.value || settings.teacherPin || "1234",
                  supervisorPin: (form.elements.namedItem("setSupervisorPin") as HTMLInputElement)?.value || settings.supervisorPin || "9900"
                };
                saveAcademySettings(newSettings);
                setIsSettingsOpen(false);
                alert("✅ Bank accounts, academy details, and security PINs updated successfully!");
              }}
              className="space-y-3.5 text-xs sm:text-sm"
            >
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="font-bold text-xs uppercase text-emerald-950">Academy Identity</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Academy Name *</label>
                    <input
                      name="setAcademyName"
                      required
                      defaultValue={settings.academyName}
                      className="w-full border p-2.5 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Academy Slogan / Tagline</label>
                    <input name="setTagline" defaultValue={settings.tagline} className="w-full border p-2.5 rounded-xl" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Helpline Phone / WhatsApp *</label>
                    <input name="setPhone" required defaultValue={settings.phone} className="w-full border p-2.5 rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Billing Email</label>
                    <input name="setEmail" defaultValue={settings.email} className="w-full border p-2.5 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Portal Security Passcodes */}
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-purple-950">
                  <Lock className="w-3.5 h-3.5 text-purple-700" />
                  <span>Portal Security PIN Codes (پورٹل پاس ورڈز)</span>
                </div>
                <p className="text-[11px] text-purple-800">
                  Set secret PINs for Super Admin, Faculty, and Quality Supervisor portals:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Super Admin PIN *
                    </label>
                    <input
                      name="setAdminPin"
                      required
                      defaultValue={settings.adminPin || "7860"}
                      className="w-full border border-purple-300 p-2 rounded-xl font-mono font-bold text-center text-slate-900 bg-white"
                    />
                    <span className="text-[10px] text-slate-500">Default: 7860</span>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Teacher Portal PIN *
                    </label>
                    <input
                      name="setTeacherPin"
                      required
                      defaultValue={settings.teacherPin || "1234"}
                      className="w-full border border-purple-300 p-2 rounded-xl font-mono font-bold text-center text-slate-900 bg-white"
                    />
                    <span className="text-[10px] text-slate-500">Default: 1234</span>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 text-xs mb-1">
                      Supervisor PIN *
                    </label>
                    <input
                      name="setSupervisorPin"
                      required
                      defaultValue={settings.supervisorPin || "9900"}
                      className="w-full border border-purple-300 p-2 rounded-xl font-mono font-bold text-center text-slate-900 bg-white"
                    />
                    <span className="text-[10px] text-slate-500">Default: 9900</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-xs uppercase text-slate-800">Primary Bank Account</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Bank Name *</label>
                    <input
                      name="setBankName"
                      required
                      defaultValue={settings.bankName}
                      className="w-full border p-2.5 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Account Title *</label>
                    <input
                      name="setAccountTitle"
                      required
                      defaultValue={settings.accountTitle}
                      className="w-full border p-2.5 rounded-xl font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">IBAN (24-Digits) *</label>
                  <input
                    name="setBankIBAN"
                    required
                    defaultValue={settings.bankIBAN}
                    className="w-full border p-2.5 rounded-xl font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">EasyPaisa Account</label>
                  <input name="setEasyPaisa" defaultValue={settings.easyPaisa} className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">JazzCash Account</label>
                  <input name="setJazzCash" defaultValue={settings.jazzCash} className="w-full border p-2.5 rounded-xl" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Overseas Remittance Note (Wise / Remitly)</label>
                <input
                  name="setOverseas"
                  defaultValue={settings.overseasNote}
                  className="w-full border p-2.5 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold shadow-md">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PRINTABLE OFFICIAL FEE VOUCHER */}
      {/* ========================================================================= */}
      {isVoucherOpen && selectedVoucherStudent && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="border-2 border-emerald-800 rounded-2xl p-6 bg-white space-y-5">
              <div className="text-center border-b-2 border-emerald-800 pb-4">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <div className="w-12 h-12 rounded-xl bg-black border border-emerald-700/50 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <img src="/logo.qs.jpeg" alt="Logo" className="w-full h-full object-contain rounded-lg" />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-extrabold text-emerald-900 uppercase tracking-wide leading-tight">
                      {settings.academyName}
                    </h2>
                    <p className="text-xs text-slate-600 font-semibold">{settings.tagline}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Contact: {settings.phone} • Email: {settings.email}
                </p>
                <div className="inline-block mt-2 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                  Official Tuition Fee Voucher
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 font-medium">Voucher No:</span>{" "}
                  <strong className="font-mono text-slate-900 font-bold">
                    INV-2026-{selectedVoucherStudent.id.replace("QS-", "")}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Issue Date:</span>{" "}
                  <strong className="text-slate-900 font-bold">
                    {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Student Name:</span>{" "}
                  <strong className="text-slate-900 font-bold">{selectedVoucherStudent.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Age / DOB:</span>{" "}
                  <strong className="text-slate-900 font-bold">{selectedVoucherStudent.age}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Guardian Name:</span>{" "}
                  <strong className="text-slate-900 font-bold">
                    {selectedVoucherStudent.guardian} ({selectedVoucherStudent.country})
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Assigned Teacher:</span>{" "}
                  <strong className="text-slate-900 font-bold">{selectedVoucherStudent.teacher}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 font-medium">Payment Due Date:</span>{" "}
                  <strong className="text-red-700 font-bold">10th of Current Month</strong>
                </div>
              </div>

              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2 border-b">Particulars / Description</th>
                    <th className="p-2 border-b text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b">Monthly Live Quran Recitation & Tuition</td>
                    <td className="p-2 border-b text-right font-bold">
                      ${selectedVoucherStudent.fee}.00 {selectedVoucherStudent.currency}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b">LMS Portal Access & Digital Worksheets</td>
                    <td className="p-2 border-b text-right text-emerald-700 font-semibold">Included ($0.00)</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-2 text-slate-900">Total Net Amount Payable:</td>
                    <td className="p-2 text-right text-emerald-800 text-sm font-extrabold">
                      ${selectedVoucherStudent.fee}.00 {selectedVoucherStudent.currency}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-[11px] p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
                <div className="font-bold">Official Payment Instructions:</div>
                <div>
                  • <strong>Bank:</strong> {settings.bankName} | <strong>Title:</strong> {settings.accountTitle}
                </div>
                <div>
                  • <strong>IBAN:</strong> <span className="font-mono font-bold">{settings.bankIBAN}</span>
                </div>
                <div>
                  • <strong>EasyPaisa:</strong> {settings.easyPaisa} | <strong>JazzCash:</strong> {settings.jazzCash}
                </div>
                <div className="text-slate-700 italic">• {settings.overseasNote}</div>
                <div className="text-emerald-800 font-semibold">
                  • Please share transaction receipt on WhatsApp once transferred. Jazakum Allahu Khairan!
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsVoucherOpen(false)}
                className="px-4 py-2 border rounded-xl font-bold text-slate-600 text-xs sm:text-sm"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 mt-auto">
        {settings.academyName} • Next.js 15 Full-Stack Enterprise LMS • Real Server Connected
      </footer>
    </div>
  );
}

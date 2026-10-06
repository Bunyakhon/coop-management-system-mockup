/* =========================================================
   OFFICER DASHBOARD REDESIGN
   Frontend mockup + localStorage
   ========================================================= */

"use strict";

/* =========================================================
   STATIC DEFINITIONS
   ========================================================= */

const ACADEMIC_YEARS = ["2569", "2570"];

const CALENDAR_TYPE_META = {
  search: { label: "ค้นหาสถานประกอบการ", icon: "fa-magnifying-glass-location" },
  contact: { label: "ติดต่อสถานประกอบการ", icon: "fa-phone" },
  request: { label: "ยื่นคำร้อง", icon: "fa-file-signature" },
  start: { label: "เริ่มสหกิจ", icon: "fa-briefcase" },
  supervision1: { label: "นิเทศครั้งที่ 1", icon: "fa-user-tie" },
  supervision2: { label: "นิเทศครั้งที่ 2", icon: "fa-user-tie" },
  evaluation: { label: "ประเมินสถานประกอบการ", icon: "fa-star" },
  report: { label: "ส่งรูปเล่ม", icon: "fa-book" },
  poster: { label: "ส่งโปสเตอร์", icon: "fa-image" },
  exam: { label: "สอบโครงการ", icon: "fa-graduation-cap" },
  other: { label: "กิจกรรมอื่น ๆ", icon: "fa-calendar-day" },
};

const SCORE_GROUPS = [
  {
    key: "company",
    title: "สถานประกอบการ",
    target: 50,
    description: "คะแนนจากพี่เลี้ยงสถานประกอบการ",
  },
  {
    key: "department",
    title: "ภาควิชา",
    target: 50,
    description: "คะแนนจากอาจารย์นิเทศและคณะกรรมการสอบ",
  },
];

const SCORE_ITEM_DEFS = [
  {
    key: "mentorWeeklyLog",
    group: "company",
    title: "พี่เลี้ยงประเมินเล่มแต่ละสัปดาห์",
    hint: "ประเมินบันทึก/เล่มการปฏิบัติงานเป็นรายสัปดาห์",
    defaultScore: 20,
  },
  {
    key: "mentorFinal",
    group: "company",
    title: "พี่เลี้ยงประเมินครั้งสุดท้าย",
    hint: "ผลประเมินภาพรวมจากพี่เลี้ยงเมื่อสิ้นสุดสหกิจศึกษา",
    defaultScore: 30,
  },
  {
    key: "supervisorReport",
    group: "department",
    title: "อาจารย์นิเทศประเมินรูปเล่ม",
    hint: "คะแนนประเมินรูปเล่มโครงการโดยอาจารย์นิเทศ",
    defaultScore: 10,
  },
  {
    key: "poster",
    group: "department",
    title: "ประเมินโปสเตอร์",
    hint: "ความถูกต้อง ความชัดเจน และการสื่อสารผลงาน",
    defaultScore: 5,
  },
  {
    key: "finalContent",
    group: "department",
    title: "ประเมินภาพรวมเนื้อหางานครั้งสุดท้าย",
    hint: "คุณภาพเนื้อหาและความสมบูรณ์ของผลงานช่วงสุดท้าย",
    defaultScore: 25,
  },
  {
    key: "exam",
    group: "department",
    title: "คะแนนสอบ",
    hint: "ประเมินโดยประธาน 1 คน และกรรมการ 2 คน",
    defaultScore: 10,
    evaluators: ["ประธาน", "กรรมการ 1", "กรรมการ 2"],
  },
];

/* =========================================================
   STATE
   ========================================================= */

const officerState = {
  officer: {
    name: "เจ้าหน้าที่ภาควิชาเทคโนโลยีสารสนเทศ",
  },

  students: [
    {
      id: "S001",
      studentId: "6702458196",
      name: "พิมพ์ชนก สุขใจ",
      major: "INE",
      year: "2569",
      companyId: "CP001",
      requestId: "RQ001",
      courtesyId: "CO001",
      referralId: "RF001",
      startDate: "2026-11-01",
    },
    {
      id: "S002",
      studentId: "6702458202",
      name: "อรุณี พงษ์สุวรรณ",
      major: "IT",
      year: "2569",
      companyId: "CP002",
      requestId: "RQ002",
      courtesyId: null,
      referralId: null,
      startDate: "2026-11-01",
    },
    {
      id: "S003",
      studentId: "6702458208",
      name: "ภูริช วัฒนกุล",
      major: "INE",
      year: "2569",
      companyId: "CP003",
      requestId: "RQ003",
      courtesyId: "CO003",
      referralId: "RF003",
      startDate: "2026-11-01",
    },
    {
      id: "S004",
      studentId: "6702458214",
      name: "รินรดา แก้วมณี",
      major: "IT",
      year: "2569",
      companyId: "CP005",
      requestId: "RQ004",
      courtesyId: null,
      referralId: null,
      startDate: "2026-11-01",
    },
    {
      id: "S005",
      studentId: "6702458220",
      name: "ธนกฤต ศรีสุข",
      major: "INE",
      year: "2569",
      companyId: "CP004",
      requestId: "RQ005",
      courtesyId: "CO005",
      referralId: "RF005",
      startDate: "2026-11-01",
    },
    {
      id: "S006",
      studentId: "6702458226",
      name: "ณิชารีย์ พรหมดี",
      major: "IT",
      year: "2569",
      companyId: "CP006",
      requestId: "RQ006",
      courtesyId: null,
      referralId: null,
      startDate: "2026-11-01",
    },
  ],

  requests: [
    {
      id: "RQ001",
      studentId: "S001",
      submittedDate: "2026-09-03",
      status: "approved",
      advisorStatus: "approved",
      headStatus: "approved",
      position: "Frontend Developer",
      cancelReason: "",
      cancelledBy: "",
      cancelledAt: "",
    },
    {
      id: "RQ002",
      studentId: "S002",
      submittedDate: "2026-09-05",
      status: "pending",
      advisorStatus: "approved",
      headStatus: "pending",
      position: "Data Analyst",
      cancelReason: "",
      cancelledBy: "",
      cancelledAt: "",
    },
    {
      id: "RQ003",
      studentId: "S003",
      submittedDate: "2026-08-30",
      status: "approved",
      advisorStatus: "approved",
      headStatus: "approved",
      position: "Cloud Engineer Intern",
      cancelReason: "",
      cancelledBy: "",
      cancelledAt: "",
    },
    {
      id: "RQ004",
      studentId: "S004",
      submittedDate: "2026-09-07",
      status: "rejected",
      advisorStatus: "approved",
      headStatus: "rejected",
      position: "Cybersecurity Analyst Intern",
      cancelReason: "",
      cancelledBy: "",
      cancelledAt: "",
    },
    {
      id: "RQ005",
      studentId: "S005",
      submittedDate: "2026-08-28",
      status: "approved",
      advisorStatus: "approved",
      headStatus: "approved",
      position: "Network Engineer",
      cancelReason: "",
      cancelledBy: "",
      cancelledAt: "",
    },
    {
      id: "RQ006",
      studentId: "S006",
      submittedDate: "2026-08-20",
      status: "cancelled",
      advisorStatus: "pending",
      headStatus: "pending",
      position: "Mobile Application Developer",
      cancelReason: "นักศึกษาขอเปลี่ยนสถานประกอบการ",
      cancelledBy: "เจ้าหน้าที่ภาควิชา",
      cancelledAt: "2026-08-22T10:30:00",
    },
  ],

  courtesyDocuments: [
    {
      id: "CO001",
      studentId: "S001",
      date: "2026-09-10",
      subject: "ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา",
      attention: "ผู้จัดการฝ่ายทรัพยากรบุคคล",
      deliveryMethod: "email",
      note: "",
      status: "ready",
      sentAt: "2026-09-11T09:15:00",
      operator: "เจ้าหน้าที่ภาควิชา",
      responseStatus: "waiting",
      responseOnlineSentAt: "2026-09-11T09:20:00",
      responsePrintedAt: "",
      responseUpdatedAt: "",
      responseNote: "",
    },
    {
      id: "CO003",
      studentId: "S003",
      date: "2026-09-12",
      subject: "ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา",
      attention: "ผู้จัดการฝ่ายทรัพยากรบุคคล",
      deliveryMethod: "post",
      note: "",
      status: "ready",
      sentAt: "",
      operator: "เจ้าหน้าที่ภาควิชา",
      responseStatus: "not_sent",
      responseOnlineSentAt: "",
      responsePrintedAt: "",
      responseUpdatedAt: "",
      responseNote: "",
    },
    {
      id: "CO005",
      studentId: "S005",
      date: "2026-09-06",
      subject: "ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา",
      attention: "ผู้จัดการฝ่ายทรัพยากรบุคคล",
      deliveryMethod: "email",
      note: "",
      status: "ready",
      sentAt: "2026-09-07T11:20:00",
      operator: "เจ้าหน้าที่ภาควิชา",
      responseStatus: "accepted",
      responseOnlineSentAt: "2026-09-07T11:25:00",
      responsePrintedAt: "",
      responseUpdatedAt: "2026-09-09T14:30:00",
      responseNote: "สถานประกอบการตอบรับทาง E-mail",
    },
  ],

  referralDocuments: [
    {
      id: "RF001",
      studentId: "S001",
      date: "2026-10-20",
      subject: "ส่งตัวนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา",
      attention: "ผู้จัดการฝ่ายทรัพยากรบุคคล",
      note: "",
      status: "ready",
      operator: "เจ้าหน้าที่ภาควิชา",
    },
    {
      id: "RF003",
      studentId: "S003",
      date: "2026-10-20",
      subject: "ส่งตัวนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา",
      attention: "ผู้จัดการฝ่ายทรัพยากรบุคคล",
      note: "รอจัดทำหนังสือส่งตัว",
      status: "draft",
      operator: "เจ้าหน้าที่ภาควิชา",
    },
    {
      id: "RF005",
      studentId: "S005",
      date: "2026-10-18",
      subject: "ส่งตัวนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา",
      attention: "ผู้จัดการฝ่ายทรัพยากรบุคคล",
      note: "",
      status: "ready",
      operator: "เจ้าหน้าที่ภาควิชา",
    },
  ],

  companies: [
    {
      id: "CP001",
      nameTh: "บริษัท บลูเวฟ ดิจิทัล จำกัด",
      nameEn: "BlueWave Digital Co., Ltd.",
      type: "Software",
      province: "ชลบุรี",
      address: "88 ถนนสุขุมวิท อำเภอเมือง จังหวัดชลบุรี",
      contactName: "คุณสุภาวดี ใจดี",
      contactPosition: "HR Manager",
      contactEmail: "hr@bluewave.co.th",
      contactPhone: "038-123-456",
      openPosition: "Frontend Developer",
      capacity: 2,
      skills: ["HTML", "CSS", "JavaScript", "React"],
      active: true,
    },
    {
      id: "CP002",
      nameTh: "บริษัท ดาต้าสเฟียร์ (ประเทศไทย) จำกัด",
      nameEn: "DataSphere Thailand",
      type: "Data",
      province: "กรุงเทพมหานคร",
      address: "อาคารธุรกิจ ถนนรัชดาภิเษก กรุงเทพมหานคร",
      contactName: "คุณธนา วัฒนา",
      contactPosition: "People Operations",
      contactEmail: "career@datasphere.co.th",
      contactPhone: "02-555-1122",
      openPosition: "Data Analyst",
      capacity: 3,
      skills: ["Python", "SQL", "Power BI"],
      active: true,
    },
    {
      id: "CP003",
      nameTh: "บริษัท คลาวด์โนวา ซิสเต็มส์ จำกัด",
      nameEn: "CloudNova Systems Co., Ltd.",
      type: "Cloud",
      province: "กรุงเทพมหานคร",
      address: "ถนนพระราม 9 กรุงเทพมหานคร",
      contactName: "คุณปริญญา เมฆา",
      contactPosition: "Technical Recruiter",
      contactEmail: "talent@cloudnova.co.th",
      contactPhone: "02-666-7788",
      openPosition: "Cloud Engineer Intern",
      capacity: 2,
      skills: ["Linux", "Docker", "Cloud"],
      active: true,
    },
    {
      id: "CP004",
      nameTh: "บริษัท เน็กซ์เวฟ เทคโนโลยี จำกัด",
      nameEn: "NextWave Technology Co., Ltd.",
      type: "Network",
      province: "ระยอง",
      address: "นิคมอุตสาหกรรม จังหวัดระยอง",
      contactName: "คุณกรกฎ พัฒนะ",
      contactPosition: "Network Manager",
      contactEmail: "network@nextwave.co.th",
      contactPhone: "038-888-9911",
      openPosition: "Network Engineer",
      capacity: 2,
      skills: ["Networking", "Cisco", "Linux"],
      active: true,
    },
    {
      id: "CP005",
      nameTh: "บริษัท ซีเคียวลิงก์ ไซเบอร์ จำกัด",
      nameEn: "SecureLink Cyber Co., Ltd.",
      type: "Cybersecurity",
      province: "กรุงเทพมหานคร",
      address: "ถนนพหลโยธิน กรุงเทพมหานคร",
      contactName: "คุณปฏิภาณ ปลอดภัย",
      contactPosition: "SOC Manager",
      contactEmail: "soc@securelink.co.th",
      contactPhone: "02-777-6699",
      openPosition: "Cybersecurity Analyst Intern",
      capacity: 1,
      skills: ["Cybersecurity", "SIEM", "Linux"],
      active: true,
    },
    {
      id: "CP006",
      nameTh: "บริษัท ไบรท์โค้ด โซลูชันส์ จำกัด",
      nameEn: "BrightCode Solutions Co., Ltd.",
      type: "Software",
      province: "ปทุมธานี",
      address: "อุทยานวิทยาศาสตร์ จังหวัดปทุมธานี",
      contactName: "คุณศศิธร โค้ดดี",
      contactPosition: "HR Coordinator",
      contactEmail: "jobs@brightcode.co.th",
      contactPhone: "02-888-7744",
      openPosition: "Mobile Application Developer",
      capacity: 2,
      skills: ["JavaScript", "React Native", "API"],
      active: false,
    },
  ],

  calendarEvents: [
    {
      id: "EV001",
      year: "2569",
      term: "1",
      type: "search",
      name: "ช่วงหาสถานประกอบการ",
      startDate: "2026-06-01",
      endDate: "2026-07-31",
      description: "นักศึกษาค้นหาและพิจารณาสถานประกอบการที่สนใจ",
    },
    {
      id: "EV002",
      year: "2569",
      term: "1",
      type: "contact",
      name: "ช่วงติดต่อสถานประกอบการ",
      startDate: "2026-07-01",
      endDate: "2026-08-31",
      description: "นักศึกษาติดต่อสถานประกอบการเพื่อสอบถามตำแหน่งและช่วงเวลา",
    },
    {
      id: "EV003",
      year: "2569",
      term: "1",
      type: "request",
      name: "ช่วงเวลายื่นคำร้องสหกิจศึกษา",
      startDate: "2026-08-01",
      endDate: "2026-10-15",
      description: "กำหนดช่วงยื่นคำร้องและเอกสารที่เกี่ยวข้อง",
    },
    {
      id: "EV004",
      year: "2569",
      term: "1",
      type: "start",
      name: "วันแรกของการปฏิบัติงานสหกิจศึกษา",
      startDate: "2026-11-01",
      endDate: "2026-11-01",
      description: "นักศึกษาเริ่มปฏิบัติงานตามสถานประกอบการ",
    },
    {
      id: "EV005",
      year: "2569",
      term: "1",
      type: "supervision1",
      name: "ช่วงนิเทศครั้งที่ 1",
      startDate: "2026-11-25",
      endDate: "2026-12-10",
      description: "อาจารย์นิเทศกำหนดนัดหมายการนิเทศครั้งที่ 1",
    },
    {
      id: "EV006",
      year: "2569",
      term: "1",
      type: "supervision2",
      name: "ช่วงนิเทศครั้งที่ 2",
      startDate: "2027-01-15",
      endDate: "2027-01-31",
      description: "อาจารย์นิเทศกำหนดนัดหมายการนิเทศครั้งที่ 2",
    },
    {
      id: "EV007",
      year: "2569",
      term: "1",
      type: "evaluation",
      name: "วันประเมินสถานประกอบการ",
      startDate: "2027-02-10",
      endDate: "2027-02-10",
      description: "เปิดให้นักศึกษาส่งแบบประเมินสถานประกอบการ",
    },
    {
      id: "EV008",
      year: "2569",
      term: "1",
      type: "report",
      name: "กำหนดส่งรูปเล่มโครงการ",
      startDate: "2027-02-20",
      endDate: "2027-02-20",
      description: "กำหนดส่งรูปเล่มฉบับสมบูรณ์",
    },
    {
      id: "EV009",
      year: "2569",
      term: "1",
      type: "poster",
      name: "กำหนดส่งโปสเตอร์",
      startDate: "2027-02-25",
      endDate: "2027-02-25",
      description: "กำหนดส่งโปสเตอร์โครงการสหกิจศึกษา",
    },
    {
      id: "EV010",
      year: "2569",
      term: "1",
      type: "exam",
      name: "วันสอบโครงการสหกิจศึกษา",
      startDate: "2027-03-05",
      endDate: "2027-03-05",
      description: "นำเสนอและสอบโครงการครั้งสุดท้าย",
    },
  ],

  teachers: [
    { id:"T001", firstName:"นิติการ", lastName:"นาคเจือทอง", email:"nitikan@fitm.kmutnb.ac.th", major:"IT", academicTitle:"ผศ.ดร.", active:true },
    { id:"T002", firstName:"สุพาภรณ์", lastName:"ซิ้มเจริญ", email:"supaporn@fitm.kmutnb.ac.th", major:"INE", academicTitle:"ผศ.ดร.", active:true },
    { id:"T003", firstName:"ขนิษฐา", lastName:"นามี", email:"khanittha@fitm.kmutnb.ac.th", major:"IT", academicTitle:"ผศ.ดร.", active:true },
    { id:"T004", firstName:"สุปีติ", lastName:"กุลจันทร์", email:"supiti@fitm.kmutnb.ac.th", major:"INE", academicTitle:"ผศ.ดร.", active:true },
    { id:"T005", firstName:"วันทนี", lastName:"ประจวบศุภกิจ", email:"wantanee@fitm.kmutnb.ac.th", major:"INE", academicTitle:"ผศ.ดร.", active:false },
    { id:"T006", firstName:"สิวาลัย", lastName:"จินเจือ", email:"sivalai@fitm.kmutnb.ac.th", major:"IT", academicTitle:"ผศ.ดร.", active:true },
  ],

  scoringSchemes: {
    "2569-IT": {
      version: 1,
      status: "active",
      groupWeights: { company: 50, department: 50 },
      items: {
        mentorWeeklyLog: 20,
        mentorFinal: 30,
        supervisorReport: 10,
        poster: 5,
        finalContent: 25,
        exam: 10,
      },
      updatedAt: "2026-05-01T10:00:00",
    },
    "2569-INE": {
      version: 1,
      status: "active",
      groupWeights: { company: 50, department: 50 },
      items: {
        mentorWeeklyLog: 20,
        mentorFinal: 30,
        supervisorReport: 10,
        poster: 5,
        finalContent: 25,
        exam: 10,
      },
      updatedAt: "2026-05-01T10:00:00",
    },
    "2570-IT": {
      version: 1,
      status: "draft",
      groupWeights: { company: 50, department: 50 },
      items: {
        mentorWeeklyLog: 20,
        mentorFinal: 30,
        supervisorReport: 10,
        poster: 5,
        finalContent: 25,
        exam: 10,
      },
      updatedAt: "2026-10-01T09:00:00",
    },
    "2570-INE": {
      version: 1,
      status: "draft",
      groupWeights: { company: 50, department: 50 },
      items: {
        mentorWeeklyLog: 20,
        mentorFinal: 30,
        supervisorReport: 10,
        poster: 5,
        finalContent: 25,
        exam: 10,
      },
      updatedAt: "2026-10-01T09:00:00",
    },
  },

  scoringHistory: [
    { key:"2569-IT", version:1, status:"active", savedAt:"2026-05-01T10:00:00" },
    { key:"2569-INE", version:1, status:"active", savedAt:"2026-05-01T10:00:00" },
    { key:"2570-IT", version:1, status:"draft", savedAt:"2026-10-01T09:00:00" },
    { key:"2570-INE", version:1, status:"draft", savedAt:"2026-10-01T09:00:00" },
  ],

  scoringDraft: null,

  chatHistory: [
    {
      role: "assistant",
      text: "สวัสดีครับ ผมคือ KIWI Officer Assistant สามารถช่วยตรวจสอบคำร้อง หนังสือขอความอนุเคราะห์ หนังสือส่งตัว และงานเอกสารที่รอดำเนินการได้ครับ",
    },
  ],
};

/* =========================================================
   HELPERS
   ========================================================= */

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatThaiDate(value) {
  if (!value) return "-";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatThaiDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function nextId(prefix, items) {
  const max = Math.max(
    0,
    ...items.map((item) => Number(String(item.id).replace(/\D/g, "")) || 0),
  );
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

function findStudent(id) {
  return officerState.students.find((item) => item.id === id);
}

function findStudentByStudentId(studentId) {
  return officerState.students.find((item) => item.studentId === studentId);
}

function findCompany(id) {
  return officerState.companies.find((item) => item.id === id);
}

function findRequest(id) {
  return officerState.requests.find((item) => item.id === id);
}

function findCourtesy(id) {
  return officerState.courtesyDocuments.find((item) => item.id === id);
}

function findReferral(id) {
  return officerState.referralDocuments.find((item) => item.id === id);
}

function getStudentRequest(student) {
  return student?.requestId ? findRequest(student.requestId) : null;
}

function getStudentCourtesy(student) {
  return student?.courtesyId ? findCourtesy(student.courtesyId) : null;
}

function getStudentReferral(student) {
  return student?.referralId ? findReferral(student.referralId) : null;
}

function requestStatusLabel(status) {
  return {
    pending: "รอดำเนินการ",
    approved: "อนุมัติแล้ว",
    rejected: "ไม่อนุมัติ",
    cancelled: "ยกเลิกแล้ว",
  }[status] || "ไม่ทราบสถานะ";
}

function documentStatusLabel(status) {
  return {
    draft: "ฉบับร่าง",
    ready: "จัดทำแล้ว",
    sent: "ส่งแล้ว",
    cancelled: "ยกเลิก",
  }[status] || "ยังไม่มี";
}

function companyResponseStatusLabel(status) {
  return {
    not_sent: "ยังไม่ส่งฟอร์ม",
    waiting: "รอตอบรับ",
    accepted: "ตอบรับแล้ว",
    rejected: "ไม่ตอบรับ",
  }[status] || "ยังไม่ส่งฟอร์ม";
}

function companyResponseStatusClass(status) {
  return {
    not_sent: "of-status-muted",
    waiting: "of-response-waiting",
    accepted: "of-response-accepted",
    rejected: "of-response-rejected",
  }[status] || "of-status-muted";
}

function ensureCourtesyResponseDefaults() {
  officerState.courtesyDocuments.forEach((document) => {
    if (!("responseStatus" in document)) document.responseStatus = "not_sent";

    if (!("responseOnlineSentAt" in document)) {
      document.responseOnlineSentAt =
        document.responseSentAt || "";
    }

    if (!("responsePrintedAt" in document)) {
      document.responsePrintedAt = "";
    }

    if (!("responseUpdatedAt" in document)) document.responseUpdatedAt = "";
    if (!("responseNote" in document)) document.responseNote = "";

    delete document.responseSentAt;
    delete document.deliveryMethod;
    delete document.sentAt;

    if (document.status === "sent") {
      document.status = "ready";
    }
  });

  officerState.referralDocuments.forEach((document) => {
    delete document.deliveryMethod;
    delete document.sentAt;

    if (document.status === "sent") {
      document.status = "ready";
    }
  });

  /* Legacy calendar checkbox data is no longer part of the design. */
  officerState.calendarEvents.forEach((event) => {
    delete event.notify;
  });
}

function statusClass(status) {
  return {
    pending: "of-status-warning",
    approved: "of-status-success",
    rejected: "of-status-danger",
    cancelled: "of-status-muted",
    draft: "of-status-warning",
    ready: "of-status-primary",
    sent: "of-status-success",
    active: "of-status-success",
    inactive: "of-status-muted",
  }[status] || "of-status-muted";
}

function saveOfficerState() {
  const safeState = deepClone(officerState);
  localStorage.setItem("officerRedesignState", JSON.stringify(safeState));
}

function loadOfficerState() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("officerRedesignState") || "null",
    );

    if (!saved) return;

    Object.keys(saved).forEach((key) => {
      if (key in officerState) {
        officerState[key] = saved[key];
      }
    });

    /* Cleanup legacy calendar notification fields from older mockup versions. */
    officerState.calendarEvents.forEach((event) => {
      delete event.notify;
    });
  } catch (error) {
    console.warn("ไม่สามารถโหลดข้อมูล Officer Mockup ได้", error);
  }
}

function populateAcademicYearSelect(select, allowAll = false) {
  if (!select) return;

  select.innerHTML =
    (allowAll ? '<option value="">ทุกปี</option>' : "") +
    ACADEMIC_YEARS.map(
      (year) => `<option value="${year}">${year}</option>`,
    ).join("");
}

function setResponsiveTableLabels() {
  document.querySelectorAll(".of-table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.textContent.trim(),
    );

    table.querySelectorAll("tbody tr").forEach((row) => {
      Array.from(row.children).forEach((cell, index) => {
        cell.dataset.label = headers[index] || "";
      });
    });
  });
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function switchOfficerPanel(panelId) {
  document.querySelectorAll(".of-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === panelId);
  });

  document.querySelectorAll(".of-sidebar-item[data-panel]").forEach((button) => {
    button.classList.toggle("active", button.dataset.panel === panelId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToOfficerPanel(panelId) {
  switchOfficerPanel(panelId);
}

function switchDocumentTab(tabName) {
  document.querySelectorAll("[data-doc-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.docTab === tabName);
  });

  document.querySelectorAll("[data-doc-tab-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.docTabPanel === tabName);
  });
}

/* =========================================================
   OVERVIEW
   ========================================================= */

function calculateOverviewStats() {
  const pendingRequests = officerState.requests.filter(
    (request) => request.status === "pending",
  ).length;

  const approvedStudents = officerState.students.filter(
    (student) => getStudentRequest(student)?.status === "approved",
  );

  const courtesyPending = approvedStudents.filter((student) => {
    const document = getStudentCourtesy(student);
    return !document || document.status !== "ready";
  }).length;

  const referralPending = approvedStudents.filter((student) => {
    const courtesy = getStudentCourtesy(student);
    const referral = getStudentReferral(student);

    return (
      courtesy?.responseStatus === "accepted" &&
      (!referral || referral.status !== "ready")
    );
  }).length;

  const documentIssues = officerState.requests.filter(
    (request) => ["rejected", "cancelled"].includes(request.status),
  ).length;

  const companies = officerState.companies.filter(
    (company) => company.active,
  ).length;

  return {
    pendingRequests,
    courtesyPending,
    referralPending,
    documentIssues,
    companies,
  };
}

function updateOverview() {
  const stats = calculateOverviewStats();

  byId("statPendingRequests").textContent = stats.pendingRequests;
  byId("statCourtesyPending").textContent = stats.courtesyPending;
  byId("statReferralPending").textContent = stats.referralPending;
  byId("statDocumentIssues").textContent = stats.documentIssues;
  byId("statCompanies").textContent = stats.companies;

  const tasks =
    stats.pendingRequests +
    stats.courtesyPending +
    stats.referralPending +
    stats.documentIssues;

  byId("documentTaskBadge").textContent = tasks;
  byId("documentTaskBadge").style.display = tasks ? "inline-flex" : "none";

  renderOverviewTasks(stats);
  renderUpcomingEvents();
}

function renderOverviewTasks(stats) {
  const tasks = [];

  if (stats.pendingRequests) {
    tasks.push({
      icon: "fa-file-signature",
      tone: "warning",
      title: `คำร้องรอดำเนินการ ${stats.pendingRequests} รายการ`,
      text: "ตรวจสอบสถานะและติดตามการพิจารณาคำร้อง",
      action: "openDocumentSection('requests')",
      button: "ตรวจสอบ",
    });
  }

  if (stats.courtesyPending) {
    tasks.push({
      icon: "fa-envelope-open-text",
      tone: "warning",
      title: `หนังสือขอความอนุเคราะห์รอจัดทำ ${stats.courtesyPending} ฉบับ`,
      text: "รายการคำร้องที่อนุมัติแล้วแต่เอกสารยังไม่เสร็จ",
      action: "openDocumentSection('courtesy')",
      button: "ดำเนินการ",
    });
  }

  if (stats.referralPending) {
    tasks.push({
      icon: "fa-file-arrow-right",
      tone: "purple",
      title: `หนังสือส่งตัวรอดำเนินการ ${stats.referralPending} ฉบับ`,
      text: "ตรวจสอบวันเริ่มสหกิจและเตรียมหนังสือส่งตัว",
      action: "openDocumentSection('referral')",
      button: "ดำเนินการ",
    });
  }

  if (stats.documentIssues) {
    tasks.push({
      icon: "fa-triangle-exclamation",
      tone: "danger",
      title: `รายการเอกสารที่ควรตรวจสอบ ${stats.documentIssues} รายการ`,
      text: "มีคำร้องไม่อนุมัติหรือถูกยกเลิก",
      action: "openDocumentSection('status')",
      button: "ตรวจสอบ",
    });
  }

  byId("overviewTaskList").innerHTML = tasks.length
    ? tasks
        .map(
          (task) => `
            <div class="of-task-row">
              <div class="icon ${task.tone}">
                <i class="fa-solid ${task.icon}"></i>
              </div>
              <div>
                <strong>${escapeHtml(task.title)}</strong>
                <span>${escapeHtml(task.text)}</span>
              </div>
              <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="${task.action}">
                ${escapeHtml(task.button)}
              </button>
            </div>
          `,
        )
        .join("")
    : `
      <div class="of-info-banner">
        <i class="fa-solid fa-circle-check"></i>
        <span>ไม่มีงานเอกสารค้างที่ระบบตรวจพบ</span>
      </div>
    `;
}

function renderUpcomingEvents() {
  const today = new Date();
  const upcoming = officerState.calendarEvents
    .filter((event) => new Date(`${event.endDate}T23:59:59`) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 5);

  byId("overviewUpcomingList").innerHTML = upcoming.length
    ? upcoming
        .map((event) => {
          const date = new Date(`${event.startDate}T00:00:00`);
          return `
            <div class="of-upcoming-item">
              <div class="of-upcoming-date">
                <strong>${date.toLocaleDateString("th-TH", { day: "numeric" })}</strong>
                <span>${date.toLocaleDateString("th-TH", { month: "short" })}</span>
              </div>
              <div>
                <h3>${escapeHtml(event.name)}</h3>
                <p>${escapeHtml(formatEventDateRange(event))}</p>
              </div>
            </div>
          `;
        })
        .join("")
    : `
      <div class="of-info-banner">
        <i class="fa-solid fa-calendar-check"></i>
        <span>ไม่มีกิจกรรมที่จะถึงในปฏิทิน</span>
      </div>
    `;
}

function openDocumentSection(tabName) {
  switchOfficerPanel("panel-documents");
  switchDocumentTab(tabName);
}

/* =========================================================
   DOCUMENT STATUS OVERVIEW
   ========================================================= */

function getStudentDocumentOverallStatus(student) {
  const request = getStudentRequest(student);
  const courtesy = getStudentCourtesy(student);
  const referral = getStudentReferral(student);

  if (
    request?.status === "rejected" ||
    request?.status === "cancelled" ||
    courtesy?.status === "cancelled" ||
    referral?.status === "cancelled"
  ) {
    return "issue";
  }

  if (
    request?.status === "approved" &&
    courtesy?.status === "ready" &&
    courtesy?.responseStatus === "accepted" &&
    referral?.status === "ready"
  ) {
    return "complete";
  }

  return "pending";
}

function getDocumentStatusRows() {
  const keyword = normalize(byId("documentSearchInput").value);
  const year = byId("documentYearFilter").value;
  const major = byId("documentMajorFilter").value;
  const overallStatus = byId("documentStatusFilter").value;

  return officerState.students.filter((student) => {
    const company = findCompany(student.companyId);
    const searchable = normalize(
      `${student.name} ${student.studentId} ${company?.nameTh || ""} ${company?.nameEn || ""}`,
    );

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!year || student.year === year) &&
      (!major || student.major === major) &&
      (!overallStatus ||
        getStudentDocumentOverallStatus(student) === overallStatus)
    );
  });
}

function documentBadge(document) {
  if (!document) {
    return '<span class="of-status of-status-muted">ยังไม่มี</span>';
  }

  return `<span class="of-status ${statusClass(document.status)}">${escapeHtml(documentStatusLabel(document.status))}</span>`;
}

function requestBadge(request) {
  if (!request) {
    return '<span class="of-status of-status-muted">ยังไม่ยื่น</span>';
  }

  return `<span class="of-status ${statusClass(request.status)}">${escapeHtml(requestStatusLabel(request.status))}</span>`;
}

function renderDocumentStatusTable() {
  const rows = getDocumentStatusRows();
  const tbody = byId("documentStatusTableBody");

  byId("documentStatusEmpty").classList.toggle("show", rows.length === 0);

  tbody.innerHTML = rows
    .map((student) => {
      const company = findCompany(student.companyId);
      const request = getStudentRequest(student);
      const courtesy = getStudentCourtesy(student);
      const referral = getStudentReferral(student);

      return `
        <tr>
          <td>
            <span class="of-table-primary">${escapeHtml(student.name)}</span>
            <span class="of-table-secondary">${escapeHtml(student.studentId)} • ${escapeHtml(student.major)}</span>
            <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="openStudentDocumentTimeline('${student.id}')">
              ดู Timeline
            </button>
          </td>
          <td>
            <span class="of-table-primary">${escapeHtml(company?.nameEn || company?.nameTh || "-")}</span>
            <span class="of-table-secondary">${escapeHtml(company?.province || "-")}</span>
          </td>
          <td>${requestBadge(request)}</td>
          <td>${documentBadge(courtesy)}</td>
          <td>${documentBadge(referral)}</td>
        </tr>
      `;
    })
    .join("");

  setResponsiveTableLabels();
}

function openStudentDocumentTimeline(studentId) {
  const student = findStudent(studentId);
  if (!student) return;

  const company = findCompany(student.companyId);
  const request = getStudentRequest(student);
  const courtesy = getStudentCourtesy(student);
  const referral = getStudentReferral(student);

  byId("studentDocumentModalTitle").textContent =
    `สถานะเอกสาร — ${student.name}`;

  const timeline = [
    {
      title: "ยื่นคำร้องสหกิจศึกษา",
      state: request ? "done" : "waiting",
      text: request
        ? `${requestStatusLabel(request.status)} • ${formatThaiDate(request.submittedDate)}`
        : "ยังไม่ได้ยื่น",
    },
    {
      title: "อาจารย์ที่ปรึกษาพิจารณา",
      state:
        request?.advisorStatus === "approved"
          ? "done"
          : request?.advisorStatus === "rejected"
            ? "issue"
            : "current",
      text:
        request?.advisorStatus === "approved"
          ? "อนุมัติแล้ว"
          : request?.advisorStatus === "rejected"
            ? "ไม่อนุมัติ"
            : "รอพิจารณา",
    },
    {
      title: "หัวหน้าภาควิชาพิจารณา",
      state:
        request?.headStatus === "approved"
          ? "done"
          : request?.headStatus === "rejected"
            ? "issue"
            : "current",
      text:
        request?.headStatus === "approved"
          ? "อนุมัติแล้ว"
          : request?.headStatus === "rejected"
            ? "ไม่อนุมัติ"
            : "รอพิจารณา",
    },
    {
      title: "หนังสือขอความอนุเคราะห์",
      state:
        courtesy?.status === "ready"
          ? "done"
          : courtesy
            ? "current"
            : "waiting",
      text: courtesy
        ? documentStatusLabel(courtesy.status)
        : "ยังไม่ได้จัดทำ",
    },
    {
      title: "ฟอร์มตอบรับจากสถานประกอบการ",
      state:
        courtesy?.responseStatus === "accepted"
          ? "done"
          : courtesy?.responseStatus === "rejected"
            ? "issue"
            : courtesy?.responseStatus === "waiting"
              ? "current"
              : "waiting",
      text: courtesy
        ? companyResponseStatusLabel(courtesy.responseStatus)
        : "ยังไม่สามารถส่งฟอร์มตอบรับได้",
    },
    {
      title: "หนังสือส่งตัวนักศึกษา",
      state:
        referral?.status === "ready"
          ? "done"
          : courtesy?.responseStatus === "accepted"
            ? "current"
            : "waiting",
      text:
        courtesy?.responseStatus !== "accepted"
          ? "รอสถานประกอบการตอบรับก่อน"
          : referral
            ? documentStatusLabel(referral.status)
            : "ยังไม่ได้จัดทำ",
    },
    {
      title: "เอกสารสหกิจครบ",
      state:
        referral?.status === "ready"
          ? "done"
          : "waiting",
      text:
        referral?.status === "ready"
          ? "คำร้องและเอกสารหลักครบแล้ว"
          : "รอหนังสือส่งตัวจัดทำเสร็จ",
    },
  ];

  byId("studentDocumentModalBody").innerHTML = `
    <div class="of-student-summary">
      <div class="of-student-avatar"><i class="fa-solid fa-user-graduate"></i></div>
      <div>
        <h3>${escapeHtml(student.name)}</h3>
        <p>${escapeHtml(student.studentId)} • ${escapeHtml(student.major)} • ${escapeHtml(company?.nameEn || company?.nameTh || "-")}</p>
      </div>
    </div>

    <div class="of-document-timeline">
      ${timeline
        .map(
          (step, index) => `
            <div class="of-document-step ${step.state}">
              <div class="of-document-marker">
                <span>
                  ${
                    step.state === "done"
                      ? '<i class="fa-solid fa-check"></i>'
                      : step.state === "issue"
                        ? '<i class="fa-solid fa-xmark"></i>'
                        : index + 1
                  }
                </span>
              </div>
              <div class="of-document-content">
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;

  openOfficerModal("studentDocumentModal");
}

/* =========================================================
   REQUESTS
   ========================================================= */

function getFilteredRequests() {
  const keyword = normalize(byId("requestSearchInput").value);
  const year = byId("requestYearFilter").value;
  const status = byId("requestStatusFilter").value;

  return officerState.requests.filter((request) => {
    const student = findStudent(request.studentId);
    const company = findCompany(student?.companyId);

    const searchable = normalize(
      `${student?.name || ""} ${student?.studentId || ""} ${company?.nameTh || ""} ${company?.nameEn || ""}`,
    );

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!year || student?.year === year) &&
      (!status || request.status === status)
    );
  });
}

function renderRequestTable() {
  const requests = getFilteredRequests();

  byId("requestTableEmpty").classList.toggle(
    "show",
    requests.length === 0,
  );

  byId("requestTableBody").innerHTML = requests
    .map((request) => {
      const student = findStudent(request.studentId);
      const company = findCompany(student?.companyId);

      return `
        <tr>
          <td>
            <span class="of-table-primary">${escapeHtml(student?.name || "-")}</span>
            <span class="of-table-secondary">${escapeHtml(student?.studentId || "-")} • ${escapeHtml(student?.major || "-")}</span>
          </td>
          <td>
            <span class="of-table-primary">${escapeHtml(company?.nameEn || company?.nameTh || "-")}</span>
            <span class="of-table-secondary">${escapeHtml(request.position)}</span>
          </td>
          <td>${escapeHtml(formatThaiDate(request.submittedDate))}</td>
          <td>
            <span class="of-status ${statusClass(request.status)}">${escapeHtml(requestStatusLabel(request.status))}</span>
          </td>
          <td>
            <div class="of-table-actions">
              <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="openRequestDetail('${request.id}')">
                <i class="fa-solid fa-eye"></i>
                รายละเอียด
              </button>

              ${
                request.status !== "cancelled"
                  ? `
                    <button class="of-btn of-btn-danger of-btn-sm" type="button" onclick="openCancelRequest('${request.id}')">
                      <i class="fa-solid fa-ban"></i>
                      ยกเลิก
                    </button>
                  `
                  : ""
              }
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  setResponsiveTableLabels();
}

function openRequestDetail(requestId) {
  const request = findRequest(requestId);
  if (!request) return;

  const student = findStudent(request.studentId);
  const company = findCompany(student?.companyId);

  byId("requestDetailModalTitle").textContent =
    `คำร้อง ${request.id}`;

  byId("requestDetailModalBody").innerHTML = `
    <div class="of-student-summary">
      <div class="of-student-avatar"><i class="fa-solid fa-file-signature"></i></div>
      <div>
        <h3>${escapeHtml(student?.name || "-")}</h3>
        <p>${escapeHtml(student?.studentId || "-")} • ${escapeHtml(company?.nameEn || company?.nameTh || "-")}</p>
      </div>
    </div>

    <div class="of-form-grid">
      <div class="of-field">
        <label>วันที่ยื่น</label>
        <div class="of-readonly-box">${escapeHtml(formatThaiDate(request.submittedDate))}</div>
      </div>
      <div class="of-field">
        <label>ตำแหน่ง</label>
        <div class="of-readonly-box">${escapeHtml(request.position)}</div>
      </div>
      <div class="of-field">
        <label>อาจารย์ที่ปรึกษา</label>
        <div class="of-readonly-box">${escapeHtml(requestStatusLabel(request.advisorStatus))}</div>
      </div>
      <div class="of-field">
        <label>หัวหน้าภาควิชา</label>
        <div class="of-readonly-box">${escapeHtml(requestStatusLabel(request.headStatus))}</div>
      </div>
    </div>

    ${
      request.status === "cancelled"
        ? `
          <div class="of-info-banner danger">
            <i class="fa-solid fa-ban"></i>
            <span>
              ยกเลิกโดย ${escapeHtml(request.cancelledBy || "-")}
              • ${escapeHtml(formatThaiDateTime(request.cancelledAt))}
              • เหตุผล: ${escapeHtml(request.cancelReason || "-")}
            </span>
          </div>
        `
        : ""
    }
  `;

  openOfficerModal("requestDetailModal");
}

function openCancelRequest(requestId) {
  const request = findRequest(requestId);
  if (!request) return;

  const student = findStudent(request.studentId);
  const company = findCompany(student?.companyId);

  byId("cancelRequestId").value = request.id;
  byId("cancelRequestReason").value = "";
  byId("cancelRequestPreview").innerHTML = `
    <strong>${escapeHtml(student?.name || "-")}</strong>
    <span>${escapeHtml(student?.studentId || "-")} • ${escapeHtml(company?.nameEn || company?.nameTh || "-")} • ${escapeHtml(request.position)}</span>
  `;

  openOfficerModal("cancelRequestModal");
}

function submitCancelRequest(event) {
  event.preventDefault();

  const request = findRequest(byId("cancelRequestId").value);
  const reason = byId("cancelRequestReason").value.trim();

  if (!request) return;

  if (!reason) {
    showOfficerToast({
      type: "warning",
      title: "กรุณาระบุเหตุผล",
      message: "ระบบต้องเก็บเหตุผลการยกเลิกไว้ตรวจสอบย้อนหลัง",
    });
    return;
  }

  request.status = "cancelled";
  request.cancelReason = reason;
  request.cancelledBy = officerState.officer.name;
  request.cancelledAt = new Date().toISOString();

  const student = findStudent(request.studentId);
  if (student) {
    const courtesy = getStudentCourtesy(student);
    const referral = getStudentReferral(student);

    if (courtesy && courtesy.status !== "sent") {
      courtesy.status = "cancelled";
    }

    if (referral && referral.status !== "sent") {
      referral.status = "cancelled";
    }
  }

  saveOfficerState();
  closeOfficerModal("cancelRequestModal");
  renderAll();

  showOfficerToast({
    type: "success",
    title: "ยกเลิกคำร้องแล้ว",
    message: request.id,
  });
}

/* =========================================================
   MANAGED DOCUMENTS
   ========================================================= */

function getDocumentCollection(type) {
  return type === "courtesy"
    ? officerState.courtesyDocuments
    : officerState.referralDocuments;
}

function getFilteredManagedDocuments(type) {
  const collection = getDocumentCollection(type);
  const prefix = type === "courtesy" ? "courtesy" : "referral";

  const keyword = normalize(byId(`${prefix}SearchInput`).value);
  const year = byId(`${prefix}YearFilter`).value;
  const status = byId(`${prefix}StatusFilter`).value;

  return collection.filter((document) => {
    const student = findStudent(document.studentId);
    const company = findCompany(student?.companyId);

    const searchable = normalize(
      `${student?.name || ""} ${student?.studentId || ""} ${company?.nameTh || ""} ${company?.nameEn || ""}`,
    );

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!year || student?.year === year) &&
      (!status || document.status === status)
    );
  });
}

function renderCourtesyTable() {
  renderManagedDocumentTable("courtesy");
}

function renderReferralTable() {
  renderManagedDocumentTable("referral");
}

function renderManagedDocumentTable(type) {
  if (type === "referral") {
    renderReferralEligibilityTable();
    return;
  }

  const keyword = normalize(byId("courtesySearchInput").value);
  const year = byId("courtesyYearFilter").value;
  const status = byId("courtesyStatusFilter").value;

  const rows = officerState.students.filter((student) => {
    const request = getStudentRequest(student);
    const document = getStudentCourtesy(student);
    const company = findCompany(student.companyId);

    if (request?.status !== "approved") return false;

    const searchable = normalize(
      `${student.name} ${student.studentId} ${company?.nameTh || ""} ${company?.nameEn || ""}`,
    );

    const currentStatus = document?.status || "not_created";

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!year || student.year === year) &&
      (!status || currentStatus === status)
    );
  });

  const tbody = byId("courtesyTableBody");
  const empty = byId("courtesyTableEmpty");

  empty.classList.toggle("show", rows.length === 0);

  tbody.innerHTML = rows
    .map((student) => {
      const company = findCompany(student.companyId);
      const document = getStudentCourtesy(student);

      return `
        <tr>
          <td>
            <span class="of-table-primary">${escapeHtml(student.name)}</span>
            <span class="of-table-secondary">${escapeHtml(student.studentId)}</span>
          </td>

          <td>${escapeHtml(company?.nameEn || company?.nameTh || "-")}</td>

          <td>
            ${
              document
                ? `<span class="of-status ${statusClass(document.status)}">${escapeHtml(documentStatusLabel(document.status))}</span>`
                : '<span class="of-status of-status-warning">ยังไม่ได้จัดทำ</span>'
            }
          </td>

          <td>
            ${
              document
                ? `
                  <span class="of-status ${companyResponseStatusClass(document.responseStatus)}">
                    ${escapeHtml(companyResponseStatusLabel(document.responseStatus))}
                  </span>

                  <div class="of-response-channel-state">
                    <span class="of-response-channel-chip ${document.responseOnlineSentAt ? "done" : ""}">
                      <i class="fa-solid fa-paper-plane"></i>
                      ออนไลน์ ${document.responseOnlineSentAt ? "แล้ว" : "ยัง"}
                    </span>

                    <span class="of-response-channel-chip ${document.responsePrintedAt ? "done" : ""}">
                      <i class="fa-solid fa-print"></i>
                      พิมพ์ ${document.responsePrintedAt ? "แล้ว" : "ยัง"}
                    </span>
                  </div>
                `
                : '<span class="of-status of-status-muted">ยังไม่ส่งฟอร์ม</span>'
            }
          </td>

          <td>
            ${
              document
                ? managedDocumentActions("courtesy", document)
                : `
                  <button class="of-btn of-btn-primary of-btn-sm" type="button" onclick="openDocumentEditor('courtesy','', '${student.id}')">
                    <i class="fa-solid fa-file-circle-plus"></i>
                    จัดทำหนังสือขอความอนุเคราะห์
                  </button>
                `
            }
          </td>
        </tr>
      `;
    })
    .join("");

  setResponsiveTableLabels();
}

function renderReferralEligibilityTable() {
  const keyword = normalize(byId("referralSearchInput").value);
  const year = byId("referralYearFilter").value;
  const status = byId("referralStatusFilter").value;

  const rows = officerState.students
    .filter((student) => {
      const courtesy = getStudentCourtesy(student);
      const referral = getStudentReferral(student);
      const company = findCompany(student.companyId);
      const searchable = normalize(
        `${student.name} ${student.studentId} ${company?.nameTh || ""} ${company?.nameEn || ""}`,
      );

      if (courtesy?.responseStatus !== "accepted") return false;

      return (
        (!keyword || searchable.includes(keyword)) &&
        (!year || student.year === year) &&
        (!status || (referral?.status || "draft") === status)
      );
    });

  byId("referralTableEmpty").classList.toggle("show", rows.length === 0);

  byId("referralTableBody").innerHTML = rows
    .map((student) => {
      const company = findCompany(student.companyId);
      const referral = getStudentReferral(student);

      return `
        <tr>
          <td>
            <span class="of-table-primary">${escapeHtml(student.name)}</span>
            <span class="of-table-secondary">${escapeHtml(student.studentId)}</span>
          </td>
          <td>${escapeHtml(company?.nameEn || company?.nameTh || "-")}</td>
          <td>${escapeHtml(formatThaiDate(student.startDate))}</td>
          <td>
            <span class="of-status ${referral?.status === "ready" ? "of-status-success" : "of-status-warning"}">
              ${referral?.status === "ready" ? "จัดทำแล้ว" : "ยังไม่ได้จัดทำ"}
            </span>
          </td>
          <td>
            <div class="of-table-actions">
              ${
                referral
                  ? `
                    <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="openDocumentEditor('referral','${referral.id}')">
                      <i class="fa-solid fa-pen"></i>
                      แก้ไข
                    </button>
                    <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="printManagedDocument('referral','${referral.id}')">
                      <i class="fa-solid fa-print"></i>
                      พิมพ์
                    </button>
                    ${
                      referral.status !== "ready"
                        ? `
                          <button class="of-btn of-btn-primary of-btn-sm" type="button" onclick="markReferralReady('${referral.id}')">
                            <i class="fa-solid fa-circle-check"></i>
                            อัปเดตว่าจัดทำแล้ว
                          </button>
                        `
                        : ""
                    }
                  `
                  : `
                    <button class="of-btn of-btn-primary of-btn-sm" type="button" onclick="openDocumentEditor('referral','', '${student.id}')">
                      <i class="fa-solid fa-file-circle-plus"></i>
                      จัดทำหนังสือส่งตัว
                    </button>
                  `
              }
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  setResponsiveTableLabels();
}

function managedDocumentActions(type, document) {
  if (type !== "courtesy") return "";

  const canUseResponseForm = document.status === "ready";
  const responseStarted =
    Boolean(document.responseOnlineSentAt) ||
    Boolean(document.responsePrintedAt) ||
    document.responseStatus !== "not_sent";

  return `
    <div class="of-table-actions">
      <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="openDocumentEditor('courtesy','${document.id}')">
        <i class="fa-solid fa-pen"></i>
        แก้ไข
      </button>

      <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="printManagedDocument('courtesy','${document.id}')">
        <i class="fa-solid fa-print"></i>
        พิมพ์หนังสือ
      </button>

      ${
        canUseResponseForm
          ? `
            <button class="of-btn of-btn-outline of-btn-sm of-send-response-btn" type="button"
              onclick="sendCompanyResponseForm('${document.id}')" ${document.responseOnlineSentAt ? "disabled" : ""}>
              <i class="fa-solid fa-paper-plane"></i>
              ${document.responseOnlineSentAt ? "ส่งออนไลน์แล้ว" : "ส่งฟอร์มออนไลน์"}
            </button>

            ${
              document.responsePrintedAt
                ? ""
                : `
                  <button class="of-btn of-btn-outline of-btn-sm" type="button"
                    onclick="printCompanyResponseForm('${document.id}')">
                    <i class="fa-solid fa-print"></i>
                    พิมพ์ฟอร์มตอบรับ
                  </button>
                `
            }

            <button class="of-btn of-btn-outline of-btn-sm" type="button"
              onclick="openCompanyResponseStatus('${document.id}')" ${responseStarted ? "" : "disabled"}>
              <i class="fa-solid fa-pen-to-square"></i>
              อัปเดตสถานะตอบรับ
            </button>
          `
          : ""
      }

      ${
        document.status !== "cancelled"
          ? `
            <button class="of-btn of-btn-danger of-btn-sm" type="button" onclick="cancelManagedDocument('courtesy','${document.id}')">
              <i class="fa-solid fa-ban"></i>
            </button>
          `
          : ""
      }
    </div>
  `;
}

function populateDocumentStudentSelect(type, selectedStudentId = "") {
  const eligible = officerState.students.filter((student) => {
    const request = getStudentRequest(student);
    const courtesy = getStudentCourtesy(student);
    const existingId =
      type === "courtesy" ? student.courtesyId : student.referralId;

    if (request?.status !== "approved") return false;

    if (type === "referral" && courtesy?.responseStatus !== "accepted") {
      return false;
    }

    return !existingId || student.id === selectedStudentId;
  });

  byId("documentStudentSelect").innerHTML =
    '<option value="">-- เลือกนักศึกษา --</option>' +
    eligible
      .map(
        (student) => `
          <option value="${student.id}" ${student.id === selectedStudentId ? "selected" : ""}>
            ${escapeHtml(student.name)} (${escapeHtml(student.studentId)})
          </option>
        `,
      )
      .join("");
}

function openDocumentEditor(type, documentId = "", forcedStudentId = "") {
  const collection = getDocumentCollection(type);
  const document = collection.find((item) => item.id === documentId) || null;

  if (type === "referral" && !document && forcedStudentId) {
    const student = findStudent(forcedStudentId);
    const courtesy = getStudentCourtesy(student);

    if (courtesy?.responseStatus !== "accepted") {
      showOfficerToast({
        type: "warning",
        title: "ยังจัดทำหนังสือส่งตัวไม่ได้",
        message: "ต้องรอสถานประกอบการตอบรับก่อน",
      });
      return;
    }
  }

  byId("documentEditorForm").reset();
  byId("documentEditorId").value = document?.id || "";
  byId("documentEditorType").value = type;
  byId("documentEditorTitle").textContent =
    type === "courtesy"
      ? document
        ? "แก้ไขหนังสือขอความอนุเคราะห์"
        : "จัดทำหนังสือขอความอนุเคราะห์"
      : document
        ? "แก้ไขหนังสือส่งตัว"
        : "จัดทำหนังสือส่งตัว";

  const selectedStudentId = document?.studentId || forcedStudentId || "";
  populateDocumentStudentSelect(type, selectedStudentId);

  byId("documentStudentSelect").value = selectedStudentId;
  byId("documentDate").value =
    document?.date || new Date().toISOString().slice(0, 10);
  byId("documentSubject").value =
    document?.subject ||
    (type === "courtesy"
      ? "ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา"
      : "ส่งตัวนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา");
  byId("documentAttention").value =
    document?.attention || "ผู้จัดการฝ่ายทรัพยากรบุคคล";
  byId("documentNote").value = document?.note || "";

  byId("documentSubmitButtonText").textContent =
    type === "courtesy"
      ? "บันทึกเป็นจัดทำแล้ว"
      : "บันทึกข้อมูลหนังสือส่งตัว";

  openOfficerModal("documentEditorModal");
}

function collectDocumentEditorData(status) {
  const type = byId("documentEditorType").value;
  const id = byId("documentEditorId").value;

  return {
    type,
    id,
    studentId: byId("documentStudentSelect").value,
    date: byId("documentDate").value,
    subject: byId("documentSubject").value.trim(),
    attention: byId("documentAttention").value.trim(),
    note: byId("documentNote").value.trim(),
    status,
  };
}

function saveManagedDocument(status = "ready") {
  const data = collectDocumentEditorData(status);

  if (
    !data.studentId ||
    !data.date ||
    !data.subject ||
    !data.attention
  ) {
    showOfficerToast({
      type: "warning",
      title: "กรอกข้อมูลไม่ครบ",
      message: "เลือกนักศึกษา วันที่ เรื่อง และผู้รับให้ครบ",
    });
    return;
  }

  if (data.type === "referral") {
    const student = findStudent(data.studentId);
    const courtesy = getStudentCourtesy(student);

    if (courtesy?.responseStatus !== "accepted") {
      showOfficerToast({
        type: "warning",
        title: "ยังจัดทำหนังสือส่งตัวไม่ได้",
        message: "สถานประกอบการต้องตอบรับก่อน",
      });
      return;
    }
  }

  const collection = getDocumentCollection(data.type);
  let document = collection.find((item) => item.id === data.id);

  if (!document) {
    document = {
      id: nextId(data.type === "courtesy" ? "CO" : "RF", collection),
      studentId: data.studentId,
      date: "",
      subject: "",
      attention: "",
      note: "",
      status: "draft",
      operator: officerState.officer.name,
      responseStatus: data.type === "courtesy" ? "not_sent" : undefined,
      responseOnlineSentAt: "",
      responsePrintedAt: "",
      responseUpdatedAt: "",
      responseNote: "",
    };

    collection.push(document);
  }

  Object.assign(document, {
    studentId: data.studentId,
    date: data.date,
    subject: data.subject,
    attention: data.attention,
    note: data.note,
    status: data.status,
    operator: officerState.officer.name,
  });

  const student = findStudent(data.studentId);
  if (student) {
    if (data.type === "courtesy") {
      student.courtesyId = document.id;
    } else {
      student.referralId = document.id;
    }
  }

  saveOfficerState();
  closeOfficerModal("documentEditorModal");
  renderAll();

  showOfficerToast({
    type: "success",
    title:
      data.type === "courtesy" && data.status === "ready"
        ? "จัดทำหนังสือขอความอนุเคราะห์แล้ว"
        : data.status === "draft"
          ? "บันทึกข้อมูลแล้ว"
          : "บันทึกเอกสารแล้ว",
    message: findStudent(data.studentId)?.name || document.id,
  });
}

function submitDocumentEditor(event) {
  event.preventDefault();

  const type = byId("documentEditorType").value;

  if (type === "courtesy") {
    saveManagedDocument("ready");
  } else {
    saveManagedDocument("draft");
  }
}

async function markReferralReady(documentId) {
  const document = findReferral(documentId);
  if (!document) return;

  const student = findStudent(document.studentId);

  const ok = await showOfficerConfirm({
    title: "อัปเดตหนังสือส่งตัว",
    message: `${student?.name || "-"}
ยืนยันว่าจัดทำหนังสือส่งตัวเรียบร้อยแล้วหรือไม่?`,
    confirmText: "จัดทำแล้ว",
  });

  if (!ok) return;

  document.status = "ready";
  document.operator = officerState.officer.name;

  saveOfficerState();
  renderAll();

  showOfficerToast({
    type: "success",
    title: "อัปเดตเป็นจัดทำแล้ว",
    message: student?.name || document.id,
  });
}

async function cancelManagedDocument(type, documentId) {
  const document = getDocumentCollection(type).find(
    (item) => item.id === documentId,
  );
  if (!document) return;

  const ok = await showOfficerConfirm({
    title: "ยกเลิกเอกสาร",
    message: `ต้องการยกเลิกหนังสือขอความอนุเคราะห์ของ ${findStudent(document.studentId)?.name || document.id} หรือไม่?`,
    confirmText: "ยกเลิกเอกสาร",
    tone: "danger",
  });

  if (!ok) return;

  document.status = "cancelled";
  saveOfficerState();
  renderAll();

  showOfficerToast({
    type: "success",
    title: "ยกเลิกเอกสารแล้ว",
  });
}

function printManagedDocument(type, documentId) {
  const document = getDocumentCollection(type).find(
    (item) => item.id === documentId,
  );
  if (!document) return;

  const student = findStudent(document.studentId);
  const company = findCompany(student?.companyId);
  const request = getStudentRequest(student);

  const printWindow = window.open("", "_blank", "width=1000,height=800");

  if (!printWindow) {
    showOfficerToast({
      type: "error",
      title: "ไม่สามารถเปิดหน้าพิมพ์ได้",
      message: "กรุณาอนุญาต Popup สำหรับเว็บไซต์นี้",
    });
    return;
  }

  const typeTitle =
    type === "courtesy"
      ? "หนังสือขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา"
      : "หนังสือส่งตัวนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา";

  printWindow.document.write(`
    <!doctype html>
    <html lang="th">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(typeTitle)}</title>
        <style>
          body{font-family:Arial,"Noto Sans Thai",sans-serif;padding:40px;color:#111827;line-height:1.75}
          h1{text-align:center;font-size:20px;margin-bottom:30px}
          .doc-no{text-align:right;margin-bottom:20px}
          .label{font-weight:bold}
          .box{margin:20px 0;padding:18px;border:1px solid #cbd5e1}
          @media print{body{padding:0}}
        </style>
      </head>
      <body>
        <h1>${escapeHtml(typeTitle)}</h1>
        <div class="doc-no">
          วันที่ ${escapeHtml(formatThaiDate(document.date))}
        </div>

        <p><span class="label">เรื่อง:</span> ${escapeHtml(document.subject)}</p>
        <p><span class="label">เรียน:</span> ${escapeHtml(document.attention)}</p>

        <div class="box">
          <span class="label">นักศึกษา:</span> ${escapeHtml(student?.name || "-")}<br>
          <span class="label">รหัสนักศึกษา:</span> ${escapeHtml(student?.studentId || "-")}<br>
          <span class="label">สาขา:</span> ${escapeHtml(student?.major || "-")}<br>
          <span class="label">สถานประกอบการ:</span> ${escapeHtml(company?.nameTh || company?.nameEn || "-")}<br>
          <span class="label">ตำแหน่ง:</span> ${escapeHtml(request?.position || company?.openPosition || "-")}<br>
          <span class="label">วันเริ่มสหกิจ:</span> ${escapeHtml(formatThaiDate(student?.startDate))}
        </div>

        <p><span class="label">หมายเหตุ:</span> ${escapeHtml(document.note || "-")}</p>

        <script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script>
      </body>
    </html>
  `);

  printWindow.document.close();
}

/* =========================================================
   COMPANY RESPONSE FORM / RESPONSE STATUS
   ========================================================= */

async function sendCompanyResponseForm(documentId) {
  const document = findCourtesy(documentId);
  if (!document) return;

  if (document.status !== "ready") {
    showOfficerToast({
      type: "warning",
      title: "ต้องจัดทำหนังสือก่อน",
      message: "กรุณาจัดทำหนังสือขอความอนุเคราะห์ให้เรียบร้อยก่อน",
    });
    return;
  }

  const student = findStudent(document.studentId);
  const company = findCompany(student?.companyId);

  const ok = await showOfficerConfirm({
    title: "ส่งฟอร์มตอบรับออนไลน์",
    message: `${company?.nameEn || company?.nameTh || "-"}
${student?.name || "-"}

การส่งออนไลน์ไม่ปิดสิทธิ์การพิมพ์ฟอร์ม นักศึกษาหรือเจ้าหน้าที่ยังสามารถพิมพ์ส่งเองได้`,
    confirmText: "ส่งออนไลน์",
  });

  if (!ok) return;

  document.responseOnlineSentAt = new Date().toISOString();

  if (!["accepted", "rejected"].includes(document.responseStatus)) {
    document.responseStatus = "waiting";
  }

  saveOfficerState();
  renderAll();

  showOfficerToast({
    type: "success",
    title: "ส่งฟอร์มตอบรับออนไลน์แล้ว",
    message: "ยังสามารถพิมพ์ฟอร์มตอบรับส่งเองเพิ่มเติมได้",
  });
}

function printCompanyResponseForm(documentId) {
  const document = findCourtesy(documentId);
  if (!document) return;

  if (document.status !== "ready") {
    showOfficerToast({
      type: "warning",
      title: "ต้องจัดทำหนังสือก่อน",
      message: "กรุณาจัดทำหนังสือขอความอนุเคราะห์ให้เรียบร้อยก่อน",
    });
    return;
  }

  const student = findStudent(document.studentId);
  const company = findCompany(student?.companyId);
  const request = getStudentRequest(student);

  const printWindow = window.open("", "_blank", "width=900,height=800");

  if (!printWindow) {
    showOfficerToast({
      type: "error",
      title: "ไม่สามารถเปิดหน้าพิมพ์ได้",
      message: "กรุณาอนุญาต Popup สำหรับเว็บไซต์นี้",
    });
    return;
  }

  document.responsePrintedAt = new Date().toISOString();

  if (!["accepted", "rejected"].includes(document.responseStatus)) {
    document.responseStatus = "waiting";
  }

  saveOfficerState();
  renderAll();

  printWindow.document.write(`
    <!doctype html>
    <html lang="th">
      <head>
        <meta charset="utf-8">
        <title>แบบฟอร์มตอบรับนักศึกษาสหกิจศึกษา</title>
        <style>
          body{font-family:Arial,sans-serif;padding:38px;color:#111827;line-height:1.75}
          h1{text-align:center;font-size:21px}
          .box{margin:18px 0;padding:16px;border:1px solid #94a3b8}
          .line{margin-top:26px;border-bottom:1px dotted #64748b;height:26px}
          @media print{body{padding:0}}
        </style>
      </head>
      <body>
        <h1>แบบฟอร์มตอบรับนักศึกษาสหกิจศึกษา</h1>
        <div class="box">
          <b>นักศึกษา:</b> ${escapeHtml(student?.name || "-")}<br>
          <b>รหัสนักศึกษา:</b> ${escapeHtml(student?.studentId || "-")}<br>
          <b>สถานประกอบการ:</b> ${escapeHtml(company?.nameTh || company?.nameEn || "-")}<br>
          <b>ตำแหน่ง:</b> ${escapeHtml(request?.position || company?.openPosition || "-")}
        </div>
        <p>ผลการตอบรับ</p>
        <p>□ ตอบรับนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา</p>
        <p>□ ไม่ตอบรับนักศึกษาเข้าปฏิบัติงานสหกิจศึกษา</p>
        <p>หมายเหตุ</p>
        <div class="line"></div>
        <div class="line"></div>
        <p style="margin-top:30px">ลงชื่อผู้แทนสถานประกอบการ ______________________________</p>
        <p>วันที่ ______________________________</p>
        <script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script>
      </body>
    </html>
  `);

  printWindow.document.close();

  showOfficerToast({
    type: "success",
    title: "เปิดแบบฟอร์มตอบรับสำหรับพิมพ์แล้ว",
    message: "สถานะตอบรับเปลี่ยนเป็น รอตอบรับ",
  });
}

function openCompanyResponseStatus(documentId) {
  const document = findCourtesy(documentId);
  if (!document) return;

  const student = findStudent(document.studentId);
  const company = findCompany(student?.companyId);

  byId("companyResponseDocumentId").value = document.id;
  byId("companyResponseStatus").value =
    document.responseStatus === "not_sent" ? "waiting" : document.responseStatus;
  byId("companyResponseNote").value = document.responseNote || "";

  byId("companyResponseSummary").innerHTML = `
    <strong>${escapeHtml(student?.name || "-")}</strong>
    <span>
      ${escapeHtml(student?.studentId || "-")}
      • ${escapeHtml(company?.nameEn || company?.nameTh || "-")}
    </span>
    <div class="of-response-channel-state">
      <span class="of-response-channel-chip ${document.responseOnlineSentAt ? "done" : ""}">
        <i class="fa-solid fa-paper-plane"></i>
        ${document.responseOnlineSentAt ? "ส่งออนไลน์แล้ว" : "ยังไม่ได้ส่งออนไลน์"}
      </span>
      <span class="of-response-channel-chip ${document.responsePrintedAt ? "done" : ""}">
        <i class="fa-solid fa-print"></i>
        ${document.responsePrintedAt ? "พิมพ์ฟอร์มแล้ว" : "ยังไม่ได้พิมพ์ฟอร์ม"}
      </span>
    </div>
  `;

  openOfficerModal("companyResponseModal");
}

function submitCompanyResponseStatus(event) {
  event.preventDefault();

  const document = findCourtesy(byId("companyResponseDocumentId").value);
  if (!document) return;

  if (!document.responseOnlineSentAt && !document.responsePrintedAt) {
    showOfficerToast({
      type: "warning",
      title: "ยังไม่ได้ส่งฟอร์มตอบรับ",
      message: "กรุณาส่งออนไลน์หรือพิมพ์ฟอร์มตอบรับก่อนอัปเดตผล",
    });
    return;
  }

  document.responseStatus = byId("companyResponseStatus").value;
  document.responseNote = byId("companyResponseNote").value.trim();
  document.responseUpdatedAt = new Date().toISOString();

  saveOfficerState();
  closeOfficerModal("companyResponseModal");
  renderAll();

  showOfficerToast({
    type: "success",
    title: "อัปเดตสถานะตอบรับแล้ว",
    message: companyResponseStatusLabel(document.responseStatus),
  });
}

/* =========================================================
   COMPANIES
   ========================================================= */

function getFilteredCompanies() {
  const keyword = normalize(byId("companySearchInput").value);
  const type = byId("companyTypeFilter").value;
  const activeFilter = byId("companyActiveFilter").value;

  return officerState.companies.filter((company) => {
    const searchable = normalize(
      `${company.nameTh} ${company.nameEn} ${company.province} ${company.openPosition}`,
    );

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!type || company.type === type) &&
      (!activeFilter ||
        (activeFilter === "active" ? company.active : !company.active))
    );
  });
}

function renderCompanyTable() {
  const companies = getFilteredCompanies();

  byId("companyTableEmpty").classList.toggle(
    "show",
    companies.length === 0,
  );

  byId("companyTableBody").innerHTML = companies
    .map(
      (company) => `
        <tr>
          <td>
            <span class="of-table-primary">${escapeHtml(company.nameEn || company.nameTh)}</span>
            <span class="of-table-secondary">${escapeHtml(company.nameTh)} • ${escapeHtml(company.type)}</span>
          </td>
          <td>${escapeHtml(company.province)}</td>
          <td>
            <span class="of-table-primary">${escapeHtml(company.contactName)}</span>
            <span class="of-table-secondary">${escapeHtml(company.contactEmail)}</span>
          </td>
          <td>
            <span class="of-table-primary">${company.capacity} คน</span>
            <span class="of-table-secondary">${escapeHtml(company.openPosition)}</span>
          </td>
          <td>
            <div class="of-table-actions">
              <span class="of-status ${company.active ? "of-status-success" : "of-status-muted"}">
                ${company.active ? "ใช้งาน" : "ไม่ใช้งาน"}
              </span>
              <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="openCompanyEditor('${company.id}')">
                <i class="fa-solid fa-pen"></i>
                แก้ไข
              </button>
              <button class="of-btn ${company.active ? "of-btn-danger" : "of-btn-primary"} of-btn-sm" type="button" onclick="toggleCompanyStatus('${company.id}')">
                ${company.active ? "ปิดใช้งาน" : "เปิดใช้งาน"}
              </button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  setResponsiveTableLabels();
}

function openCompanyEditor(companyId = "") {
  const company = officerState.companies.find(
    (item) => item.id === companyId,
  );

  byId("companyEditorForm").reset();
  byId("companyEditorId").value = company?.id || "";
  byId("companyEditorTitle").textContent = company
    ? "แก้ไขสถานประกอบการ"
    : "เพิ่มสถานประกอบการ";

  byId("companyNameTh").value = company?.nameTh || "";
  byId("companyNameEn").value = company?.nameEn || "";
  byId("companyType").value = company?.type || "Software";
  byId("companyProvince").value = company?.province || "";
  byId("companyAddress").value = company?.address || "";
  byId("companyContactName").value = company?.contactName || "";
  byId("companyContactPosition").value = company?.contactPosition || "";
  byId("companyContactEmail").value = company?.contactEmail || "";
  byId("companyContactPhone").value = company?.contactPhone || "";
  byId("companyOpenPosition").value = company?.openPosition || "";
  byId("companyCapacity").value = company?.capacity ?? 0;
  byId("companySkills").value = company?.skills?.join(", ") || "";

  openOfficerModal("companyEditorModal");
}

function submitCompanyEditor(event) {
  event.preventDefault();

  const id = byId("companyEditorId").value;
  let company = officerState.companies.find((item) => item.id === id);

  const data = {
    nameTh: byId("companyNameTh").value.trim(),
    nameEn: byId("companyNameEn").value.trim(),
    type: byId("companyType").value,
    province: byId("companyProvince").value.trim(),
    address: byId("companyAddress").value.trim(),
    contactName: byId("companyContactName").value.trim(),
    contactPosition: byId("companyContactPosition").value.trim(),
    contactEmail: byId("companyContactEmail").value.trim(),
    contactPhone: byId("companyContactPhone").value.trim(),
    openPosition: byId("companyOpenPosition").value.trim(),
    capacity: Number(byId("companyCapacity").value),
    skills: byId("companySkills")
      .value.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  if (
    !data.nameTh ||
    !data.province ||
    !data.address ||
    !data.contactName ||
    !data.contactEmail ||
    !data.openPosition
  ) {
    showOfficerToast({
      type: "warning",
      title: "กรอกข้อมูลไม่ครบ",
      message: "กรุณากรอกข้อมูลหลักของสถานประกอบการให้ครบ",
    });
    return;
  }

  if (!company) {
    company = {
      id: nextId("CP", officerState.companies),
      active: true,
    };
    officerState.companies.push(company);
  }

  Object.assign(company, data);

  saveOfficerState();
  closeOfficerModal("companyEditorModal");
  renderAll();

  showOfficerToast({
    type: "success",
    title: "บันทึกสถานประกอบการแล้ว",
    message: company.nameEn || company.nameTh,
  });
}

async function toggleCompanyStatus(companyId) {
  const company = officerState.companies.find(
    (item) => item.id === companyId,
  );
  if (!company) return;

  const nextActive = !company.active;

  const ok = await showOfficerConfirm({
    title: nextActive ? "เปิดใช้งานสถานประกอบการ" : "ปิดใช้งานสถานประกอบการ",
    message: `${company.nameEn || company.nameTh}\n${nextActive ? "เปิดให้ใช้งานในระบบอีกครั้ง" : "ข้อมูลย้อนหลังยังคงอยู่ แต่จะไม่แสดงเป็นสถานประกอบการที่ใช้งาน"}`,
    confirmText: nextActive ? "เปิดใช้งาน" : "ปิดใช้งาน",
    tone: nextActive ? "primary" : "danger",
  });

  if (!ok) return;

  company.active = nextActive;
  saveOfficerState();
  renderAll();

  showOfficerToast({
    type: "success",
    title: nextActive ? "เปิดใช้งานแล้ว" : "ปิดใช้งานแล้ว",
  });
}

/* =========================================================
   CALENDAR
   ========================================================= */

function formatEventDateRange(event) {
  if (!event.startDate) return "-";

  if (!event.endDate || event.endDate === event.startDate) {
    return formatThaiDate(event.startDate);
  }

  return `${formatThaiDate(event.startDate)} - ${formatThaiDate(event.endDate)}`;
}

function getCalendarFixedTypes() {
  return [
    "search",
    "contact",
    "request",
    "start",
    "supervision1",
    "supervision2",
    "evaluation",
    "report",
    "poster",
    "exam",
  ];
}

function getCalendarEventForSlot(type, year, term) {
  return officerState.calendarEvents.find(
    (event) =>
      event.type === type &&
      event.year === year &&
      event.term === term,
  );
}

function renderCalendar() {
  const year = byId("calendarYearSelect").value;
  const term = byId("calendarTermSelect").value;

  const rows = getCalendarFixedTypes().map((type) => {
    const meta = CALENDAR_TYPE_META[type] || CALENDAR_TYPE_META.other;
    const event = getCalendarEventForSlot(type, year, term);

    return `
      <div class="of-calendar-bulk-row" data-calendar-slot="${type}">
        <div class="event-icon">
          <i class="fa-solid ${meta.icon}"></i>
        </div>

        <div class="event-title">
          <strong>${escapeHtml(meta.label)}</strong>
          <span>${escapeHtml(event?.description || "กำหนดช่วงวันที่ของกิจกรรมนี้")}</span>
        </div>

        <input
          type="date"
          data-calendar-start="${type}"
          value="${escapeHtml(event?.startDate || "")}"
          aria-label="วันเริ่ม ${escapeHtml(meta.label)}"
        />

        <input
          type="date"
          data-calendar-end="${type}"
          value="${escapeHtml(event?.endDate || "")}"
          aria-label="วันสิ้นสุด ${escapeHtml(meta.label)}"
        />
      </div>
    `;
  });

  byId("calendarBulkEditor").innerHTML = rows.join("");

  document.querySelectorAll("[data-calendar-start],[data-calendar-end]")
    .forEach((input) => {
      input.addEventListener("change", renderCalendarPreview);
    });

  renderCalendarPreview();
}

function collectCalendarBulkSchedule() {
  const year = byId("calendarYearSelect").value;
  const term = byId("calendarTermSelect").value;

  return getCalendarFixedTypes().map((type) => {
    const meta = CALENDAR_TYPE_META[type] || CALENDAR_TYPE_META.other;

    return {
      type,
      year,
      term,
      name: meta.label,
      startDate:
        document.querySelector(`[data-calendar-start="${type}"]`)?.value || "",
      endDate:
        document.querySelector(`[data-calendar-end="${type}"]`)?.value || "",
    };
  });
}

function renderCalendarPreview() {
  const rows = collectCalendarBulkSchedule()
    .filter((event) => event.startDate || event.endDate)
    .sort((a, b) =>
      String(a.startDate || "9999").localeCompare(
        String(b.startDate || "9999"),
      ),
    );

  byId("calendarTimeline").innerHTML = rows.length
    ? rows
        .map((event) => {
          const meta =
            CALENDAR_TYPE_META[event.type] || CALENDAR_TYPE_META.other;

          return `
            <div class="of-calendar-item">
              <div class="of-calendar-date">
                ${escapeHtml(
                  event.startDate && event.endDate
                    ? formatEventDateRange(event)
                    : event.startDate
                      ? `เริ่ม ${formatThaiDate(event.startDate)}`
                      : `สิ้นสุด ${formatThaiDate(event.endDate)}`,
                )}
              </div>

              <div class="of-calendar-icon">
                <i class="fa-solid ${meta.icon}"></i>
              </div>

              <div>
                <h3>${escapeHtml(meta.label)}</h3>
                <p>กำหนดช่วงเวลากิจกรรมสหกิจศึกษา</p>
              </div>
            </div>
          `;
        })
        .join("")
    : `
      <div class="of-empty show">
        <i class="fa-solid fa-calendar-days"></i>
        <strong>ยังไม่ได้กำหนดช่วงกิจกรรม</strong>
        <span>กรอกวันที่ด้านบนเพื่อดู Timeline</span>
      </div>
    `;
}

function saveCalendarSchedule() {
  const schedule = collectCalendarBulkSchedule();

  for (const item of schedule) {
    if (!item.startDate && !item.endDate) {
      continue;
    }

    if (!item.startDate || !item.endDate) {
      showOfficerToast({
        type: "warning",
        title: "กำหนดช่วงวันที่ไม่ครบ",
        message: CALENDAR_TYPE_META[item.type]?.label || item.type,
      });
      return;
    }

    if (item.endDate < item.startDate) {
      showOfficerToast({
        type: "warning",
        title: "ช่วงวันที่ไม่ถูกต้อง",
        message: CALENDAR_TYPE_META[item.type]?.label || item.type,
      });
      return;
    }
  }

  const year = byId("calendarYearSelect").value;
  const term = byId("calendarTermSelect").value;

  getCalendarFixedTypes().forEach((type) => {
    const item = schedule.find((row) => row.type === type);
    let event = getCalendarEventForSlot(type, year, term);

    if (!item?.startDate && !item?.endDate) {
      if (event) {
        officerState.calendarEvents = officerState.calendarEvents.filter(
          (row) => row.id !== event.id,
        );
      }
      return;
    }

    if (!event) {
      event = {
        id: nextId("EV", officerState.calendarEvents),
        type,
        year,
        term,
      };
      officerState.calendarEvents.push(event);
    }

    Object.assign(event, {
      name: CALENDAR_TYPE_META[type]?.label || type,
      startDate: item.startDate,
      endDate: item.endDate,
      description:
        event.description ||
        `กำหนดการ ${CALENDAR_TYPE_META[type]?.label || type}`,
    });
  });

  saveOfficerState();
  renderCalendar();
  updateOverview();

  showOfficerToast({
    type: "success",
    title: "บันทึกปฏิทินทั้งภาคเรียนแล้ว",
    message: `ปีการศึกษา ${year} • ภาค ${term}`,
  });
}

/* =========================================================
   TEACHERS
   ========================================================= */

function getFilteredTeachers() {
  const keyword = normalize(byId("teacherSearchInput").value);
  const major = byId("teacherMajorFilter").value;
  const status = byId("teacherStatusFilter").value;

  return officerState.teachers.filter((teacher) => {
    const searchable = normalize(
      `${teacher.academicTitle} ${teacher.firstName} ${teacher.lastName} ${teacher.email}`,
    );

    return (
      (!keyword || searchable.includes(keyword)) &&
      (!major || teacher.major === major) &&
      (!status ||
        (status === "active" ? teacher.active : !teacher.active))
    );
  });
}

function renderTeacherTable() {
  const teachers = getFilteredTeachers();

  byId("teacherTableEmpty").classList.toggle(
    "show",
    teachers.length === 0,
  );

  byId("teacherTableBody").innerHTML = teachers
    .map(
      (teacher) => `
        <tr>
          <td>
            <span class="of-table-primary">${escapeHtml(`${teacher.academicTitle || ""}${teacher.firstName} ${teacher.lastName}`)}</span>
          </td>
          <td>${escapeHtml(teacher.email)}</td>
          <td>${escapeHtml(teacher.major)}</td>
          <td>
            <span class="of-status ${teacher.active ? "of-status-success" : "of-status-muted"}">
              ${teacher.active ? "ใช้งาน" : "ไม่ใช้งาน"}
            </span>
          </td>
          <td>
            <div class="of-table-actions">
              <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="openTeacherEditor('${teacher.id}')">
                <i class="fa-solid fa-pen"></i>
                แก้ไข
              </button>
              <button class="of-btn of-btn-outline of-btn-sm" type="button" onclick="resetTeacherPassword('${teacher.id}')">
                <i class="fa-solid fa-key"></i>
                Reset
              </button>
              <button class="of-btn ${teacher.active ? "of-btn-danger" : "of-btn-primary"} of-btn-sm" type="button" onclick="toggleTeacherStatus('${teacher.id}')">
                ${teacher.active ? "ปิดใช้งาน" : "เปิดใช้งาน"}
              </button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");

  setResponsiveTableLabels();
}

function openTeacherEditor(teacherId = "") {
  const teacher = officerState.teachers.find(
    (item) => item.id === teacherId,
  );

  byId("teacherEditorForm").reset();
  byId("teacherEditorId").value = teacher?.id || "";
  byId("teacherEditorTitle").textContent = teacher
    ? "แก้ไขข้อมูลอาจารย์"
    : "เพิ่มอาจารย์";

  byId("teacherFirstName").value = teacher?.firstName || "";
  byId("teacherLastName").value = teacher?.lastName || "";
  byId("teacherEmail").value = teacher?.email || "";
  byId("teacherMajor").value = teacher?.major || "IT";
  byId("teacherAcademicTitle").value =
    teacher?.academicTitle || "";

  openOfficerModal("teacherEditorModal");
}

function submitTeacherEditor(event) {
  event.preventDefault();

  const id = byId("teacherEditorId").value;
  let teacher = officerState.teachers.find(
    (item) => item.id === id,
  );

  const data = {
    firstName: byId("teacherFirstName").value.trim(),
    lastName: byId("teacherLastName").value.trim(),
    email: byId("teacherEmail").value.trim(),
    major: byId("teacherMajor").value,
    academicTitle: byId("teacherAcademicTitle").value.trim(),
  };

  if (!data.firstName || !data.lastName || !data.email) {
    showOfficerToast({
      type: "warning",
      title: "กรอกข้อมูลไม่ครบ",
      message: "ชื่อ นามสกุล และ Email เป็นข้อมูลที่ต้องมี",
    });
    return;
  }

  const duplicateEmail = officerState.teachers.some(
    (item) =>
      item.id !== id &&
      normalize(item.email) === normalize(data.email),
  );

  if (duplicateEmail) {
    showOfficerToast({
      type: "warning",
      title: "Email นี้มีอยู่แล้ว",
      message: data.email,
    });
    return;
  }

  if (!teacher) {
    teacher = {
      id: nextId("T", officerState.teachers),
      active: true,
    };
    officerState.teachers.push(teacher);
  }

  Object.assign(teacher, data);

  saveOfficerState();
  closeOfficerModal("teacherEditorModal");
  renderAll();

  showOfficerToast({
    type: "success",
    title: "บันทึกข้อมูลอาจารย์แล้ว",
    message: `${teacher.firstName} ${teacher.lastName}`,
  });
}

async function toggleTeacherStatus(teacherId) {
  const teacher = officerState.teachers.find(
    (item) => item.id === teacherId,
  );
  if (!teacher) return;

  const nextActive = !teacher.active;

  const ok = await showOfficerConfirm({
    title: nextActive ? "เปิดใช้งานบัญชีอาจารย์" : "ปิดใช้งานบัญชีอาจารย์",
    message: `${teacher.academicTitle || ""}${teacher.firstName} ${teacher.lastName}`,
    confirmText: nextActive ? "เปิดใช้งาน" : "ปิดใช้งาน",
    tone: nextActive ? "primary" : "danger",
  });

  if (!ok) return;

  teacher.active = nextActive;
  saveOfficerState();
  renderTeacherTable();

  showOfficerToast({
    type: "success",
    title: nextActive ? "เปิดใช้งานแล้ว" : "ปิดใช้งานแล้ว",
  });
}

async function resetTeacherPassword(teacherId) {
  const teacher = officerState.teachers.find(
    (item) => item.id === teacherId,
  );
  if (!teacher) return;

  const ok = await showOfficerConfirm({
    title: "Reset Password",
    message: `จำลองการส่งลิงก์ Reset Password ไปที่\n${teacher.email}`,
    confirmText: "ส่งลิงก์",
  });

  if (!ok) return;

  showOfficerToast({
    type: "success",
    title: "ส่งลิงก์ Reset Password แล้ว",
    message: teacher.email,
  });
}

/* =========================================================
   SCORING
   ========================================================= */

function getScoringKey() {
  return `${byId("scoringYearSelect").value}-${byId("scoringMajorSelect").value}`;
}

function ensureScoringDraft() {
  const key = getScoringKey();

  const defaultItems = Object.fromEntries(
    SCORE_ITEM_DEFS.map((item) => [item.key, item.defaultScore]),
  );

  if (
    !officerState.scoringDraft ||
    officerState.scoringDraft.key !== key
  ) {
    const scheme = officerState.scoringSchemes[key];

    const schemeHasNewStructure =
      scheme &&
      SCORE_ITEM_DEFS.every((item) =>
        Object.prototype.hasOwnProperty.call(scheme.items || {}, item.key),
      );

    const normalizedScheme = schemeHasNewStructure
      ? {
          ...scheme,
          groupWeights: {
            company: Number(scheme.groupWeights?.company ?? 50),
            department: Number(scheme.groupWeights?.department ?? 50),
          },
        }
      : {
          version: scheme?.version || 1,
          status: scheme?.status || "draft",
          groupWeights: { company: 50, department: 50 },
          items: defaultItems,
          updatedAt: new Date().toISOString(),
        };

    officerState.scoringSchemes[key] = deepClone(normalizedScheme);

    officerState.scoringDraft = {
      key,
      version: normalizedScheme.version,
      status: normalizedScheme.status,
      groupWeights: deepClone(normalizedScheme.groupWeights),
      items: deepClone(normalizedScheme.items),
    };
  }

  if (!officerState.scoringDraft.groupWeights) {
    officerState.scoringDraft.groupWeights = {
      company: 50,
      department: 50,
    };
  }
}


function getScoringGroupItems(groupKey) {
  return SCORE_ITEM_DEFS.filter((item) => item.group === groupKey);
}

function getScoringGroupTotal(groupKey, items = officerState.scoringDraft?.items) {
  return getScoringGroupItems(groupKey).reduce(
    (sum, item) => sum + Number(items?.[item.key] || 0),
    0,
  );
}

/*
 * ปรับคะแนนย่อยของกลุ่มให้รวมเท่ากับสัดส่วนหลักใหม่
 * โดยรักษาอัตราส่วนเดิมของคะแนนย่อยให้ใกล้เคียงที่สุด
 * และแจกเศษคะแนนเพื่อให้ผลรวมเป็นจำนวนเต็มตรงเป๊ะ
 */
function scaleScoringGroupToTarget(groupKey, newTarget) {
  const draft = officerState.scoringDraft;
  if (!draft) return;

  const items = getScoringGroupItems(groupKey);
  if (!items.length) return;

  const target = Math.max(0, Math.min(100, Math.round(Number(newTarget) || 0)));
  const currentValues = items.map((item) =>
    Math.max(0, Number(draft.items[item.key] || 0)),
  );

  let currentTotal = currentValues.reduce((sum, value) => sum + value, 0);

  /* ถ้าคะแนนเดิมเป็น 0 ทั้งกลุ่ม ให้ใช้สัดส่วนค่า Default เป็นฐาน */
  let basis = currentValues;

  if (currentTotal <= 0) {
    basis = items.map((item) =>
      Math.max(0, Number(item.defaultScore || 0)),
    );
    currentTotal = basis.reduce((sum, value) => sum + value, 0);
  }

  if (target === 0 || currentTotal <= 0) {
    items.forEach((item) => {
      draft.items[item.key] = 0;
    });
    return;
  }

  const raw = basis.map((value) => (value / currentTotal) * target);
  const scaled = raw.map((value) => Math.floor(value));

  let remaining =
    target - scaled.reduce((sum, value) => sum + value, 0);

  const fractionalOrder = raw
    .map((value, index) => ({
      index,
      fraction: value - Math.floor(value),
    }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);

  let cursor = 0;

  while (remaining > 0 && fractionalOrder.length) {
    scaled[fractionalOrder[cursor % fractionalOrder.length].index] += 1;
    remaining -= 1;
    cursor += 1;
  }

  items.forEach((item, index) => {
    draft.items[item.key] = scaled[index];
  });
}

function applyMainScoringWeight(groupKey, rawValue) {
  ensureScoringDraft();

  const draft = officerState.scoringDraft;
  const nextTarget = Math.max(
    0,
    Math.min(100, Math.round(Number(rawValue) || 0)),
  );

  draft.groupWeights[groupKey] = nextTarget;
  scaleScoringGroupToTarget(groupKey, nextTarget);

  /*
   * Render ใหม่เพื่อให้:
   * - หัวกลุ่มแสดง % ใหม่
   * - คะแนนย่อยทุกช่องเปลี่ยนตามสัดส่วนใหม่
   * - ยอดรวม/Validation เปลี่ยนพร้อมกัน
   */
  renderScoring();
}

function renderScoring() {
  ensureScoringDraft();

  const draft = officerState.scoringDraft;

  byId("companyWeightInput").value =
    Number(draft.groupWeights.company ?? 50);
  byId("departmentWeightInput").value =
    Number(draft.groupWeights.department ?? 50);

  byId("scoringVersionStatus").textContent =
    draft.status === "active"
      ? `Version ${draft.version} • ใช้งานอยู่`
      : `Version ${draft.version} • ฉบับร่าง`;

  byId("scoringVersionStatus").className =
    draft.status === "active"
      ? "of-status of-status-success"
      : "of-status of-status-warning";

  byId("scoreEditor").innerHTML = SCORE_GROUPS.map((group) => {
    const items = SCORE_ITEM_DEFS.filter(
      (item) => item.group === group.key,
    );

    const groupTotal = items.reduce(
      (sum, item) => sum + Number(draft.items[item.key] || 0),
      0,
    );

    const groupTarget =
      Number(draft.groupWeights[group.key] ?? group.target);

    return `
      <section class="of-score-group" data-score-group="${group.key}">
        <div class="of-score-group-header">
          <div>
            <h3>${escapeHtml(group.title)} ${groupTarget}%</h3>
            <p>${escapeHtml(group.description)}</p>
          </div>

          <span class="of-score-group-total ${groupTotal === groupTarget ? "" : "invalid"}" data-score-group-total="${group.key}">
            ${groupTotal} / ${groupTarget}
          </span>
        </div>

        <div class="of-score-group-body">
          ${items
            .map(
              (item) => `
                <div class="of-score-row">
                  <div>
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.hint)}</span>
                    ${
                      item.evaluators
                        ? `
                          <div class="of-exam-evaluators">
                            ${item.evaluators
                              .map(
                                (evaluator) =>
                                  `<span><i class="fa-solid fa-user-check"></i>${escapeHtml(evaluator)}</span>`,
                              )
                              .join("")}
                          </div>
                        `
                        : ""
                    }
                  </div>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value="${Number(draft.items[item.key] || 0)}"
                    data-score-key="${item.key}"
                    aria-label="${escapeHtml(item.title)}"
                  />
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }).join("");

  document.querySelectorAll("[data-score-key]").forEach((input) => {
    input.addEventListener("input", () => {
      draft.items[input.dataset.scoreKey] =
        Math.max(0, Number(input.value) || 0);
      updateScoringTotal();
    });
  });

  byId("companyWeightInput").onchange = (event) => {
    applyMainScoringWeight("company", event.target.value);
  };

  byId("departmentWeightInput").onchange = (event) => {
    applyMainScoringWeight("department", event.target.value);
  };

  updateScoringTotal();
  renderScoringVersions();
}

function updateScoringTotal() {
  const draft = officerState.scoringDraft;

  const groupTargets = {
    company: Number(draft?.groupWeights?.company ?? 50),
    department: Number(draft?.groupWeights?.department ?? 50),
  };

  const weightTotal = groupTargets.company + groupTargets.department;

  const groupTotals = Object.fromEntries(
    SCORE_GROUPS.map((group) => [
      group.key,
      getScoringGroupTotal(group.key, draft?.items),
    ]),
  );

  const total = Object.values(groupTotals).reduce(
    (sum, value) => sum + value,
    0,
  );

  byId("scoreWeightTotalValue").textContent = `${weightTotal}%`;

  const weightBox = byId("scoreWeightTotalBox");
  const weightMessage = byId("scoreWeightTotalMessage");

  weightBox.classList.remove("valid", "invalid");

  if (weightTotal === 100) {
    weightBox.classList.add("valid");
    weightMessage.textContent =
      `สถานประกอบการ ${groupTargets.company}% + ภาควิชา ${groupTargets.department}%`;
  } else {
    weightBox.classList.add("invalid");
    weightMessage.textContent =
      `สัดส่วนรวมต้องเท่ากับ 100% (ปัจจุบัน ${weightTotal}%)`;
  }

  byId("scoreTotalValue").textContent = `${total} / 100`;

  SCORE_GROUPS.forEach((group) => {
    const badge = document.querySelector(
      `[data-score-group-total="${group.key}"]`,
    );

    if (!badge) return;

    const target = groupTargets[group.key];

    badge.textContent = `${groupTotals[group.key]} / ${target}`;
    badge.classList.toggle(
      "invalid",
      groupTotals[group.key] !== target,
    );
  });

  const totalBox = byId("scoreTotalBox");
  const message = byId("scoreTotalMessage");

  totalBox.classList.remove("valid", "invalid");

  const companyValid =
    groupTotals.company === groupTargets.company;
  const departmentValid =
    groupTotals.department === groupTargets.department;
  const weightValid = weightTotal === 100;
  const valid =
    total === 100 &&
    weightValid &&
    companyValid &&
    departmentValid;

  if (valid) {
    totalBox.classList.add("valid");
    message.textContent =
      `✓ สถานประกอบการ ${groupTargets.company}% + ภาควิชา ${groupTargets.department}% = 100%`;
    byId("saveScoringButton").disabled = false;
  } else {
    totalBox.classList.add("invalid");

    const problems = [];

    if (!weightValid) {
      problems.push(`สัดส่วนหลักรวม ${weightTotal}/100`);
    }

    if (!companyValid) {
      problems.push(
        `สถานประกอบการ ${groupTotals.company}/${groupTargets.company}`,
      );
    }

    if (!departmentValid) {
      problems.push(
        `ภาควิชา ${groupTotals.department}/${groupTargets.department}`,
      );
    }

    message.textContent = problems.join(" • ");
    byId("saveScoringButton").disabled = true;
  }
}

function renderScoringVersions() {
  const key = getScoringKey();

  const history = officerState.scoringHistory
    .filter((item) => item.key === key)
    .sort((a, b) => b.version - a.version);

  byId("scoringVersionList").innerHTML = history.length
    ? history
        .map(
          (item) => `
            <div class="of-version-item">
              <div>
                <strong>Version ${item.version}</strong>
                <span>${escapeHtml(item.status === "active" ? "ใช้งาน" : item.status === "archived" ? "เก็บย้อนหลัง" : "ฉบับร่าง")} • ${escapeHtml(formatThaiDateTime(item.savedAt))}</span>
              </div>
              <span class="of-status ${item.status === "active" ? "of-status-success" : item.status === "archived" ? "of-status-muted" : "of-status-warning"}">
                ${item.status === "active" ? "Active" : item.status === "archived" ? "Archived" : "Draft"}
              </span>
            </div>
          `,
        )
        .join("")
    : `
      <div class="of-info-banner">
        <i class="fa-solid fa-circle-info"></i>
        <span>ยังไม่มีประวัติเวอร์ชันสำหรับปีและสาขานี้</span>
      </div>
    `;
}

function createScoringDraftFromCurrent() {
  ensureScoringDraft();

  const current = officerState.scoringDraft;

  officerState.scoringDraft = {
    key: current.key,
    version: Number(current.version || 0) + 1,
    status: "draft",
    groupWeights: deepClone(
      current.groupWeights || { company: 50, department: 50 },
    ),
    items: deepClone(current.items),
  };

  renderScoring();

  showOfficerToast({
    type: "success",
    title: "สร้างฉบับร่างแล้ว",
    message: `Version ${officerState.scoringDraft.version}`,
  });
}

function saveScoringScheme() {
  ensureScoringDraft();

  const draft = officerState.scoringDraft;

  const companyTarget =
    Number(draft.groupWeights?.company ?? 50);
  const departmentTarget =
    Number(draft.groupWeights?.department ?? 50);

  const companyTotal = SCORE_ITEM_DEFS
    .filter((item) => item.group === "company")
    .reduce(
      (sum, item) => sum + Number(draft.items[item.key] || 0),
      0,
    );

  const departmentTotal = SCORE_ITEM_DEFS
    .filter((item) => item.group === "department")
    .reduce(
      (sum, item) => sum + Number(draft.items[item.key] || 0),
      0,
    );

  const weightTotal = companyTarget + departmentTarget;
  const total = companyTotal + departmentTotal;

  if (
    weightTotal !== 100 ||
    total !== 100 ||
    companyTotal !== companyTarget ||
    departmentTotal !== departmentTarget
  ) {
    showOfficerToast({
      type: "warning",
      title: "สัดส่วนคะแนนไม่ถูกต้อง",
      message:
        `สถานประกอบการ ${companyTotal}/${companyTarget} • ` +
        `ภาควิชา ${departmentTotal}/${departmentTarget} • ` +
        `สัดส่วนหลัก ${weightTotal}/100`,
    });
    return;
  }

  const savedAt = new Date().toISOString();

  officerState.scoringSchemes[draft.key] = {
    version: draft.version,
    status: "active",
    groupWeights: deepClone(draft.groupWeights),
    items: deepClone(draft.items),
    updatedAt: savedAt,
  };

  officerState.scoringHistory.forEach((item) => {
    if (item.key === draft.key && item.status === "active") {
      item.status = "archived";
    }
  });

  officerState.scoringHistory.push({
    key: draft.key,
    version: draft.version,
    status: "active",
    savedAt,
  });

  officerState.scoringDraft = {
    ...deepClone(officerState.scoringSchemes[draft.key]),
    key: draft.key,
  };

  saveOfficerState();
  renderScoring();

  showOfficerToast({
    type: "success",
    title: "บันทึกเกณฑ์คะแนนแล้ว",
    message:
      `สถานประกอบการ ${companyTarget}% • ` +
      `ภาควิชา ${departmentTarget}% • ` +
      `Version ${draft.version}`,
  });
}

/* =========================================================
   CHATBOT
   ========================================================= */

function getOfficerChatbotAnswer(question) {
  const text = normalize(question);

  const matchedStudent = officerState.students.find((student) => {
    return (
      text.includes(normalize(student.name)) ||
      text.includes(normalize(student.studentId)) ||
      text.includes(normalize(student.name.split(" ")[0]))
    );
  });

  if (matchedStudent) {
    const request = getStudentRequest(matchedStudent);
    const courtesy = getStudentCourtesy(matchedStudent);
    const referral = getStudentReferral(matchedStudent);

    return [
      `${matchedStudent.name} (${matchedStudent.studentId})`,
      `คำร้อง: ${request ? requestStatusLabel(request.status) : "ยังไม่ยื่น"}`,
      `หนังสือขอความอนุเคราะห์: ${courtesy ? documentStatusLabel(courtesy.status) : "ยังไม่มี"}`,
      `หนังสือส่งตัว: ${referral ? documentStatusLabel(referral.status) : "ยังไม่มี"}`,
    ].join("\n");
  }

  if (text.includes("รอหนังสือส่งตัว") || text.includes("หนังสือส่งตัว")) {
    const students = officerState.students.filter((student) => {
      const request = getStudentRequest(student);
      const referral = getStudentReferral(student);

      return (
        request?.status === "approved" &&
        (!referral || referral.status !== "sent")
      );
    });

    return students.length
      ? `นักศึกษาที่หนังสือส่งตัวยังไม่เสร็จ ${students.length} คน:\n${students.map((student) => `• ${student.name} (${student.studentId})`).join("\n")}`
      : "ตอนนี้ไม่มีนักศึกษาที่รอหนังสือส่งตัว";
  }

  if (
    text.includes("รอตอบรับ") ||
    text.includes("ตอบรับจากสถานประกอบการ")
  ) {
    const documents = officerState.courtesyDocuments.filter(
      (document) => document.responseStatus === "waiting",
    );

    return documents.length
      ? `รายการที่รอสถานประกอบการตอบรับ ${documents.length} รายการ:\n${documents.map((document) => {
          const student = findStudent(document.studentId);
          const company = findCompany(student?.companyId);
          return `• ${student?.name || "-"} — ${company?.nameEn || company?.nameTh || "-"}`;
        }).join("\n")}`
      : "ตอนนี้ไม่มีรายการที่รอสถานประกอบการตอบรับ";
  }

  if (
    text.includes("ขอความอนุเคราะห์") &&
    (text.includes("ยังไม่ส่ง") || text.includes("รอ"))
  ) {
    const documents = officerState.courtesyDocuments.filter(
      (document) => document.status !== "sent" && document.status !== "cancelled",
    );

    return documents.length
      ? `หนังสือขอความอนุเคราะห์ที่ยังไม่ส่ง ${documents.length} ฉบับ:\n${documents.map((document) => {
          const student = findStudent(document.studentId);
          return `• ${student?.name || "-"} — ${documentStatusLabel(document.status)}`;
        }).join("\n")}`
      : "ไม่มีหนังสือขอความอนุเคราะห์ที่ค้างส่ง";
  }

  if (
    text.includes("คำร้อง") &&
    (text.includes("รอ") || text.includes("ดำเนินการ"))
  ) {
    const requests = officerState.requests.filter(
      (request) => request.status === "pending",
    );

    return requests.length
      ? `คำร้องที่รอดำเนินการ ${requests.length} รายการ:\n${requests.map((request) => {
          const student = findStudent(request.studentId);
          return `• ${student?.name || "-"} (${student?.studentId || "-"})`;
        }).join("\n")}`
      : "ไม่มีคำร้องที่รอดำเนินการ";
  }

  if (text.includes("วันนี้") || text.includes("งานค้าง")) {
    const stats = calculateOverviewStats();

    return [
      `งานเอกสารที่ควรตรวจสอบ`,
      `• คำร้องรอดำเนินการ ${stats.pendingRequests} รายการ`,
      `• หนังสือขอความอนุเคราะห์รอจัดทำ/ส่ง ${stats.courtesyPending} ฉบับ`,
      `• หนังสือส่งตัวรอดำเนินการ ${stats.referralPending} ฉบับ`,
      `• รายการมีปัญหา ${stats.documentIssues} รายการ`,
    ].join("\n");
  }

  return "ผมช่วยตรวจสอบสถานะคำร้อง หนังสือขอความอนุเคราะห์ หนังสือส่งตัว และสรุปงานค้างได้ เช่น “สถานะเอกสารของพิมพ์ชนก” หรือ “นักศึกษาคนไหนรอหนังสือส่งตัว”";
}

function sendOfficerChatMessage(text) {
  const question = String(text ?? "").trim();
  if (!question) return;

  officerState.chatHistory.push({
    role: "user",
    text: question,
  });

  officerState.chatHistory.push({
    role: "assistant",
    text: getOfficerChatbotAnswer(question),
  });

  officerState.chatHistory = officerState.chatHistory.slice(-40);

  saveOfficerState();
  renderOfficerChat();
}

function renderOfficerChat() {
  const html = officerState.chatHistory
    .map(
      (message) => `
        <div class="of-chat-message ${message.role}">
          <div class="of-chat-bubble">${escapeHtml(message.text)}</div>
        </div>
      `,
    )
    .join("");

  byId("officerChatMessages").innerHTML = html;
  byId("officerChatDrawerMessages").innerHTML = html;

  byId("officerChatMessages").scrollTop =
    byId("officerChatMessages").scrollHeight;
  byId("officerChatDrawerMessages").scrollTop =
    byId("officerChatDrawerMessages").scrollHeight;
}

function submitOfficerChat(event) {
  event.preventDefault();

  const input = byId("officerChatInput");
  sendOfficerChatMessage(input.value);
  input.value = "";
}

function submitOfficerDrawerChat(event) {
  event.preventDefault();

  const input = byId("officerChatDrawerInput");
  sendOfficerChatMessage(input.value);
  input.value = "";
}

function askOfficerQuickQuestion(question) {
  sendOfficerChatMessage(question);
}

function openOfficerChatDrawer() {
  byId("officerChatDrawer").classList.add("show");
  byId("officerChatDrawer").setAttribute("aria-hidden", "false");
}

function closeOfficerChatDrawer() {
  byId("officerChatDrawer").classList.remove("show");
  byId("officerChatDrawer").setAttribute("aria-hidden", "true");
}

/* =========================================================
   MODAL / CONFIRM / TOAST
   ========================================================= */

function openOfficerModal(modalId) {
  const modal = byId(modalId);
  if (!modal) return;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeOfficerModal(modalId) {
  const modal = byId(modalId);
  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".of-modal.show")) {
    document.body.style.overflow = "";
  }
}

function showOfficerConfirm({
  title = "ยืนยันการดำเนินการ",
  message = "",
  confirmText = "ยืนยัน",
  tone = "primary",
} = {}) {
  return new Promise((resolve) => {
    const okButton = byId("officerConfirmOkButton");
    const cancelButton = byId("officerConfirmCancelButton");

    byId("officerConfirmTitle").textContent = title;
    byId("officerConfirmMessage").textContent = message;
    okButton.textContent = confirmText;

    okButton.className =
      tone === "danger"
        ? "of-btn of-btn-danger"
        : "of-btn of-btn-primary";

    byId("officerConfirmIcon").innerHTML =
      tone === "danger"
        ? '<i class="fa-solid fa-triangle-exclamation"></i>'
        : '<i class="fa-solid fa-circle-question"></i>';

    const finish = (result) => {
      okButton.onclick = null;
      cancelButton.onclick = null;
      closeOfficerModal("officerConfirmModal");
      resolve(result);
    };

    okButton.onclick = () => finish(true);
    cancelButton.onclick = () => finish(false);

    openOfficerModal("officerConfirmModal");
  });
}

function showOfficerToast({
  type = "success",
  title = "สำเร็จ",
  message = "",
  duration = 3200,
} = {}) {
  const icons = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    warning: "fa-triangle-exclamation",
    info: "fa-circle-info",
  };

  const toast = document.createElement("div");
  toast.className = `of-toast ${type}`;

  toast.innerHTML = `
    <div class="of-toast-icon">
      <i class="fa-solid ${icons[type] || icons.info}"></i>
    </div>
    <div>
      <strong>${escapeHtml(title)}</strong>
      ${message ? `<span>${escapeHtml(message)}</span>` : ""}
    </div>
    <button type="button" aria-label="ปิด">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  const remove = () => toast.remove();

  toast.querySelector("button").addEventListener("click", remove);
  byId("officerToastContainer").appendChild(toast);

  window.setTimeout(remove, duration);
}

/* =========================================================
   LOGOUT
   ========================================================= */

async function officerLogout() {
  const ok = await showOfficerConfirm({
    title: "ออกจากระบบ",
    message: "ต้องการออกจากระบบหรือไม่?",
    confirmText: "ออกจากระบบ",
    tone: "danger",
  });

  if (!ok) return;

  localStorage.removeItem("currentUser");

  if (typeof window.logout === "function") {
    window.logout();
    return;
  }

  window.location.href = "login.html";
}

/* =========================================================
   RENDER ALL
   ========================================================= */

function renderAll() {
  byId("headerOfficerName").textContent = officerState.officer.name;

  renderDocumentStatusTable();
  renderRequestTable();
  renderCourtesyTable();
  renderReferralTable();
  renderCompanyTable();
  renderCalendar();
  renderTeacherTable();
  renderScoring();
  renderOfficerChat();
  updateOverview();

  setResponsiveTableLabels();
}

/* =========================================================
   INIT / EVENTS
   ========================================================= */

function initializeYearSelectors() {
  populateAcademicYearSelect(byId("documentYearFilter"), true);
  populateAcademicYearSelect(byId("requestYearFilter"), true);
  populateAcademicYearSelect(byId("courtesyYearFilter"), true);
  populateAcademicYearSelect(byId("referralYearFilter"), true);
  populateAcademicYearSelect(byId("calendarYearSelect"), false);
  populateAcademicYearSelect(byId("scoringYearSelect"), false);

  byId("calendarYearSelect").value = "2569";
  byId("scoringYearSelect").value = "2569";
}

function bindOfficerEvents() {
  document
    .querySelectorAll(".of-sidebar-item[data-panel]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        switchOfficerPanel(button.dataset.panel);
      });
    });

  document.querySelectorAll("[data-doc-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      switchDocumentTab(button.dataset.docTab);
    });
  });

  [
    "documentSearchInput",
    "documentYearFilter",
    "documentMajorFilter",
    "documentStatusFilter",
  ].forEach((id) => {
    const element = byId(id);
    element.addEventListener("input", renderDocumentStatusTable);
    element.addEventListener("change", renderDocumentStatusTable);
  });

  [
    "requestSearchInput",
    "requestYearFilter",
    "requestStatusFilter",
  ].forEach((id) => {
    const element = byId(id);
    element.addEventListener("input", renderRequestTable);
    element.addEventListener("change", renderRequestTable);
  });

  [
    "courtesySearchInput",
    "courtesyYearFilter",
    "courtesyStatusFilter",
  ].forEach((id) => {
    const element = byId(id);
    element.addEventListener("input", renderCourtesyTable);
    element.addEventListener("change", renderCourtesyTable);
  });

  [
    "referralSearchInput",
    "referralYearFilter",
    "referralStatusFilter",
  ].forEach((id) => {
    const element = byId(id);
    element.addEventListener("input", renderReferralTable);
    element.addEventListener("change", renderReferralTable);
  });

  [
    "companySearchInput",
    "companyTypeFilter",
    "companyActiveFilter",
  ].forEach((id) => {
    const element = byId(id);
    element.addEventListener("input", renderCompanyTable);
    element.addEventListener("change", renderCompanyTable);
  });

  [
    "teacherSearchInput",
    "teacherMajorFilter",
    "teacherStatusFilter",
  ].forEach((id) => {
    const element = byId(id);
    element.addEventListener("input", renderTeacherTable);
    element.addEventListener("change", renderTeacherTable);
  });

  byId("calendarYearSelect").addEventListener("change", renderCalendar);
  byId("calendarTermSelect").addEventListener("change", renderCalendar);

  byId("scoringYearSelect").addEventListener("change", () => {
    officerState.scoringDraft = null;
    renderScoring();
  });

  byId("scoringMajorSelect").addEventListener("change", () => {
    officerState.scoringDraft = null;
    renderScoring();
  });

  byId("cancelRequestForm").addEventListener(
    "submit",
    submitCancelRequest,
  );

  byId("documentEditorForm").addEventListener(
    "submit",
    submitDocumentEditor,
  );

  byId("companyResponseForm").addEventListener(
    "submit",
    submitCompanyResponseStatus,
  );

  byId("companyEditorForm").addEventListener(
    "submit",
    submitCompanyEditor,
  );

  byId("teacherEditorForm").addEventListener(
    "submit",
    submitTeacherEditor,
  );

  byId("officerChatForm").addEventListener(
    "submit",
    submitOfficerChat,
  );

  byId("officerChatDrawerForm").addEventListener(
    "submit",
    submitOfficerDrawerChat,
  );

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".of-modal");
      if (modal) closeOfficerModal(modal.id);
    });
  });

  document.querySelectorAll(".of-modal").forEach((modal) => {
    modal.addEventListener("mousedown", (event) => {
      if (
        event.target === modal &&
        modal.id !== "officerConfirmModal"
      ) {
        closeOfficerModal(modal.id);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const visibleModal = Array.from(
      document.querySelectorAll(".of-modal.show"),
    ).pop();

    if (
      visibleModal &&
      visibleModal.id !== "officerConfirmModal"
    ) {
      closeOfficerModal(visibleModal.id);
      return;
    }

    if (byId("officerChatDrawer").classList.contains("show")) {
      closeOfficerChatDrawer();
    }
  });

  window.addEventListener("resize", setResponsiveTableLabels);
}

document.addEventListener("DOMContentLoaded", () => {
  loadOfficerState();
  ensureCourtesyResponseDefaults();
  initializeYearSelectors();
  bindOfficerEvents();
  renderAll();
});

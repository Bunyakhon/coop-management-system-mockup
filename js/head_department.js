"use strict";

const HEAD_STATUS = {
  pending: { label: "รอพิจารณา", className: "hd-status-warning" },
  approved: { label: "อนุมัติแล้ว", className: "hd-status-success" },
  rejected: { label: "ไม่อนุมัติ", className: "hd-status-danger" },
};

const headDepartmentState = {
  activePanel: "panel-overview",
  activeCoopTab: "students",
  activeRequestFilter: "",
  selectedRequestIds: new Set(),
  rejectingStudentId: null,
  students: [
    { id:"6702458196", name:"นางสาวพิมพ์ชนก สุขใจ", major:"INE", company:"BlueWave Digital Co., Ltd.", province:"ชลบุรี", position:"Frontend Developer", submittedDate:"3 ก.ย. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"pending", rejectReason:"", advisorId:"" },
    { id:"6702458198", name:"นายธนกฤต วัฒนศิริ", major:"INE", company:"CloudNova Systems Co., Ltd.", province:"กรุงเทพมหานคร", position:"Cloud Engineer", submittedDate:"1 ก.ย. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"approved", rejectReason:"", advisorId:"T004" },
    { id:"6702458202", name:"อรุณี พงษ์สุวรรณ", major:"IT", company:"DataSphere Thailand", province:"กรุงเทพมหานคร", position:"Data Analyst", submittedDate:"2 ก.ย. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"pending", rejectReason:"", advisorId:"" },
    { id:"6702458204", name:"นายกิตติพงศ์ สุวรรณชัย", major:"INE", company:"NextWave Technology Co., Ltd.", province:"ระยอง", position:"Network Engineer", submittedDate:"28 ส.ค. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"approved", rejectReason:"", advisorId:"T005" },
    { id:"6702458206", name:"นางสาวณิชารีย์ บุญส่ง", major:"IT", company:"BrightCode Solutions Co., Ltd.", province:"กรุงเทพมหานคร", position:"Mobile Application Developer", submittedDate:"27 ส.ค. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"approved", rejectReason:"", advisorId:"" },
    { id:"6702458208", name:"นายภูริช วัฒนกุล", major:"INE", company:"Business Intelligence Group", province:"นนทบุรี", position:"Business Analyst", submittedDate:"30 ส.ค. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"pending", rejectReason:"", advisorId:"" },
    { id:"6702458210", name:"นางสาวชลธิชา มณีวงศ์", major:"IT", company:"SecureLink Cyber Co., Ltd.", province:"กรุงเทพมหานคร", position:"Cybersecurity Analyst", submittedDate:"25 ส.ค. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"approved", rejectReason:"", advisorId:"T006" },
    { id:"6702458214", name:"นางสาวรินรดา ศรีสุข", major:"IT", company:"Digital Vision Lab Co., Ltd.", province:"ปทุมธานี", position:"Software Developer", submittedDate:"24 ส.ค. 2569", duration:"1 ก.ย. 2569 – 18 ธ.ค. 2569", requestStatus:"rejected", rejectReason:"ข้อมูลสถานประกอบการยังไม่ครบถ้วน", advisorId:"" },
  ],
  teachers: [
    { id:"T001", name:"ผศ.ดร.นิติการ นาคเจือทอง", major:"IT", email:"nitikan@kmutnb.ac.th", status:"active", role:"teacher" },
    { id:"T002", name:"ผศ.ดร.สุพาภรณ์ ซิ้มเจริญ", major:"INE", email:"supaporn@kmutnb.ac.th", status:"active", role:"teacher" },
    { id:"T003", name:"ผศ.ดร.ขนิษฐา นามี", major:"IT", email:"khanittha@kmutnb.ac.th", status:"active", role:"head" },
    { id:"T004", name:"ผศ.ดร.สุปีติ กุลจันทร์", major:"INE", email:"supeeti@kmutnb.ac.th", status:"active", role:"teacher" },
    { id:"T005", name:"ผศ.ดร.วันทนี ประจวบศุภกิจ", major:"INE", email:"wantanee@kmutnb.ac.th", status:"active", role:"teacher" },
    { id:"T006", name:"ผศ.ดร.สิวาลัย จินเจือ", major:"IT", email:"siwalai@kmutnb.ac.th", status:"active", role:"teacher" },
    { id:"T007", name:"ผศ.นพเก้า ทองใบ", major:"IT", email:"nopkao@kmutnb.ac.th", status:"inactive", role:"teacher" },
  ],
  profile: { name:"ผศ.ดร.ขนิษฐา นามี", email:"khanittha@kmutnb.ac.th", major:"IT" },
};

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function normalize(value) { return String(value ?? "").trim().toLowerCase(); }
function findStudent(id) { return headDepartmentState.students.find(s => s.id === id); }
function findTeacher(id) { return headDepartmentState.teachers.find(t => t.id === id); }
function getAdvisorName(student) { return student.advisorId ? (findTeacher(student.advisorId)?.name || "") : ""; }
function getStatusHtml(status) {
  const cfg = HEAD_STATUS[status] || { label:status, className:"hd-status-muted" };
  return `<span class="hd-status ${cfg.className}">${escapeHtml(cfg.label)}</span>`;
}
function teacherStatusHtml(status, role) {
  if (role === "head") return '<span class="hd-status hd-status-primary">หัวหน้าภาควิชา</span>';
  if (status === "active") return '<span class="hd-status hd-status-success">ปฏิบัติงาน</span>';
  return '<span class="hd-status hd-status-muted">ไม่ปฏิบัติงาน</span>';
}

function saveMockState() {
  localStorage.setItem("headDepartmentMockState", JSON.stringify({ students:headDepartmentState.students, teachers:headDepartmentState.teachers, profile:headDepartmentState.profile }));
}
function loadMockState() {
  try {
    const saved = JSON.parse(localStorage.getItem("headDepartmentMockState") || "null");
    if (!saved) return;
    if (Array.isArray(saved.students)) headDepartmentState.students = saved.students;
    if (Array.isArray(saved.teachers)) headDepartmentState.teachers = saved.teachers;
    if (saved.profile) headDepartmentState.profile = { ...headDepartmentState.profile, ...saved.profile };
  } catch (error) { console.warn("Cannot load mock state", error); }
}

function switchHeadPanel(panelId) {
  headDepartmentState.activePanel = panelId;
  document.querySelectorAll(".hd-panel").forEach(panel => panel.classList.toggle("active", panel.id === panelId));
  document.querySelectorAll(".hd-sidebar-item[data-panel]").forEach(button => button.classList.toggle("active", button.dataset.panel === panelId));
  window.scrollTo({ top:0, behavior:"smooth" });
}
function goToCoopTab(tabName) { switchHeadPanel("panel-coop"); switchCoopTab(tabName); }
function switchCoopTab(tabName) {
  headDepartmentState.activeCoopTab = tabName;
  document.querySelectorAll("[data-coop-tab]").forEach(button => button.classList.toggle("active", button.dataset.coopTab === tabName));
  document.querySelectorAll("[data-coop-tab-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.coopTabPanel === tabName));
  if (tabName === "students") renderStudents();
  if (tabName === "requests") renderRequests();
  if (tabName === "advisors") renderAdvisors();
}

function updateOverview() {
  const students = headDepartmentState.students;
  const teachers = headDepartmentState.teachers;
  const pending = students.filter(s => s.requestStatus === "pending").length;
  const approved = students.filter(s => s.requestStatus === "approved").length;
  const noAdvisor = students.filter(s => s.requestStatus === "approved" && !s.advisorId).length;
  const activeTeachers = teachers.filter(t => t.status === "active").length;
  document.getElementById("statStudentTotal").textContent = students.length;
  document.getElementById("statPendingRequests").textContent = pending;
  document.getElementById("statApprovedRequests").textContent = approved;
  document.getElementById("statNoAdvisor").textContent = noAdvisor;
  document.getElementById("statTeacherTotal").textContent = activeTeachers;
  document.getElementById("taskPendingText").textContent = `${pending} รายการ`;
  document.getElementById("taskAdvisorText").textContent = `${noAdvisor} คน`;
  document.getElementById("sidebarPendingBadge").textContent = pending;
  document.getElementById("requestTabCount").textContent = pending;
  document.getElementById("sidebarPendingBadge").style.display = pending > 0 ? "inline-flex" : "none";
}

function getFilteredStudents() {
  const keyword = normalize(document.getElementById("studentSearch")?.value);
  const major = document.getElementById("studentMajor")?.value || "";
  const status = document.getElementById("studentRequestStatus")?.value || "";
  return headDepartmentState.students.filter(s => {
    const search = normalize(`${s.name} ${s.id} ${s.company} ${s.position}`);
    return (!keyword || search.includes(keyword)) && (!major || s.major === major) && (!status || s.requestStatus === status);
  });
}
function renderStudents() {
  const tbody = document.getElementById("studentTableBody");
  const empty = document.getElementById("studentEmptyState");
  if (!tbody || !empty) return;
  const rows = getFilteredStudents();
  empty.classList.toggle("show", rows.length === 0);
  tbody.innerHTML = rows.map(s => {
    const advisor = getAdvisorName(s);
    return `<tr>
      <td><span class="hd-table-primary">${escapeHtml(s.name)}</span><span class="hd-table-secondary">${escapeHtml(s.id)}</span></td>
      <td>${escapeHtml(s.major)}</td>
      <td><span class="hd-table-primary">${escapeHtml(s.company)}</span><span class="hd-table-secondary">${escapeHtml(s.position)}</span></td>
      <td>${getStatusHtml(s.requestStatus)}</td>
      <td>${advisor ? `<span class="hd-table-primary">${escapeHtml(advisor)}</span>` : '<span class="hd-status hd-status-muted">ยังไม่ได้กำหนด</span>'}</td>
      <td><button type="button" class="hd-btn hd-btn-outline hd-btn-sm" onclick="openStudentDetail('${escapeHtml(s.id)}')"><i class="fa-solid fa-eye"></i>ดูข้อมูล</button></td>
    </tr>`;
  }).join("");
}
function openStudentDetail(studentId) {
  const s = findStudent(studentId); if (!s) return;
  const advisor = getAdvisorName(s) || "ยังไม่ได้กำหนด";
  document.getElementById("studentDetailContent").innerHTML = `<div class="hd-detail-grid">
    <div class="hd-detail-card"><span>ชื่อ-นามสกุล</span><strong>${escapeHtml(s.name)}</strong></div>
    <div class="hd-detail-card"><span>รหัสนักศึกษา</span><strong>${escapeHtml(s.id)}</strong></div>
    <div class="hd-detail-card"><span>สาขา</span><strong>${escapeHtml(s.major)}</strong></div>
    <div class="hd-detail-card"><span>สถานะคำร้อง</span>${getStatusHtml(s.requestStatus)}</div>
    <div class="hd-detail-card full"><span>สถานประกอบการ</span><strong>${escapeHtml(s.company)}</strong></div>
    <div class="hd-detail-card"><span>ตำแหน่ง</span><strong>${escapeHtml(s.position)}</strong></div>
    <div class="hd-detail-card"><span>จังหวัด</span><strong>${escapeHtml(s.province)}</strong></div>
    <div class="hd-detail-card full"><span>ระยะเวลาสหกิจ</span><strong>${escapeHtml(s.duration)}</strong></div>
    <div class="hd-detail-card full"><span>อาจารย์ที่ปรึกษา</span><strong>${escapeHtml(advisor)}</strong></div>
    ${s.requestStatus === "rejected" && s.rejectReason ? `<div class="hd-detail-card full"><span>เหตุผลที่ไม่อนุมัติ</span><strong>${escapeHtml(s.rejectReason)}</strong></div>` : ""}
  </div>`;
  openModal("studentDetailModal");
}

function getFilteredRequests() {
  const keyword = normalize(document.getElementById("requestSearch")?.value);
  const major = document.getElementById("requestMajor")?.value || "";
  const status = headDepartmentState.activeRequestFilter;
  return headDepartmentState.students.filter(s => {
    const search = normalize(`${s.name} ${s.id} ${s.company} ${s.position}`);
    return (!keyword || search.includes(keyword)) && (!major || s.major === major) && (!status || s.requestStatus === status);
  });
}
function renderRequestCounts() {
  const students = headDepartmentState.students;
  document.getElementById("requestCountAll").textContent = students.length;
  document.getElementById("requestCountPending").textContent = students.filter(s => s.requestStatus === "pending").length;
  document.getElementById("requestCountApproved").textContent = students.filter(s => s.requestStatus === "approved").length;
  document.getElementById("requestCountRejected").textContent = students.filter(s => s.requestStatus === "rejected").length;
}
function renderRequests() {
  const tbody = document.getElementById("requestTableBody");
  const empty = document.getElementById("requestEmptyState");
  if (!tbody || !empty) return;
  renderRequestCounts();
  const rows = getFilteredRequests();
  empty.classList.toggle("show", rows.length === 0);
  tbody.innerHTML = rows.map(s => {
    const selectable = s.requestStatus === "pending";
    const checked = headDepartmentState.selectedRequestIds.has(s.id);
    return `<tr>
      <td class="hd-check-col">${selectable ? `<input type="checkbox" class="request-row-checkbox" data-student-id="${escapeHtml(s.id)}" ${checked ? "checked" : ""} />` : ""}</td>
      <td><span class="hd-table-primary">${escapeHtml(s.name)}</span><span class="hd-table-secondary">${escapeHtml(s.id)} • ${escapeHtml(s.major)}</span></td>
      <td><span class="hd-table-primary">${escapeHtml(s.company)}</span><span class="hd-table-secondary">${escapeHtml(s.position)}</span></td>
      <td>${escapeHtml(s.submittedDate)}</td>
      <td>${getStatusHtml(s.requestStatus)}</td>
      <td><div class="hd-table-actions">
        <button type="button" class="hd-btn hd-btn-outline hd-btn-sm" onclick="openRequestDetail('${escapeHtml(s.id)}')"><i class="fa-solid fa-eye"></i>ดู</button>
        ${s.requestStatus === "pending" ? `<button type="button" class="hd-btn hd-btn-primary hd-btn-sm" onclick="approveSingleRequest('${escapeHtml(s.id)}')"><i class="fa-solid fa-check"></i>อนุมัติ</button><button type="button" class="hd-btn hd-btn-danger hd-btn-sm" onclick="openRejectRequest('${escapeHtml(s.id)}')"><i class="fa-solid fa-xmark"></i>ไม่อนุมัติ</button>` : ""}
      </div></td>
    </tr>`;
  }).join("");
  bindRequestCheckboxes();
  updateBulkApproveState();
}
function bindRequestCheckboxes() {
  document.querySelectorAll(".request-row-checkbox").forEach(cb => cb.addEventListener("change", () => {
    cb.checked ? headDepartmentState.selectedRequestIds.add(cb.dataset.studentId) : headDepartmentState.selectedRequestIds.delete(cb.dataset.studentId);
    updateBulkApproveState();
  }));
  syncSelectAllCheckbox();
}
function syncSelectAllCheckbox() {
  const selectAll = document.getElementById("selectAllRequests"); if (!selectAll) return;
  const boxes = Array.from(document.querySelectorAll(".request-row-checkbox"));
  if (!boxes.length) { selectAll.checked = false; selectAll.indeterminate = false; return; }
  const checked = boxes.filter(cb => cb.checked).length;
  selectAll.checked = checked === boxes.length;
  selectAll.indeterminate = checked > 0 && checked < boxes.length;
}
function updateBulkApproveState() {
  const count = headDepartmentState.selectedRequestIds.size;
  document.getElementById("bulkApproveButton").disabled = count === 0;
  document.getElementById("bulkApproveCount").textContent = count;
  syncSelectAllCheckbox();
}
function setRequestFilter(status) {
  headDepartmentState.activeRequestFilter = status;
  document.querySelectorAll("[data-request-filter]").forEach(btn => btn.classList.toggle("active", btn.dataset.requestFilter === status));
  headDepartmentState.selectedRequestIds.clear();
  renderRequests();
}
function openRequestDetail(id) {
  const s = findStudent(id); if (!s) return;
  document.getElementById("requestDetailContent").innerHTML = `<div class="hd-detail-grid">
    <div class="hd-detail-card"><span>ชื่อ-นามสกุล</span><strong>${escapeHtml(s.name)}</strong></div>
    <div class="hd-detail-card"><span>รหัสนักศึกษา</span><strong>${escapeHtml(s.id)}</strong></div>
    <div class="hd-detail-card"><span>สาขา</span><strong>${escapeHtml(s.major)}</strong></div>
    <div class="hd-detail-card"><span>วันที่ยื่น</span><strong>${escapeHtml(s.submittedDate)}</strong></div>
    <div class="hd-detail-card full"><span>สถานประกอบการ</span><strong>${escapeHtml(s.company)}</strong></div>
    <div class="hd-detail-card"><span>ตำแหน่ง</span><strong>${escapeHtml(s.position)}</strong></div>
    <div class="hd-detail-card"><span>จังหวัด</span><strong>${escapeHtml(s.province)}</strong></div>
    <div class="hd-detail-card full"><span>ระยะเวลาสหกิจ</span><strong>${escapeHtml(s.duration)}</strong></div>
    <div class="hd-detail-card full"><span>สถานะคำร้อง</span>${getStatusHtml(s.requestStatus)}</div>
    ${s.requestStatus === "rejected" && s.rejectReason ? `<div class="hd-detail-card full"><span>เหตุผลที่ไม่อนุมัติ</span><strong>${escapeHtml(s.rejectReason)}</strong></div>` : ""}
  </div>`;
  document.getElementById("requestDetailFooter").innerHTML = s.requestStatus === "pending" ? `
    <button type="button" class="hd-btn hd-btn-outline" onclick="closeModal('requestDetailModal')">ปิด</button>
    <button type="button" class="hd-btn hd-btn-danger" onclick="closeModal('requestDetailModal');openRejectRequest('${escapeHtml(s.id)}')"><i class="fa-solid fa-circle-xmark"></i>ไม่อนุมัติ</button>
    <button type="button" class="hd-btn hd-btn-primary" onclick="closeModal('requestDetailModal');approveSingleRequest('${escapeHtml(s.id)}')"><i class="fa-solid fa-circle-check"></i>อนุมัติ</button>` : `<button type="button" class="hd-btn hd-btn-outline" onclick="closeModal('requestDetailModal')">ปิด</button>`;
  openModal("requestDetailModal");
}
async function approveSingleRequest(id) {
  const s = findStudent(id); if (!s || s.requestStatus !== "pending") return;
  const ok = await showConfirm({ title:"อนุมัติคำร้องสหกิจศึกษา", message:`ยืนยันการอนุมัติคำร้องของ ${s.name} หรือไม่?`, confirmText:"อนุมัติ" });
  if (!ok) return;
  s.requestStatus = "approved"; s.rejectReason = ""; headDepartmentState.selectedRequestIds.delete(id); commitStateChanges();
  showToast({ type:"success", title:"อนุมัติคำร้องเรียบร้อยแล้ว", message:s.name });
}
async function approveSelectedRequests() {
  const ids = Array.from(headDepartmentState.selectedRequestIds).filter(id => findStudent(id)?.requestStatus === "pending");
  if (!ids.length) return;
  const ok = await showConfirm({ title:"อนุมัติรายการที่เลือก", message:`ยืนยันการอนุมัติคำร้องทั้งหมด ${ids.length} รายการหรือไม่?`, confirmText:"อนุมัติทั้งหมด" });
  if (!ok) return;
  ids.forEach(id => { const s = findStudent(id); if (s) { s.requestStatus = "approved"; s.rejectReason = ""; } });
  headDepartmentState.selectedRequestIds.clear(); commitStateChanges();
  showToast({ type:"success", title:"อนุมัติรายการเรียบร้อยแล้ว", message:`${ids.length} รายการ` });
}
function openRejectRequest(id) {
  const s = findStudent(id); if (!s || s.requestStatus !== "pending") return;
  headDepartmentState.rejectingStudentId = id;
  document.getElementById("rejectStudentPreview").innerHTML = `<strong>${escapeHtml(s.name)}</strong><span>${escapeHtml(s.id)} • ${escapeHtml(s.company)}</span>`;
  document.getElementById("rejectReason").value = "";
  openModal("rejectModal");
  setTimeout(() => document.getElementById("rejectReason")?.focus(), 100);
}
function submitRejectRequest() {
  const s = findStudent(headDepartmentState.rejectingStudentId);
  const reason = document.getElementById("rejectReason").value.trim();
  if (!s) return;
  if (!reason) { showToast({ type:"warning", title:"กรุณาระบุเหตุผล", message:"ต้องระบุเหตุผลก่อนยืนยันไม่อนุมัติคำร้อง" }); return; }
  s.requestStatus = "rejected"; s.rejectReason = reason; s.advisorId = ""; headDepartmentState.selectedRequestIds.delete(s.id); headDepartmentState.rejectingStudentId = null;
  closeModal("rejectModal"); commitStateChanges();
  showToast({ type:"success", title:"บันทึกผลการพิจารณาแล้ว", message:`ไม่อนุมัติคำร้องของ ${s.name}` });
}

function getFilteredAdvisorStudents() {
  const keyword = normalize(document.getElementById("advisorSearch")?.value);
  const major = document.getElementById("advisorMajor")?.value || "";
  const status = document.getElementById("advisorStatus")?.value || "";
  return headDepartmentState.students.filter(s => {
    if (s.requestStatus !== "approved") return false;
    const search = normalize(`${s.name} ${s.id}`);
    const advisorMatched = !status || (status === "assigned" ? !!s.advisorId : !s.advisorId);
    return (!keyword || search.includes(keyword)) && (!major || s.major === major) && advisorMatched;
  });
}
function renderAdvisors() {
  const tbody = document.getElementById("advisorTableBody"); const empty = document.getElementById("advisorEmptyState"); if (!tbody || !empty) return;
  const students = getFilteredAdvisorStudents(); const teachers = headDepartmentState.teachers.filter(t => t.status === "active");
  empty.classList.toggle("show", students.length === 0);
  tbody.innerHTML = students.map(s => {
    const options = ['<option value="">-- ยังไม่ได้กำหนด --</option>', ...teachers.map(t => `<option value="${escapeHtml(t.id)}" ${s.advisorId === t.id ? "selected" : ""}>${escapeHtml(t.name)}</option>`)].join("");
    return `<tr>
      <td><span class="hd-table-primary">${escapeHtml(s.name)}</span><span class="hd-table-secondary">${escapeHtml(s.id)}</span></td>
      <td>${escapeHtml(s.major)}</td>
      <td><span class="hd-table-primary">${escapeHtml(s.company)}</span><span class="hd-table-secondary">${escapeHtml(s.position)}</span></td>
      <td><select class="hd-advisor-select" id="advisorSelect-${escapeHtml(s.id)}">${options}</select></td>
      <td><button type="button" class="hd-btn hd-btn-primary hd-btn-sm" onclick="saveAdvisor('${escapeHtml(s.id)}')"><i class="fa-solid fa-floppy-disk"></i>บันทึก</button></td>
    </tr>`;
  }).join("");
}
async function saveAdvisor(id) {
  const s = findStudent(id); const select = document.getElementById(`advisorSelect-${id}`); if (!s || !select) return;
  const newId = select.value; const name = findTeacher(newId)?.name || "ยังไม่ได้กำหนด";
  const ok = await showConfirm({ title:"บันทึกอาจารย์ที่ปรึกษา", message:`นักศึกษา: ${s.name}\nอาจารย์ที่ปรึกษา: ${name}`, confirmText:"บันทึก" });
  if (!ok) { select.value = s.advisorId || ""; return; }
  s.advisorId = newId; commitStateChanges(); showToast({ type:"success", title:"บันทึกอาจารย์ที่ปรึกษาแล้ว", message:`${s.name} • ${name}` });
}

function getFilteredTeachers() {
  const keyword = normalize(document.getElementById("teacherSearch")?.value);
  const major = document.getElementById("teacherMajor")?.value || "";
  const status = document.getElementById("teacherStatus")?.value || "";
  return headDepartmentState.teachers.filter(t => {
    const search = normalize(`${t.name} ${t.email} ${t.id}`);
    return (!keyword || search.includes(keyword)) && (!major || t.major === major) && (!status || t.status === status);
  });
}
function renderTeachers() {
  const tbody = document.getElementById("teacherTableBody"); const empty = document.getElementById("teacherEmptyState"); if (!tbody || !empty) return;
  const teachers = getFilteredTeachers(); empty.classList.toggle("show", teachers.length === 0);
  tbody.innerHTML = teachers.map(t => `<tr>
    <td><span class="hd-table-primary">${escapeHtml(t.name)}</span><span class="hd-table-secondary">${escapeHtml(t.id)}</span></td>
    <td>${escapeHtml(t.major)}</td><td>${escapeHtml(t.email)}</td><td>${teacherStatusHtml(t.status,t.role)}</td>
    <td><button type="button" class="hd-btn hd-btn-outline hd-btn-sm" onclick="openTeacherModal('${escapeHtml(t.id)}')"><i class="fa-solid fa-pen"></i>แก้ไข</button></td>
  </tr>`).join("");
}
function getNextTeacherId() {
  const max = Math.max(0, ...headDepartmentState.teachers.map(t => Number(t.id.replace(/\D/g,"")) || 0));
  return `T${String(max + 1).padStart(3,"0")}`;
}
function openTeacherModal(id = "") {
  document.getElementById("teacherForm").reset(); document.getElementById("teacherEditId").value = id; document.getElementById("teacherFormStatus").value = "active";
  const t = id ? findTeacher(id) : null; document.getElementById("teacherModalTitle").textContent = t ? "แก้ไขข้อมูลอาจารย์" : "เพิ่มอาจารย์";
  if (t) { document.getElementById("teacherFormName").value = t.name; document.getElementById("teacherFormEmail").value = t.email; document.getElementById("teacherFormMajor").value = t.major; document.getElementById("teacherFormStatus").value = t.status; }
  openModal("teacherModal");
}
function submitTeacherForm(event) {
  event.preventDefault();
  const editId = document.getElementById("teacherEditId").value;
  const name = document.getElementById("teacherFormName").value.trim();
  const email = document.getElementById("teacherFormEmail").value.trim();
  const major = document.getElementById("teacherFormMajor").value;
  const status = document.getElementById("teacherFormStatus").value;
  const password = document.getElementById("teacherFormPassword").value;
  if (!name || !email || !major || !status) { showToast({ type:"warning", title:"กรอกข้อมูลไม่ครบ", message:"กรุณากรอกข้อมูลอาจารย์ให้ครบถ้วน" }); return; }
  if (password && password.length < 6) { showToast({ type:"warning", title:"รหัสผ่านสั้นเกินไป", message:"รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }); return; }
  const duplicate = headDepartmentState.teachers.some(t => t.email.toLowerCase() === email.toLowerCase() && t.id !== editId);
  if (duplicate) { showToast({ type:"error", title:"อีเมลซ้ำ", message:"มีอาจารย์ใช้อีเมลนี้ในระบบแล้ว" }); return; }
  if (editId) {
    const t = findTeacher(editId); if (!t) return; t.name = name; t.email = email; t.major = major; t.status = status;
    closeModal("teacherModal"); commitStateChanges(); showToast({ type:"success", title:"แก้ไขข้อมูลอาจารย์แล้ว", message:name });
  } else {
    headDepartmentState.teachers.push({ id:getNextTeacherId(), name, email, major, status, role:"teacher" });
    closeModal("teacherModal"); commitStateChanges(); showToast({ type:"success", title:"เพิ่มอาจารย์เรียบร้อยแล้ว", message:name });
  }
}

function loadProfileForm() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (user) { headDepartmentState.profile.name = user.name || headDepartmentState.profile.name; headDepartmentState.profile.email = user.email || headDepartmentState.profile.email; }
  const p = headDepartmentState.profile;
  document.getElementById("profileName").value = p.name; document.getElementById("profileEmail").value = p.email; document.getElementById("profileMajor").value = p.major; document.getElementById("profilePassword").value = ""; document.getElementById("profileConfirmPassword").value = "";
  updateProfileSummary();
}
function updateProfileSummary() {
  const p = headDepartmentState.profile;
  document.getElementById("headerUserName").textContent = p.name; document.getElementById("overviewGreeting").textContent = `ยินดีต้อนรับ, ${p.name}`;
  document.getElementById("profileSummaryName").textContent = p.name; document.getElementById("profileSummaryEmail").textContent = p.email; document.getElementById("profileSummaryMajor").textContent = p.major;
  const clean = p.name.replace(/^(ผศ\.ดร\.|รศ\.ดร\.|ศ\.ดร\.|ดร\.|ผศ\.|รศ\.|ศ\.)/u,"").trim(); document.getElementById("profileAvatar").textContent = clean.charAt(0) || "ห";
}
function submitProfileForm(event) {
  event.preventDefault(); const name = document.getElementById("profileName").value.trim(); const email = document.getElementById("profileEmail").value.trim(); const password = document.getElementById("profilePassword").value; const confirm = document.getElementById("profileConfirmPassword").value;
  if (!name || !email) { showToast({ type:"warning", title:"กรอกข้อมูลไม่ครบ", message:"กรุณากรอกชื่อและอีเมล" }); return; }
  if (password && password.length < 6) { showToast({ type:"warning", title:"รหัสผ่านสั้นเกินไป", message:"รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }); return; }
  if (password !== confirm) { showToast({ type:"error", title:"รหัสผ่านไม่ตรงกัน", message:"รหัสผ่านใหม่และยืนยันรหัสผ่านต้องตรงกัน" }); return; }
  headDepartmentState.profile.name = name; headDepartmentState.profile.email = email;
  const current = JSON.parse(localStorage.getItem("currentUser") || "{}"); localStorage.setItem("currentUser", JSON.stringify({ ...current, name, email })); saveMockState(); loadProfileForm();
  showToast({ type:"success", title:"บันทึกข้อมูลส่วนตัวแล้ว", message:password ? "ข้อมูลส่วนตัวและรหัสผ่านถูกอัปเดตใน Mockup" : "ข้อมูลส่วนตัวถูกอัปเดตเรียบร้อยแล้ว" });
}

function openModal(id) { const modal = document.getElementById(id); if (!modal) return; modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow = "hidden"; }
function closeModal(id) { const modal = document.getElementById(id); if (!modal) return; modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); if (!document.querySelector(".hd-modal.show")) document.body.style.overflow = ""; }
function showConfirm({ title="ยืนยันการดำเนินการ", message="", confirmText="ยืนยัน", tone="primary" } = {}) {
  return new Promise(resolve => {
    const titleEl = document.getElementById("confirmTitle"); const messageEl = document.getElementById("confirmMessage"); const ok = document.getElementById("confirmOkButton"); const cancel = document.getElementById("confirmCancelButton"); const icon = document.getElementById("confirmIcon");
    titleEl.textContent = title; messageEl.textContent = message; ok.textContent = confirmText; ok.className = tone === "danger" ? "hd-btn hd-btn-danger" : "hd-btn hd-btn-primary"; icon.innerHTML = tone === "danger" ? '<i class="fa-solid fa-triangle-exclamation"></i>' : '<i class="fa-solid fa-circle-question"></i>';
    const finish = result => { ok.onclick = null; cancel.onclick = null; closeModal("confirmModal"); resolve(result); };
    ok.onclick = () => finish(true); cancel.onclick = () => finish(false); openModal("confirmModal");
  });
}
function showToast({ type="success", title="สำเร็จ", message="", duration=3200 } = {}) {
  const container = document.getElementById("toastContainer"); if (!container) return;
  const icons = { success:"fa-circle-check", error:"fa-circle-xmark", warning:"fa-triangle-exclamation", info:"fa-circle-info" };
  const toast = document.createElement("div"); toast.className = `hd-toast ${type}`; toast.innerHTML = `<div class="hd-toast-icon"><i class="fa-solid ${icons[type] || icons.info}"></i></div><div><strong>${escapeHtml(title)}</strong>${message ? `<span>${escapeHtml(message)}</span>` : ""}</div><button type="button" aria-label="ปิด"><i class="fa-solid fa-xmark"></i></button>`;
  const remove = () => toast.remove(); toast.querySelector("button").addEventListener("click", remove); container.appendChild(toast); setTimeout(remove, duration);
}
function commitStateChanges() { saveMockState(); updateOverview(); renderStudents(); renderRequests(); renderAdvisors(); renderTeachers(); }
async function logoutHeadDepartment() {
  const ok = await showConfirm({ title:"ออกจากระบบ", message:"ต้องการออกจากระบบหรือไม่?", confirmText:"ออกจากระบบ", tone:"danger" }); if (!ok) return;
  localStorage.removeItem("currentUser");
  if (typeof window.logout === "function") { window.logout(); return; }
  window.location.href = "login.html";
}

function bindStaticEvents() {
  document.querySelectorAll(".hd-sidebar-item[data-panel]").forEach(btn => btn.addEventListener("click", () => switchHeadPanel(btn.dataset.panel)));
  document.querySelectorAll("[data-coop-tab]").forEach(btn => btn.addEventListener("click", () => switchCoopTab(btn.dataset.coopTab)));
  document.querySelectorAll("[data-request-filter]").forEach(btn => btn.addEventListener("click", () => setRequestFilter(btn.dataset.requestFilter)));
  ["studentSearch","studentMajor","studentRequestStatus"].forEach(id => { document.getElementById(id)?.addEventListener("input", renderStudents); document.getElementById(id)?.addEventListener("change", renderStudents); });
  ["requestSearch","requestMajor"].forEach(id => { const el = document.getElementById(id); el?.addEventListener("input", () => { headDepartmentState.selectedRequestIds.clear(); renderRequests(); }); el?.addEventListener("change", () => { headDepartmentState.selectedRequestIds.clear(); renderRequests(); }); });
  ["advisorSearch","advisorMajor","advisorStatus"].forEach(id => { document.getElementById(id)?.addEventListener("input", renderAdvisors); document.getElementById(id)?.addEventListener("change", renderAdvisors); });
  ["teacherSearch","teacherMajor","teacherStatus"].forEach(id => { document.getElementById(id)?.addEventListener("input", renderTeachers); document.getElementById(id)?.addEventListener("change", renderTeachers); });
  document.getElementById("selectAllRequests")?.addEventListener("change", event => { const checked = event.target.checked; document.querySelectorAll(".request-row-checkbox").forEach(cb => { cb.checked = checked; checked ? headDepartmentState.selectedRequestIds.add(cb.dataset.studentId) : headDepartmentState.selectedRequestIds.delete(cb.dataset.studentId); }); updateBulkApproveState(); });
  document.getElementById("teacherForm")?.addEventListener("submit", submitTeacherForm);
  document.getElementById("profileForm")?.addEventListener("submit", submitProfileForm);
  document.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => { const modal = btn.closest(".hd-modal"); if (modal) closeModal(modal.id); }));
  document.querySelectorAll(".hd-modal").forEach(modal => modal.addEventListener("mousedown", event => { if (event.target === modal && modal.id !== "confirmModal") closeModal(modal.id); }));
  document.addEventListener("keydown", event => { if (event.key === "Escape") { const modal = Array.from(document.querySelectorAll(".hd-modal.show")).pop(); if (modal && modal.id !== "confirmModal") closeModal(modal.id); } });
}

document.addEventListener("DOMContentLoaded", () => {
  loadMockState(); bindStaticEvents(); loadProfileForm(); updateOverview(); renderStudents(); renderRequests(); renderAdvisors(); renderTeachers();
});

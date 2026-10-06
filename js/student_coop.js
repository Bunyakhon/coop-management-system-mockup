/* =========================================================
   STUDENT CO-OP REDESIGN
   Frontend mockup for student scope 2-18.
   Scope 1 (registration + real Google OAuth) belongs to
   login/register and requires OAuth credentials/backend.
   ========================================================= */

"use strict";

const ADVISORS = [
  { id:"A001", name:"ผศ.ดร.นิติการ นาคเจือทอง", major:"IT" },
  { id:"A002", name:"ผศ.ดร.สุพาภรณ์ ซิ้มเจริญ", major:"INE" },
  { id:"A003", name:"ผศ.ดร.ขนิษฐา นามี", major:"IT" },
  { id:"A004", name:"ผศ.ดร.สุปีติ กุลจันทร์", major:"INE" },
  { id:"A005", name:"ผศ.ดร.วันทนี ประจวบศุภกิจ", major:"INE" },
  { id:"A006", name:"ผศ.ดร.สิวาลัย จินเจือ", major:"IT" },
];

const COMPANIES = [
  {id:"C001",name:"BlueWave Digital Co., Ltd.",province:"ชลบุรี",position:"Frontend Developer",major:["IT","INE"],type:"Software",slots:2,skills:["HTML","CSS","JavaScript","React","Git","REST API"],description:"พัฒนา Web Application และ Dashboard สำหรับลูกค้าภาคธุรกิจ"},
  {id:"C002",name:"DataSphere Thailand",province:"กรุงเทพมหานคร",position:"Junior Data Analyst",major:["IT"],type:"Data",slots:3,skills:["Python","SQL","Power BI","Excel","Data Analysis"],description:"วิเคราะห์ข้อมูลธุรกิจและสร้าง Dashboard"},
  {id:"C003",name:"CloudNova Systems Co., Ltd.",province:"กรุงเทพมหานคร",position:"Cloud Engineer Intern",major:["INE","IT"],type:"Cloud",slots:2,skills:["Linux","Docker","Cloud","Networking","Git"],description:"ดูแล Cloud Infrastructure, Container และ Monitoring"},
  {id:"C004",name:"NextWave Technology Co., Ltd.",province:"ระยอง",position:"Network Engineer",major:["INE"],type:"Network",slots:2,skills:["Networking","Cisco","Linux","Troubleshooting"],description:"ออกแบบและดูแลระบบเครือข่ายสำหรับองค์กร"},
  {id:"C005",name:"SecureLink Cyber Co., Ltd.",province:"กรุงเทพมหานคร",position:"Cybersecurity Analyst Intern",major:["INE","IT"],type:"Cybersecurity",slots:1,skills:["Cybersecurity","Linux","Networking","SIEM","Python"],description:"สนับสนุนงาน Security Operations"},
  {id:"C006",name:"BrightCode Solutions Co., Ltd.",province:"ปทุมธานี",position:"Mobile Application Developer",major:["IT"],type:"Software",slots:2,skills:["JavaScript","React Native","API","Git","UI/UX"],description:"พัฒนา Mobile Application และระบบหลังบ้าน"},
];

const EVALUATION_CRITERIA = [
  ["jobSuitability","ลักษณะงานตรงกับสาขาวิชา","งานที่ได้รับมอบหมายสอดคล้องกับความรู้และทักษะ"],
  ["mentorSupport","การดูแลของพี่เลี้ยง","ให้คำแนะนำ ติดตาม และสนับสนุนการทำงาน"],
  ["workEnvironment","สภาพแวดล้อมในการทำงาน","เหมาะสม ปลอดภัย และเอื้อต่อการเรียนรู้"],
  ["learningOpportunity","โอกาสในการเรียนรู้","ได้เรียนรู้เครื่องมือและประสบการณ์ใหม่"],
  ["cooperation","ความร่วมมือกับภาควิชา","ประสานงานกับมหาวิทยาลัยได้ดี"],
];

const CHAT_KB = [
  [["เอกสาร","ขอฝึกงาน"],"ขั้นตอนหลักคือ เตรียมประวัติและ Resume → เลือกสถานประกอบการ → ยื่นคำร้อง → รอพิจารณา → ติดตามหนังสือขอความอนุเคราะห์และหนังสือส่งตัวในเมนู “คำร้องและเอกสาร”"],
  [["หนังสือขอความอนุเคราะห์","ความอนุเคราะห์"],"หนังสือขอความอนุเคราะห์เป็นเอกสารที่ภาควิชาใช้ติดต่อสถานประกอบการเพื่อขอรับนักศึกษาเข้าปฏิบัติงานสหกิจ ติดตามได้ที่ “คำร้องและเอกสาร → ติดตามเอกสาร”"],
  [["สถานะคำร้อง","ตรวจสอบคำร้อง","คำร้อง"],"ไปที่ “คำร้องและเอกสาร → คำร้องสหกิจ” เพื่อดูเลขคำร้อง วันที่ยื่น และสถานะล่าสุด"],
  [["โปสเตอร์","อัปโหลดโปสเตอร์"],"อัปโหลดโปสเตอร์ได้ที่ “โครงการสหกิจ → เอกสารโครงการ” รองรับ PDF หรือรูปภาพ"],
  [["ยกเลิก","ยกเลิกคำร้อง"],"ไปที่ “คำร้องและเอกสาร → คำร้องสหกิจ” แล้วกด “ยกเลิกคำร้อง” ระบบจะถามยืนยันก่อนยกเลิก"],
  [["resume","เรซูเม่"],"ไปที่ “เตรียมสมัครสหกิจ → Resume” แล้วอัปโหลด PDF จากนั้นหน้า “แนะนำสำหรับฉัน” จะจำลอง Job Match จากทักษะและสาขา"],
  [["พี่เลี้ยง"],"บันทึกข้อมูลพี่เลี้ยงได้ที่ “โครงการสหกิจ → พี่เลี้ยง” โดยกรอก Email ชื่อ นามสกุล และตำแหน่ง"],
  [["อาจารย์ที่ปรึกษา","ที่ปรึกษาโครงการ"],"อาจารย์ที่ปรึกษาประจำอยู่ใน “ข้อมูลของฉัน” ส่วนอาจารย์ที่ปรึกษาโครงการอยู่ที่ “โครงการสหกิจ → อาจารย์ที่ปรึกษา”"],
];

const state = {
  profile:{
    firstName:"พิมพ์ชนก",lastName:"สุขใจ",studentId:"6702458196",major:"INE",year:"4",gpa:"3.28",
    birthDate:"2004-03-08",height:"165",weight:"52",nationality:"ไทย",ethnicity:"ไทย",religion:"พุทธ",bloodGroup:"O",
    disease:"ไม่มี",allergy:"ไม่มี",talent:"ออกแบบ UI และนำเสนอผลงาน",skills:["HTML","CSS","JavaScript","React","Git"],academicAdvisorId:"A002",
    hometown:"กรุงเทพมหานคร",phone:"0812345678",currentAddress:"123 ถนนสุขุมวิท กรุงเทพมหานคร",
    fatherName:"นายสมชาย สุขใจ",fatherAge:"52",fatherOccupation:"ค้าขาย",fatherAddress:"กรุงเทพมหานคร",fatherPhone:"0811111111",
    motherName:"นางสมหญิง สุขใจ",motherAge:"49",motherOccupation:"พนักงานบริษัท",motherAddress:"กรุงเทพมหานคร",motherPhone:"0822222222",
    emergencyName:"นายสมชาย สุขใจ",emergencyRelation:"บิดา",emergencyAddress:"กรุงเทพมหานคร",emergencyPhone:"0811111111"
  },
  account:{email:"student@fitm.kmutnb.ac.th",googleConnected:true},
  runtime:{photoDataUrl:null,resumeObjectUrl:null},
  resume:null,
  selectedCompanyId:"C001",
  request:{
    id:"COOP-2569-0012",
    companyId:"C001",
    submittedDate:"2026-08-20",
    status:"approved",
    stage:"started",
    startDate:"2026-09-01",
    endDate:"2026-12-18",
    form:{
      subject:"ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา",
      to:"หัวหน้าภาควิชาเทคโนโลยีสารสนเทศ",
      companyThai:"บริษัท บลูเวฟ ดิจิทัล จำกัด",
      attention:"ผู้จัดการฝ่ายทรัพยากรบุคคล",
      department:"ฝ่ายพัฒนาซอฟต์แวร์",
      address:"ชลบุรี",
      companyContacted:true,
      deliveryMethod:"email",
      deliveryEmail:"hr@bluewave.co.th",
      studentCertification:true,
      courses:[
        {code:"060233107",name:"ระบบฐานข้อมูล",status:"passed",grade:"B+"},
        {code:"060233112",name:"วิศวกรรมข้อมูล",status:"passed",grade:"B"},
        {code:"060233113",name:"การเขียนโปรแกรมคอมพิวเตอร์ขั้นสูง",status:"passed",grade:"A"},
        {code:"060233201",name:"ปฏิบัติการวิศวกรรมเครือข่าย 1",status:"studying",grade:""},
        {code:"060233204",name:"การออกแบบและการจัดทำเครือข่ายคอมพิวเตอร์",status:"passed",grade:"B+"}
      ]
    },
    advisorApproval:{status:"approved",qualified:"ครบ",decision:"เห็นควรให้นักศึกษาสหกิจศึกษากับบริษัท/หน่วยงาน",date:"2026-08-22"},
    headApproval:{status:"approved",decision:"อนุญาต และดำเนินการจัดทำหนังสือขอความอนุเคราะห์",note:"ผ่านคุณสมบัติตามเกณฑ์",date:"2026-08-23"}
  },
  requestHistory:[
    {id:"COOP-2569-0008",companyName:"บริษัท อินโฟเวฟ ดิจิทัล จำกัด",position:"Frontend Developer",submittedDate:"2026-08-08",status:"cancelled"},
    {id:"COOP-2569-0005",companyName:"บริษัท ดีไซน์พลัส เทคโนโลยี จำกัด",position:"UI/UX Designer",submittedDate:"2026-07-28",status:"rejected"},
    {id:"COOP-2569-0002",companyName:"บริษัท สมาร์ทดาต้า อินไซต์ จำกัด",position:"Data Visualization",submittedDate:"2026-07-15",status:"cancelled"}
  ],
  requestDraft:null,
  project:{
    advisorId:"A002",advisorSystemConfirmed:true,studentAcknowledged:false,
    titleTh:"ระบบจัดการและวิเคราะห์ข้อมูลสำหรับสถานประกอบการ",
    titleEn:"Business Data Management and Analytics System",
    summary:"พัฒนาระบบ Web Application สำหรับจัดการข้อมูลและสรุปผลในรูปแบบ Dashboard",
    topicStatus:"draft",
    mentor:{email:"",firstName:"",lastName:"",position:"",saved:false},
    files:{projectBook:null,poster:null}
  },
  dailyLogs:[
    {id:1,date:"2026-10-01",startTime:"08:30",endTime:"17:00",work:"ศึกษาระบบเดิมและออกแบบโครงสร้างหน้า Dashboard",problem:"ต้องทำความเข้าใจข้อมูลหลายส่วน",learning:"เรียนรู้การวิเคราะห์ Requirement และออกแบบ UI",status:"submitted"},
    {id:2,date:"2026-10-02",startTime:"08:30",endTime:"17:00",work:"พัฒนา Frontend หน้า Dashboard และเชื่อมข้อมูล Mock",problem:"",learning:"ฝึก Responsive Design",status:"submitted"}
  ],
  evaluation:{status:"pending",scores:{},comment:""},
  chatHistory:[{role:"assistant",text:"สวัสดีครับ ผมคือ KIWI Assistant ถามเรื่องคำร้อง เอกสาร Resume สถานประกอบการ อาจารย์ที่ปรึกษา พี่เลี้ยง หรือโครงการสหกิจได้ครับ"}]
};

function escapeHtml(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function normalize(v){return String(v??"").trim().toLowerCase()}
function findCompany(id){return COMPANIES.find(c=>c.id===id)}
function findAdvisor(id){return ADVISORS.find(a=>a.id===id)}
function fullName(){return `${state.profile.firstName} ${state.profile.lastName}`.trim()}
function formatThaiDate(v){if(!v)return"-";const d=new Date(`${v}T00:00:00`);return isNaN(d)?v:d.toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"numeric"})}
function formatFileSize(bytes){if(bytes===undefined||bytes===null)return"-";const u=["B","KB","MB","GB"];let s=+bytes,i=0;while(s>=1024&&i<u.length-1){s/=1024;i++}return `${s.toFixed(i?1:0)} ${u[i]}`}
function calcAge(v){if(!v)return"";const b=new Date(`${v}T00:00:00`),t=new Date();let a=t.getFullYear()-b.getFullYear();const m=t.getMonth()-b.getMonth();if(m<0||(m===0&&t.getDate()<b.getDate()))a--;return a>=0?a:""}
function hoursBetween(s,e){if(!s||!e)return 0;const [sh,sm]=s.split(":").map(Number),[eh,em]=e.split(":").map(Number);return Math.max(0,+(((eh*60+em)-(sh*60+sm))/60).toFixed(1))}

function saveState(){
  const safe={profile:state.profile,account:state.account,resume:state.resume,selectedCompanyId:state.selectedCompanyId,request:state.request,requestHistory:state.requestHistory,requestDraft:state.requestDraft,project:state.project,dailyLogs:state.dailyLogs,evaluation:state.evaluation,chatHistory:state.chatHistory.slice(-30)};
  localStorage.setItem("studentCoopRedesignState",JSON.stringify(safe));
}
function loadState(){
  try{
    const saved=JSON.parse(localStorage.getItem("studentCoopRedesignState")||"null");
    if(!saved)return;
    for(const [k,v] of Object.entries(saved)){
      if(k in state&&k!=="runtime"){
        state[k]=(typeof state[k]==="object"&&!Array.isArray(state[k])&&state[k]!==null)?{...state[k],...v}:v;
      }
    }
  }catch(e){console.warn(e)}
}

function switchStudentPanel(id){
  document.querySelectorAll(".sc-panel").forEach(p=>p.classList.toggle("active",p.id===id));
  document.querySelectorAll(".sc-sidebar-item[data-panel]").forEach(b=>b.classList.toggle("active",b.dataset.panel===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function switchTab(group,name){
  document.querySelectorAll(`[data-${group}-tab]`).forEach(b=>b.classList.toggle("active",b.dataset[`${group}Tab`]===name));
  document.querySelectorAll(`[data-${group}-tab-panel]`).forEach(p=>p.classList.toggle("active",p.dataset[`${group}TabPanel`]===name));
}
function goToPanel(id){switchStudentPanel(id)}

function profileCompletion(){
  const keys=["firstName","lastName","studentId","major","year","gpa","birthDate","height","weight","nationality","ethnicity","religion","bloodGroup","disease","allergy","talent","academicAdvisorId","hometown","phone","currentAddress","fatherName","fatherOccupation","fatherPhone","motherName","motherOccupation","motherPhone","emergencyName","emergencyRelation","emergencyPhone"];
  let done=keys.filter(k=>String(state.profile[k]??"").trim()).length;
  if(state.profile.skills.length)done++;
  return Math.round(done/(keys.length+1)*100);
}

function getDocumentStatuses(){
  if(!state.request)return[
    {title:"คำร้องสหกิจศึกษา",state:"waiting",text:"ยังไม่ได้ยื่นคำร้อง"},
    {title:"หนังสือขอความอนุเคราะห์",state:"waiting",text:"รอคำร้อง"},
    {title:"หนังสือส่งตัวนักศึกษา",state:"waiting",text:"รอคำร้องและการตอบรับ"}
  ];
  if(state.request.status==="pending")return[
    {title:"คำร้องสหกิจศึกษา",state:"current",text:"รอพิจารณา"},
    {title:"หนังสือขอความอนุเคราะห์",state:"waiting",text:"จะดำเนินการหลังคำร้องผ่าน"},
    {title:"หนังสือส่งตัวนักศึกษา",state:"waiting",text:"ยังไม่ออกเอกสาร"}
  ];
  if(state.request.status==="approved")return[
    {title:"คำร้องสหกิจศึกษา",state:"done",text:"อนุมัติแล้ว"},
    {title:"หนังสือขอความอนุเคราะห์",state:"done",text:"จัดทำแล้ว"},
    {title:"หนังสือส่งตัวนักศึกษา",state:"current",text:"อยู่ระหว่างจัดทำ"}
  ];
  if(state.request.status==="cancelled")return[
    {title:"คำร้องสหกิจศึกษา",state:"current",text:"ยกเลิกคำร้องแล้ว"},
    {title:"หนังสือขอความอนุเคราะห์",state:"waiting",text:"ยังไม่ดำเนินการ"},
    {title:"หนังสือส่งตัวนักศึกษา",state:"waiting",text:"ยังไม่ดำเนินการ"}
  ];
  return[
    {title:"คำร้องสหกิจศึกษา",state:"current",text:"ไม่อนุมัติ"},
    {title:"หนังสือขอความอนุเคราะห์",state:"waiting",text:"ไม่ดำเนินการ"},
    {title:"หนังสือส่งตัวนักศึกษา",state:"waiting",text:"ไม่ดำเนินการ"}
  ];
}
function requestLabel(s){return({pending:"รอพิจารณา",approved:"อนุมัติแล้ว",rejected:"ไม่อนุมัติ",cancelled:"ยกเลิกแล้ว"}[s]||"ยังไม่ยื่น")}

function updateOverview(){
  const pc=profileCompletion(),docs=getDocumentStatuses(),ready=docs.filter(x=>x.state==="done").length;
  document.getElementById("statProfilePercent").textContent=`${pc}%`;
  document.getElementById("profilePercentBadge").textContent=`${pc}%`;
  document.getElementById("statResumeStatus").textContent=state.resume?"พร้อม":"ยังไม่มี";
  document.getElementById("statRequestStatus").textContent=requestLabel(state.request?.status);
  document.getElementById("statDocumentProgress").textContent=`${ready}/${docs.length}`;
  document.getElementById("statDailyLogs").textContent=state.dailyLogs.length;
  const pending=state.request?.status==="pending";
  document.getElementById("requestStatusBadge").textContent=pending?"1":"0";
  document.getElementById("requestStatusBadge").style.display=pending?"inline-flex":"none";
  let projectTasks=0;
  if(!state.project.advisorId)projectTasks++;
  if(state.project.advisorSystemConfirmed&&!state.project.studentAcknowledged)projectTasks++;
  if(!state.project.titleTh)projectTasks++;
  if(!state.project.mentor.saved)projectTasks++;
  if(!state.project.files.projectBook)projectTasks++;
  if(!state.project.files.poster)projectTasks++;
  document.getElementById("projectTaskBadge").textContent=projectTasks;
  document.getElementById("projectTaskBadge").style.display=projectTasks?"inline-flex":"none";
  document.getElementById("dailyLogBadge").textContent=state.dailyLogs.length;
  renderOverviewTasks(pc);
  renderWorkflow();
}

function renderOverviewTasks(pc){
  const tasks=[];
  if(pc<100)tasks.push(["fa-id-card","warning",`ข้อมูลประวัติครบ ${pc}%`,"กรอกข้อมูลให้ครบเพื่อใช้ในเอกสารและ Job Match","goToPanel('panel-profile')","แก้ไข"]);
  if(!state.resume)tasks.push(["fa-file-pdf","danger","ยังไม่ได้อัปโหลด Resume","อัปโหลด PDF เพื่อเปิดใช้คำแนะนำสถานประกอบการ","goToPanel('panel-prepare')","อัปโหลด"]);
  if(!state.request)tasks.push(["fa-file-signature","warning","ยังไม่ได้ยื่นคำร้องสหกิจ","เลือกสถานประกอบการแล้วส่งคำร้อง","goToPanel('panel-request')","ยื่นคำร้อง"]);
  else if(state.request.status==="pending")tasks.push(["fa-hourglass-half","warning","คำร้องกำลังรอพิจารณา","ติดตามสถานะในคำร้องและเอกสาร","goToPanel('panel-request')","ตรวจสอบ"]);
  if(state.project.advisorSystemConfirmed&&!state.project.studentAcknowledged)tasks.push(["fa-user-tie","purple","มีอาจารย์ที่ปรึกษาโครงการรอยืนยัน","ตรวจสอบชื่ออาจารย์และยืนยันข้อมูล","goToPanel('panel-project')","ตรวจสอบ"]);
  if(!state.project.files.poster)tasks.push(["fa-image","purple","ยังไม่ได้อัปโหลดโปสเตอร์","อัปโหลดในโครงการสหกิจ → เอกสารโครงการ","goToPanel('panel-project')","อัปโหลด"]);
  const el=document.getElementById("overviewTaskList");
  el.innerHTML=tasks.length?tasks.map(t=>`<div class="sc-task-row"><div class="icon ${t[1]}"><i class="fa-solid ${t[0]}"></i></div><div><strong>${escapeHtml(t[2])}</strong><span>${escapeHtml(t[3])}</span></div><button class="sc-btn sc-btn-outline sc-btn-sm" onclick="${t[4]}">${escapeHtml(t[5])}</button></div>`).join(""):`<div class="sc-info-banner"><i class="fa-solid fa-circle-check"></i><span>ไม่มีงานค้างที่ระบบตรวจพบ</span></div>`;
}

function renderWorkflow(){
  const steps=[
    ["กรอกประวัตินักศึกษา",profileCompletion()>=80,"ข้อมูลส่วนตัว การศึกษา ครอบครัว และทักษะ"],
    ["Resume และสถานประกอบการ",!!(state.resume&&state.selectedCompanyId),"อัปโหลด Resume และเลือกบริษัท"],
    ["ยื่นคำร้องสหกิจ",!!state.request,requestLabel(state.request?.status)],
    ["ข้อมูลโครงการและพี่เลี้ยง",!!(state.project.advisorId&&state.project.titleTh&&state.project.mentor.saved),"อาจารย์ หัวข้อ และพี่เลี้ยง"],
    ["บันทึกการปฏิบัติงาน",state.dailyLogs.length>0,`${state.dailyLogs.length} วัน`],
    ["ผลงานและการประเมิน",!!(state.project.files.projectBook&&state.project.files.poster&&state.evaluation.status==="submitted"),"รูปเล่ม โปสเตอร์ และประเมินสถานประกอบการ"]
  ];
  const current=steps.findIndex(x=>!x[1]);
  document.getElementById("overviewWorkflow").innerHTML=steps.map((s,i)=>`<div class="sc-timeline-step ${s[1]?"done":i===current?"current":""}"><span>${s[1]?'<i class="fa-solid fa-check"></i>':i+1}</span><div><strong>${escapeHtml(s[0])}</strong><small>${escapeHtml(s[2])}</small></div></div>${i<steps.length-1?'<div class="sc-timeline-line"></div>':""}`).join("");
}

function populateAdvisorOptions(){
  const opts=ADVISORS.map(a=>`<option value="${a.id}">${escapeHtml(a.name)} (${a.major})</option>`).join("");
  document.getElementById("profileAcademicAdvisor").innerHTML='<option value="">-- เลือกอาจารย์ --</option>'+opts;
  document.getElementById("projectAdvisorSelect").innerHTML='<option value="">-- เลือกอาจารย์ที่ปรึกษาโครงการ --</option>'+opts;
}
function loadProfileForms(){
  const p=state.profile;
  const map={profileFirstName:p.firstName,profileLastName:p.lastName,profileStudentId:p.studentId,profileMajor:p.major,profileYear:p.year,profileGpa:p.gpa,profileBirthDate:p.birthDate,profileAge:calcAge(p.birthDate),profileHeight:p.height,profileWeight:p.weight,profileNationality:p.nationality,profileEthnicity:p.ethnicity,profileReligion:p.religion,profileBloodGroup:p.bloodGroup,profileDisease:p.disease,profileAllergy:p.allergy,profileTalent:p.talent,profileAcademicAdvisor:p.academicAdvisorId,profileHometown:p.hometown,profilePhone:p.phone,profileCurrentAddress:p.currentAddress,fatherName:p.fatherName,fatherAge:p.fatherAge,fatherOccupation:p.fatherOccupation,fatherAddress:p.fatherAddress,fatherPhone:p.fatherPhone,motherName:p.motherName,motherAge:p.motherAge,motherOccupation:p.motherOccupation,motherAddress:p.motherAddress,motherPhone:p.motherPhone,emergencyName:p.emergencyName,emergencyRelation:p.emergencyRelation,emergencyAddress:p.emergencyAddress,emergencyPhone:p.emergencyPhone};
  Object.entries(map).forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.value=v??""});
  document.getElementById("accountEmail").value=state.account.email;
  document.getElementById("googleAccountEmail").textContent=state.account.email;
  document.getElementById("headerStudentName").textContent=fullName();
  document.getElementById("overviewGreeting").textContent=`ยินดีต้อนรับ, ${fullName()}`;
  renderSkills();
  const pc=profileCompletion();
  document.getElementById("profileCompletionValue").textContent=`${pc}%`;
  document.getElementById("profileCompletionBar").style.width=`${pc}%`;
}
function renderSkills(){
  document.getElementById("profileSkillTags").innerHTML=state.profile.skills.length?state.profile.skills.map((s,i)=>`<span class="sc-skill-tag">${escapeHtml(s)}<button type="button" onclick="removeProfileSkill(${i})"><i class="fa-solid fa-xmark"></i></button></span>`).join(""):`<span class="sc-table-secondary">ยังไม่มีทักษะ</span>`;
}
function addProfileSkill(){
  const e=document.getElementById("profileSkillInput"),v=e.value.trim();
  if(!v)return;
  if(state.profile.skills.some(x=>normalize(x)===normalize(v))){showToast({type:"warning",title:"มีทักษะนี้แล้ว",message:v});return}
  state.profile.skills.push(v);e.value="";saveState();renderSkills();renderRecommendations();updateOverview();
}
function removeProfileSkill(i){state.profile.skills.splice(i,1);saveState();renderSkills();renderRecommendations();updateOverview()}
function submitPersonalProfile(ev){
  ev.preventDefault();const p=state.profile;
  p.firstName=profileFirstName.value.trim();p.lastName=profileLastName.value.trim();p.major=profileMajor.value;p.year=profileYear.value;p.gpa=profileGpa.value;p.birthDate=profileBirthDate.value;p.height=profileHeight.value;p.weight=profileWeight.value;p.nationality=profileNationality.value.trim();p.ethnicity=profileEthnicity.value.trim();p.religion=profileReligion.value.trim();p.bloodGroup=profileBloodGroup.value;p.disease=profileDisease.value.trim();p.allergy=profileAllergy.value.trim();p.talent=profileTalent.value.trim();p.academicAdvisorId=profileAcademicAdvisor.value;
  profileAge.value=calcAge(p.birthDate);saveState();renderAll();showToast({type:"success",title:"บันทึกประวัตินักศึกษาแล้ว",message:fullName()});
}
function submitFamilyProfile(ev){
  ev.preventDefault();const p=state.profile;
  p.hometown=profileHometown.value.trim();p.phone=profilePhone.value.trim();p.currentAddress=profileCurrentAddress.value.trim();
  p.fatherName=fatherName.value.trim();p.fatherAge=fatherAge.value;p.fatherOccupation=fatherOccupation.value.trim();p.fatherAddress=fatherAddress.value.trim();p.fatherPhone=fatherPhone.value.trim();
  p.motherName=motherName.value.trim();p.motherAge=motherAge.value;p.motherOccupation=motherOccupation.value.trim();p.motherAddress=motherAddress.value.trim();p.motherPhone=motherPhone.value.trim();
  p.emergencyName=emergencyName.value.trim();p.emergencyRelation=emergencyRelation.value.trim();p.emergencyAddress=emergencyAddress.value.trim();p.emergencyPhone=emergencyPhone.value.trim();
  saveState();renderAll();showToast({type:"success",title:"บันทึกข้อมูลติดต่อแล้ว"});
}
function submitAccount(ev){
  ev.preventDefault();const email=accountEmail.value.trim(),pw=accountPassword.value,cf=accountConfirmPassword.value;
  if(!email){showToast({type:"warning",title:"กรุณากรอก Email"});return}
  if(pw&&pw.length<6){showToast({type:"warning",title:"รหัสผ่านสั้นเกินไป"});return}
  if(pw!==cf){showToast({type:"error",title:"รหัสผ่านไม่ตรงกัน"});return}
  state.account.email=email;const u=JSON.parse(localStorage.getItem("currentUser")||"{}");localStorage.setItem("currentUser",JSON.stringify({...u,email,name:fullName()}));
  accountPassword.value="";accountConfirmPassword.value="";saveState();loadProfileForms();showToast({type:"success",title:"บันทึกบัญชีแล้ว"});
}
function handleStudentPhoto(file){
  if(!file||!file.type.startsWith("image/"))return;
  const r=new FileReader();r.onload=()=>{state.runtime.photoDataUrl=r.result;studentPhotoPreview.innerHTML=`<img src="${r.result}" alt="รูปนักศึกษา">`};r.readAsDataURL(file);
}

function handleResumeFile(file){
  if(!file)return;
  if(!(file.type==="application/pdf"||file.name.toLowerCase().endsWith(".pdf"))){showToast({type:"error",title:"Resume ต้องเป็น PDF"});return}
  if(state.runtime.resumeObjectUrl)URL.revokeObjectURL(state.runtime.resumeObjectUrl);
  state.runtime.resumeObjectUrl=URL.createObjectURL(file);
  state.resume={name:file.name,size:file.size,uploadedAt:new Date().toISOString()};
  saveState();renderResume();renderRecommendations();updateOverview();showToast({type:"success",title:"อัปโหลด Resume แล้ว",message:file.name});
}
function renderResume(){
  if(!state.resume){resumeFileCard.innerHTML="";resumeUploadTitle.textContent="อัปโหลด Resume";resumeUploadDescription.textContent="ลากไฟล์ PDF มาวาง หรือเลือกไฟล์จากเครื่อง";return}
  resumeUploadTitle.textContent="Resume พร้อมใช้งาน";resumeUploadDescription.textContent="อัปโหลดใหม่เพื่อแทนที่ไฟล์เดิม";
  resumeFileCard.innerHTML=`<div class="sc-file-chip"><i class="fa-solid fa-file-pdf"></i><div><strong>${escapeHtml(state.resume.name)}</strong><span>${formatFileSize(state.resume.size)} • อัปโหลด ${new Date(state.resume.uploadedAt).toLocaleString("th-TH")}</span></div>${state.runtime.resumeObjectUrl?`<button class="sc-btn sc-btn-outline sc-btn-sm" onclick="window.open(state.runtime.resumeObjectUrl,'_blank')">ดูไฟล์</button>`:""}</div>`;
}
function companyMatch(c){
  const ps=state.profile.skills.map(normalize),cs=c.skills.map(normalize),matched=cs.filter(s=>ps.includes(s));
  let score=c.skills.length?Math.round(matched.length/c.skills.length*80):0;if(c.major.includes(state.profile.major))score+=15;if(state.resume)score+=5;return{score:Math.min(100,score),matched};
}
function companyCard(c,matchMode=false){
  const m=c.match||companyMatch(c),selected=state.selectedCompanyId===c.id;
  return `<article class="sc-company-card ${selected?"selected":""}"><div class="sc-company-head"><div class="sc-company-logo"><i class="fa-solid fa-building"></i></div>${selected?'<span class="sc-status sc-status-primary">เลือกแล้ว</span>':""}</div><h3>${escapeHtml(c.name)}</h3><div class="position">${escapeHtml(c.position)}</div><div class="sc-company-meta"><span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(c.province)}</span><span><i class="fa-solid fa-users"></i> ${c.slots} คน</span><span>${escapeHtml(c.type)}</span></div>${matchMode?`<div class="sc-match-box"><div class="row"><span>ความเหมาะสม</span><strong>${m.score}%</strong></div><div class="sc-match-progress"><span style="width:${m.score}%"></span></div></div>`:""}<div class="sc-company-skill-list">${c.skills.map(s=>`<span>${escapeHtml(s)}</span>`).join("")}</div><div class="sc-company-actions"><button class="sc-btn sc-btn-outline sc-btn-sm" onclick="openCompanyDetail('${c.id}')"><i class="fa-solid fa-eye"></i> ดูรายละเอียด</button><button class="sc-btn sc-btn-primary sc-btn-sm" onclick="selectCompanyForRequest('${c.id}')"><i class="fa-solid fa-bookmark"></i> ${selected?"เลือกอยู่":"สนใจบริษัทนี้"}</button></div></article>`;
}
function renderRecommendations(){
  if(!state.resume){recommendationInfo.innerHTML='<i class="fa-solid fa-circle-info"></i><span>กรุณาอัปโหลด Resume ก่อน ระบบจึงจะแสดงคำแนะนำ</span>';recommendationGrid.innerHTML='<div class="sc-empty show"><i class="fa-solid fa-file-arrow-up"></i><strong>ยังไม่มี Resume</strong><span>ไปที่แท็บ Resume แล้วอัปโหลด PDF</span></div>';return}
  recommendationInfo.innerHTML='<i class="fa-solid fa-wand-magic-sparkles"></i><span>Mockup คำนวณ Match จากสาขาและทักษะ ส่วนระบบจริงเชื่อม Resume Parser/Matching Backend ภายหลังได้</span>';
  recommendationGrid.innerHTML=COMPANIES.map(c=>({...c,match:companyMatch(c)})).sort((a,b)=>b.match.score-a.match.score).map(c=>companyCard(c,true)).join("");
}
function populateCompanyFilters(){
  companyProvinceFilter.innerHTML='<option value="">ทุกจังหวัด</option>'+[...new Set(COMPANIES.map(c=>c.province))].sort().map(p=>`<option>${escapeHtml(p)}</option>`).join("");
}
function renderCompanySearch(){
  const kw=normalize(companySearchInput.value),major=companyMajorFilter.value,province=companyProvinceFilter.value,type=companyTypeFilter.value;
  const arr=COMPANIES.filter(c=>(!kw||normalize(`${c.name} ${c.position} ${c.skills.join(" ")}`).includes(kw))&&(!major||c.major.includes(major))&&(!province||c.province===province)&&(!type||c.type===type));
  companySearchEmpty.classList.toggle("show",!arr.length);companySearchGrid.innerHTML=arr.map(c=>companyCard(c,false)).join("");
}
function openCompanyDetail(id){
  const c=findCompany(id);if(!c)return;const m=companyMatch(c);
  companyModalTitle.textContent=c.name;
  companyModalBody.innerHTML=`<div class="sc-grid-2"><div class="sc-selected-company"><h3>${escapeHtml(c.position)}</h3><p>${escapeHtml(c.description)}</p><div class="meta"><span>${escapeHtml(c.province)}</span><span>เปิดรับ ${c.slots} คน</span><span>${escapeHtml(c.type)}</span></div></div><div class="sc-selected-company"><h3>ความเหมาะสม ${m.score}%</h3><div class="sc-company-skill-list">${c.skills.map(s=>`<span>${escapeHtml(s)}</span>`).join("")}</div></div></div>`;
  companyModalFooter.innerHTML=`<button class="sc-btn sc-btn-outline" onclick="closeModal('companyModal')">ปิด</button><button class="sc-btn sc-btn-primary" onclick="selectCompanyForRequest('${c.id}');closeModal('companyModal')">เลือกสำหรับคำร้อง</button>`;
  openModal("companyModal");
}
function selectCompanyForRequest(id){state.selectedCompanyId=id;saveState();renderRecommendations();renderCompanySearch();renderRequestPanel();updateOverview();showToast({type:"success",title:"เลือกสถานประกอบการแล้ว",message:findCompany(id)?.name||""})}

const REQUEST_COURSES = [
  {code:"060233107",name:"ระบบฐานข้อมูล"},
  {code:"060233112",name:"วิศวกรรมข้อมูล"},
  {code:"060233113",name:"การเขียนโปรแกรมคอมพิวเตอร์ขั้นสูง"},
  {code:"060233201",name:"ปฏิบัติการวิศวกรรมเครือข่าย 1"},
  {code:"060233204",name:"การออกแบบและการจัดทำเครือข่ายคอมพิวเตอร์"}
];

function ensureRequestStateDefaults(){
  if(!Array.isArray(state.requestHistory)) state.requestHistory=[];
  if(!("requestDraft" in state)) state.requestDraft=null;

  if(state.request && !state.request.stage){
    state.request.stage = state.request.status === "approved" ? "courtesy" : "submitted";
  }

  if(state.request && !state.request.form){
    const c=findCompany(state.request.companyId)||findCompany(state.selectedCompanyId);
    state.request.form={
      subject:"ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา",
      to:"หัวหน้าภาควิชาเทคโนโลยีสารสนเทศ",
      companyThai:c?.name||"",
      attention:"ผู้จัดการฝ่ายทรัพยากรบุคคล",
      department:c?.position||"",
      address:c?.province||"",
      companyContacted:true,
      deliveryMethod:"email",
      deliveryEmail:"",
      studentCertification:true,
      courses:REQUEST_COURSES.map((course,index)=>({
        ...course,
        status:index===3?"studying":"passed",
        grade:index===3?"":"B"
      }))
    };
  }
}

function requestStageIndex(stage){
  const stages=["submitted","advisor","head","courtesy","referral","started"];
  const index=stages.indexOf(stage);
  return index < 0 ? 0 : index;
}

function renderRequestProgress(stage){
  const steps=[
    ["submitted","ยื่นคำร้อง","fa-file-pen"],
    ["advisor","อาจารย์ที่ปรึกษา","fa-user-tie"],
    ["head","หัวหน้าภาควิชา","fa-user-shield"],
    ["courtesy","หนังสือขอความอนุเคราะห์","fa-envelope-open-text"],
    ["referral","หนังสือส่งตัว","fa-file-arrow-right"],
    ["started","เริ่มสหกิจศึกษา","fa-briefcase"]
  ];

  const currentIndex=requestStageIndex(stage);

  return `<div class="sc-request-progress">${steps.map((step,index)=>{
    const done=index<=currentIndex;
    const current=index===currentIndex;
    return `<div class="sc-request-progress-step ${done?"done":""} ${current?"current":""}">
      <div class="sc-request-progress-icon">${done?'<i class="fa-solid fa-check"></i>':index+1}</div>
      <strong>${escapeHtml(step[1])}</strong>
    </div>`;
  }).join("")}</div>`;
}

function requestStatusClass(status){
  return {
    pending:"sc-status-warning",
    approved:"sc-status-primary",
    rejected:"sc-status-danger",
    cancelled:"sc-status-muted"
  }[status] || "sc-status-muted";
}

function renderRequestPanel(){
  ensureRequestStateDefaults();

  const container=document.getElementById("currentCoopRequestCard");
  const request=state.request;

  if(!request){
    container.innerHTML=`
      <div class="sc-current-request-empty">
        <i class="fa-solid fa-file-circle-plus"></i>
        <h3>ยังไม่มีคำร้องสหกิจศึกษาปัจจุบัน</h3>
        <p>เลือกสถานประกอบการจากเมนู “เตรียมสมัครสหกิจ” แล้วกด “ยื่นคำร้องสหกิจศึกษา” เพื่อกรอกแบบคำร้อง</p>
        <button class="sc-btn sc-btn-primary" type="button" onclick="openCoopRequestForm()">
          <i class="fa-solid fa-file-pen"></i>
          ยื่นคำร้องสหกิจศึกษา
        </button>
      </div>
    `;
  } else {
    const company=findCompany(request.companyId);
    const startDate=request.startDate||request.form?.startDate||"-";
    const endDate=request.endDate||request.form?.endDate||"-";
    const status=requestStatusClass(request.status);

    container.innerHTML=`
      <div class="sc-request-current-head">
        <div>
          <h2>${escapeHtml(company?.name||request.form?.companyThai||"-")} — ${escapeHtml(company?.position||request.form?.department||"-")}</h2>
          <p>คำร้องสหกิจศึกษาปัจจุบัน • ${escapeHtml(company?.province||request.form?.address||"-")}</p>
        </div>
        <span class="sc-status ${status}">${escapeHtml(requestLabel(request.status))}</span>
      </div>

      <div class="sc-request-current-body">
        ${renderRequestProgress(request.stage)}

        <div class="sc-request-current-info">
          <div><span>สถานประกอบการ</span><strong>${escapeHtml(company?.name||request.form?.companyThai||"-")}</strong></div>
          <div><span>ตำแหน่ง</span><strong>${escapeHtml(company?.position||request.form?.department||"-")}</strong></div>
          <div><span>จังหวัด</span><strong>${escapeHtml(company?.province||"-")}</strong></div>
          <div><span>วันที่ยื่นคำร้อง</span><strong>${escapeHtml(formatThaiDate(request.submittedDate))}</strong></div>
          <div><span>วันที่เริ่มสหกิจศึกษา</span><strong>${escapeHtml(formatThaiDate(startDate))}</strong></div>
          <div><span>วันที่สิ้นสุดสหกิจศึกษา</span><strong>${escapeHtml(formatThaiDate(endDate))}</strong></div>
        </div>

        <p class="sc-request-current-note">
          ${
            request.stage==="started"
              ? `คำร้องได้รับการอนุมัติแล้ว และนักศึกษาเริ่มปฏิบัติงานสหกิจศึกษาเมื่อวันที่ ${escapeHtml(formatThaiDate(startDate))}`
              : "สามารถติดตามขั้นตอนการพิจารณาและการจัดทำเอกสารได้จากแถบสถานะด้านบน"
          }
        </p>

        <div class="sc-request-current-actions">
          <button class="sc-btn sc-btn-primary" type="button" onclick="openCoopRequestForm()">
            <i class="fa-solid fa-file-pen"></i>
            ยื่นคำร้องสหกิจศึกษา
          </button>

          <button class="sc-btn sc-btn-outline" type="button" onclick="openCoopRequestDetail()">
            <i class="fa-solid fa-file-lines"></i>
            รายละเอียดคำร้อง
          </button>

          ${
            request.status==="pending"
              ? `<button class="sc-btn sc-btn-danger" type="button" onclick="cancelCoopRequest()">
                   <i class="fa-solid fa-ban"></i>
                   ยกเลิกคำร้องสหกิจศึกษา
                 </button>`
              : ""
          }
        </div>
      </div>
    `;
  }

  renderRequestHistory();
}

function renderRequestHistory(){
  const tbody=document.getElementById("requestHistoryTableBody");
  const empty=document.getElementById("requestHistoryEmpty");

  const rows=[];

  if(state.request){
    const currentCompany=findCompany(state.request.companyId);
    rows.push({
      id:state.request.id,
      companyName:currentCompany?.name||state.request.form?.companyThai||"-",
      position:currentCompany?.position||state.request.form?.department||"-",
      submittedDate:state.request.submittedDate,
      status:state.request.status,
      current:true
    });
  }

  (state.requestHistory||[]).forEach(item=>rows.push({...item,current:false}));

  empty.classList.toggle("show",rows.length===0);

  tbody.innerHTML=rows.map(item=>`
    <tr>
      <td>
        <span class="sc-table-primary">${escapeHtml(item.companyName)}</span>
        ${item.current?'<span class="sc-table-secondary">คำร้องปัจจุบัน</span>':""}
      </td>
      <td>${escapeHtml(item.position)}</td>
      <td>${escapeHtml(formatThaiDate(item.submittedDate))}</td>
      <td><span class="sc-status ${requestStatusClass(item.status)}">${escapeHtml(requestLabel(item.status))}</span></td>
    </tr>
  `).join("");

  setTableLabels();
}

function defaultRequestCourses(){
  return REQUEST_COURSES.map((course,index)=>({
    ...course,
    status:index===3?"studying":"passed",
    grade:index===3?"":"B"
  }));
}

function buildDefaultRequestFormData(){
  const company=findCompany(state.selectedCompanyId);
  return {
    subject:"ขอความอนุเคราะห์รับนักศึกษาสหกิจศึกษา",
    to:"หัวหน้าภาควิชาเทคโนโลยีสารสนเทศ",
    companyThai:company?.name||"",
    attention:"ผู้จัดการฝ่ายทรัพยากรบุคคล",
    department:company?.position||"",
    address:company?.province||"",
    startDate:"",
    endDate:"",
    companyContacted:false,
    deliveryMethod:"email",
    deliveryEmail:"",
    studentCertification:false,
    courses:defaultRequestCourses()
  };
}

function renderRequestCourseRows(courses){
  const rows=(courses?.length?courses:defaultRequestCourses());

  requestCourseTableBody.innerHTML=rows.map((course,index)=>`
    <tr data-course-index="${index}">
      <td>${index+1}</td>
      <td>
        <div class="sc-course-status-editor">
          <div class="sc-course-status-options">
            <label>
              <input type="radio" name="courseStatus${index}" value="passed" ${course.status==="passed"?"checked":""} />
              ผ่าน
            </label>
            <label>
              <input type="radio" name="courseStatus${index}" value="studying" ${course.status==="studying"?"checked":""} />
              กำลังศึกษา
            </label>
          </div>
          <input class="sc-course-grade" id="courseGrade${index}" type="text" value="${escapeHtml(course.grade||"")}" placeholder="เกรด" />
        </div>
      </td>
      <td><strong>${escapeHtml(course.code)}</strong></td>
      <td>${escapeHtml(course.name)}</td>
    </tr>
  `).join("");

  setTableLabels();
}

function populateRequestForm(data, mode="edit"){
  const company=findCompany(state.selectedCompanyId);

  requestSubject.value=data.subject||"";
  requestTo.value=data.to||"";
  requestCompanyThai.value=data.companyThai||company?.name||"";
  requestCompanyAttention.value=data.attention||"";
  requestCompanyDepartment.value=data.department||company?.position||"";
  requestCompanyAddress.value=data.address||company?.province||"";
  requestStartDate.value=data.startDate||"";
  requestEndDate.value=data.endDate||"";
  requestCompanyContacted.checked=!!data.companyContacted;
  requestStudentCertification.checked=!!data.studentCertification;
  requestDeliveryEmail.value=data.deliveryEmail||"";

  document.querySelectorAll('input[name="requestDeliveryMethod"]').forEach(radio=>{
    radio.checked=radio.value===(data.deliveryMethod||"");
  });

  requestDeliveryEmailField.classList.toggle("show",(data.deliveryMethod||"")==="email");

  requestStudentName.textContent=fullName();
  requestStudentId.textContent=state.profile.studentId||"-";
  requestStudentYear.textContent=state.profile.year||"-";
  requestStudentGpa.textContent=state.profile.gpa||"-";
  requestStudentPhone.textContent=state.profile.phone||"-";
  requestStudentEmail.textContent=state.account.email||"-";
  requestSignerName.textContent=fullName();
  requestSignerDate.textContent=formatThaiDate(new Date().toISOString().slice(0,10));

  requestSelectedCompanyPreview.innerHTML=company
    ? `<div class="sc-request-company-selected">
         <div class="icon"><i class="fa-solid fa-building"></i></div>
         <div class="content">
           <strong>${escapeHtml(company.name)}</strong>
           <span>${escapeHtml(company.position)} • ${escapeHtml(company.province)}</span>
         </div>
         ${
           mode==="edit"
             ? `<button class="sc-btn sc-btn-outline sc-btn-sm" type="button" onclick="closeModal('coopRequestFormModal');goToPanel('panel-prepare')">เปลี่ยน</button>`
             : ""
         }
       </div>`
    : `<div class="sc-info-banner"><i class="fa-solid fa-triangle-exclamation"></i><span>ยังไม่ได้เลือกสถานประกอบการ</span></div>`;

  renderRequestCourseRows(data.courses);

  const readonly=mode==="view";
  coopRequestForm.classList.toggle("sc-request-readonly-mode",readonly);

  saveRequestDraftButton.style.display=readonly?"none":"inline-flex";
  reviewRequestButton.style.display=readonly?"none":"inline-flex";

  renderRequestApprovalCards(readonly ? state.request : null);
}

function renderRequestApprovalCards(request){
  const advisor=findAdvisor(state.profile.academicAdvisorId);

  if(request?.advisorApproval?.status==="approved"){
    requestAdvisorApprovalCard.innerHTML=`
      <div class="sc-approval-grid">
        <div><span>อาจารย์ที่ปรึกษา</span><strong>${escapeHtml(advisor?.name||"-")}</strong></div>
        <div><span>คุณสมบัติตามเกณฑ์</span><strong>${escapeHtml(request.advisorApproval.qualified||"ครบ")}</strong></div>
        <div><span>ผลการพิจารณา</span><strong>${escapeHtml(request.advisorApproval.decision||"เห็นควร")}</strong></div>
        <div><span>วันที่</span><strong>${escapeHtml(formatThaiDate(request.advisorApproval.date))}</strong></div>
      </div>
      <div style="margin-top:12px"><span class="sc-status sc-status-success">อาจารย์อนุมัติแล้ว</span></div>
    `;
  }else{
    requestAdvisorApprovalCard.innerHTML=`
      <div class="sc-approval-grid">
        <div><span>อาจารย์ที่ปรึกษา</span><strong>${escapeHtml(advisor?.name||"-")}</strong></div>
        <div><span>สถานะ</span><strong>รอพิจารณาหลังส่งคำร้อง</strong></div>
      </div>
      <div style="margin-top:12px"><span class="sc-status sc-status-warning">รออาจารย์ที่ปรึกษาพิจารณา</span></div>
    `;
  }

  if(request?.headApproval?.status==="approved"){
    requestHeadApprovalCard.innerHTML=`
      <div class="sc-approval-grid">
        <div><span>ผลการพิจารณา</span><strong>${escapeHtml(request.headApproval.decision||"อนุญาต")}</strong></div>
        <div><span>วันที่</span><strong>${escapeHtml(formatThaiDate(request.headApproval.date))}</strong></div>
        <div><span>หมายเหตุ</span><strong>${escapeHtml(request.headApproval.note||"-")}</strong></div>
        <div><span>สถานะ</span><strong>อนุมัติแล้ว</strong></div>
      </div>
      <div style="margin-top:12px"><span class="sc-status sc-status-success">หัวหน้าภาควิชาอนุมัติแล้ว</span></div>
    `;
  }else{
    requestHeadApprovalCard.innerHTML=`
      <div class="sc-approval-grid">
        <div><span>ผลการพิจารณา</span><strong>รออาจารย์ที่ปรึกษาพิจารณาก่อน</strong></div>
        <div><span>สถานะ</span><strong>ยังไม่พิจารณา</strong></div>
      </div>
      <div style="margin-top:12px"><span class="sc-status sc-status-muted">รอหัวหน้าภาควิชาพิจารณา</span></div>
    `;
  }
}

function openCoopRequestForm(){
  const company=findCompany(state.selectedCompanyId);

  if(!company){
    showToast({type:"warning",title:"กรุณาเลือกสถานประกอบการ",message:"เลือกจากเมนู เตรียมสมัครสหกิจ ก่อนยื่นคำร้อง"});
    goToPanel("panel-prepare");
    return;
  }

  const data=state.requestDraft ? structuredClone(state.requestDraft) : buildDefaultRequestFormData();
  populateRequestForm(data,"edit");
  openModal("coopRequestFormModal");
}

function openCoopRequestDetail(){
  if(!state.request)return;

  const data={
    ...(state.request.form||buildDefaultRequestFormData()),
    startDate:state.request.startDate||state.request.form?.startDate||"",
    endDate:state.request.endDate||state.request.form?.endDate||""
  };

  populateRequestForm(data,"view");
  openModal("coopRequestFormModal");
}

function collectRequestFormData(){
  const courses=REQUEST_COURSES.map((course,index)=>{
    const status=document.querySelector(`input[name="courseStatus${index}"]:checked`)?.value||"";
    return {
      ...course,
      status,
      grade:document.getElementById(`courseGrade${index}`).value.trim()
    };
  });

  return {
    subject:requestSubject.value.trim(),
    to:requestTo.value.trim(),
    companyThai:requestCompanyThai.value.trim(),
    attention:requestCompanyAttention.value.trim(),
    department:requestCompanyDepartment.value.trim(),
    address:requestCompanyAddress.value.trim(),
    startDate:requestStartDate.value,
    endDate:requestEndDate.value,
    companyContacted:requestCompanyContacted.checked,
    deliveryMethod:document.querySelector('input[name="requestDeliveryMethod"]:checked')?.value||"",
    deliveryEmail:requestDeliveryEmail.value.trim(),
    studentCertification:requestStudentCertification.checked,
    courses
  };
}

function validateRequestForm(data){
  const errors=[];

  if(!data.subject) errors.push("กรุณากรอกเรื่อง");
  if(!data.to) errors.push("กรุณากรอกเรียน");
  if(!data.companyThai) errors.push("กรุณากรอกชื่อบริษัท / หน่วยงาน");
  if(!data.attention) errors.push("กรุณากรอกเรียนถึง");
  if(!data.department) errors.push("กรุณากรอกตำแหน่ง / หน่วยงาน");
  if(!data.address) errors.push("กรุณากรอกที่อยู่สถานประกอบการ");
  if(!data.startDate||!data.endDate) errors.push("กรุณาระบุวันเริ่มและวันสิ้นสุดสหกิจศึกษา");
  if(data.startDate&&data.endDate&&data.endDate<data.startDate) errors.push("วันสิ้นสุดต้องไม่ก่อนวันเริ่ม");
  if(!data.companyContacted) errors.push("กรุณายืนยันว่าได้ติดต่อสถานประกอบการแล้ว");
  if(!data.deliveryMethod) errors.push("กรุณาเลือกวิธีจัดส่งหนังสือ");
  if(data.deliveryMethod==="email"&&!data.deliveryEmail) errors.push("กรุณากรอก E-mail สำหรับจัดส่ง");
  if(!data.studentCertification) errors.push("กรุณารับรองความถูกต้องของข้อมูล");

  data.courses.forEach(course=>{
    if(!course.status) errors.push(`กรุณาระบุสถานะรายวิชา ${course.code}`);
    if(course.status==="passed"&&!course.grade) errors.push(`กรุณาระบุเกรดรายวิชา ${course.code}`);
  });

  return errors;
}

function saveCoopRequestDraft(){
  const data=collectRequestFormData();
  state.requestDraft=data;
  saveState();

  showToast({
    type:"success",
    title:"บันทึกฉบับร่างแล้ว",
    message:"สามารถกลับมาแก้ไขคำร้องต่อได้"
  });
}

function reviewCoopRequestBeforeSubmit(){
  const data=collectRequestFormData();
  const errors=validateRequestForm(data);

  if(errors.length){
    showToast({
      type:"warning",
      title:"กรุณาตรวจสอบข้อมูล",
      message:errors[0]
    });
    return;
  }

  state.requestDraft=data;
  saveState();

  const company=findCompany(state.selectedCompanyId);
  const passed=data.courses.filter(course=>course.status==="passed").length;
  const studying=data.courses.filter(course=>course.status==="studying").length;

  requestReviewBody.innerHTML=`
    <div class="sc-request-review-summary">
      <div class="sc-request-review-row"><span>นักศึกษา</span><strong>${escapeHtml(fullName())}</strong></div>
      <div class="sc-request-review-row"><span>สถานประกอบการ</span><strong>${escapeHtml(company?.name||data.companyThai)}</strong></div>
      <div class="sc-request-review-row"><span>ตำแหน่ง</span><strong>${escapeHtml(company?.position||data.department)}</strong></div>
      <div class="sc-request-review-row"><span>ระยะเวลา</span><strong>${escapeHtml(formatThaiDate(data.startDate))} - ${escapeHtml(formatThaiDate(data.endDate))}</strong></div>
      <div class="sc-request-review-row"><span>วิธีจัดส่งหนังสือ</span><strong>${escapeHtml({self:"นักศึกษายื่นด้วยตนเอง",post:"ภาควิชาจัดส่งทางไปรษณีย์",email:"ภาควิชาจัดส่งทาง E-mail"}[data.deliveryMethod]||"-")}</strong></div>
      <div class="sc-request-review-row"><span>รายวิชา</span><strong>ผ่าน ${passed}/${data.courses.length} รายวิชา${studying?` • กำลังศึกษา ${studying} รายวิชา`:""}</strong></div>
      <div class="sc-request-review-row"><span>สถานะการตรวจสอบ</span><strong style="color:var(--sc-success)">พร้อมส่งคำร้อง</strong></div>
    </div>
  `;

  openModal("coopRequestReviewModal");
}

function finalSubmitCoopRequest(){
  const data=state.requestDraft;

  if(!data){
    showToast({type:"error",title:"ไม่พบข้อมูลคำร้อง"});
    return;
  }

  const errors=validateRequestForm(data);
  if(errors.length){
    showToast({type:"warning",title:"ข้อมูลยังไม่ครบ",message:errors[0]});
    return;
  }

  if(state.request){
    const currentCompany=findCompany(state.request.companyId);
    state.requestHistory.unshift({
      id:state.request.id,
      companyName:currentCompany?.name||state.request.form?.companyThai||"-",
      position:currentCompany?.position||state.request.form?.department||"-",
      submittedDate:state.request.submittedDate,
      status:state.request.status
    });
  }

  const company=findCompany(state.selectedCompanyId);
  state.request={
    id:`COOP-${new Date().getFullYear()+543}-${String(Date.now()).slice(-5)}`,
    companyId:state.selectedCompanyId,
    submittedDate:new Date().toISOString().slice(0,10),
    status:"pending",
    stage:"submitted",
    startDate:data.startDate,
    endDate:data.endDate,
    form:structuredClone(data),
    advisorApproval:{status:"pending",qualified:"",decision:"",date:""},
    headApproval:{status:"pending",decision:"",note:"",date:""}
  };

  state.requestDraft=null;
  saveState();

  closeModal("coopRequestReviewModal");
  closeModal("coopRequestFormModal");

  renderAll();

  showToast({
    type:"success",
    title:"ส่งคำร้องสหกิจศึกษาแล้ว",
    message:`${company?.name||data.companyThai} • รออาจารย์ที่ปรึกษาพิจารณา`
  });
}

async function cancelCoopRequest(){
  if(state.request?.status!=="pending")return;

  const ok=await showConfirm({
    title:"ยกเลิกคำร้องสหกิจศึกษา",
    message:"ต้องการยกเลิกคำร้องปัจจุบันหรือไม่?",
    confirmText:"ยกเลิกคำร้อง",
    tone:"danger"
  });

  if(!ok)return;

  state.request.status="cancelled";

  const company=findCompany(state.request.companyId);
  state.requestHistory.unshift({
    id:state.request.id,
    companyName:company?.name||state.request.form?.companyThai||"-",
    position:company?.position||state.request.form?.department||"-",
    submittedDate:state.request.submittedDate,
    status:"cancelled"
  });

  state.request=null;
  saveState();
  renderAll();

  showToast({type:"success",title:"ยกเลิกคำร้องแล้ว"});
}

function resetCoopRequest(){
  state.request=null;
  saveState();
  renderAll();
}

function renderDocumentTimeline(){
  /* retained for compatibility with older calls; page now uses renderRequestProgress() */
}

function renderProject(){
  academicAdvisorDisplay.textContent=findAdvisor(state.profile.academicAdvisorId)?.name||"ยังไม่ได้บันทึก";
  projectAdvisorSelect.value=state.project.advisorId||"";
  const a=findAdvisor(state.project.advisorId);
  if(!state.project.advisorId)projectAdvisorStatus.innerHTML='<span class="sc-status sc-status-muted">ยังไม่ได้เลือกอาจารย์ที่ปรึกษาโครงการ</span>';
  else if(!state.project.advisorSystemConfirmed)projectAdvisorStatus.innerHTML=`<span class="sc-status sc-status-warning">รออาจารย์ยืนยัน</span><p>${escapeHtml(a?.name||"-")}</p>`;
  else if(!state.project.studentAcknowledged)projectAdvisorStatus.innerHTML=`<span class="sc-status sc-status-primary">อาจารย์ยืนยันแล้ว • รอนักศึกษาตรวจสอบ</span><p>${escapeHtml(a?.name||"-")}</p>`;
  else projectAdvisorStatus.innerHTML=`<span class="sc-status sc-status-success">ยืนยันข้อมูลครบแล้ว</span><p>${escapeHtml(a?.name||"-")}</p>`;
  acknowledgeAdvisorButton.disabled=!state.project.advisorSystemConfirmed||state.project.studentAcknowledged;
  projectTitleTh.value=state.project.titleTh||"";projectTitleEn.value=state.project.titleEn||"";projectSummary.value=state.project.summary||"";
  projectTopicStatus.textContent=state.project.topicStatus==="saved"?"บันทึกแล้ว":"ฉบับร่าง";projectTopicStatus.className=state.project.topicStatus==="saved"?"sc-status sc-status-success":"sc-status sc-status-muted";
  const m=state.project.mentor;mentorEmail.value=m.email||"";mentorFirstName.value=m.firstName||"";mentorLastName.value=m.lastName||"";mentorPosition.value=m.position||"";
  mentorStatusCard.innerHTML=m.saved?`<div class="sc-info-banner"><i class="fa-solid fa-circle-check"></i><span>บันทึกพี่เลี้ยงแล้ว: ${escapeHtml(`${m.firstName} ${m.lastName}`)} • ${escapeHtml(m.position)} • ${escapeHtml(m.email)}</span></div>`:`<div class="sc-info-banner"><i class="fa-solid fa-circle-info"></i><span>ยังไม่ได้บันทึกข้อมูลพี่เลี้ยง</span></div>`;
  projectBookFileText.textContent=state.project.files.projectBook?`${state.project.files.projectBook.name} • ${formatFileSize(state.project.files.projectBook.size)}`:"ยังไม่ได้อัปโหลด";
  posterFileText.textContent=state.project.files.poster?`${state.project.files.poster.name} • ${formatFileSize(state.project.files.poster.size)}`:"ยังไม่ได้อัปโหลด";
}
async function saveProjectAdvisor(){
  const id=projectAdvisorSelect.value;if(!id){showToast({type:"warning",title:"กรุณาเลือกอาจารย์"});return}
  const ok=await showConfirm({title:"บันทึกอาจารย์ที่ปรึกษาโครงการ",message:`${findAdvisor(id)?.name}\nหลังบันทึกจะรออาจารย์ยืนยัน`,confirmText:"บันทึก"});if(!ok)return;
  state.project.advisorId=id;state.project.advisorSystemConfirmed=false;state.project.studentAcknowledged=false;saveState();renderAll();showToast({type:"success",title:"บันทึกอาจารย์แล้ว",message:"รออาจารย์ยืนยัน"});
}
async function acknowledgeProjectAdvisor(){
  if(!state.project.advisorSystemConfirmed||state.project.studentAcknowledged)return;
  const ok=await showConfirm({title:"ตรวจสอบและยืนยันข้อมูล",message:`ยืนยันอาจารย์ที่ปรึกษาโครงการ\n${findAdvisor(state.project.advisorId)?.name||"-"}`,confirmText:"ยืนยันข้อมูล"});if(!ok)return;
  state.project.studentAcknowledged=true;saveState();renderAll();showToast({type:"success",title:"ยืนยันข้อมูลอาจารย์แล้ว"});
}
function submitProjectTopic(ev){ev.preventDefault();const th=projectTitleTh.value.trim();if(!th){showToast({type:"warning",title:"กรุณากรอกชื่อโครงการ"});return}state.project.titleTh=th;state.project.titleEn=projectTitleEn.value.trim();state.project.summary=projectSummary.value.trim();state.project.topicStatus="saved";saveState();renderAll();showToast({type:"success",title:"บันทึกหัวข้อโครงการแล้ว"})}
function submitMentor(ev){ev.preventDefault();const m={email:mentorEmail.value.trim(),firstName:mentorFirstName.value.trim(),lastName:mentorLastName.value.trim(),position:mentorPosition.value.trim()};if(!m.email||!m.firstName||!m.lastName||!m.position){showToast({type:"warning",title:"กรอกข้อมูลพี่เลี้ยงไม่ครบ"});return}state.project.mentor={...m,saved:true};saveState();renderAll();showToast({type:"success",title:"บันทึกข้อมูลพี่เลี้ยงแล้ว",message:`${m.firstName} ${m.lastName}`})}
function handleProjectFile(type,file){
  if(!file)return;if(type==="projectBook"&&!(file.type==="application/pdf"||file.name.toLowerCase().endsWith(".pdf"))){showToast({type:"error",title:"รูปเล่มต้องเป็น PDF"});return}
  state.project.files[type]={name:file.name,size:file.size,uploadedAt:new Date().toISOString()};saveState();renderAll();showToast({type:"success",title:type==="projectBook"?"อัปโหลดรูปเล่มแล้ว":"อัปโหลดโปสเตอร์แล้ว",message:file.name});
}

function dailyFiltered(){
  const kw=normalize(dailySearchInput.value),st=dailyStatusFilter.value;
  return [...state.dailyLogs].sort((a,b)=>b.date.localeCompare(a.date)).filter(x=>(!kw||normalize(`${x.date} ${x.work}`).includes(kw))&&(!st||x.status===st));
}
function setTableLabels(){
  document.querySelectorAll(".sc-table").forEach(t=>{const hs=[...t.querySelectorAll("thead th")].map(x=>x.textContent.trim());t.querySelectorAll("tbody tr").forEach(r=>[...r.children].forEach((c,i)=>c.dataset.label=hs[i]||""))});
}
function renderDailyLogs(){
  const arr=dailyFiltered();dailyLogEmpty.classList.toggle("show",!arr.length);
  dailyLogTableBody.innerHTML=arr.map(x=>`<tr><td><span class="sc-table-primary">${formatThaiDate(x.date)}</span><span class="sc-table-secondary">${escapeHtml(x.startTime)}–${escapeHtml(x.endTime)}</span></td><td><span class="sc-table-primary">${escapeHtml(x.work)}</span>${x.learning?`<span class="sc-table-secondary">เรียนรู้: ${escapeHtml(x.learning)}</span>`:""}</td><td>${hoursBetween(x.startTime,x.endTime)}</td><td>${x.status==="submitted"?'<span class="sc-status sc-status-success">ส่งแล้ว</span>':'<span class="sc-status sc-status-warning">ฉบับร่าง</span>'}</td><td><div class="sc-table-actions"><button class="sc-btn sc-btn-outline sc-btn-sm" onclick="openDailyLogModal(${x.id})"><i class="fa-solid fa-pen"></i> แก้ไข</button><button class="sc-btn sc-btn-danger sc-btn-sm" onclick="deleteDailyLog(${x.id})"><i class="fa-solid fa-trash"></i> ลบ</button></div></td></tr>`).join("");
  dailyTotalCount.textContent=state.dailyLogs.length;dailyDraftCount.textContent=state.dailyLogs.filter(x=>x.status==="draft").length;dailySubmittedCount.textContent=state.dailyLogs.filter(x=>x.status==="submitted").length;dailyHoursTotal.textContent=state.dailyLogs.reduce((s,x)=>s+hoursBetween(x.startTime,x.endTime),0).toFixed(1);setTableLabels();
}
function nextLogId(){return Math.max(0,...state.dailyLogs.map(x=>x.id))+1}
function openDailyLogModal(id=null){
  const x=id?state.dailyLogs.find(l=>l.id===+id):null;dailyLogForm.reset();dailyLogId.value=x?.id||"";dailyLogModalTitle.textContent=x?"แก้ไขบันทึก":"บันทึกการปฏิบัติงานวันนี้";dailyDate.value=x?.date||new Date().toISOString().slice(0,10);dailyStartTime.value=x?.startTime||"08:30";dailyEndTime.value=x?.endTime||"17:00";dailyWork.value=x?.work||"";dailyProblem.value=x?.problem||"";dailyLearning.value=x?.learning||"";openModal("dailyLogModal");
}
function saveDailyLog(status){
  const id=+dailyLogId.value||null,date=dailyDate.value,start=dailyStartTime.value,end=dailyEndTime.value,work=dailyWork.value.trim();
  if(!date||!start||!end||!work){showToast({type:"warning",title:"กรอกข้อมูลบันทึกไม่ครบ"});return}
  if(hoursBetween(start,end)<=0){showToast({type:"warning",title:"เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม"});return}
  const data={id:id||nextLogId(),date,startTime:start,endTime:end,work,problem:dailyProblem.value.trim(),learning:dailyLearning.value.trim(),status};
  if(id){const i=state.dailyLogs.findIndex(x=>x.id===id);if(i>=0)state.dailyLogs[i]=data}else state.dailyLogs.push(data);
  closeModal("dailyLogModal");saveState();renderAll();showToast({type:"success",title:status==="submitted"?"ส่งบันทึกแล้ว":"บันทึกฉบับร่างแล้ว",message:formatThaiDate(date)});
}
function submitDailyLogForm(ev){ev.preventDefault();saveDailyLog("submitted")}
async function deleteDailyLog(id){
  const x=state.dailyLogs.find(l=>l.id===+id);if(!x)return;
  const ok=await showConfirm({title:"ลบบันทึก",message:`ลบบันทึกวันที่ ${formatThaiDate(x.date)} หรือไม่?`,confirmText:"ลบ",tone:"danger"});if(!ok)return;
  state.dailyLogs=state.dailyLogs.filter(l=>l.id!==+id);saveState();renderAll();showToast({type:"success",title:"ลบบันทึกแล้ว"});
}
function printDailyLogbook(){
  if(!state.dailyLogs.length){showToast({type:"warning",title:"ยังไม่มีบันทึก"});return}
  const w=window.open("","_blank","width=1000,height=800");if(!w){showToast({type:"error",title:"กรุณาอนุญาต Popup"});return}
  const rows=[...state.dailyLogs].sort((a,b)=>a.date.localeCompare(b.date)).map(x=>`<tr><td>${formatThaiDate(x.date)}</td><td>${escapeHtml(x.startTime)}–${escapeHtml(x.endTime)}</td><td>${hoursBetween(x.startTime,x.endTime)}</td><td><strong>${escapeHtml(x.work)}</strong>${x.problem?`<br><small>ปัญหา: ${escapeHtml(x.problem)}</small>`:""}${x.learning?`<br><small>สิ่งที่เรียนรู้: ${escapeHtml(x.learning)}</small>`:""}</td></tr>`).join("");
  w.document.write(`<!doctype html><html lang="th"><head><meta charset="utf-8"><title>เล่มบันทึกสหกิจ</title><style>body{font-family:Arial,sans-serif;padding:28px;color:#111}h1{text-align:center;font-size:22px}.meta{margin:20px 0;font-size:13px;line-height:1.7}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{border:1px solid #bbb;padding:8px;font-size:11px;vertical-align:top}th:nth-child(1){width:15%}th:nth-child(2){width:14%}th:nth-child(3){width:8%}th:nth-child(4){width:63%}@media print{body{padding:0}}</style></head><body><h1>เล่มบันทึกการปฏิบัติงานโครงการสหกิจศึกษา</h1><div class="meta"><b>นักศึกษา:</b> ${escapeHtml(fullName())}<br><b>รหัส:</b> ${escapeHtml(state.profile.studentId)}<br><b>สาขา:</b> ${escapeHtml(state.profile.major)}<br><b>สถานประกอบการ:</b> ${escapeHtml(findCompany(state.request?.companyId||state.selectedCompanyId)?.name||"-")}</div><table><thead><tr><th>วันที่</th><th>เวลา</th><th>ชม.</th><th>รายละเอียด</th></tr></thead><tbody>${rows}</tbody></table><script>window.onload=()=>setTimeout(()=>window.print(),300)<\/script></body></html>`);w.document.close();
}

function renderEvaluation(){
  const c=findCompany(state.request?.companyId||state.selectedCompanyId);
  evaluationCompanyPreview.innerHTML=c?`<div class="sc-selected-company"><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.position)}</p><div class="meta"><span>${escapeHtml(c.province)}</span><span>${escapeHtml(c.type)}</span></div><div style="margin-top:12px">${state.evaluation.status==="submitted"?'<span class="sc-status sc-status-success">ส่งแบบประเมินแล้ว</span>':state.evaluation.status==="draft"?'<span class="sc-status sc-status-warning">ฉบับร่าง</span>':'<span class="sc-status sc-status-muted">ยังไม่ประเมิน</span>'}</div></div>`:'<div class="sc-empty show"><strong>ยังไม่มีสถานประกอบการ</strong></div>';
  companyEvaluationCriteria.innerHTML=EVALUATION_CRITERIA.map(([k,t,h])=>`<div class="sc-rating-item"><div><strong>${escapeHtml(t)}</strong><span>${escapeHtml(h)}</span></div><div class="sc-rating-options">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="evaluation-${k}" value="${n}" ${+state.evaluation.scores[k]===n?"checked":""}><small>${n}</small></label>`).join("")}</div></div>`).join("");
  companyEvaluationComment.value=state.evaluation.comment||"";
}
function collectEval(){const s={};EVALUATION_CRITERIA.forEach(([k])=>{const e=document.querySelector(`input[name="evaluation-${k}"]:checked`);if(e)s[k]=+e.value});return s}
function saveCompanyEvaluation(draft){
  const c=findCompany(state.request?.companyId||state.selectedCompanyId);if(!c){showToast({type:"warning",title:"ยังไม่มีสถานประกอบการ"});return}
  const scores=collectEval();if(!draft&&Object.keys(scores).length!==EVALUATION_CRITERIA.length){showToast({type:"warning",title:"ให้คะแนนไม่ครบ"});return}
  state.evaluation={status:draft?"draft":"submitted",scores,comment:companyEvaluationComment.value.trim()};saveState();renderAll();showToast({type:"success",title:draft?"บันทึกฉบับร่างแล้ว":"ส่งแบบประเมินแล้ว"});
}
function submitCompanyEvaluation(ev){ev.preventDefault();saveCompanyEvaluation(false)}

function chatbotAnswer(q){
  const t=normalize(q),found=CHAT_KB.find(([ks])=>ks.some(k=>t.includes(normalize(k))));
  return found?.[1]||"ตอนนี้ผมช่วยตอบเรื่องคำร้อง เอกสาร Resume สถานประกอบการ อาจารย์ที่ปรึกษา พี่เลี้ยง โครงการ และโปสเตอร์ได้ หากเป็นคำถามเฉพาะอื่นควรเชื่อม Chatbot Backend/Knowledge Base ภายหลัง";
}
function sendChat(text){
  const q=String(text??"").trim();if(!q)return;
  state.chatHistory.push({role:"user",text:q},{role:"assistant",text:chatbotAnswer(q)});saveState();renderChat();
}
function renderChat(){
  const html=state.chatHistory.map(m=>`<div class="sc-chat-message ${m.role}"><div class="sc-chat-bubble">${escapeHtml(m.text)}</div></div>`).join("");
  chatMessages.innerHTML=html;chatDrawerMessages.innerHTML=html;chatMessages.scrollTop=chatMessages.scrollHeight;chatDrawerMessages.scrollTop=chatDrawerMessages.scrollHeight;
}
function submitChat(ev){ev.preventDefault();sendChat(chatInput.value);chatInput.value=""}
function submitDrawerChat(ev){ev.preventDefault();sendChat(chatDrawerInput.value);chatDrawerInput.value=""}
function askQuickQuestion(q){sendChat(q)}
function openChatDrawer(){chatDrawer.classList.add("show");chatDrawer.setAttribute("aria-hidden","false")}
function closeChatDrawer(){chatDrawer.classList.remove("show");chatDrawer.setAttribute("aria-hidden","true")}

function openModal(id){const m=document.getElementById(id);if(!m)return;m.classList.add("show");m.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeModal(id){const m=document.getElementById(id);if(!m)return;m.classList.remove("show");m.setAttribute("aria-hidden","true");if(!document.querySelector(".sc-modal.show"))document.body.style.overflow=""}
function showConfirm({title="ยืนยันการดำเนินการ",message="",confirmText="ยืนยัน",tone="primary"}={}){
  return new Promise(resolve=>{confirmTitle.textContent=title;confirmMessage.textContent=message;confirmOkButton.textContent=confirmText;confirmOkButton.className=tone==="danger"?"sc-btn sc-btn-danger":"sc-btn sc-btn-primary";confirmIcon.innerHTML=tone==="danger"?'<i class="fa-solid fa-triangle-exclamation"></i>':'<i class="fa-solid fa-circle-question"></i>';const done=r=>{confirmOkButton.onclick=null;confirmCancelButton.onclick=null;closeModal("confirmModal");resolve(r)};confirmOkButton.onclick=()=>done(true);confirmCancelButton.onclick=()=>done(false);openModal("confirmModal")});
}
function showToast({type="success",title="สำเร็จ",message="",duration=3200}={}){
  const icons={success:"fa-circle-check",error:"fa-circle-xmark",warning:"fa-triangle-exclamation",info:"fa-circle-info"},t=document.createElement("div");t.className=`sc-toast ${type}`;t.innerHTML=`<div class="sc-toast-icon"><i class="fa-solid ${icons[type]||icons.info}"></i></div><div><strong>${escapeHtml(title)}</strong>${message?`<span>${escapeHtml(message)}</span>`:""}</div><button><i class="fa-solid fa-xmark"></i></button>`;const rm=()=>t.remove();t.querySelector("button").onclick=rm;toastContainer.appendChild(t);setTimeout(rm,duration);
}
async function studentLogout(){const ok=await showConfirm({title:"ออกจากระบบ",message:"ต้องการออกจากระบบหรือไม่?",confirmText:"ออกจากระบบ",tone:"danger"});if(!ok)return;localStorage.removeItem("currentUser");if(typeof window.logout==="function"){window.logout();return}location.href="login.html"}

function renderAll(){loadProfileForms();renderResume();renderRecommendations();renderCompanySearch();renderRequestPanel();renderProject();renderDailyLogs();renderEvaluation();renderChat();updateOverview();setTableLabels()}

function bindEvents(){
  document.querySelectorAll(".sc-sidebar-item[data-panel]").forEach(b=>b.addEventListener("click",()=>switchStudentPanel(b.dataset.panel)));
  ["profile","prepare","request","project"].forEach(g=>document.querySelectorAll(`[data-${g}-tab]`).forEach(b=>b.addEventListener("click",()=>switchTab(g,b.dataset[`${g}Tab`]))));
  personalProfileForm.addEventListener("submit",submitPersonalProfile);familyProfileForm.addEventListener("submit",submitFamilyProfile);accountForm.addEventListener("submit",submitAccount);projectTopicForm.addEventListener("submit",submitProjectTopic);mentorForm.addEventListener("submit",submitMentor);dailyLogForm.addEventListener("submit",submitDailyLogForm);companyEvaluationForm.addEventListener("submit",submitCompanyEvaluation);chatForm.addEventListener("submit",submitChat);chatDrawerForm.addEventListener("submit",submitDrawerChat);
  profileBirthDate.addEventListener("change",e=>profileAge.value=calcAge(e.target.value));
  studentPhotoInput.addEventListener("change",e=>{handleStudentPhoto(e.target.files?.[0]);e.target.value=""});
  resumeFileInput.addEventListener("change",e=>{handleResumeFile(e.target.files?.[0]);e.target.value=""});
  ["dragenter","dragover"].forEach(n=>resumeDropZone.addEventListener(n,e=>{e.preventDefault();resumeDropZone.classList.add("dragover")}));
  ["dragleave","drop"].forEach(n=>resumeDropZone.addEventListener(n,e=>{e.preventDefault();resumeDropZone.classList.remove("dragover")}));
  resumeDropZone.addEventListener("drop",e=>{const f=e.dataTransfer?.files?.[0];if(f)handleResumeFile(f)});
  document.querySelectorAll('input[name="requestDeliveryMethod"]').forEach(radio=>{
    radio.addEventListener("change",()=>{
      requestDeliveryEmailField.classList.toggle("show",radio.value==="email"&&radio.checked);
    });
  });

  projectBookInput.addEventListener("change",e=>{handleProjectFile("projectBook",e.target.files?.[0]);e.target.value=""});
  posterInput.addEventListener("change",e=>{handleProjectFile("poster",e.target.files?.[0]);e.target.value=""});
  ["companySearchInput","companyMajorFilter","companyProvinceFilter","companyTypeFilter"].forEach(id=>{const e=document.getElementById(id);e.addEventListener("input",renderCompanySearch);e.addEventListener("change",renderCompanySearch)});
  ["dailySearchInput","dailyStatusFilter"].forEach(id=>{const e=document.getElementById(id);e.addEventListener("input",renderDailyLogs);e.addEventListener("change",renderDailyLogs)});
  document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>{const m=b.closest(".sc-modal");if(m)closeModal(m.id)}));
  document.querySelectorAll(".sc-modal").forEach(m=>m.addEventListener("mousedown",e=>{if(e.target===m&&m.id!=="confirmModal")closeModal(m.id)}));
  document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;const m=[...document.querySelectorAll(".sc-modal.show")].pop();if(m&&m.id!=="confirmModal")closeModal(m.id);else if(chatDrawer.classList.contains("show"))closeChatDrawer()});
  window.addEventListener("resize",setTableLabels);
}

document.addEventListener("DOMContentLoaded",()=>{loadState();ensureRequestStateDefaults();populateAdvisorOptions();populateCompanyFilters();bindEvents();renderAll()});

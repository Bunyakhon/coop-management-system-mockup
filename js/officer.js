      /* =========================================================
       โหลดหน้า
       ========================================================= */

      document.addEventListener("DOMContentLoaded", function () {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");

        if (user) {
          const greeting = document.getElementById("overviewGreeting");

          const display = document.getElementById("userNameDisplay");

          if (greeting && user.name) {
            greeting.textContent = `ยินดีต้อนรับ, ${user.name}`;
          }

          if (display && user.name) {
            display.textContent = user.name;
          }
        }

        /* =====================================================
           ระบบเปลี่ยนเมนู
           ===================================================== */

        const sidebarItems = document.querySelectorAll(
          ".sidebar-item[data-target]",
        );

        sidebarItems.forEach(function (item) {
          item.addEventListener("click", function () {
            const target = item.getAttribute("data-target");

            sidebarItems.forEach(function (menu) {
              menu.classList.remove("active");
            });

            document
              .querySelectorAll(".content-panel")
              .forEach(function (panel) {
                panel.classList.remove("active");
              });

            item.classList.add("active");

            const panel = document.getElementById(target);

            if (panel) {
              panel.classList.add("active");
            }
          });
        });

        /* =====================================================
           ค้นหาอาจารย์
           ===================================================== */

        const lecturerSearch = document.getElementById("lecturerSearch");

        if (lecturerSearch) {
          lecturerSearch.addEventListener("input", function () {
            const keyword = lecturerSearch.value.trim().toLowerCase();

            document
              .querySelectorAll("#lecturerTableBody tr")
              .forEach(function (row) {
                const nameElement =
                  row.cells[0].querySelector("b") || row.cells[0];

                const name = nameElement.textContent.trim().toLowerCase();

                row.style.display =
                  !keyword || name.includes(keyword) ? "" : "none";
              });
          });
        }
      });

      function addLecturer() {
        openModal(
          "เพิ่มข้อมูลอาจารย์",
          `<div class="form-group"><label>ชื่อ-นามสกุล</label><input id="lecturerName"></div><div class="form-group"><label>อีเมล</label><input id="lecturerEmail" type="email"></div><div class="form-group"><label>รหัสผ่าน</label><input id="lecturerPassword" type="password"></div>`,
          function () {
            const name = document.getElementById("lecturerName").value.trim();
            const email = document.getElementById("lecturerEmail").value.trim();
            const password = document.getElementById("lecturerPassword").value;
            if (!name || !email || !password) {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              return;
            }
            const row = document.createElement("tr");
            row.dataset.password = password;
            row.innerHTML = `<td>${escapeHtml(name)}</td><td>${escapeHtml(email)}</td><td><span class="tag tag-green">ใช้งาน</span></td><td><button class="btn-mock-sm" onclick="editLecturer(this)">แก้ไข</button><button class="btn-mock-sm danger" onclick="deleteRow(this)">ลบ</button></td>`;
            document.getElementById("lecturerTableBody").appendChild(row);
            closeModal();
          },
        );
      }

      function editLecturer(button) {
        const row = button.closest("tr");
        const nameElement = row.cells[0].querySelector("b") || row.cells[0];
        const oldName = nameElement.textContent.trim();
        const oldEmail = row.cells[1].textContent.trim();
        const oldPassword = row.dataset.password || "";
        openModal(
          "แก้ไขข้อมูลอาจารย์",
          `<div class="form-group"><label>ชื่อ-นามสกุล</label><input id="lecturerName" value="${escapeAttribute(oldName)}"></div><div class="form-group"><label>อีเมล</label><input id="lecturerEmail" type="email" value="${oldEmail === "-" ? "" : escapeAttribute(oldEmail)}"></div><div class="form-group"><label>รหัสผ่าน</label><input id="lecturerPassword" type="password" value="${escapeAttribute(oldPassword)}"></div>`,
          function () {
            const name = document.getElementById("lecturerName").value.trim();
            const email = document.getElementById("lecturerEmail").value.trim();
            const password = document.getElementById("lecturerPassword").value;
            if (!name || !email || !password) {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              return;
            }
            nameElement.textContent = name;
            row.cells[1].textContent = email;
            row.dataset.password = password;
            closeModal();
            alert("แก้ไขข้อมูลอาจารย์เรียบร้อยแล้ว");
          },
        );
      }
      /* =========================================================
       CHATBOT
       ========================================================= */

      const chatbotInput = document.getElementById("chatbotInput");

      const chatbotSendButton = document.getElementById("chatbotSendButton");

      const chatbotTranscript = document.getElementById("chatbotTranscript");

      function getDocumentStatusData() {
        const rows = document.querySelectorAll("#documentTableBody tr");

        const data = [];

        rows.forEach(function (row) {
          const cells = row.cells;

          if (!cells || cells.length < 4) {
            return;
          }

          data.push({
            name: cells[0].textContent.trim(),

            type: cells[1].textContent.trim(),

            document: cells[2].textContent.trim(),

            status: row.getAttribute("data-status") || "",
          });
        });

        return data;
      }

      function chatbotAnswer(question) {
        const q = question.toLowerCase().trim();

        const data = getDocumentStatusData();

        const pending = data.filter(function (item) {
          return item.status === "waiting";
        });

        const sent = data.filter(function (item) {
          return item.status === "sent";
        });

        if (q.includes("ยังไม่ส่ง") || q.includes("ค้าง")) {
          return `ขณะนี้มีเอกสารที่ยังไม่ส่ง ` + `${pending.length} รายการค่ะ`;
        }

        if (q.includes("ส่งแล้ว")) {
          return `ขณะนี้มีเอกสารที่ส่งแล้ว ` + `${sent.length} รายการค่ะ`;
        }

        for (const item of data) {
          if (q.includes(item.name.toLowerCase())) {
            return (
              `${item.name} : ` +
              `${item.document} ` +
              `${item.status === "sent" ? "ส่งแล้ว" : "ยังไม่ส่ง"}`
            );
          }
        }

        return (
          "ยังไม่เข้าใจคำถามค่ะ " +
          "ลองถามว่า “สมชาย ใจดี สถานะอะไร” " +
          "หรือ “มีเอกสารที่ยังไม่ส่งกี่รายการ”"
        );
      }

      function addChatMessage(message, type) {
        const msg = document.createElement("div");

        msg.className = `ct-msg ${type}`;

        msg.textContent = message;

        chatbotTranscript.appendChild(msg);

        chatbotTranscript.scrollTop = chatbotTranscript.scrollHeight;
      }

      function sendChatbotMessage(question) {
        const text = String(question || "").trim();

        if (!text) {
          return;
        }

        addChatMessage(text, "officer");

        const answer = chatbotAnswer(text);

        setTimeout(function () {
          addChatMessage(answer, "bot");
        }, 180);

        chatbotInput.value = "";
      }

      if (chatbotSendButton && chatbotInput && chatbotTranscript) {
        chatbotSendButton.addEventListener("click", function () {
          sendChatbotMessage(chatbotInput.value);
        });

        chatbotInput.addEventListener("keydown", function (event) {
          if (event.key === "Enter") {
            event.preventDefault();

            sendChatbotMessage(chatbotInput.value);
          }
        });

        document
          .querySelectorAll("[data-chat-question]")
          .forEach(function (button) {
            button.addEventListener("click", function () {
              sendChatbotMessage(button.getAttribute("data-chat-question"));
            });
          });
      }

      /* =========================================================
       MODAL
       ========================================================= */

      function openModal(title, content, saveFunction) {
        const modal = document.getElementById("mainModal");

        const titleElement = document.getElementById("modalTitle");

        const body = document.getElementById("modalBody");

        const saveButton = document.getElementById("modalSaveButton");

        titleElement.textContent = title;

        body.innerHTML = content;

        saveButton.onclick = saveFunction;

        modal.classList.add("show");
      }

      function closeModal() {
        const modal = document.getElementById("mainModal");

        const modalBox = document.querySelector("#mainModal .modal-box");

        modal.classList.remove("show");

        if (modalBox) {
          modalBox.classList.remove("company-modal-wide");
        }
      }

      /* ปิด Modal เมื่อกดพื้นที่ด้านนอก */

      document.addEventListener("click", function (event) {
        const modal = document.getElementById("mainModal");

        if (event.target === modal) {
          closeModal();
        }
      });

      /* =========================================================
       ป้องกัน HTML Injection
       ========================================================= */

      function escapeHtml(text) {
        return String(text)
          .replace(/&/g, "&amp;")

          .replace(/</g, "&lt;")

          .replace(/>/g, "&gt;")

          .replace(/"/g, "&quot;")

          .replace(/'/g, "&#039;");
      }

      function escapeAttribute(text) {
        return escapeHtml(text);
      }
      /* =========================================================
 ส่งฟอร์มตอบรับนักศึกษาสหกิจศึกษา
 ========================================================= */

      function sendResponseForm(button) {
        const row = button.closest("tr");

        const student = row
          .querySelector(".print-student-name")
          .textContent.trim();

        const company = row
          .querySelector(".print-company-name")
          .textContent.trim();

        const ok = confirm(
          `ต้องการส่งฟอร์มตอบรับของ ${student}\nไปยัง ${company} หรือไม่?`,
        );

        if (!ok) {
          return;
        }

        /*
  Mockup Frontend:
  ระบบจริงภายหลังสามารถเปลี่ยนส่วนนี้
  เป็นการส่ง Email / Token Link
  ให้สถานประกอบการได้
*/

        row.dataset.responseStatus = "waiting";

        updateResponseStatus(row);

        alert(`ส่งฟอร์มตอบรับของ ${student}\nไปยัง ${company} เรียบร้อยแล้ว`);
      }

      /* =========================================================
 แก้ไขสถานะการตอบรับ
 ========================================================= */

      function editResponseStatus(button) {
        const row = button.closest("tr");

        const student = row
          .querySelector(".print-student-name")
          .textContent.trim();

        const company = row
          .querySelector(".print-company-name")
          .textContent.trim();

        const currentStatus = row.dataset.responseStatus || "not-sent";

        const content = `
    <div
      class="officer-inline-20"
    >
      <div
        class="officer-inline-21"
      >
        ${escapeHtml(student)}
      </div>

      <div
        class="officer-inline-22"
      >
        ${escapeHtml(company)}
      </div>
    </div>


    <div class="form-group">

      <label>
        สถานะการตอบรับ
      </label>

      <select id="responseStatusSelect">

        <option
          value="not-sent"
          ${currentStatus === "not-sent" ? "selected" : ""}
        >
          ยังไม่ส่งฟอร์ม
        </option>


        <option
          value="waiting"
          ${currentStatus === "waiting" ? "selected" : ""}
        >
          รอตอบรับ
        </option>


        <option
          value="accepted"
          ${currentStatus === "accepted" ? "selected" : ""}
        >
          ตอบรับแล้ว
        </option>


        <option
          value="rejected"
          ${currentStatus === "rejected" ? "selected" : ""}
        >
          ไม่ตอบรับ
        </option>

      </select>

    </div>
  `;

        openModal("แก้ไขสถานะการตอบรับ", content, function () {
          const status = document.getElementById("responseStatusSelect").value;

          row.dataset.responseStatus = status;

          updateResponseStatus(row);

          closeModal();

          alert("แก้ไขสถานะการตอบรับเรียบร้อยแล้ว");
        });
      }

      /* =========================================================
 อัปเดตสถานะ + ปุ่มพิมพ์
 ========================================================= */

      function updateResponseStatus(row) {
        const status = row.dataset.responseStatus || "not-sent";

        const statusElement = row.querySelector(".response-status");

        const printButton = row.querySelector(".print-document-button");

        if (!statusElement || !printButton) {
          return;
        }

        /* ================= ยังไม่ส่ง ================= */

        if (status === "not-sent") {
          statusElement.textContent = "ยังไม่ส่งฟอร์ม";

          statusElement.className = "tag tag-muted response-status";

          printButton.disabled = true;

          return;
        }

        /* ================= รอตอบรับ ================= */

        if (status === "waiting") {
          statusElement.textContent = "รอตอบรับ";

          statusElement.className = "tag tag-muted response-status";

          printButton.disabled = true;

          return;
        }

        /* ================= ตอบรับ ================= */

        if (status === "accepted") {
          statusElement.textContent = "ตอบรับแล้ว";

          statusElement.className = "tag tag-green response-status";

          /*
    สถานประกอบการตอบรับแล้ว
    จึงอนุญาตให้พิมพ์เอกสาร
  */

          printButton.disabled = false;

          return;
        }

        /* ================= ไม่ตอบรับ ================= */

        if (status === "rejected") {
          statusElement.textContent = "ไม่ตอบรับ";

          statusElement.className = "tag tag-red response-status";

          printButton.disabled = true;
        }
      }

      function logout() {
        if (!confirm("ต้องการออกจากระบบหรือไม่?")) {
          return;
        }

        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
      }

      function getCoopRequestData(row) {
        return {
          student: row.dataset.studentName || row.cells[0].textContent.trim(),
          studentId: row.dataset.studentId || row.cells[1].textContent.trim(),
          company: row.dataset.company || row.cells[3].textContent.trim(),
          position: row.dataset.position || row.cells[4].textContent.trim(),
          province: row.dataset.province || "-",
          submitDate: row.dataset.submitDate || row.cells[5].textContent.trim(),
          email: row.dataset.email || "-",
        };
      }

      function viewCoopRequestDetail(button) {
        const data = getCoopRequestData(button.closest("tr"));

        openModal(
          "รายละเอียดคำร้องสหกิจศึกษา",
          `<div class="form-group"><label>ชื่อนักศึกษา</label><input value="${escapeAttribute(data.student)}" readonly></div>
     <div class="form-group"><label>รหัสนักศึกษา</label><input value="${escapeAttribute(data.studentId)}" readonly></div>
     <div class="form-group"><label>สถานประกอบการ</label><input value="${escapeAttribute(data.company)}" readonly></div>
     <div class="form-group"><label>ตำแหน่ง</label><input value="${escapeAttribute(data.position)}" readonly></div>
     <div class="form-group"><label>จังหวัด</label><input value="${escapeAttribute(data.province)}" readonly></div>
     <div class="form-group"><label>วันที่ยื่น</label><input value="${escapeAttribute(data.submitDate)}" readonly></div>
     <div class="form-group"><label>อีเมล</label><input value="${escapeAttribute(data.email)}" readonly></div>`,
          closeModal,
        );
      }

      function printCoopRequestPDF(button) {
        const data = getCoopRequestData(button.closest("tr"));
        alert(`กำลังเตรียมคำร้องสหกิจศึกษาของ ${data.student} สำหรับพิมพ์ PDF`);
        window.print();
      }

      function editPrintDocument(button) {
        const row = button.closest("tr");
        const studentCell = row.querySelector(".print-student-name");
        const documentCell = row.querySelector(".print-document-type");
        const companyCell = row.querySelector(".print-company-name");
        const student = studentCell.textContent.trim();
        const documentType = documentCell.textContent.trim();
        const company = companyCell.textContent.trim();

        openModal(
          "แก้ไขข้อมูลเอกสาร",
          `<div class="form-group"><label>ชื่อนักศึกษา</label><input id="editPrintStudent" value="${escapeAttribute(student)}"></div>
     <div class="form-group"><label>ประเภทเอกสาร</label><select id="editPrintDocumentType"><option value="หนังสือขอความอนุเคราะห์" ${documentType === "หนังสือขอความอนุเคราะห์" ? "selected" : ""}>หนังสือขอความอนุเคราะห์</option><option value="เอกสารส่งตัวนักศึกษา" ${documentType === "เอกสารส่งตัวนักศึกษา" ? "selected" : ""}>เอกสารส่งตัวนักศึกษา</option></select></div>
     <div class="form-group"><label>สถานประกอบการ</label><input id="editPrintCompany" value="${escapeAttribute(company)}"></div>`,
          function () {
            const newStudent = document
              .getElementById("editPrintStudent")
              .value.trim();
            const newDocumentType = document.getElementById(
              "editPrintDocumentType",
            ).value;
            const newCompany = document
              .getElementById("editPrintCompany")
              .value.trim();

            if (!newStudent || !newDocumentType || !newCompany) {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              return;
            }

            studentCell.textContent = newStudent;
            documentCell.textContent = newDocumentType;
            companyCell.textContent = newCompany;
            closeModal();
            alert("แก้ไขข้อมูลเอกสารเรียบร้อยแล้ว");
          },
        );
      }

      function deletePrintDocument(button) {
        const row = button.closest("tr");
        const student = row
          .querySelector(".print-student-name")
          .textContent.trim();
        const documentType = row
          .querySelector(".print-document-type")
          .textContent.trim();

        if (!confirm(`ต้องการลบ "${documentType}" ของ ${student} หรือไม่?`)) {
          return;
        }

        row.remove();
        updatePrintDocumentRowNumbers();
      }

      function updatePrintDocumentRowNumbers() {
        document
          .querySelectorAll("#printDocumentTable tbody tr")
          .forEach(function (row, index) {
            row.cells[0].textContent = index + 1;
          });
      }

      function printDocumentRow(button) {
        const row = button.closest("tr");

        if (row.dataset.responseStatus !== "accepted") {
          alert("สามารถพิมพ์เอกสารได้เมื่อสถานประกอบการตอบรับแล้วเท่านั้น");
          return;
        }

        const student = row
          .querySelector(".print-student-name")
          .textContent.trim();
        const documentType = row
          .querySelector(".print-document-type")
          .textContent.trim();
        alert(`กำลังเตรียม ${documentType} ของ ${student} สำหรับพิมพ์`);
        window.print();
      }

      function deleteRow(button) {
        const row = button.closest("tr");
        const name = row.cells[0]
          ? row.cells[0].textContent.trim()
          : "รายการนี้";

        if (confirm(`ต้องการลบ "${name}" หรือไม่?`)) {
          row.remove();
        }
      }

      function getCompanyFormHtml(data = {}) {
        const workFormats = Array.isArray(data.workFormats)
          ? data.workFormats
          : String(data.workFormats || "")
              .split(",")
              .filter(Boolean);
        const checked = function (value) {
          return workFormats.includes(value) ? "checked" : "";
        };

        return `<div class="company-form-grid">
    <div class="company-form-section"><i class="fa-solid fa-building"></i> ข้อมูลสถานประกอบการ</div>
    <div class="form-group full"><label>ชื่อสถานประกอบการ</label><input id="companyName" value="${escapeAttribute(data.companyName || "")}"></div>
    <div class="form-group"><label>Email</label><input id="companyEmail" type="email" value="${escapeAttribute(data.companyEmail || "")}"></div>
    <div class="form-group"><label>เบอร์โทรติดต่อ</label><input id="companyPhone" value="${escapeAttribute(data.companyPhone || "")}"></div>
    <div class="company-form-section"><i class="fa-solid fa-location-dot"></i> ที่อยู่สถานที่ปฏิบัติงาน</div>
    <div class="form-group"><label>เลขที่</label><input id="companyAddressNo" value="${escapeAttribute(data.addressNo || "")}"></div>
    <div class="form-group"><label>หมู่</label><input id="companyAddressMoo" value="${escapeAttribute(data.addressMoo || "")}"></div>
    <div class="form-group"><label>ตำบล / แขวง</label><input id="companySubdistrict" value="${escapeAttribute(data.subdistrict || "")}"></div>
    <div class="form-group"><label>อำเภอ / เขต</label><input id="companyDistrict" value="${escapeAttribute(data.district || "")}"></div>
    <div class="form-group full"><label>จังหวัด</label><input id="companyProvince" value="${escapeAttribute(data.province || "")}"></div>
    <div class="company-form-section"><i class="fa-solid fa-briefcase"></i> รายละเอียดตำแหน่งงาน</div>
    <div class="form-group"><label>ชื่อตำแหน่งงาน</label><input id="companyPosition" value="${escapeAttribute(data.position || "")}"></div>
    <div class="form-group"><label>หมวดหมู่งาน</label><select id="companyCategory"><option value="">-- เลือกหมวดหมู่งาน --</option>${[
      "Software Development",
      "Web Development",
      "Mobile Application",
      "Data Science / AI",
      "Cloud / Infrastructure",
      "Cyber Security",
      "Network",
      "IT Support",
      "UX / UI Design",
      "Business Analyst",
      "อื่น ๆ",
    ]
      .map(function (category) {
        return `<option value="${escapeAttribute(category)}" ${data.category === category ? "selected" : ""}>${escapeHtml(category)}</option>`;
      })
      .join("")}</select></div>
    <div class="form-group"><label>จำนวนที่รับ</label><input id="companyQuota" type="number" min="1" value="${escapeAttribute(data.quota || "")}"></div>
    <div class="form-group"><label>ค่าตอบแทน</label><input id="companyCompensation" value="${escapeAttribute(data.compensation || "")}"></div>
    <div class="form-group full"><label>รูปแบบการทำงาน</label><div class="company-work-format"><label><input type="checkbox" name="companyWorkFormat" value="Onsite" ${checked("Onsite")}> Onsite</label><label><input type="checkbox" name="companyWorkFormat" value="Work from Home" ${checked("Work from Home")}> Work from Home</label><label><input type="checkbox" name="companyWorkFormat" value="Hybrid" ${checked("Hybrid")}> Hybrid</label></div></div>
    <div class="form-group full"><label>จำนวนวันต่อสัปดาห์</label><select id="companyDaysPerWeek"><option value="">-- เลือกจำนวนวัน --</option>${[
      1, 2, 3, 4, 5, 6, 7,
    ]
      .map(function (day) {
        return `<option value="${day}" ${String(data.daysPerWeek || "") === String(day) ? "selected" : ""}>${day} วัน/สัปดาห์</option>`;
      })
      .join("")}</select></div>
  </div>`;
      }

      function openCompanyModal(title, data, saveFunction) {
        openModal(title, getCompanyFormHtml(data), function () {
          const formData = readCompanyForm();
          if (formData) {
            saveFunction(formData);
          }
        });

        const modalBox = document.querySelector("#mainModal .modal-box");
        if (modalBox) {
          modalBox.classList.add("company-modal-wide");
        }
      }

      function readCompanyForm() {
        const value = function (id) {
          return document.getElementById(id).value.trim();
        };
        const data = {
          companyName: value("companyName"),
          companyEmail: value("companyEmail"),
          companyPhone: value("companyPhone"),
          addressNo: value("companyAddressNo"),
          addressMoo: value("companyAddressMoo"),
          subdistrict: value("companySubdistrict"),
          district: value("companyDistrict"),
          province: value("companyProvince"),
          position: value("companyPosition"),
          category: value("companyCategory"),
          quota: value("companyQuota"),
          compensation: value("companyCompensation"),
          daysPerWeek: value("companyDaysPerWeek"),
          workFormats: Array.from(
            document.querySelectorAll(
              'input[name="companyWorkFormat"]:checked',
            ),
          ).map(function (input) {
            return input.value;
          }),
        };

        if (
          !data.companyName ||
          !data.companyEmail ||
          !data.companyPhone ||
          !data.addressNo ||
          !data.subdistrict ||
          !data.district ||
          !data.province ||
          !data.position ||
          !data.category ||
          !data.quota ||
          !data.daysPerWeek ||
          !data.workFormats.length
        ) {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
          return null;
        }
        if (!data.companyEmail.includes("@") || Number(data.quota) < 1) {
          alert("กรุณาตรวจสอบอีเมลและจำนวนที่รับ");
          return null;
        }
        return data;
      }

      function createWorkFormatHtml(workFormats) {
        return workFormats
          .map(function (format) {
            return `<span class="work-format-badge">${escapeHtml(format)}</span>`;
          })
          .join("");
      }

      function fillCompanyRow(row, data) {
        row.dataset.companyName = data.companyName;
        row.dataset.companyEmail = data.companyEmail;
        row.dataset.companyPhone = data.companyPhone;
        row.dataset.addressNo = data.addressNo;
        row.dataset.addressMoo = data.addressMoo;
        row.dataset.addressSubdistrict = data.subdistrict;
        row.dataset.addressDistrict = data.district;
        row.dataset.addressProvince = data.province;
        row.dataset.position = data.position;
        row.dataset.category = data.category;
        row.dataset.quota = data.quota;
        row.dataset.compensation = data.compensation;
        row.dataset.workFormats = data.workFormats.join(",");
        row.dataset.daysPerWeek = data.daysPerWeek;
        row.innerHTML = `<td class="company-name-cell"><b>${escapeHtml(data.companyName)}</b><small>${escapeHtml(data.companyEmail)}</small><small>${escapeHtml(data.companyPhone)}</small></td><td>${escapeHtml(data.province)}</td><td class="company-position-cell"><b>${escapeHtml(data.position)}</b><small>${escapeHtml(data.category)}</small></td><td>${escapeHtml(data.category)}</td><td>${escapeHtml(data.quota)} คน</td><td>${data.compensation ? escapeHtml(data.compensation) : "-"}</td><td><div class="work-format-list">${createWorkFormatHtml(data.workFormats)}</div></td><td>${escapeHtml(data.daysPerWeek)} วัน</td><td><div class="action-group"><button class="btn-mock-sm" onclick="editCompany(this)"><i class="fa-solid fa-pen"></i> แก้ไข</button><button class="btn-mock-sm danger" onclick="deleteCompany(this)"><i class="fa-solid fa-trash"></i> ลบ</button></div></td>`;
      }

      function addCompany() {
        openCompanyModal(
          "เพิ่มสถานประกอบการ / ตำแหน่งงาน",
          {},
          function (data) {
            const row = document.createElement("tr");
            fillCompanyRow(row, data);
            document.getElementById("companyTableBody").appendChild(row);
            updateCompanySummary();
            closeModal();
          },
        );
      }

      function editCompany(button) {
        const row = button.closest("tr");
        openCompanyModal(
          "แก้ไขสถานประกอบการ / ตำแหน่งงาน",
          {
            companyName: row.dataset.companyName,
            companyEmail: row.dataset.companyEmail,
            companyPhone: row.dataset.companyPhone,
            addressNo: row.dataset.addressNo,
            addressMoo: row.dataset.addressMoo,
            subdistrict: row.dataset.addressSubdistrict,
            district: row.dataset.addressDistrict,
            province: row.dataset.addressProvince,
            position: row.dataset.position,
            category: row.dataset.category,
            quota: row.dataset.quota,
            compensation: row.dataset.compensation,
            workFormats: row.dataset.workFormats,
            daysPerWeek: row.dataset.daysPerWeek,
          },
          function (data) {
            fillCompanyRow(row, data);
            updateCompanySummary();
            closeModal();
          },
        );
      }

      function deleteCompany(button) {
        const row = button.closest("tr");
        if (
          confirm(
            `ต้องการลบ "${row.dataset.companyName || "รายการนี้"}" หรือไม่?`,
          )
        ) {
          row.remove();
          updateCompanySummary();
        }
      }

      function updateCompanySummary() {
        const rows = Array.from(
          document.querySelectorAll("#companyTableBody tr"),
        );
        const names = new Set();
        let quota = 0;
        rows.forEach(function (row) {
          if (row.dataset.companyName) {
            names.add(row.dataset.companyName);
          }
          quota += Number(row.dataset.quota || 0);
        });
        document.getElementById("companyCount").textContent =
          `${names.size} แห่ง`;
        document.getElementById("positionCount").textContent =
          `${rows.length} ตำแหน่ง`;
        document.getElementById("quotaCount").textContent = `${quota} คน`;
      }

      function getCalendarFormHtml(name, date) {
        return `<div class="form-group"><label>ชื่อกิจกรรม</label><input id="calendarName" value="${escapeAttribute(name || "")}"></div><div class="form-group"><label>วันที่/ช่วงเวลา</label><input id="calendarDate" value="${escapeAttribute(date || "")}"></div><div class="form-group"><label>กลุ่มเป้าหมาย</label><input value="นักศึกษาสหกิจศึกษา" readonly></div>`;
      }

      function addCalendar() {
        openModal("เพิ่มกำหนดการ", getCalendarFormHtml(), function () {
          const name = document.getElementById("calendarName").value.trim();
          const date = document.getElementById("calendarDate").value.trim();
          if (!name || !date) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
          }
          const row = document.createElement("tr");
          row.innerHTML = `<td><div class="calendar-title"><span class="calendar-dot blue"></span>${escapeHtml(name)}</div></td><td>${escapeHtml(date)}</td><td>นักศึกษาสหกิจศึกษา</td><td><div class="action-group"><button type="button" class="btn-mock-sm" onclick="editCalendar(this)"><i class="fa-solid fa-pen"></i> แก้ไข</button><button type="button" class="btn-mock-sm danger" onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i> ลบ</button></div></td>`;
          document.getElementById("calendarTableBody").appendChild(row);
          closeModal();
        });
      }

      function editCalendar(button) {
        const row = button.closest("tr");
        const oldName = row.cells[0].textContent.trim();
        const oldDate = row.cells[1].textContent.trim();
        openModal(
          "แก้ไขกำหนดการ",
          getCalendarFormHtml(oldName, oldDate),
          function () {
            const name = document.getElementById("calendarName").value.trim();
            const date = document.getElementById("calendarDate").value.trim();
            if (!name || !date) {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              return;
            }
            row.cells[0].innerHTML = `<div class="calendar-title"><span class="calendar-dot blue"></span>${escapeHtml(name)}</div>`;
            row.cells[1].textContent = date;
            row.cells[2].textContent = "นักศึกษาสหกิจศึกษา";
            closeModal();
          },
        );
      }
      /* =========================================================
   พิมพ์หนังสือส่งตัว
   ========================================================= */

      function printSendDocument(button) {
        const row = button.closest("tr");

        const student = row
          .querySelector(".send-student-name")
          .textContent.trim();

        const company = row
          .querySelector(".send-company-name")
          .textContent.trim();

        alert(
          `กำลังเตรียมหนังสือส่งตัวของ ${student}\nสถานประกอบการ ${company}`,
        );

        window.print();
      }
      /* =========================================================
   ยกเลิกคำร้องสหกิจศึกษา
   ========================================================= */

      function cancelCoopRequest(button) {
        const row = button.closest("tr");

        const student =
          row.dataset.studentName || row.cells[0].textContent.trim();

        const ok = confirm(
          `ต้องการยกเลิกคำร้องสหกิจศึกษาของ ${student} หรือไม่?`,
        );

        if (!ok) {
          return;
        }

        /* เปลี่ยนสถานะ */

        row.dataset.status = "cancelled";

        const statusElement = row.querySelector(".request-status");

        if (statusElement) {
          statusElement.textContent = "ยกเลิกคำร้อง";

          statusElement.className = "tag tag-red request-status";
        }

        /* ปิดปุ่มยกเลิก เพื่อไม่ให้กดซ้ำ */

        button.disabled = true;

        button.innerHTML = `<i class="fa-solid fa-ban"></i> ยกเลิกแล้ว`;

        alert(`ยกเลิกคำร้องสหกิจศึกษาของ ${student} เรียบร้อยแล้ว`);
      }


      document.addEventListener("DOMContentLoaded", () => {
        // =====================================================
        // ข้อมูลอาจารย์ผู้ใช้งาน
        // =====================================================

        const user = JSON.parse(localStorage.getItem("currentUser") || "null");

        const teacherName = user?.name || "ผศ.ดร.สุพาภรณ์ ซิ้มเจริญ";

        // =====================================================
        // แสดงชื่ออาจารย์
        // =====================================================

        const overviewGreeting = document.getElementById("overviewGreeting");

        if (overviewGreeting) {
          overviewGreeting.textContent = `ยินดีต้อนรับ, ${teacherName}`;
        }

        const userNameDisplay = document.getElementById("userNameDisplay");

        if (userNameDisplay) {
          userNameDisplay.textContent = teacherName;
        }

        // =====================================================
        // สลับเมนูด้านซ้าย
        // =====================================================

        document
          .querySelectorAll(".sidebar-item[data-target]")
          .forEach((item) => {
            item.addEventListener("click", () => {
              document.querySelectorAll(".sidebar-item").forEach((menu) => {
                menu.classList.remove("active");
              });

              document.querySelectorAll(".content-panel").forEach((panel) => {
                panel.classList.remove("active");
              });

              item.classList.add("active");

              const targetPanel = document.getElementById(item.dataset.target);

              if (targetPanel) {
                targetPanel.classList.add("active");
              }

              if (item.dataset.panelGroup === "supervision") {
                document.getElementById("panel-visit")?.classList.add("active");
                setSupervisionRound("1");
              }
            });
          });

        function setSupervisionRound(round) {
          document.querySelectorAll("[data-supervision-round]").forEach((tab) => {
            const selected = tab.dataset.supervisionRound === round;
            tab.classList.toggle("active", selected);
            tab.setAttribute("aria-selected", String(selected));
          });

          document
            .querySelectorAll(".appointment-card[data-round], .visit-result-card[data-round]")
            .forEach((card) => {
              card.hidden = card.dataset.round !== round;
            });
        }

        document.querySelectorAll("[data-supervision-round]").forEach((tab) => {
          tab.addEventListener("click", () => setSupervisionRound(tab.dataset.supervisionRound));
        });

        function setEvaluationTab(tabName) {
          document.querySelectorAll("[data-evaluation-tab]").forEach((tab) => {
            const selected = tab.dataset.evaluationTab === tabName;
            tab.classList.toggle("active", selected);
            tab.setAttribute("aria-selected", String(selected));
          });

          document.querySelectorAll("[data-evaluation-view]").forEach((view) => {
            view.hidden = view.dataset.evaluationView !== tabName;
          });

          document
            .getElementById("panel-evalcompany")
            ?.classList.toggle("active", tabName === "company");
        }

        document.querySelectorAll("[data-evaluation-tab]").forEach((tab) => {
          tab.addEventListener("click", () => setEvaluationTab(tab.dataset.evaluationTab));
        });

        document.querySelectorAll("#coopRequestTable .request-actions").forEach((cell) => {
          cell.innerHTML = '<button type="button" class="btn-mock-sm" onclick="viewCoopRequest(this)">ดูรายละเอียด</button>';
        });
        setEvaluationTab("student");
        setSupervisionRound("1");

        // =====================================================
        // ค้นหานักศึกษา
        // =====================================================

        window.filterStudents = function () {
          const searchInput = document.getElementById("studentSearchInput");

          const majorSelect = document.getElementById("majorFilter");

          if (!searchInput || !majorSelect) {
            return;
          }

          const keyword = searchInput.value.trim().toLowerCase();

          const selectedMajor = majorSelect.value.trim().toLowerCase();

          const rows = document.querySelectorAll("#coopStudentTable tbody tr");

          rows.forEach((row) => {
            const studentName = (row.dataset.name || "").toLowerCase();

            const studentId = (row.dataset.studentId || "").toLowerCase();

            const studentMajor = (row.dataset.major || "").toLowerCase();

            const company = (row.dataset.company || "").toLowerCase();

            // ค้นหาได้จาก
            // ชื่อ / รหัส / บริษัท

            const matchKeyword =
              !keyword ||
              studentName.includes(keyword) ||
              studentId.includes(keyword) ||
              company.includes(keyword);

            // กรองสาขา

            const matchMajor = !selectedMajor || studentMajor === selectedMajor;

            row.style.display = matchKeyword && matchMajor ? "" : "none";
          });
        };

        // =====================================================
        // รีเซ็ตการค้นหา
        // =====================================================

        window.resetStudentFilters = function () {
          const searchInput = document.getElementById("studentSearchInput");

          const majorSelect = document.getElementById("majorFilter");

          if (searchInput) {
            searchInput.value = "";
          }

          if (majorSelect) {
            majorSelect.value = "";
          }

          filterStudents();
        };

        // =====================================================
        // รับเป็นอาจารย์ที่ปรึกษาโครงการ
        //
        // หมายเหตุ:
        // เมื่อรับเป็นที่ปรึกษาแล้ว
        // ให้ถือว่าเป็นอาจารย์นิเทศด้วยทันที
        // =====================================================

        window.advisorProject = async function (button) {
          const row = button.closest("tr");

          if (!row) {
            return;
          }

          const studentName = row.dataset.name || "นักศึกษา";

          const advisorStatus = row.querySelector(".advisor-status");

          const advisorConfirmStatus = row.querySelector(
            ".advisor-confirm-status",
          );

          const confirmed = await requestTeacherConfirmation(
            `ต้องการรับ "${studentName}" ` +
              `เป็นนักศึกษาที่ปรึกษาโครงการหรือไม่?\n\n` +
              `เมื่อรับแล้ว อาจารย์จะทำหน้าที่เป็นอาจารย์นิเทศของนักศึกษาคนนี้ด้วย`,
          );

          if (!confirmed) {
            return;
          }

          // =====================================
          // เปลี่ยนสถานะอาจารย์
          // =====================================

          if (advisorStatus) {
            advisorStatus.innerHTML = `

            <span class="student-status success">

              <i class="fa-solid fa-circle-check"></i>

              เป็นที่ปรึกษาแล้ว

            </span>

            <small class="role-note">

              ทำหน้าที่อาจารย์นิเทศด้วย

            </small>

          `;
          }

          // =====================================
          // รอตรวจสอบข้อมูลนักศึกษา
          // =====================================

          if (advisorConfirmStatus) {
            advisorConfirmStatus.innerHTML = `

            <span class="student-status warning">

              <i class="fa-regular fa-clock"></i>

              รอยืนยันข้อมูล

            </span>

          `;
          }

          // =====================================
          // เปลี่ยนปุ่มเดิม
          // เป็น ตรวจสอบและยืนยัน
          // =====================================

          button.innerHTML = `

          <i class="fa-solid fa-circle-check"></i>

          ตรวจสอบและยืนยัน

        `;

          button.onclick = function () {
            confirmAdvisorStudent(this);
          };

          showTeacherToast(
            `รับ ${studentName} ` +
              `เป็นนักศึกษาที่ปรึกษาโครงการเรียบร้อยแล้ว\n\n` +
              `อาจารย์จะทำหน้าที่เป็นอาจารย์นิเทศของนักศึกษาคนนี้ด้วย`,
          );
        };

        // =====================================================
        // ตรวจสอบและยืนยันข้อมูล
        // นักศึกษาที่ปรึกษา
        // =====================================================

        window.confirmAdvisorStudent = async function (button) {
          const row = button.closest("tr");

          if (!row) {
            return;
          }

          const studentName = row.dataset.name || "-";

          const studentId = row.dataset.studentId || "-";

          const major = row.dataset.major || "-";

          const company = row.dataset.company || "-";

          const advisorStatus = row.querySelector(".advisor-status");

          const confirmStatus = row.querySelector(".advisor-confirm-status");

          // =====================================
          // ตรวจว่ารับเป็นที่ปรึกษาแล้วหรือยัง
          // =====================================

          if (
            !advisorStatus ||
            !advisorStatus.textContent.includes("เป็นที่ปรึกษาแล้ว")
          ) {
            showTeacherToast("กรุณารับนักศึกษาเป็นนักศึกษาที่ปรึกษาโครงการก่อน");

            return;
          }

          // =====================================
          // ถ้ายืนยันไปแล้ว
          // ให้แสดงข้อมูลแทน
          // =====================================

          if (
            confirmStatus &&
            confirmStatus.textContent.includes("ยืนยันข้อมูลแล้ว")
          ) {
            showTeacherToast(
              `ข้อมูลนักศึกษาที่ได้รับการยืนยันแล้ว\n\n` +
                `ชื่อ: ${studentName}\n` +
                `รหัสนักศึกษา: ${studentId}\n` +
                `สาขา: ${major}\n` +
                `สถานประกอบการ: ${company}\n\n` +
                `อาจารย์ที่ปรึกษา / อาจารย์นิเทศ:\n` +
                `${teacherName}`,
            );

            return;
          }

          // =====================================
          // แสดงข้อมูลก่อนยืนยัน
          // =====================================

          const message =
            `ตรวจสอบข้อมูลนักศึกษาที่ปรึกษาโครงการ\n\n` +
            `ชื่อ: ${studentName}\n` +
            `รหัสนักศึกษา: ${studentId}\n` +
            `สาขา: ${major}\n` +
            `สถานประกอบการ: ${company}\n\n` +
            `อาจารย์ที่ปรึกษา / อาจารย์นิเทศ:\n` +
            `${teacherName}\n\n` +
            `ข้อมูลถูกต้องและต้องการยืนยันหรือไม่?`;

          const confirmed = await requestTeacherConfirmation(message);

          if (!confirmed) {
            return;
          }

          // =====================================
          // เปลี่ยนสถานะเป็นยืนยันแล้ว
          // =====================================

          if (confirmStatus) {
            confirmStatus.innerHTML = `

            <span class="student-status success">

              <i class="fa-solid fa-circle-check"></i>

              ยืนยันข้อมูลแล้ว

            </span>

          `;
          }

          // =====================================
          // เปลี่ยนปุ่ม
          // =====================================

          button.innerHTML = `

          <i class="fa-solid fa-circle-check"></i>

          ข้อมูลที่ยืนยัน

        `;

          button.classList.remove("primary");

          button.classList.add("outline");

          showTeacherToast(`ยืนยันข้อมูลของ ${studentName} เรียบร้อยแล้ว`);
        };

        // =====================================================
        // ดูข้อมูลนักศึกษา
        // =====================================================

        window.viewStudentDetail = function (button) {
          const row = button.closest("tr");

          if (!row) {
            return;
          }

          const studentName = row.dataset.name || "-";

          const studentId = row.dataset.studentId || "-";

          const major = row.dataset.major || "-";

          const company = row.dataset.company || "-";

          const cells = row.querySelectorAll("td");

          // หลังจากเอาคอลัมน์รหัสออก
          // ตำแหน่งอยู่ index 3

          const position = cells[3]?.textContent.trim() || "-";

          const advisorStatus =
            row.querySelector(".advisor-status")?.textContent.trim() || "-";

          const advisorConfirmStatus =
            row.querySelector(".advisor-confirm-status")?.textContent.trim() ||
            "-";

          showTeacherToast(
            `ข้อมูลนักศึกษาสหกิจศึกษา\n\n` +
              `ชื่อ: ${studentName}\n` +
              `รหัสนักศึกษา: ${studentId}\n` +
              `สาขา: ${major}\n` +
              `สถานประกอบการ: ${company}\n` +
              `ตำแหน่ง: ${position}\n\n` +
              `สถานะอาจารย์ที่ปรึกษา / นิเทศ:\n` +
              `${advisorStatus}\n\n` +
              `สถานะยืนยันข้อมูล:\n` +
              `${advisorConfirmStatus}`,
          );
        };

        // =====================================================
        // กด Enter เพื่อค้นหา
        // =====================================================

        const studentSearch = document.getElementById("studentSearchInput");

        if (studentSearch) {
          studentSearch.addEventListener(
            "keydown",

            (event) => {
              if (event.key === "Enter") {
                event.preventDefault();

                filterStudents();
              }
            },
          );
        }
      });


      /* ========================================================
     เปิด Modal ทั่วไป
  ======================================================== */

      function openMockup(id) {
        const modal = document.getElementById(id);

        if (!modal) return;

        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");
      }

      /* ========================================================
     ปิด Modal ทั่วไป
  ======================================================== */

      function closeMockup(id) {
        const modal = document.getElementById(id);

        if (!modal) return;

        modal.classList.remove("show");

        modal.setAttribute("aria-hidden", "true");
      }

      /* ========================================================
     ตัวแปรสำหรับพี่เลี้ยง
  ======================================================== */

      let activeMentorButton = null;

      /* ========================================================
     บันทึกข้อมูลพี่เลี้ยง
     ใช้เฉพาะ Modal พี่เลี้ยงเก่า
  ======================================================== */

      function saveMentorMockup() {
        const modal = document.getElementById("mentorMockup");

        if (!modal) {
          return;
        }

        const inputs = modal.querySelectorAll("input");

        const firstName = inputs[0]?.value.trim() || "";

        const lastName = inputs[1]?.value.trim() || "";

        const mentorName = `${firstName} ${lastName}`.trim();

        if (!mentorName) {
          showTeacherToast("กรุณาระบุชื่อพี่เลี้ยง");

          return;
        }

        if (activeMentorButton) {
          const row = activeMentorButton.closest("tr");

          const badge = row?.querySelector(".mentor-badge");

          if (badge) {
            badge.className = "mentor-badge reassigned";

            badge.innerHTML = `
          <i class="fa-solid fa-user-pen"></i>
          มอบหมายพี่เลี้ยงใหม่
        `;
          }
        }

        showTeacherToast(`บันทึกข้อมูลพี่เลี้ยง "${mentorName}" เรียบร้อยแล้ว`);

        closeMockup("mentorMockup");

        activeMentorButton = null;
      }

      /* ========================================================
     ดูข้อมูลจากตารางทั่วไป
  ======================================================== */

      function showButtonInfo(button) {
        const row = button.closest("tr");

        if (!row) {
          return;
        }

        const cells = row.querySelectorAll("td");

        const student = cells.length ? cells[0].textContent.trim() : "นักศึกษา";

        const values = [];

        cells.forEach((cell, index) => {
          if (index > 0 && cell.textContent.trim()) {
            values.push(cell.textContent.trim());
          }
        });

        showTeacherToast(
          `ข้อมูลของ ${student}\n\n` +
            `${values.join("\n") || "ยังไม่มีข้อมูลเพิ่มเติม"}`,
        );
      }

      /* ========================================================
     ประเมินนักศึกษาแบบ Mockup เดิม
     เก็บไว้สำหรับเมนูที่ยังใช้ตารางเดิม
  ======================================================== */

      async function evaluateStudent(button) {
        const row = button.closest("tr");

        if (!row) {
          return;
        }

        const student =
          row.querySelector("td")?.textContent.trim() || "นักศึกษา";

        const score = await requestTeacherInput(
          `กรอกคะแนนประเมินนักศึกษา\n${student}\n\nตัวอย่าง: 45/50 หรือ 90/100`,
          "",
        );

        if (score === null || score.trim() === "") {
          return;
        }

        const statusCell = row.querySelector("td:last-child");

        const scoreCell = row.querySelector("td:nth-child(2)");

        if (scoreCell) {
          scoreCell.innerHTML = `<strong>${score.trim()}</strong>`;
        }

        if (statusCell) {
          statusCell.innerHTML = `
        <button
          type="button"
          class="btn-mock-sm"
        >
          แก้ไขคะแนน
        </button>
      `;

          statusCell
            .querySelector("button")
            .addEventListener("click", function () {
              evaluateStudent(this);
            });
        }

        showTeacherToast(`บันทึกคะแนนของ ${student} เป็น ${score.trim()} เรียบร้อยแล้ว`);
      }

      /* ========================================================
     ประเมินสถานประกอบการแบบ Mockup เดิม
  ======================================================== */

      async function rateEstablishment(button) {
        const card =
          button.closest(
            ".est-card, .company-card, .evaluation-card, .company-eval-card",
          ) || button.parentElement?.parentElement;

        const company =
          card?.querySelector("strong, h3, h4")?.textContent.trim() ||
          "สถานประกอบการ";

        const score = await requestTeacherInput(
          `ให้คะแนนสถานประกอบการ\n${company}\n\nกรอกคะแนน 1-5`,
          "",
        );

        if (score === null || score.trim() === "") {
          return;
        }

        const numeric = Number(score);

        if (Number.isNaN(numeric) || numeric < 1 || numeric > 5) {
          showTeacherToast("กรุณากรอกคะแนนตั้งแต่ 1 ถึง 5");

          return;
        }

        button.textContent = "ประเมินแล้ว";

        button.classList.remove("solid");

        const existing = card?.querySelector(".mock-rating-result");

        if (existing) {
          existing.textContent = `คะแนน ${numeric}/5`;
        } else if (card) {
          const result = document.createElement("div");

          result.className = "mock-rating-result";

          result.style.marginTop = "8px";

          result.style.fontWeight = "600";

          result.textContent = `คะแนน ${numeric}/5`;

          card.appendChild(result);
        }

        showTeacherToast(`บันทึกคะแนน ${numeric}/5 สำหรับ ${company} เรียบร้อยแล้ว`);
      }

      /* ========================================================
     Event สำหรับปุ่มเก่าที่ยังไม่มี onclick
  ======================================================== */

      document.addEventListener("click", function (e) {
        const target = e.target.closest("button.btn-mock-sm");

        if (!target) {
          return;
        }

        /*
        ถ้าปุ่มมี onclick อยู่แล้ว
        ให้ใช้ function ของปุ่มนั้น
        ไม่ให้ Event ตัวนี้เข้าไปแทรก
      */
        if (target.getAttribute("onclick")) {
          return;
        }

        const buttonText = target.textContent.trim();

        /* =============================
         พี่เลี้ยง
      ============================= */

        if (buttonText.includes("แก้ไขพี่เลี้ยง")) {
          e.preventDefault();

          activeMentorButton = target;

          openMockup("mentorMockup");

          return;
        }

        /* =============================
         ดูข้อมูลทั่วไป
      ============================= */

        if (buttonText.includes("ดูข้อมูล")) {
          e.preventDefault();

          showButtonInfo(target);

          return;
        }

        /* =============================
         ให้คะแนนสถานประกอบการ
      ============================= */

        if (buttonText.includes("ให้คะแนน")) {
          e.preventDefault();

          rateEstablishment(target);

          return;
        }

        /* =============================
         ประเมินนักศึกษา
      ============================= */

        if (buttonText.includes("ประเมิน")) {
          e.preventDefault();

          evaluateStudent(target);
        }
      });

      /* ========================================================
     ปิด Mockup Modal เมื่อคลิกพื้นหลัง
  ======================================================== */

      document.querySelectorAll(".mockup-modal").forEach(function (modal) {
        modal.addEventListener("click", function (e) {
          if (e.target === modal) {
            closeMockup(modal.id);
          }
        });
      });


      let activeVisitButton = null;

      async function editVisitMentor() {
        const input = document.getElementById("visitMentor");
        if (!input) return;

        const current = input.value || "คุณณัฐชา วงศ์พิพัฒน์";
        const newName = await requestTeacherInput("แก้ไขชื่อพี่เลี้ยงผู้ร่วมการนิเทศ", current);

        if (newName !== null && newName.trim() !== "") {
          input.value = newName.trim();
        }
      }

      // คลิกพื้นที่ด้านนอกเพื่อปิด
      document.addEventListener("click", function (e) {
        const modal = document.getElementById("visitMockup");
        if (modal && e.target === modal) {
          closeVisitMockup();
        }
      });

      // กด ESC เพื่อปิด
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeVisitMockup();
      });

      let activeStudentEvaluationButton = null;

      function showTeacherToast(message) {
        const toast = document.getElementById("teacherToast");
        if (!toast) return;
        toast.textContent = message;
        toast.hidden = false;
        window.clearTimeout(showTeacherToast.timer);
        showTeacherToast.timer = window.setTimeout(() => { toast.hidden = true; }, 3200);
      }

      let teacherConfirmationResolver = null;
      let teacherConfirmationMode = "confirm";

      function requestTeacherConfirmation(message) {
        const modal = document.getElementById("teacherConfirmModal");
        teacherConfirmationMode = "confirm";
        document.getElementById("teacherConfirmInput").hidden = true;
        document.getElementById("teacherConfirmMessage").textContent = message;
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        return new Promise((resolve) => { teacherConfirmationResolver = resolve; });
      }

      function requestTeacherInput(message, initialValue = "") {
        const modal = document.getElementById("teacherConfirmModal");
        const input = document.getElementById("teacherConfirmInput");
        teacherConfirmationMode = "input";
        input.value = initialValue;
        input.hidden = false;
        document.getElementById("teacherConfirmMessage").textContent = message;
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        return new Promise((resolve) => { teacherConfirmationResolver = resolve; });
      }

      function resolveTeacherConfirmation(accepted) {
        const modal = document.getElementById("teacherConfirmModal");
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        if (teacherConfirmationResolver) {
          teacherConfirmationResolver(teacherConfirmationMode === "input"
            ? accepted ? document.getElementById("teacherConfirmInput").value : null
            : accepted);
        }
        teacherConfirmationResolver = null;
        teacherConfirmationMode = "confirm";
      }

      function returnToRequestDetails() {
        document.getElementById("requestRejectReason").hidden = true;
        document.getElementById("requestDecisionConfirm").hidden = true;
        document.getElementById("requestDecisionControls").hidden = activeCoopRequestRow?.dataset.status !== "pending";
        document.getElementById("requestDecisionFeedback").textContent = "";
      }

      function openStudentEvaluation(button) {
        activeStudentEvaluationButton = button;

        const row = button.closest("tr");
        const student = row?.querySelector("td")?.textContent.trim() ||
          button.dataset.studentName || "นักศึกษา";

        const nameEl = document.getElementById("studentEvalName");
        if (nameEl) nameEl.textContent = student;

        document.getElementById("evalWorkScore").value = "";
        document.getElementById("evalResponsibilityScore").value = "";
        document.getElementById("evalBehaviorScore").value = "";
        document.getElementById("evalComment").value = "";

        const modal = document.getElementById("studentEvaluationMockup");
        if (modal) {
          modal.style.display = "flex";
          modal.classList.add("show");
        }
      }

      function closeStudentEvaluation() {
        const modal = document.getElementById("studentEvaluationMockup");
        if (modal) {
          modal.style.display = "none";
          modal.classList.remove("show");
        }
        activeStudentEvaluationButton = null;
      }

      function saveStudentEvaluation() {
        const work = document.getElementById("evalWorkScore").value;
        const responsibility = document.getElementById(
          "evalResponsibilityScore",
        ).value;
        const behavior = document.getElementById("evalBehaviorScore").value;
        const comment = document.getElementById("evalComment").value.trim();

        if (!work || !responsibility || !behavior) {
          showTeacherToast("กรุณากรอกคะแนนให้ครบ");
          return;
        }

        const total = Math.round(
          (Number(work) + Number(responsibility) + Number(behavior)) / 3,
        );
        const row = activeStudentEvaluationButton?.closest("tr");
        const card = activeStudentEvaluationButton?.closest(".teacher-student-evaluation-card");

        if (row) {
          const actionCell = row.querySelector("td:last-child");
          if (actionCell) {
            actionCell.innerHTML =
              '<button type="button" class="btn-mock-sm" onclick="openStudentEvaluation(this)">แก้ไขคะแนน</button>';
          }

          // ถ้ามีช่องคะแนนอยู่แล้ว ให้แสดงคะแนนเฉลี่ย
          const scoreCell = row.querySelector("td:nth-child(2)");
          if (scoreCell && scoreCell.textContent.includes("ยังไม่ประเมิน")) {
            scoreCell.innerHTML = `<b>${total}/100</b> <span class="tag tag-green">ประเมินแล้ว</span>`;
          }
        }

        if (card) {
          const status = card.querySelector(".evaluation-status-note");
          if (status) status.textContent = `ประเมินแล้ว · ${total}/100`;
          activeStudentEvaluationButton.textContent = "แก้ไขคะแนน";
        }
        showTeacherToast(`บันทึกการประเมินแล้ว คะแนนเฉลี่ย ${total}/100`);
        closeStudentEvaluation();
      }

      function openEstablishmentEvaluation(button) {
        const modal = document.getElementById("establishmentEvaluationMockup");
        if (modal) {
          modal.style.display = "flex";
          modal.classList.add("show");
        }
      }

      function closeEstablishmentEvaluation() {
        const modal = document.getElementById("establishmentEvaluationMockup");
        if (modal) {
          modal.style.display = "none";
          modal.classList.remove("show");
        }
      }

      function saveEmptyEstablishmentEvaluation() {
        const modal = document.getElementById("establishmentEvaluationMockup");
        const title = modal?.querySelector("h3");
        const subtitle = modal?.querySelector(".mockup-subtitle");
        if (title) title.textContent = "ประเมินสถานประกอบการ";
        if (subtitle)
          subtitle.textContent = "บันทึกแบบประเมินเรียบร้อยแล้ว (Mockup)";
        const button = modal?.querySelector(".empty-evaluation-box button");
        if (button) {
          button.textContent = "ประเมินแล้ว";
          button.disabled = true;
        }
      }
      document
        .getElementById("advisorTypeFilter")
        ?.addEventListener("change", filterAdvisorStudents);


      // ================= จัดการข้อมูลส่วนตัว =================
      document.addEventListener("DOMContentLoaded", function () {
        loadProfileData();
        setProfileEditMode(false);
      });

      function setProfileEditMode(editing) {
        document.getElementById("profileFullName").readOnly = !editing;
        document.getElementById("profileEmail").readOnly = !editing;
        document.getElementById("profilePassword").disabled = !editing;
        document.getElementById("profileConfirmPassword").disabled = !editing;
        document.getElementById("profileEditButton").hidden = editing;
        document.getElementById("profileCancelButton").hidden = !editing;
        document.getElementById("profileSaveButton").hidden = !editing;
      }

      function cancelProfileEdit() {
        loadProfileData();
        document.getElementById("profileFeedback").textContent = "ยกเลิกการแก้ไขแล้ว";
        setProfileEditMode(false);
      }

      function loadProfileData() {
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

        const nameInput = document.getElementById("profileFullName");
        const emailInput = document.getElementById("profileEmail");
        const majorInput = document.getElementById("profileMajor");
        const passwordInput = document.getElementById("profilePassword");
        const confirmPasswordInput = document.getElementById(
          "profileConfirmPassword",
        );

        if (nameInput) {
          nameInput.value =
            user.name ||
            document.getElementById("userNameDisplay")?.textContent.trim() ||
            "ผศ.ดร.สุพาภรณ์ ซิ้มเจริญ";
        }

        if (emailInput) {
          emailInput.value = user.email || "";
        }

        if (majorInput) {
          majorInput.value = user.major || "";
        }

        if (passwordInput) {
          passwordInput.value = "";
        }

        if (confirmPasswordInput) {
          confirmPasswordInput.value = "";
        }
      }

      function saveProfile(event) {
        event.preventDefault();

        const fullName =
          document.getElementById("profileFullName")?.value.trim() || "";

        const email =
          document.getElementById("profileEmail")?.value.trim() || "";

        const password =
          document.getElementById("profilePassword")?.value || "";

        const confirmPassword =
          document.getElementById("profileConfirmPassword")?.value || "";

        if (!fullName) {
          document.getElementById("profileFeedback").textContent = "กรุณากรอกชื่อ-นามสกุล";
          return;
        }

        if (!email) {
          document.getElementById("profileFeedback").textContent = "กรุณากรอก Email";
          return;
        }

        if (password && password.length < 6) {
          document.getElementById("profileFeedback").textContent = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
          return;
        }

        if (password !== confirmPassword) {
          document.getElementById("profileFeedback").textContent = "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน";
          return;
        }

        const currentUser = JSON.parse(
          localStorage.getItem("currentUser") || "{}",
        );

        const updatedUser = {
          ...currentUser,
          name: fullName,
          email: email,
        };

        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        const userNameDisplay = document.getElementById("userNameDisplay");

        if (userNameDisplay) {
          userNameDisplay.textContent = fullName;
        }

        const overviewGreeting = document.getElementById("overviewGreeting");

        if (overviewGreeting) {
          overviewGreeting.textContent = `ยินดีต้อนรับ, ${fullName}`;
        }

        document.getElementById("profilePassword").value = "";
        document.getElementById("profileConfirmPassword").value = "";
        document.getElementById("profileFeedback").textContent = password
          ? "บันทึกข้อมูลแล้ว (รหัสผ่านจะบันทึกจริงเมื่อเชื่อมต่อ Backend)"
          : "บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว";
        setProfileEditMode(false);
      }
      let activeCoopRequestRow = null;

      function viewCoopRequest(button) {
        activeCoopRequestRow = button.closest("tr");
        if (!activeCoopRequestRow) return;
        const cells = activeCoopRequestRow.querySelectorAll("td");
        const values = [
          cells[0]?.textContent.trim() || "-",
          cells[1]?.textContent.trim() || "-",
          cells[2]?.textContent.trim() || "-",
          cells[3]?.textContent.trim() || "-",
          cells[4]?.textContent.trim() || "-",
          cells[5]?.textContent.trim() || "-",
          cells[6]?.textContent.trim() || "-",
        ];
        ["requestDetailStudent", "requestDetailId", "requestDetailMajor", "requestDetailCompany", "requestDetailPosition", "requestDetailProvince", "requestDetailDate"].forEach((id, index) => {
          document.getElementById(id).textContent = values[index];
        });
        document.getElementById("requestDetailStatus").textContent =
          activeCoopRequestRow.dataset.status === "approved" ? "อนุมัติแล้ว" :
          activeCoopRequestRow.dataset.status === "rejected" ? "ไม่อนุมัติ" : "รอพิจารณา";
        document.getElementById("requestRejectReason").value = "";
        document.getElementById("requestDecisionFeedback").textContent =
          activeCoopRequestRow.dataset.rejectReason ? `เหตุผลเดิม: ${activeCoopRequestRow.dataset.rejectReason}` : "";
        document.getElementById("requestDecisionControls").hidden = activeCoopRequestRow.dataset.status !== "pending";
        document.getElementById("requestDecisionConfirm").hidden = true;
        document.getElementById("requestDetailModal").classList.add("show");
        document.getElementById("requestDetailModal").setAttribute("aria-hidden", "false");
      }

      function closeCoopRequestDetail() {
        document.getElementById("requestDetailModal").classList.remove("show");
        document.getElementById("requestDetailModal").setAttribute("aria-hidden", "true");
        activeCoopRequestRow = null;
      }

      function approveCoopRequest() {
        document.getElementById("requestDecisionTitle").textContent = "ยืนยันอนุมัติคำร้องนี้หรือไม่?";
        document.getElementById("requestRejectReason").hidden = true;
        document.getElementById("requestDecisionControls").hidden = true;
        document.getElementById("requestDecisionConfirm").hidden = false;
        document.getElementById("requestDecisionConfirmButton").onclick = () => completeCoopRequest("approved");
      }

      function rejectCoopRequest() {
        document.getElementById("requestDecisionTitle").textContent = "ระบุเหตุผลและยืนยันการไม่อนุมัติ";
        document.getElementById("requestRejectReason").hidden = false;
        document.getElementById("requestDecisionControls").hidden = true;
        document.getElementById("requestDecisionConfirm").hidden = false;
        document.getElementById("requestDecisionConfirmButton").onclick = () => {
          const reason = document.getElementById("requestRejectReason").value.trim();
          if (!reason) {
            document.getElementById("requestDecisionFeedback").textContent = "กรุณาระบุเหตุผล";
            return;
          }
          completeCoopRequest("rejected", reason);
        };
      }

      function completeCoopRequest(status, reason = "") {
        if (!activeCoopRequestRow) return;
        activeCoopRequestRow.dataset.status = status;
        if (reason) activeCoopRequestRow.dataset.rejectReason = reason;
        const statusCell = activeCoopRequestRow.querySelector(".request-status");
        statusCell.innerHTML = status === "approved"
          ? '<span class="tag tag-green">อนุมัติแล้ว</span>'
          : '<span class="tag tag-red">ไม่อนุมัติ</span>';
        const actionCell = activeCoopRequestRow.querySelector(".request-actions");
        if (actionCell) actionCell.innerHTML = '<button type="button" class="btn-mock-sm" onclick="viewCoopRequest(this)">ดูรายละเอียด</button>';
        updateCoopRequestSummary();
        document.getElementById("requestDetailStatus").textContent = status === "approved" ? "อนุมัติแล้ว" : "ไม่อนุมัติ";
        document.getElementById("requestDecisionFeedback").textContent = "บันทึกผลคำร้องแล้ว";
        document.getElementById("requestDecisionControls").hidden = true;
        document.getElementById("requestDecisionConfirm").hidden = true;
      }
      function filterCoopRequests() {
        const keyword =
          document
            .getElementById("coopRequestSearch")
            ?.value.trim()
            .toLowerCase() || "";

        const status =
          document.getElementById("coopRequestStatus")?.value || "";

        const rows = document.querySelectorAll("#coopRequestTable tbody tr");

        rows.forEach((row) => {
          const name = (row.dataset.name || "").toLowerCase();

          const studentId = (row.dataset.id || "").toLowerCase();

          const company = (row.dataset.company || "").toLowerCase();

          const rowStatus = row.dataset.status || "";

          const matchKeyword =
            !keyword ||
            name.includes(keyword) ||
            studentId.includes(keyword) ||
            company.includes(keyword);

          const matchStatus = !status || rowStatus === status;

          row.style.display = matchKeyword && matchStatus ? "" : "none";
        });
      }

      function updateCoopRequestSummary() {
        const rows = document.querySelectorAll("#coopRequestTable tbody tr");

        let pending = 0;
        let approved = 0;
        let rejected = 0;

        rows.forEach((row) => {
          switch (row.dataset.status) {
            case "approved":
              approved++;
              break;

            case "rejected":
              rejected++;
              break;

            default:
              pending++;
          }
        });

        const pendingElement = document.getElementById("pendingRequestCount");

        const approvedElement = document.getElementById("approvedRequestCount");

        const rejectedElement = document.getElementById("rejectedRequestCount");

        if (pendingElement) {
          pendingElement.textContent = pending;
        }

        if (approvedElement) {
          approvedElement.textContent = approved;
        }

        if (rejectedElement) {
          rejectedElement.textContent = rejected;
        }
      }

      document.addEventListener("DOMContentLoaded", () => {
        updateCoopRequestSummary();
      });
      function resetCoopRequestFilter() {
        const searchInput = document.getElementById("coopRequestSearch");
        const statusSelect = document.getElementById("coopRequestStatus");

        if (searchInput) searchInput.value = "";
        if (statusSelect) statusSelect.value = "";

        filterCoopRequests();
      }
      let activeEvaluationCard = null;
      let activeEvaluationName = "";

      function openEvaluationItem(button, evaluationName) {
        activeEvaluationCard = button.closest(".evaluation-item-card");

        activeEvaluationName = evaluationName;

        document.getElementById("evaluationItemTitle").textContent =
          `ประเมิน${evaluationName}`;

        document.getElementById("evaluationItemScore").value = "";

        document.getElementById("evaluationItemResult").value = "";

        document.getElementById("evaluationItemComment").value = "";

        const modal = document.getElementById("evaluationItemModal");

        modal.style.display = "flex";
        modal.classList.add("show");
      }

      function closeEvaluationItem() {
        const modal = document.getElementById("evaluationItemModal");

        modal.style.display = "none";
        modal.classList.remove("show");

        activeEvaluationCard = null;
        activeEvaluationName = "";
      }

      function saveEvaluationItem() {
        if (!activeEvaluationCard) return;

        const score = document.getElementById("evaluationItemScore").value;

        const result = document.getElementById("evaluationItemResult").value;

        const comment = document
          .getElementById("evaluationItemComment")
          .value.trim();

        if (score === "") {
          showTeacherToast("กรุณากรอกคะแนน");
          return;
        }

        const numericScore = Number(score);

        if (
          Number.isNaN(numericScore) ||
          numericScore < 0 ||
          numericScore > 100
        ) {
          showTeacherToast("คะแนนต้องอยู่ระหว่าง 0 - 100");
          return;
        }

        if (!result) {
          showTeacherToast("กรุณาเลือกผลการประเมิน");
          return;
        }

        activeEvaluationCard.dataset.evaluated = "true";
        activeEvaluationCard.dataset.score = numericScore;
        activeEvaluationCard.dataset.result = result;
        activeEvaluationCard.dataset.comment = comment;

        const scoreElement = activeEvaluationCard.querySelector(".eval-score");

        if (scoreElement) {
          scoreElement.textContent = `${numericScore}/100`;
        }

        const status = activeEvaluationCard.querySelector(".eval-status");

        if (status) {
          status.className = "eval-status done";

          status.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> ประเมินแล้ว';
        }

        const button = activeEvaluationCard.querySelector(
          ".evaluation-item-action button",
        );

        if (button) {
          button.classList.remove("solid");

          button.innerHTML = '<i class="fa-solid fa-pen"></i> แก้ไขคะแนน';
        }

        updateEvaluationProgress();

        showTeacherToast(`บันทึกการประเมิน ${activeEvaluationName} เรียบร้อยแล้ว`);

        closeEvaluationItem();
      }

      function updateEvaluationProgress() {
        const cards = document.querySelectorAll(".evaluation-item-card");

        let completed = 0;

        cards.forEach((card) => {
          if (card.dataset.evaluated === "true") {
            completed++;
          }
        });

        const progress = document.getElementById("evaluationProgress");

        if (progress) {
          progress.textContent = `ประเมินแล้ว ${completed} / ${cards.length}`;
        }
      }


      /* ========================================================
     ตัวแปรเก็บ Card ปัจจุบัน
  ======================================================== */

      let activeAppointmentCard = null;

      let activeMentorConfirmationCard = null;

      /* ========================================================
     วันที่ไทย
  ======================================================== */

      function formatAppointmentThaiDate(dateString) {
        if (!dateString) {
          return "ยังไม่ได้กำหนด";
        }

        const months = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ];

        const parts = dateString.split("-");

        if (parts.length !== 3) {
          return dateString;
        }

        const year = Number(parts[0]) + 543;

        const month = Number(parts[1]) - 1;

        const day = Number(parts[2]);

        return `${day} ` + `${months[month]} ` + `${year}`;
      }

      /* ========================================================
     วันที่ไทยแบบสั้น
  ======================================================== */

      function formatAppointmentShortDate(dateString) {
        if (!dateString) {
          return "-";
        }

        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      /* ========================================================
     เปิด Modal นัดหมาย
  ======================================================== */

      function openAppointmentForButton(button) {
        const card = button.closest(".appointment-card");

        if (!card) {
          return;
        }

        activeAppointmentCard = card;

        const round = card.dataset.round;

        const studentName = card.dataset.studentName;

        const mentorName = getAppointmentEffectiveMentor(card).name;

        const modalTitle = document.getElementById("appointmentModalTitle");

        modalTitle.textContent =
          card.dataset.appointmentStatus === "saved"
            ? `แก้ไขนัดหมายนิเทศครั้งที่ ${round}`
            : `สร้างนัดหมายนิเทศครั้งที่ ${round}`;

        document.getElementById("appointmentStudent").value = studentName;

        document.getElementById("appointmentRound").value = `ครั้งที่ ${round}`;

        document.getElementById("appointmentMentor").value = mentorName;

        document.getElementById("appointmentDate").value =
          card.dataset.date || "";

        document.getElementById("appointmentTime").value =
          card.dataset.time || "";

        document.getElementById("appointmentPlace").value =
          card.dataset.place || "";

        document.getElementById("appointmentNote").value =
          card.dataset.note || "";

        const modal = document.getElementById("appointmentMockup");

        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");
      }

      /* ========================================================
     ปิด Modal นัดหมาย
  ======================================================== */

      function closeAppointmentModal() {
        const modal = document.getElementById("appointmentMockup");

        modal.classList.remove("show");

        modal.setAttribute("aria-hidden", "true");

        activeAppointmentCard = null;
      }

      /* ========================================================
     บันทึกนัดหมาย
  ======================================================== */

      function saveAppointmentMockup() {
        if (!activeAppointmentCard) {
          return;
        }

        const date = document.getElementById("appointmentDate").value;

        const time = document.getElementById("appointmentTime").value;

        const place = document.getElementById("appointmentPlace").value.trim();

        const note = document.getElementById("appointmentNote").value.trim();

        if (!date) {
          showTeacherToast("กรุณาเลือกวันที่นัดหมาย");

          return;
        }

        if (!time) {
          showTeacherToast("กรุณาเลือกเวลานัดหมาย");

          return;
        }

        if (!place) {
          showTeacherToast("กรุณาระบุสถานที่ / ช่องทางนิเทศ");

          return;
        }

        activeAppointmentCard.dataset.date = date;

        activeAppointmentCard.dataset.time = time;

        activeAppointmentCard.dataset.place = place;

        activeAppointmentCard.dataset.note = note;

        activeAppointmentCard.dataset.appointmentStatus = "saved";

        /*
      เมื่อแก้ไขวันหรือเวลา
      ให้พี่เลี้ยงยืนยันใหม่
    */

        activeAppointmentCard.dataset.confirmStatus = "none";

        activeAppointmentCard.dataset.confirmDate = "";

        renderAppointmentCard(activeAppointmentCard);

        const student = activeAppointmentCard.dataset.studentName;

        const round = activeAppointmentCard.dataset.round;

        closeAppointmentModal();

        showTeacherToast(
          `บันทึกนัดหมายนิเทศครั้งที่ ${round}\n` +
            `${student}\n\n` +
            `เรียบร้อยแล้ว\n` +
            `กรุณาส่งข้อมูลให้พี่เลี้ยงยืนยัน`,
        );
      }

      /* ========================================================
     ส่งข้อมูลให้พี่เลี้ยงยืนยัน
  ======================================================== */

      async function sendMentorConfirmation(button) {
        const card = button.closest(".appointment-card");

        if (!card) {
          return;
        }

        if (card.dataset.appointmentStatus !== "saved") {
          showTeacherToast("กรุณาสร้างนัดหมายก่อนส่งข้อมูลให้พี่เลี้ยง");

          return;
        }

        const student = card.dataset.studentName;

        const round = card.dataset.round;

        const date = formatAppointmentThaiDate(card.dataset.date);

        const time = card.dataset.time;

        const mentor = card.dataset.mentorName;

        const confirmed = await requestTeacherConfirmation(
          `ส่งข้อมูลนัดหมายให้พี่เลี้ยงยืนยันหรือไม่?\n\n` +
            `นักศึกษา: ${student}\n` +
            `นิเทศครั้งที่: ${round}\n` +
            `วันที่: ${date}\n` +
            `เวลา: ${time} น.\n` +
            `พี่เลี้ยง: ${mentor}`,
        );

        if (!confirmed) {
          return;
        }

        card.dataset.confirmStatus = "pending";

        card.dataset.confirmDate = "";

        renderAppointmentCard(card);

        showTeacherToast(
          `ส่งข้อมูลนัดหมายให้ ${mentor} เรียบร้อยแล้ว\n\n` +
            `ขณะนี้อยู่ในสถานะรอการยืนยัน`,
        );
      }

      /* ========================================================
     เปิดตรวจสอบการยืนยัน
  ======================================================== */

      function openMentorConfirmation(button) {
        const card = button.closest(".appointment-card");

        if (!card) {
          return;
        }

        if (card.dataset.appointmentStatus !== "saved") {
          showTeacherToast("ยังไม่มีนัดหมายสำหรับตรวจสอบ");

          return;
        }

        activeMentorConfirmationCard = card;

        document.getElementById("mentorConfirmStudent").textContent =
          card.dataset.studentName;

        document.getElementById("mentorConfirmRound").textContent =
          `ครั้งที่ ${card.dataset.round}`;

        document.getElementById("mentorConfirmName").textContent =
          card.dataset.mentorName;

        const status = card.dataset.confirmStatus;

        const select = document.getElementById("mentorConfirmStatus");

        if (status === "confirmed") {
          select.value = "confirmed";
        } else if (status === "representative") {
          select.value = "unavailable";
        } else {
          select.value = "pending";
        }

        document.getElementById("representativeName").value =
          card.dataset.representativeName || "";

        document.getElementById("representativePosition").value =
          card.dataset.representativePosition || "";

        document.getElementById("representativePhone").value =
          card.dataset.representativePhone || "";

        document.getElementById("representativeReason").value =
          card.dataset.representativeReason || "";

        toggleRepresentativeFields();

        const modal = document.getElementById("mentorConfirmationModal");

        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");
      }

      /* ========================================================
     แสดง/ซ่อนฟอร์มผู้แทน
  ======================================================== */

      function toggleRepresentativeFields() {
        const value = document.getElementById("mentorConfirmStatus").value;

        const fields = document.getElementById("representativeFields");

        fields.style.display = value === "unavailable" ? "block" : "none";
      }

      /* ========================================================
     บันทึกผลตอบรับ
  ======================================================== */

      function saveMentorConfirmation() {
        if (!activeMentorConfirmationCard) {
          return;
        }

        const card = activeMentorConfirmationCard;

        const status = document.getElementById("mentorConfirmStatus").value;

        /* ========================
       รอการตอบรับ
    ======================== */

        if (status === "pending") {
          card.dataset.confirmStatus = "pending";

          card.dataset.confirmDate = "";

          renderAppointmentCard(card);

          closeMentorConfirmation();

          return;
        }

        /* ========================
       พี่เลี้ยงยืนยัน
    ======================== */

        if (status === "confirmed") {
          card.dataset.confirmStatus = "confirmed";

          card.dataset.confirmDate = new Date().toISOString().split("T")[0];

          card.dataset.representativeName = "";

          card.dataset.representativePosition = "";

          card.dataset.representativePhone = "";

          card.dataset.representativeReason = "";

          renderAppointmentCard(card);

          closeMentorConfirmation();

          showTeacherToast("บันทึกการยืนยันจากพี่เลี้ยงเรียบร้อยแล้ว");

          return;
        }

        /* ========================
       พี่เลี้ยงไม่สะดวก
       ใช้ผู้แทน
    ======================== */

        if (status === "unavailable") {
          const name = document
            .getElementById("representativeName")
            .value.trim();

          const position = document
            .getElementById("representativePosition")
            .value.trim();

          const phone = document
            .getElementById("representativePhone")
            .value.trim();

          const reason = document
            .getElementById("representativeReason")
            .value.trim();

          if (!name) {
            showTeacherToast("กรุณาระบุชื่อผู้แทน");

            return;
          }

          if (!position) {
            showTeacherToast("กรุณาระบุตำแหน่งผู้แทน");

            return;
          }

          if (!reason) {
            showTeacherToast("กรุณาระบุเหตุผลที่พี่เลี้ยงหลักไม่สะดวก");

            return;
          }

          card.dataset.confirmStatus = "representative";

          card.dataset.confirmDate = new Date().toISOString().split("T")[0];

          card.dataset.representativeName = name;

          card.dataset.representativePosition = position;

          card.dataset.representativePhone = phone;

          card.dataset.representativeReason = reason;

          renderAppointmentCard(card);

          closeMentorConfirmation();

          showTeacherToast(`บันทึกผู้แทนพี่เลี้ยงเรียบร้อยแล้ว\n\n` + `ผู้แทน: ${name}`);
        }
      }

      /* ========================================================
     ปิด Modal พี่เลี้ยง
  ======================================================== */

      function closeMentorConfirmation() {
        const modal = document.getElementById("mentorConfirmationModal");

        modal.classList.remove("show");

        modal.setAttribute("aria-hidden", "true");

        activeMentorConfirmationCard = null;
      }

      /* ========================================================
     หาพี่เลี้ยงที่ใช้จริง
     พี่เลี้ยงหลัก หรือ ผู้แทน
  ======================================================== */

      function getAppointmentEffectiveMentor(card) {
        if (
          card.dataset.confirmStatus === "representative" &&
          card.dataset.representativeName
        ) {
          return {
            name: card.dataset.representativeName,

            position: card.dataset.representativePosition,

            type: "ผู้แทนพี่เลี้ยง",
          };
        }

        return {
          name: card.dataset.mentorName,

          position: card.dataset.mentorPosition,

          type: "พี่เลี้ยงหลัก",
        };
      }

      /* ========================================================
     Render Card
  ======================================================== */

      function renderAppointmentCard(card) {
        const appointmentStatus = card.dataset.appointmentStatus;

        const confirmStatus = card.dataset.confirmStatus;

        const mainStatus = card.querySelector(".appointment-main-status");

        const mainStatusText = card.querySelector(
          ".appointment-main-status-text",
        );

        const editButtonText = card.querySelector(
          ".appointment-edit-button-text",
        );

        const sendButton = card.querySelector(".appointment-send-btn");

        const actionButtons = card.querySelectorAll(
          ".appointment-actions button",
        );

        const confirmButton = actionButtons[3];

        const dateDisplay = card.querySelector(".appointment-date-display");

        const timeDisplay = card.querySelector(".appointment-time-display");

        const confirmIcon = card.querySelector(".appointment-confirm-icon");

        const confirmText = card.querySelector(".confirmation-text");

        const confirmDetail = card.querySelector(".confirmation-detail-text");

        const note = card.querySelector(".appointment-note");

        const noteText = card.querySelector(".appointment-note-text");

        const mentorDisplay = card.querySelector(".appointment-mentor-display");

        const mentorPositionDisplay = card.querySelector(
          ".appointment-mentor-position-display",
        );

        /* ===============================
       ยังไม่สร้างนัดหมาย
    =============================== */

        if (appointmentStatus !== "saved") {
          mainStatus.className = "appointment-main-status not-created";

          mainStatus.innerHTML = `
          <i class="fa-regular fa-calendar"></i>

          <span class="appointment-main-status-text">
            ยังไม่สร้างนัดหมาย
          </span>
        `;

          editButtonText.textContent = "สร้างนัดหมาย";

          dateDisplay.textContent = "ยังไม่ได้กำหนด";

          timeDisplay.textContent = "-";

          sendButton.disabled = true;

          confirmButton.disabled = true;

          return;
        }

        /* ===============================
       นัดหมายแล้ว
    =============================== */

        mainStatus.className = "appointment-main-status confirmed";

        mainStatus.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>

        <span class="appointment-main-status-text">
          นัดหมายแล้ว
        </span>
      `;

        editButtonText.textContent = "แก้ไขนัดหมาย";

        dateDisplay.textContent = formatAppointmentThaiDate(card.dataset.date);

        timeDisplay.textContent = `เวลา ${card.dataset.time} น.`;

        sendButton.disabled = false;

        confirmButton.disabled = false;

        /* ===============================
       Mentor
    =============================== */

        const effectiveMentor = getAppointmentEffectiveMentor(card);

        mentorDisplay.textContent = effectiveMentor.name;

        mentorPositionDisplay.textContent = `${effectiveMentor.type} · ${effectiveMentor.position}`;

        /* ===============================
       ยังไม่ส่ง
    =============================== */

        if (confirmStatus === "none") {
          confirmIcon.className =
            "appointment-detail-icon appointment-confirm-icon neutral-icon";

          confirmIcon.innerHTML = '<i class="fa-solid fa-minus"></i>';

          confirmText.className = "confirmation-text neutral-text";

          confirmText.textContent = "ยังไม่ส่งข้อมูล";

          confirmDetail.textContent = "กรุณาส่งข้อมูลให้พี่เลี้ยงยืนยัน";

          note.className = "appointment-note neutral-note";

          noteText.textContent =
            "สร้างนัดหมายแล้ว กรุณาส่งข้อมูลให้พี่เลี้ยงยืนยัน";

          sendButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> ส่งข้อมูลยืนยัน';
        } else if (confirmStatus === "pending") {

        /* ===============================
       รอยืนยัน
    =============================== */
          confirmIcon.className =
            "appointment-detail-icon appointment-confirm-icon pending-icon";

          confirmIcon.innerHTML = '<i class="fa-regular fa-clock"></i>';

          confirmText.className = "confirmation-text pending-text";

          confirmText.textContent = "รอการยืนยัน";

          confirmDetail.textContent = "ส่งข้อมูลให้พี่เลี้ยงแล้ว";

          note.className = "appointment-note pending-note";

          noteText.textContent =
            "ส่งคำขอยืนยันแล้ว กำลังรอการตอบรับจากพี่เลี้ยง";

          sendButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> ส่งข้อมูลอีกครั้ง';
        } else if (confirmStatus === "confirmed") {

        /* ===============================
       ยืนยัน
    =============================== */
          confirmIcon.className =
            "appointment-detail-icon appointment-confirm-icon confirmed-icon";

          confirmIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

          confirmText.className = "confirmation-text confirmed-text";

          confirmText.textContent = "ยืนยันแล้ว";

          confirmDetail.textContent = `ยืนยันเมื่อ ${formatAppointmentShortDate(
            card.dataset.confirmDate,
          )}`;

          note.className = "appointment-note confirmed-note";

          noteText.textContent =
            "พี่เลี้ยงยืนยันวันและเวลานัดหมายเรียบร้อยแล้ว";

          sendButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> ส่งข้อมูลอีกครั้ง';
        } else if (confirmStatus === "representative") {

        /* ===============================
       ใช้ผู้แทน
    =============================== */
          confirmIcon.className =
            "appointment-detail-icon appointment-confirm-icon representative-icon";

          confirmIcon.innerHTML = '<i class="fa-solid fa-user-group"></i>';

          confirmText.className = "confirmation-text representative-text";

          confirmText.textContent = "ใช้ผู้แทนพี่เลี้ยง";

          confirmDetail.textContent = effectiveMentor.name;

          note.className = "appointment-note representative-note";

          noteText.textContent = `พี่เลี้ยงหลักไม่สะดวก ผู้แทนคือ ${effectiveMentor.name}`;

          sendButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> ส่งข้อมูลอีกครั้ง';
        }
      }

      /* ========================================================
     ดูรายละเอียดนัดหมาย
  ======================================================== */

      function viewAppointmentDetail(button) {
        const card = button.closest(".appointment-card");

        if (!card) {
          return;
        }

        const mentor = getAppointmentEffectiveMentor(card);

        let confirmationText = "ยังไม่ส่งข้อมูล";

        if (card.dataset.confirmStatus === "pending") {
          confirmationText = "รอการยืนยันจากพี่เลี้ยง";
        } else if (card.dataset.confirmStatus === "confirmed") {
          confirmationText = "พี่เลี้ยงยืนยันแล้ว";
        } else if (card.dataset.confirmStatus === "representative") {
          confirmationText = "พี่เลี้ยงหลักไม่สะดวก ใช้ผู้แทน";
        }

        let representativeHtml = "";

        if (card.dataset.confirmStatus === "representative") {
          representativeHtml = `

        <div class="appointment-detail-modal-item">

          <span>
            ผู้แทนพี่เลี้ยง
          </span>

          <strong>
            ${card.dataset.representativeName}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            ตำแหน่งผู้แทน
          </span>

          <strong>
            ${card.dataset.representativePosition}
          </strong>

        </div>


        <div class="appointment-detail-modal-item full">

          <span>
            เหตุผลที่พี่เลี้ยงหลักไม่สะดวก
          </span>

          <strong>
            ${card.dataset.representativeReason}
          </strong>

        </div>

      `;
        }

        document.getElementById("appointmentDetailBody").innerHTML = `

      <div class="appointment-detail-modal-grid">

        <div class="appointment-detail-modal-item">

          <span>
            นักศึกษา
          </span>

          <strong>
            ${card.dataset.studentName}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            นิเทศครั้งที่
          </span>

          <strong>
            ${card.dataset.round}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            สาขา
          </span>

          <strong>
            ${card.dataset.major}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            สถานประกอบการ
          </span>

          <strong>
            ${card.dataset.company}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            วันที่
          </span>

          <strong>
            ${formatAppointmentThaiDate(card.dataset.date)}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            เวลา
          </span>

          <strong>
            ${card.dataset.time ? card.dataset.time + " น." : "-"}
          </strong>

        </div>


        <div class="appointment-detail-modal-item full">

          <span>
            สถานที่ / ช่องทางนิเทศ
          </span>

          <strong>
            ${card.dataset.place || "-"}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            พี่เลี้ยงที่เข้าร่วม
          </span>

          <strong>
            ${mentor.name}
          </strong>

        </div>


        <div class="appointment-detail-modal-item">

          <span>
            สถานะการยืนยัน
          </span>

          <strong>
            ${confirmationText}
          </strong>

        </div>


        ${representativeHtml}


        <div class="appointment-detail-modal-item full">

          <span>
            หมายเหตุ
          </span>

          <strong>
            ${card.dataset.note || "-"}
          </strong>

        </div>

      </div>

    `;

        const modal = document.getElementById("appointmentDetailModal");

        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");
      }

      /* ========================================================
     ปิดรายละเอียด
  ======================================================== */

      function closeAppointmentDetail() {
        const modal = document.getElementById("appointmentDetailModal");

        modal.classList.remove("show");

        modal.setAttribute("aria-hidden", "true");
      }

      /* ========================================================
     คลิกพื้นที่ดำเพื่อปิด Modal
  ======================================================== */

      document.addEventListener("DOMContentLoaded", function () {
        document
          .querySelectorAll(".appointment-modal")
          .forEach(function (modal) {
            modal.addEventListener("click", function (event) {
              if (event.target === modal) {
                modal.classList.remove("show");

                modal.setAttribute("aria-hidden", "true");
              }
            });
          });

        /*
        Render Card ตอนเปิดหน้า
      */

        document.querySelectorAll(".appointment-card").forEach(function (card) {
          renderAppointmentCard(card);
        });
      });


      /* ========================================================
     ตัวแปรเก็บ Card ที่กำลังเปิด
  ======================================================== */

      let activeVisitCard = null;

      /*
    เก็บรูปภาพของแต่ละ Card

    WeakMap:
    Card ครั้งที่ 1 -> [รูป1, รูป2]
    Card ครั้งที่ 2 -> [รูป1, รูป2]
  */

      const visitPhotoStore = new WeakMap();

      /* ========================================================
     เปิด Modal บันทึกผลนิเทศ
  ======================================================== */

      function openVisitMockup(button) {
        const card = button.closest(".visit-result-card");

        if (!card) {
          return;
        }

        activeVisitCard = card;

        /* ===============================
       ดึงข้อมูลจาก Card
    =============================== */

        const round = card.dataset.round || "-";

        const studentName =
          card
            .querySelector(".visit-student-name strong")
            ?.textContent.trim() || "-";

        const company =
          card
            .querySelector(".visit-student-company strong")
            ?.textContent.trim() || "-";

        const mentor =
          card
            .querySelector(".visit-student-mentor strong")
            ?.textContent.trim() || "-";

        /* ===============================
       แสดงข้อมูล
    =============================== */

        document.getElementById("visitModalTitle").textContent =
          `บันทึกผลนิเทศครั้งที่ ${round}`;

        document.getElementById("visitStudentName").textContent = studentName;

        document.getElementById("visitRound").textContent = `ครั้งที่ ${round}`;

        document.getElementById("visitCompany").textContent = company;

        document.getElementById("visitMentor").value = mentor;

        /* ===============================
       โหลดข้อมูลเดิมกรณีแก้ไข
    =============================== */

        document.getElementById("visitDate").value =
          card.dataset.visitDate || "";

        document.getElementById("visitType").value =
          card.dataset.visitType || "onsite";

        document.getElementById("visitSignature").value =
          card.dataset.signature || "รอลงนาม";

        /* ===============================
       Reset File Input

       Browser ไม่อนุญาตให้ใส่
       file input เดิมกลับเข้าไป
    =============================== */

        const photoInput = document.getElementById("visitPhotos");

        if (photoInput) {
          photoInput.value = "";
        }

        /* ===============================
       แสดงสถานะรูปเดิม
    =============================== */

        updateVisitPhotoFileStatus(card);

        /* ===============================
       เปิด Modal
    =============================== */

        const modal = document.getElementById("visitMockup");

        if (!modal) {
          return;
        }

        modal.classList.add("show");

        modal.setAttribute("aria-hidden", "false");
      }

      /* ========================================================
     ปิด Modal
  ======================================================== */

      function closeVisitMockup() {
        const modal = document.getElementById("visitMockup");

        if (!modal) {
          return;
        }

        modal.classList.remove("show");

        modal.setAttribute("aria-hidden", "true");

        activeVisitCard = null;
      }

      /* ========================================================
     ตรวจจำนวนรูปที่เลือก
  ======================================================== */

      function validateVisitPhotoSelection(input) {
        const status = document.getElementById("visitPhotoFileStatus");

        if (!status) {
          return;
        }

        const files = Array.from(input.files || []);

        /* ===============================
       ยังไม่เลือก
    =============================== */

        if (files.length === 0) {
          status.className = "visit-photo-file-status";

          status.textContent = "ยังไม่ได้เลือกไฟล์";

          return;
        }

        /* ===============================
       จำนวนไม่ใช่ 2
    =============================== */

        if (files.length !== 2) {
          status.className = "visit-photo-file-status error";

          status.textContent = `เลือกมา ${files.length} รูป กรุณาเลือกจำนวน 2 รูป`;

          return;
        }

        /* ===============================
       ตรวจชนิดไฟล์
    =============================== */

        const invalidFile = files.some(
          (file) => !file.type.startsWith("image/"),
        );

        if (invalidFile) {
          status.className = "visit-photo-file-status error";

          status.textContent = "พบไฟล์ที่ไม่ใช่รูปภาพ";

          return;
        }

        /* ===============================
       ถูกต้อง
    =============================== */

        status.className = "visit-photo-file-status success";

        status.innerHTML =
          '<i class="fa-solid fa-circle-check"></i> เลือกรูปภาพครบ 2 รูปแล้ว';
      }

      /* ========================================================
     แสดงสถานะรูปเดิม
  ======================================================== */

      function updateVisitPhotoFileStatus(card) {
        const status = document.getElementById("visitPhotoFileStatus");

        if (!status) {
          return;
        }

        const photos = visitPhotoStore.get(card) || [];

        if (photos.length === 2 && photos[0] && photos[1]) {
          status.className = "visit-photo-file-status success";

          status.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          มีรูปภาพที่บันทึกไว้แล้ว 2 รูป
        `;
        } else {
          status.className = "visit-photo-file-status";

          status.textContent = "ยังไม่ได้เลือกไฟล์";
        }
      }

      /* ========================================================
     File -> Base64
  ======================================================== */

      function visitFileToDataURL(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = function () {
            resolve(reader.result);
          };

          reader.onerror = function () {
            reject(new Error("ไม่สามารถอ่านไฟล์ได้"));
          };

          reader.readAsDataURL(file);
        });
      }

      /* ========================================================
     บันทึกผลนิเทศ
  ======================================================== */

      async function saveVisitMockup() {
        if (!activeVisitCard) {
          return;
        }

        const card = activeVisitCard;

        const round = card.dataset.round || "-";

        const studentName =
          card
            .querySelector(".visit-student-name strong")
            ?.textContent.trim() || "นักศึกษา";

        /* ===============================
       วันที่
    =============================== */

        const date = document.getElementById("visitDate").value;

        /* ===============================
       รูปแบบ
    =============================== */

        const type = document.getElementById("visitType").value;

        /* ===============================
       File Input
    =============================== */

        const photoInput = document.getElementById("visitPhotos");

        /* ===============================
       Validate วันที่
    =============================== */

        if (!date) {
          showTeacherToast("กรุณาระบุวันที่นิเทศ");

          return;
        }

        /* ===============================
       รูปเดิม
    =============================== */

        let photos = visitPhotoStore.get(card) || [];

        /* ===============================
       ถ้ามีการเลือกรูปใหม่
    =============================== */

        if (photoInput && photoInput.files.length > 0) {
          const selectedFiles = Array.from(photoInput.files);

          /* ต้อง 2 รูป */

          if (selectedFiles.length !== 2) {
            showTeacherToast("กรุณาเลือกรูปภาพจำนวน 2 รูปพอดี");

            return;
          }

          /* ตรวจว่าเป็นรูป */

          const invalidFile = selectedFiles.some(
            (file) => !file.type.startsWith("image/"),
          );

          if (invalidFile) {
            showTeacherToast("กรุณาเลือกเฉพาะไฟล์รูปภาพ");

            return;
          }

          /* อ่านรูป */

          try {
            photos = await Promise.all(
              selectedFiles.map((file) => visitFileToDataURL(file)),
            );
          } catch (error) {
            console.error(error);

            showTeacherToast("เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ");

            return;
          }
        }

        /* ===============================
       ถ้าไม่มีรูปเดิมและไม่ได้เลือกใหม่
    =============================== */

        if (photos.length !== 2 || !photos[0] || !photos[1]) {
          showTeacherToast("กรุณาแนบรูปภาพประกอบจำนวน 2 รูป");

          return;
        }

        /* ===============================
       บันทึกรูป
    =============================== */

        visitPhotoStore.set(card, photos);

        /* ===============================
       บันทึกข้อมูลลง Card
    =============================== */

        card.dataset.visitDate = date;

        card.dataset.visitType = type;

        card.dataset.signature = "รอลงนาม";

        card.dataset.saved = "true";

        /* ===============================
       วันที่บน Card
    =============================== */

        const dateDisplay = card.querySelector(".visit-date-display");

        if (dateDisplay) {
          dateDisplay.textContent = formatVisitThaiDate(date);
        }

        /* ===============================
       รูปภาพบน Card
    =============================== */

        const photoDisplay = card.querySelector(".visit-photo-display");

        if (photoDisplay) {
          photoDisplay.textContent = "แนบแล้ว 2 รูป";
        }

        /* ===============================
       ผลการบันทึก
    =============================== */

        const recordDisplay = card.querySelector(".visit-record-display");

        if (recordDisplay) {
          recordDisplay.textContent = "บันทึกเรียบร้อยแล้ว";
        }

        /* ===============================
       Status ด้านบน
    =============================== */

        const status = card.querySelector(".visit-result-status");

        if (status) {
          status.className = "visit-result-status saved";

          status.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          บันทึกแล้ว
        `;
        }

        /* ===============================
       ปุ่มบันทึก
    =============================== */

        const saveButton = card.querySelector(".visit-save-button");

        if (saveButton) {
          saveButton.innerHTML = `
          <i class="fa-solid fa-pen"></i>
          แก้ไขผลนิเทศ
        `;
        }

        /* ===============================
       เปิดปุ่ม PDF
    =============================== */

        const pdfButton = card.querySelector(".visit-pdf-button");

        if (pdfButton) {
          pdfButton.disabled = false;
        }

        /* ===============================
       Note
    =============================== */

        const note = card.querySelector(".visit-result-note");

        if (note) {
          note.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>

          บันทึกผลนิเทศครั้งที่ ${round}
          เรียบร้อยแล้ว สามารถสร้าง PDF ได้
        `;
        }

        /* ===============================
       ปิด Modal
    =============================== */

        closeVisitMockup();

        showTeacherToast(`บันทึกผลนิเทศครั้งที่ ${round}\n${studentName}\nเรียบร้อยแล้ว`);
      }

      /* ========================================================
     Format วันที่ไทย
  ======================================================== */

      function formatVisitThaiDate(dateString) {
        if (!dateString) {
          return "-";
        }

        const months = [
          "มกราคม",
          "กุมภาพันธ์",
          "มีนาคม",
          "เมษายน",
          "พฤษภาคม",
          "มิถุนายน",
          "กรกฎาคม",
          "สิงหาคม",
          "กันยายน",
          "ตุลาคม",
          "พฤศจิกายน",
          "ธันวาคม",
        ];

        const parts = dateString.split("-").map(Number);

        if (parts.length !== 3) {
          return dateString;
        }

        const year = parts[0];

        const month = parts[1];

        const day = parts[2];

        return `${day} ` + `${months[month - 1]} ` + `${year + 543}`;
      }

      /* ========================================================
     สร้าง PDF
  ======================================================== */

      function createVisitPDF(button) {
        const card = button.closest(".visit-result-card");

        if (!card) {
          return;
        }

        /* ===============================
       ต้องบันทึกก่อน
    =============================== */

        if (card.dataset.saved !== "true") {
          showTeacherToast("กรุณาบันทึกผลนิเทศก่อนสร้าง PDF");

          return;
        }

        /* ===============================
       รูปภาพ
    =============================== */

        const photos = visitPhotoStore.get(card) || [];

        if (photos.length !== 2 || !photos[0] || !photos[1]) {
          showTeacherToast("ไม่พบรูปภาพประกอบจำนวน 2 รูป");

          return;
        }

        /* ===============================
       ข้อมูล
    =============================== */

        const round = card.dataset.round || "-";

        const studentName =
          card
            .querySelector(".visit-student-name strong")
            ?.textContent.trim() || "-";

        const studentInfo =
          card.querySelector(".visit-student-name span")?.textContent.trim() ||
          "-";

        const company =
          card
            .querySelector(".visit-student-company strong")
            ?.textContent.trim() || "-";

        const mentor =
          card
            .querySelector(".visit-student-mentor strong")
            ?.textContent.trim() || "-";

        const date = formatVisitThaiDate(card.dataset.visitDate);

        const visitType =
          card.dataset.visitType === "online"
            ? "นิเทศออนไลน์"
            : "นิเทศ ณ สถานประกอบการ";

        /* ===============================
       อาจารย์
    =============================== */

        const user = JSON.parse(localStorage.getItem("currentUser") || "null");

        const teacherName = user?.name || "ผศ.ดร.สุพาภรณ์ ซิ้มเจริญ";

        /* ===============================
       เปิดหน้า PDF
    =============================== */

        const printWindow = window.open("", "_blank");

        if (!printWindow) {
          showTeacherToast("กรุณาอนุญาต Pop-up ก่อนสร้าง PDF");

          return;
        }

        printWindow.document.write(`

      <!doctype html>

      <html lang="th">

      <head>

        <meta charset="UTF-8">


        <title>
          บันทึกผลนิเทศครั้งที่ ${round}
        </title>


        <style>

          * {
            box-sizing: border-box;
          }


          body {
            margin: 0;

            padding: 32px 40px;

            color: #111827;

            font-family:
              "Tahoma",
              "Sarabun",
              sans-serif;
          }


          h1 {
            margin: 0 0 5px;

            text-align: center;

            font-size: 20px;
          }


          h2 {
            margin: 0 0 24px;

            text-align: center;

            font-size: 16px;

            font-weight: 500;
          }


          .info-table {
            width: 100%;

            border-collapse: collapse;

            margin-bottom: 22px;
          }


          .info-table td {
            padding: 9px 11px;

            border: 1px solid #9ca3af;

            font-size: 13px;

            vertical-align: top;
          }


          .info-table td:first-child {
            width: 180px;

            background: #f8fafc;

            font-weight: 700;
          }


          .section-title {
            margin: 20px 0 10px;

            font-size: 15px;

            font-weight: 700;
          }


          .photos {
            display: grid;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 14px;
          }


          .photo-box {
            overflow: hidden;

            border: 1px solid #9ca3af;
          }


          .photo-box img {
            width: 100%;
            height: 260px;

            display: block;

            object-fit: cover;
          }


          .signature-grid {
            display: grid;

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 90px;

            margin-top: 80px;
          }


          .signature-box {
            text-align: center;

            font-size: 13px;
          }


          .signature-line {
            margin-top: 55px;

            padding-top: 7px;

            border-top: 1px solid #111827;
          }


          @media print {

            body {
              padding: 20px;
            }

          }

        </style>

      </head>


      <body>


        <h1>
          แบบบันทึกผลการนิเทศนักศึกษาสหกิจศึกษา
        </h1>


        <h2>
          การนิเทศครั้งที่ ${round}
        </h2>



        <table class="info-table">

          <tr>
            <td>
              นักศึกษา
            </td>

            <td>
              ${studentName}
            </td>
          </tr>


          <tr>
            <td>
              ข้อมูลนักศึกษา
            </td>

            <td>
              ${studentInfo}
            </td>
          </tr>


          <tr>
            <td>
              สถานประกอบการ
            </td>

            <td>
              ${company}
            </td>
          </tr>


          <tr>
            <td>
              วันที่นิเทศ
            </td>

            <td>
              ${date}
            </td>
          </tr>


          <tr>
            <td>
              รูปแบบการนิเทศ
            </td>

            <td>
              ${visitType}
            </td>
          </tr>


          <tr>
            <td>
              อาจารย์นิเทศ
            </td>

            <td>
              ${teacherName}
            </td>
          </tr>


          <tr>
            <td>
              พี่เลี้ยง / ผู้แทน
            </td>

            <td>
              ${mentor}
            </td>
          </tr>

        </table>



        <div class="section-title">
          รูปภาพประกอบการนิเทศ
        </div>


        <div class="photos">

          <div class="photo-box">

            <img
              src="${photos[0]}"
              alt="รูปประกอบการนิเทศ"
            >

          </div>


          <div class="photo-box">

            <img
              src="${photos[1]}"
              alt="รูปประกอบการนิเทศ"
            >

          </div>

        </div>



        <div class="signature-grid">

          <div class="signature-box">

            <div class="signature-line">

              (${teacherName})

              <br>

              อาจารย์นิเทศ

            </div>

          </div>


          <div class="signature-box">

            <div class="signature-line">

              (${mentor})

              <br>

              พี่เลี้ยง / ผู้แทนสถานประกอบการ

            </div>

          </div>

        </div>



        <script>

          window.onload = function () {

            setTimeout(
              function () {

                window.print();

              },
              300
            );

          };

        <\/script>


      </body>

      </html>

    `);

        printWindow.document.close();
      }

      /* ========================================================
     คลิกพื้นหลังเพื่อปิด Modal
  ======================================================== */

      document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("visitMockup");

        if (!modal) {
          return;
        }

        modal.addEventListener("click", function (event) {
          if (event.target === modal) {
            closeVisitMockup();
          }
        });
      });

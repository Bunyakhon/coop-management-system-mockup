      document.addEventListener("DOMContentLoaded", () => {
        const user = JSON.parse(localStorage.getItem("currentUser") || "null");

        if (user) {
          const greeting = document.getElementById("overviewGreeting");

          if (greeting) {
            greeting.textContent = `ยินดีต้อนรับ, ${user.name}`;
          }
        }

        // =========================
        // สลับเมนูด้านซ้าย
        // =========================

        document
          .querySelectorAll(".sidebar-item[data-target]")
          .forEach((item) => {
            item.addEventListener("click", () => {
              document.querySelectorAll(".sidebar-item").forEach((i) => {
                i.classList.remove("active");
              });

              document.querySelectorAll(".content-panel").forEach((panel) => {
                panel.classList.remove("active");
              });

              item.classList.add("active");

              const targetPanel = document.getElementById(item.dataset.target);

              if (targetPanel) {
                targetPanel.classList.add("active");
              }
            });
          });
      });

      // ========================================
      // ค้นหาข้อมูลนักศึกษาสหกิจ
      // ========================================

      function filterHeadStudents() {
        const keyword =
          document
            .getElementById("studentSearchInput")
            ?.value.trim()
            .toLowerCase() || "";

        const major =
          document.getElementById("studentMajorFilter")?.value || "";

        const rows = document.querySelectorAll(
          "#headCoopStudentTable tbody tr",
        );

        rows.forEach((row) => {
          const name = (row.dataset.name || "").toLowerCase();
          const studentId = (row.dataset.studentId || "").toLowerCase();
          const company = (row.dataset.company || "").toLowerCase();
          const rowMajor = row.dataset.major || "";

          const matchKeyword =
            !keyword ||
            name.includes(keyword) ||
            studentId.includes(keyword) ||
            company.includes(keyword);

          const matchMajor = !major || rowMajor === major;

          row.style.display = matchKeyword && matchMajor ? "" : "none";
        });
      }

      // ========================================
      // ดูรายละเอียดนักศึกษา
      // ========================================

      function viewHeadStudent(button) {
        const row = button.closest("tr");

        if (!row) return;

        const cells = row.querySelectorAll("td");

        const name = row.dataset.name || "-";

        const studentId = row.dataset.studentId || "-";

        const major = row.dataset.major || "-";

        const company = row.dataset.company || "-";

        const position = cells[4]?.textContent.trim() || "-";

        const duration = cells[5]?.textContent.trim() || "-";

        const teacher = cells[6]?.textContent.trim() || "-";

        alert(
          `ข้อมูลนักศึกษา\n\n` +
            `ชื่อ-นามสกุล: ${name}\n` +
            `รหัสนักศึกษา: ${studentId}\n` +
            `สาขา: ${major}\n` +
            `สถานประกอบการ: ${company}\n` +
            `ตำแหน่ง: ${position}\n` +
            `ระยะเวลาสหกิจ: ${duration}\n` +
            `อาจารย์ที่ดูแล: ${teacher}`,
        );
      }

      // ========================================
      // ค้นหานักศึกษาสหกิจ
      // สำหรับกำหนดอาจารย์ที่ปรึกษา
      // ========================================

      function filterCoopAdvisorStudents() {
        const keyword =
          document
            .getElementById("coopAdvisorSearch")
            ?.value.trim()
            .toLowerCase() || "";

        const major = document.getElementById("coopAdvisorMajor")?.value || "";

        const rows = document.querySelectorAll("#coopAdvisorTable tbody tr");

        rows.forEach((row) => {
          const name = (row.dataset.name || "").toLowerCase();

          const studentId = (row.dataset.studentId || "").toLowerCase();

          const rowMajor = row.dataset.major || "";

          const matchKeyword =
            !keyword || name.includes(keyword) || studentId.includes(keyword);

          const matchMajor = !major || rowMajor === major;

          row.style.display = matchKeyword && matchMajor ? "" : "none";
        });
      }

      // ========================================
      // กำหนดอาจารย์ที่ปรึกษานักศึกษาสหกิจ
      // ========================================

      function assignCoopAdvisor(button) {
        const row = button.closest("tr");

        if (!row) return;

        const studentName = row.dataset.name || "นักศึกษา";

        const select = row.querySelector(".advisor-select");

        const advisor = select?.value || "";

        if (!advisor) {
          alert("กรุณาเลือกอาจารย์ที่ปรึกษาโครงการ");
          return;
        }

        const confirmed = confirm(
          `ยืนยันการกำหนดอาจารย์ที่ปรึกษาหรือไม่?\n\n` +
            `นักศึกษา: ${studentName}\n` +
            `อาจารย์ที่ปรึกษา: ${advisor}`,
        );

        if (!confirmed) return;

        button.textContent = "แก้ไขอาจารย์ที่ปรึกษา";

        button.classList.remove("solid");

        alert(
          `กำหนดอาจารย์ที่ปรึกษาเรียบร้อยแล้ว\n\n` +
            `นักศึกษา: ${studentName}\n` +
            `อาจารย์ที่ปรึกษา: ${advisor}`,
        );
      }

      function openCoopRequestApproval() {
        document
          .querySelector('[data-target="panel-coop-request-approval"]')
          ?.click();
      }

      function viewCoopRequest(button) {
        const row = button.closest("tr");
        if (!row) return;

        const status = row.children[6]?.textContent.trim() || "-";
        alert(
          `รายละเอียดคำร้องสหกิจศึกษา\n\n` +
            `ชื่อ-นามสกุล: ${row.dataset.name || "-"}\n` +
            `รหัสนักศึกษา: ${row.dataset.studentId || "-"}\n` +
            `ประเภท: สหกิจศึกษา\n` +
            `สถานประกอบการ: ${row.dataset.company || "-"}\n` +
            `จังหวัด: ${row.dataset.province || "-"}\n` +
            `ตำแหน่ง: ${row.dataset.position || "-"}\n` +
            `วันที่ยื่น: ${row.dataset.submittedDate || "-"}\n` +
            `ระยะเวลาสหกิจศึกษา: ${row.dataset.duration || "-"}\n` +
            `สถานะ: ${status}`,
        );
      }

      function printCoopRequest(button) {
        if (!button.closest("tr")) return;
        window.print();
      }

      function approveCoopRequest(button) {
        const row = button.closest("tr");
        if (!row) return;

        const studentName = row.dataset.name || "นักศึกษา";
        if (
          !confirm(
            `ยืนยันการอนุมัติคำร้องสหกิจศึกษาของ\n${studentName} หรือไม่?`,
          )
        )
          return;

        row.children[6].innerHTML =
          '<span class="tag tag-green">อนุมัติแล้ว</span>';
      }

      function rejectCoopRequest(button) {
        const row = button.closest("tr");
        if (!row) return;

        const studentName = row.dataset.name || "นักศึกษา";
        if (
          !confirm(
            `ยืนยันการไม่อนุมัติคำร้องสหกิจศึกษาของ\n${studentName} หรือไม่?`,
          )
        )
          return;

        row.children[6].innerHTML =
          '<span class="tag tag-red">ไม่อนุมัติ</span>';
      }

      function searchTeachers() {
        const input = document.getElementById("teacherSearchInput");
        const keyword = (input?.value || "").trim().toLowerCase();
        const rows = document.querySelectorAll("#teacherTable tbody tr");

        rows.forEach((row) => {
          const name = (row.dataset.name || "").toLowerCase();
          const email = (row.dataset.email || "").toLowerCase();
          const major = (row.dataset.major || "").toLowerCase();
          const teacherId = (row.dataset.id || "").toLowerCase();
          const match =
            !keyword ||
            name.includes(keyword) ||
            email.includes(keyword) ||
            major.includes(keyword) ||
            teacherId.includes(keyword);
          row.style.display = match ? "" : "none";
        });
      }

      let currentTeacherRow = null;

      function openEditTeacher(button) {
        currentTeacherRow = button.closest("tr");
        if (!currentTeacherRow) return;

        document.getElementById("editTeacherName").value =
          currentTeacherRow.dataset.name || "";
        document.getElementById("editTeacherEmail").value =
          currentTeacherRow.dataset.email || "";
        document.getElementById("editTeacherMajor").value =
          currentTeacherRow.dataset.major || "";
        document.getElementById("editTeacherPassword").value = "";

        const modal = document.getElementById("editTeacherModal");
        if (modal) {
          modal.style.display = "flex";
          modal.classList.add("show");
        }
      }

      function closeEditTeacher() {
        const modal = document.getElementById("editTeacherModal");
        if (modal) {
          modal.style.display = "none";
          modal.classList.remove("show");
        }
        currentTeacherRow = null;
      }

      function saveTeacherEdit() {
        if (!currentTeacherRow) return;

        const name = document.getElementById("editTeacherName").value.trim();
        const email = document.getElementById("editTeacherEmail").value.trim();
        const major = document.getElementById("editTeacherMajor").value;
        const password = document.getElementById("editTeacherPassword").value;

        if (!name) return alert("กรุณากรอกชื่อ-นามสกุล");
        if (!email) return alert("กรุณากรอกอีเมล");
        if (!major) return alert("กรุณาเลือกสาขาวิชา");

        currentTeacherRow.dataset.name = name;
        currentTeacherRow.dataset.email = email;
        currentTeacherRow.dataset.major = major;
        currentTeacherRow.children[0].textContent = name;
        currentTeacherRow.children[2].textContent = major;
        currentTeacherRow.children[3].textContent = email;

        alert(
          password
            ? "แก้ไขข้อมูลอาจารย์และรหัสผ่านเรียบร้อยแล้ว"
            : "แก้ไขข้อมูลอาจารย์เรียบร้อยแล้ว",
        );
        closeEditTeacher();
      }

      document
        .getElementById("teacherSearchInput")
        ?.addEventListener("input", searchTeachers);

      // ================= จัดการข้อมูลส่วนตัว =================
      document.addEventListener("DOMContentLoaded", function () {
        loadProfileData();
      });

      function loadProfileData() {
        const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

        const nameInput = document.getElementById("profileFullName");
        const emailInput = document.getElementById("profileEmail");
        const passwordInput = document.getElementById("profilePassword");
        const confirmPasswordInput = document.getElementById(
          "profileConfirmPassword",
        );

        if (nameInput) {
          nameInput.value =
            user.name ||
            document.getElementById("userNameDisplay")?.textContent.trim() ||
            "";
        }

        if (emailInput) {
          emailInput.value = user.email || "";
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
          alert("กรุณากรอกชื่อ-นามสกุล");
          return;
        }

        if (!email) {
          alert("กรุณากรอก Email");
          return;
        }

        if (password && password.length < 6) {
          alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
          return;
        }

        if (password !== confirmPassword) {
          alert("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
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

        if (password) {
          alert(
            "บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว\n" +
              "รหัสผ่านใหม่จะบันทึกจริงเมื่อเชื่อมต่อ Backend",
          );
        } else {
          alert("บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว");
        }
      }

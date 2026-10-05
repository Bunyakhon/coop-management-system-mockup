      document.addEventListener("DOMContentLoaded", () => {
        // =========================================================
        // ข้อมูลผู้ใช้
        // =========================================================

        const user = JSON.parse(localStorage.getItem("currentUser") || "null");

        if (user) {
          const overviewGreeting = document.getElementById("overviewGreeting");

          if (overviewGreeting) {
            overviewGreeting.textContent = `ยินดีต้อนรับ, ${user.name}`;
          }
        }

        // =========================================================
        // Sidebar
        // =========================================================

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

              const target = document.getElementById(item.dataset.target);

              if (target) {
                target.classList.add("active");
              }
            });
          });

        // =========================================================
        // คำร้องสหกิจศึกษา
        // =========================================================

        const coopRequestModal = document.getElementById("coopRequestModal");

        const cancelRequestModal =
          document.getElementById("cancelRequestModal");

        // เปิด request modal

        const openRequestModal = (modal) => {
          if (!modal) return;

          modal.classList.add("show");

          modal.setAttribute("aria-hidden", "false");

          document.body.style.overflow = "hidden";
        };

        // ปิด request modal

        const closeRequestModal = (modal) => {
          if (!modal) return;

          modal.classList.remove("show");

          modal.setAttribute("aria-hidden", "true");

          document.body.style.overflow = "";
        };

        // เปิดฟอร์มคำร้อง

        document
          .getElementById("openCoopRequest")
          ?.addEventListener("click", () => {
            openRequestModal(coopRequestModal);
          });

        // เปิดยกเลิกคำร้อง

        document
          .getElementById("openCancelRequest")
          ?.addEventListener("click", () => {
            openRequestModal(cancelRequestModal);
          });

        // ปุ่มปิด request modal

        document.querySelectorAll("[data-close-request]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const modal = document.getElementById(btn.dataset.closeRequest);

            closeRequestModal(modal);
          });
        });

        // คลิกพื้นที่ด้านนอก modal

        [coopRequestModal, cancelRequestModal].forEach((modal) => {
          modal?.addEventListener("click", (e) => {
            if (e.target === modal) {
              closeRequestModal(modal);
            }
          });
        });

        // ESC ปิด Request Modal

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeRequestModal(coopRequestModal);

            closeRequestModal(cancelRequestModal);
          }
        });

        // ส่งคำร้อง

        document
          .getElementById("submitCoopRequest")
          ?.addEventListener("click", () => {
            alert(
              "Mockup: ระบบแสดงแบบฟอร์มคำร้องเรียบร้อยแล้ว แต่ยังไม่สามารถส่งคำร้องจริงได้",
            );
          });

        // ยืนยันยกเลิกคำร้อง

        document
          .getElementById("confirmCancelRequest")
          ?.addEventListener("click", () => {
            alert(
              "Mockup: ฟังก์ชันยกเลิกคำร้องอยู่ระหว่างการพัฒนา ข้อมูลเดิมยังคงอยู่",
            );

            closeRequestModal(cancelRequestModal);
          });

        // =========================================================
        // Modal ทั่วไป
        // =========================================================

        const openModal = (id) => {
          const modal = document.getElementById(id);

          if (!modal) return;

          modal.classList.add("open");

          modal.setAttribute("aria-hidden", "false");

          document.body.style.overflow = "hidden";
        };

        const closeModal = (id) => {
          const modal = document.getElementById(id);

          if (!modal) return;

          modal.classList.remove("open");

          modal.setAttribute("aria-hidden", "true");

          document.body.style.overflow = "";
        };

        // =========================================================
        // Profile
        // =========================================================

        document
          .getElementById("btnEditProfile")
          ?.addEventListener("click", () => {
            openModal("profileModal");
          });

        document
          .getElementById("btnEditAccount")
          ?.addEventListener("click", () => {
            openModal("accountModal");
          });

        document
          .getElementById("btnChangePhoto")
          ?.addEventListener("click", () => {
            alert(
              "ฟังก์ชันอัปโหลดรูปโปรไฟล์อยู่ระหว่างการพัฒนา — Mockup เท่านั้น",
            );
          });

        // ปิด modal ด้วยปุ่ม

        document.querySelectorAll("[data-close-modal]").forEach((btn) => {
          btn.addEventListener("click", () => {
            closeModal(btn.dataset.closeModal);
          });
        });

        // คลิกนอก modal

        document.querySelectorAll(".modal-overlay").forEach((modal) => {
          modal.addEventListener("click", (e) => {
            if (e.target === modal) {
              closeModal(modal.id);
            }
          });
        });

        // บันทึก Profile

        document
          .getElementById("btnSaveProfile")
          ?.addEventListener("click", () => {
            alert(
              "ฟังก์ชันแก้ไขข้อมูลอยู่ระหว่างการพัฒนา — ข้อมูลใน Mockup จะไม่ถูกเปลี่ยนแปลง",
            );
          });

        // บันทึก Account

        document
          .getElementById("btnSaveAccount")
          ?.addEventListener("click", () => {
            alert(
              "ฟังก์ชันแก้ไขอีเมลและรหัสผ่านอยู่ระหว่างการพัฒนา — ข้อมูลใน Mockup จะไม่ถูกเปลี่ยนแปลง",
            );
          });

        // ESC ปิด Modal

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            document
              .querySelectorAll(".modal-overlay.open")
              .forEach((modal) => {
                closeModal(modal.id);
              });
          }
        });

        // =========================================================
        // บันทึกการปฏิบัติงานประจำวัน
        // =========================================================

        const dailyLogModal = document.getElementById("dailyLogModal");

        const openDailyLog = () => {
          const now = new Date();

          const thaiMonths = [
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

          const dayInput = document.getElementById("dailyDay");

          const monthInput = document.getElementById("dailyMonth");

          const yearInput = document.getElementById("dailyYear");

          if (dayInput) {
            dayInput.value = now.getDate();
          }

          if (monthInput) {
            monthInput.value = thaiMonths[now.getMonth()];
          }

          if (yearInput) {
            yearInput.value = now.getFullYear() + 543;
          }

          if (dailyLogModal) {
            dailyLogModal.classList.add("open");

            dailyLogModal.setAttribute("aria-hidden", "false");
          }

          document.body.style.overflow = "hidden";
        };

        const closeDailyLog = () => {
          if (dailyLogModal) {
            dailyLogModal.classList.remove("open");

            dailyLogModal.setAttribute("aria-hidden", "true");
          }

          document.body.style.overflow = "";
        };

        // เปิดเขียนบันทึก

        document
          .getElementById("btnWriteDaily")
          ?.addEventListener("click", openDailyLog);

        // =========================================================
        // บันทึก Daily Log
        // =========================================================

        document
          .getElementById("btnSaveDaily")
          ?.addEventListener("click", () => {
            const day = document.getElementById("dailyDay")?.value.trim() || "";

            const month =
              document.getElementById("dailyMonth")?.value.trim() || "";

            const year =
              document.getElementById("dailyYear")?.value.trim() || "";

            const assigned =
              document.getElementById("dailyAssigned")?.value.trim() || "";

            const result =
              document.getElementById("dailyResult")?.value.trim() || "";

            // ตรวจสอบข้อมูล

            if (!day || !month || !year || !assigned || !result) {
              alert(
                "กรุณากรอก วันที่ เดือน พ.ศ. งานที่ได้รับมอบหมาย และผลการปฏิบัติงานให้ครบ",
              );

              return;
            }

            const tbody = document.getElementById("dailyLogTableBody");

            const row = document.createElement("tr");

            const dateText = `${day} ${month} ${year}`;

            const safeWork =
              assigned.length > 80
                ? assigned.substring(0, 80) + "..."
                : assigned;

            row.innerHTML = `

          <td>
            ${dateText}
          </td>

          <td>
            ${safeWork}
          </td>

          <td>
            <span class="tag tag-red">
              รอตรวจ
            </span>
          </td>

          <td>

            <button
              type="button"
              class="
                btn-mock-sm
                daily-view-btn
              "
            >
              ดู
            </button>

            <button
              type="button"
              class="
                btn-mock-sm
                daily-delete-btn
              "
            >
              ลบ
            </button>

          </td>

        `;

            if (tbody) {
              tbody.insertBefore(row, tbody.firstElementChild);
            }

            // ดูรายละเอียด

            row
              .querySelector(".daily-view-btn")
              ?.addEventListener("click", () => {
                const problem =
                  document.getElementById("dailyProblem")?.value.trim() || "-";

                const solution =
                  document.getElementById("dailySolution")?.value.trim() || "-";

                const note =
                  document.getElementById("dailyNote")?.value.trim() || "-";

                alert(
                  `วันที่ ${dateText}

งานที่ได้รับมอบหมาย:
${assigned}

ผลการปฏิบัติงาน:
${result}

ปัญหาและอุปสรรค:
${problem}

การแก้ไข:
${solution}

หมายเหตุ:
${note}`,
                );
              });

            // ลบบันทึก

            row
              .querySelector(".daily-delete-btn")
              ?.addEventListener("click", () => {
                const ok = confirm(
                  "ต้องการลบบันทึกประจำวันที่ " + dateText + " หรือไม่?",
                );

                if (ok) {
                  row.remove();
                }
              });

            alert("บันทึกการปฏิบัติงานเรียบร้อยแล้ว (Mockup)");

            closeDailyLog();
          });

        // คลิกนอก Daily Modal

        dailyLogModal?.addEventListener("click", (e) => {
          if (e.target === dailyLogModal) {
            closeDailyLog();
          }
        });

        // =========================================================
        // ส่งบันทึกประจำสัปดาห์
        // =========================================================

        document
          .getElementById("btnSubmitWeekly")
          ?.addEventListener("click", () => {
            const mentorFirst =
              document.getElementById("mentorFirstName")?.textContent.trim() ||
              "";

            const mentorLast =
              document.getElementById("mentorLastName")?.textContent.trim() ||
              "";

            if (
              mentorFirst === "-" ||
              mentorLast === "-" ||
              !mentorFirst ||
              !mentorLast
            ) {
              alert("ยังไม่มีข้อมูลพี่เลี้ยง กรุณาเพิ่มข้อมูลพี่เลี้ยงก่อน");
              // window.location.href = "mentor_coop.html"; // (หากต้องการให้ย้ายไปหน้าพี่เลี้ยงทันทีเมื่อยังไม่มีข้อมูล สามารถเอา // ออกได้ครับ)
              return;
            }

            const ok = confirm(
              `ต้องการส่งบันทึกประจำสัปดาห์ให้ คุณ${mentorFirst} ${mentorLast} ตรวจใช่หรือไม่?`,
            );

            if (ok) {
              alert("ส่งบันทึกประจำสัปดาห์ให้พี่เลี้ยงเรียบร้อยแล้ว (Mockup)");
              window.location.href = "mentor_coop.html"; // เปลี่ยนหน้าไปยัง mentor_coop.html
            }
          });

        // =========================================================
        // ระบบข้อมูลพี่เลี้ยง
        // =========================================================

        const mentorModal = document.getElementById("mentorModal");

        // ใช้สำหรับตรวจว่า
        // ตอนนี้กำลังเพิ่ม หรือ แก้ไข

        let mentorMode = "add";

        // =========================================================
        // ฟังก์ชันนำข้อมูลเดิมใส่ลง Form
        // =========================================================

        const fillMentorForm = () => {
          const email = document.getElementById("mentorEmail");

          const firstName = document.getElementById("mentorFirstName");

          const lastName = document.getElementById("mentorLastName");

          const position = document.getElementById("mentorPosition");

          const emailInput = document.getElementById("mentorEmailInput");

          const firstInput = document.getElementById("mentorFirstNameInput");

          const lastInput = document.getElementById("mentorLastNameInput");

          const positionInput = document.getElementById("mentorPositionInput");

          if (emailInput) {
            emailInput.value = email?.textContent.trim() || "";
          }

          if (firstInput) {
            firstInput.value = firstName?.textContent.trim() || "";
          }

          if (lastInput) {
            lastInput.value = lastName?.textContent.trim() || "";
          }

          if (positionInput) {
            positionInput.value = position?.textContent.trim() || "";
          }
        };

        // =========================================================
        // เพิ่มข้อมูลพี่เลี้ยง
        // =========================================================

        document
          .getElementById("btnAddMentor")
          ?.addEventListener("click", () => {
            mentorMode = "add";

            const title = document.getElementById("mentorModalTitle");

            if (title) {
              title.textContent = "เพิ่มข้อมูลพี่เลี้ยง";
            }

            // ล้าง Form

            const emailInput = document.getElementById("mentorEmailInput");

            const firstInput = document.getElementById("mentorFirstNameInput");

            const lastInput = document.getElementById("mentorLastNameInput");

            const positionInput = document.getElementById(
              "mentorPositionInput",
            );

            if (emailInput) {
              emailInput.value = "";
            }

            if (firstInput) {
              firstInput.value = "";
            }

            if (lastInput) {
              lastInput.value = "";
            }

            if (positionInput) {
              positionInput.value = "";
            }

            openModal("mentorModal");
          });

        // =========================================================
        // แก้ไขข้อมูลพี่เลี้ยง
        // =========================================================

        document
          .getElementById("btnEditMentor")
          ?.addEventListener("click", () => {
            const first = document
              .getElementById("mentorFirstName")
              ?.textContent.trim();

            // ถ้าไม่มีข้อมูล

            if (!first || first === "-") {
              alert("ยังไม่มีข้อมูลพี่เลี้ยง กรุณาเพิ่มข้อมูลพี่เลี้ยงก่อน");

              return;
            }

            mentorMode = "edit";

            const title = document.getElementById("mentorModalTitle");

            if (title) {
              title.textContent = "แก้ไขข้อมูลพี่เลี้ยง";
            }

            fillMentorForm();

            openModal("mentorModal");
          });

        // =========================================================
        // บันทึกข้อมูลพี่เลี้ยง
        // =========================================================

        document
          .getElementById("btnSaveMentor")
          ?.addEventListener("click", () => {
            const email =
              document.getElementById("mentorEmailInput")?.value.trim() || "";

            const first =
              document.getElementById("mentorFirstNameInput")?.value.trim() ||
              "";

            const last =
              document.getElementById("mentorLastNameInput")?.value.trim() ||
              "";

            const position =
              document.getElementById("mentorPositionInput")?.value.trim() ||
              "";

            // ตรวจสอบว่ากรอกครบหรือไม่

            if (!email || !first || !last || !position) {
              alert("กรุณากรอกข้อมูลพี่เลี้ยงให้ครบทุกช่อง");

              return;
            }

            // ตรวจ Email เบื้องต้น

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
              alert("กรุณากรอก Email ให้ถูกต้อง");

              return;
            }

            // ใส่ข้อมูลลงหน้า

            const mentorEmail = document.getElementById("mentorEmail");

            const mentorFirst = document.getElementById("mentorFirstName");

            const mentorLast = document.getElementById("mentorLastName");

            const mentorPosition = document.getElementById("mentorPosition");

            if (mentorEmail) {
              mentorEmail.textContent = email;
            }

            if (mentorFirst) {
              mentorFirst.textContent = first;
            }

            if (mentorLast) {
              mentorLast.textContent = last;
            }

            if (mentorPosition) {
              mentorPosition.textContent = position;
            }

            // ปิด modal

            closeModal("mentorModal");

            // ===========================================
            // ถ้าเป็นการเพิ่ม
            // ===========================================

            if (mentorMode === "add") {
              alert(
                `ส่งข้อมูลพี่เลี้ยงเรียบร้อยแล้ว

กรุณารอการยืนยันข้อมูลจากพี่เลี้ยง`,
              );
            }

            // ===========================================
            // ถ้าเป็นการแก้ไข
            // ===========================================
            else {
              alert("แก้ไขข้อมูลพี่เลี้ยงเรียบร้อยแล้ว");
            }
          });

        // =========================================================
        // สำหรับสหกิจ - Mockup
        // =========================================================

        const coopAdvisorSelect = document.getElementById("coopAdvisorSelect");

        const coopAdvisorConfirmName = document.getElementById(
          "coopAdvisorConfirmName",
        );

        const coopAdvisorAckStatus = document.getElementById(
          "coopAdvisorAckStatus",
        );

        const btnAcknowledgeCoopAdvisor = document.getElementById(
          "btnAcknowledgeCoopAdvisor",
        );

        document
          .getElementById("btnSaveCoopAdvisor")
          ?.addEventListener("click", () => {
            const advisorName = coopAdvisorSelect?.value || "";

            if (!advisorName) {
              alert("กรุณาเลือกอาจารย์ที่ปรึกษาโครงการ");
              return;
            }

            if (coopAdvisorConfirmName) {
              coopAdvisorConfirmName.textContent = advisorName;
            }

            if (coopAdvisorAckStatus) {
              coopAdvisorAckStatus.textContent = "ยังไม่รับทราบ";
              coopAdvisorAckStatus.classList.remove("tag-green");
              coopAdvisorAckStatus.classList.add("tag-red");
            }

            if (btnAcknowledgeCoopAdvisor) {
              btnAcknowledgeCoopAdvisor.disabled = false;
              btnAcknowledgeCoopAdvisor.style.opacity = "1";
              btnAcknowledgeCoopAdvisor.style.cursor = "pointer";
            }

            alert("บันทึกอาจารย์ที่ปรึกษาโครงการเรียบร้อยแล้ว (Mockup)");
          });

        btnAcknowledgeCoopAdvisor?.addEventListener("click", () => {
          if (coopAdvisorAckStatus) {
            coopAdvisorAckStatus.textContent = "รับทราบแล้ว";
            coopAdvisorAckStatus.classList.remove("tag-red");
            coopAdvisorAckStatus.classList.add("tag-green");
          }

          if (btnAcknowledgeCoopAdvisor) {
            btnAcknowledgeCoopAdvisor.disabled = true;
            btnAcknowledgeCoopAdvisor.style.opacity = "0.65";
            btnAcknowledgeCoopAdvisor.style.cursor = "not-allowed";
          }

          alert("รับทราบข้อมูลอาจารย์ที่ปรึกษาโครงการเรียบร้อยแล้ว (Mockup)");
        });

        const coopProjectTitle = document.getElementById("coopProjectTitle");

        const coopProjectTitleDisplay = document.getElementById(
          "coopProjectTitleDisplay",
        );

        document
          .getElementById("btnSaveCoopProjectTitle")
          ?.addEventListener("click", () => {
            const title = coopProjectTitle?.value.trim() || "";

            if (!title) {
              alert("กรุณากรอกชื่อหัวข้อโครงการ");
              return;
            }

            if (coopProjectTitleDisplay) {
              coopProjectTitleDisplay.textContent = title;
            }

            if (coopProjectTitle) {
              coopProjectTitle.readOnly = true;
              coopProjectTitle.style.background = "#f8fafc";
            }

            alert("บันทึกหัวข้อโครงการเรียบร้อยแล้ว (Mockup)");
          });

        document
          .getElementById("btnEditCoopProjectTitle")
          ?.addEventListener("click", () => {
            if (coopProjectTitle) {
              coopProjectTitle.readOnly = false;
              coopProjectTitle.style.background = "#fff";
              coopProjectTitle.focus();
              coopProjectTitle.select();
            }
          });

        // =========================================================
        // ลบข้อมูลพี่เลี้ยง
        // =========================================================

        document
          .getElementById("btnDeleteMentor")
          ?.addEventListener("click", () => {
            const first = document
              .getElementById("mentorFirstName")
              ?.textContent.trim();

            // ไม่มีข้อมูลให้ลบ

            if (!first || first === "-") {
              alert("ไม่มีข้อมูลพี่เลี้ยงให้ลบ");

              return;
            }

            const confirmDelete = confirm(
              "คุณต้องการลบข้อมูลพี่เลี้ยงใช่หรือไม่?",
            );

            if (!confirmDelete) {
              return;
            }

            // เปลี่ยนข้อมูลเป็น -

            const mentorEmail = document.getElementById("mentorEmail");

            const mentorFirst = document.getElementById("mentorFirstName");

            const mentorLast = document.getElementById("mentorLastName");

            const mentorPosition = document.getElementById("mentorPosition");

            if (mentorEmail) {
              mentorEmail.textContent = "-";
            }

            if (mentorFirst) {
              mentorFirst.textContent = "-";
            }

            if (mentorLast) {
              mentorLast.textContent = "-";
            }

            if (mentorPosition) {
              mentorPosition.textContent = "-";
            }

            alert("ลบข้อมูลพี่เลี้ยงเรียบร้อยแล้ว");
          });
      });
      // =========================================================
      // แก้ไขอาจารย์ที่ปรึกษา
      // =========================================================

      const profileAdvisorName = document.getElementById("profileAdvisorName");

      const profileAdvisorSelect = document.getElementById(
        "profileAdvisorSelect",
      );

      const btnEditAdvisor = document.getElementById("btnEditAdvisor");

      const btnSaveAdvisor = document.getElementById("btnSaveAdvisor");

      const btnCancelAdvisor = document.getElementById("btnCancelAdvisor");

      let originalAdvisor = profileAdvisorName?.textContent.trim() || "";

      /* =========================
   กดแก้ไข
   ========================= */

      btnEditAdvisor?.addEventListener("click", () => {
        if (!profileAdvisorName || !profileAdvisorSelect) {
          return;
        }

        originalAdvisor = profileAdvisorName.textContent.trim();

        profileAdvisorSelect.value = originalAdvisor;

        profileAdvisorName.style.display = "none";
        profileAdvisorSelect.style.display = "block";

        btnEditAdvisor.style.display = "none";
        btnSaveAdvisor.style.display = "inline-flex";
        btnCancelAdvisor.style.display = "inline-flex";
      });

      /* =========================
   บันทึก
   ========================= */

      btnSaveAdvisor?.addEventListener("click", () => {
        if (!profileAdvisorName || !profileAdvisorSelect) {
          return;
        }

        const advisorName = profileAdvisorSelect.value;

        if (!advisorName) {
          alert("กรุณาเลือกอาจารย์ที่ปรึกษา");
          return;
        }

        profileAdvisorName.textContent = advisorName;

        profileAdvisorName.style.display = "block";
        profileAdvisorSelect.style.display = "none";

        btnEditAdvisor.style.display = "inline-flex";
        btnSaveAdvisor.style.display = "none";
        btnCancelAdvisor.style.display = "none";

        alert("แก้ไขอาจารย์ที่ปรึกษาเรียบร้อยแล้ว (Mockup)");
      });

      /* =========================
   ยกเลิก
   ========================= */

      btnCancelAdvisor?.addEventListener("click", () => {
        if (!profileAdvisorName || !profileAdvisorSelect) {
          return;
        }

        profileAdvisorSelect.value = originalAdvisor;

        profileAdvisorName.style.display = "block";
        profileAdvisorSelect.style.display = "none";

        btnEditAdvisor.style.display = "inline-flex";
        btnSaveAdvisor.style.display = "none";
        btnCancelAdvisor.style.display = "none";
      });

import {
  initUsers,
  handleRegister,
  handleLogin,
  checkAuth,
  logout
} from "./modules/auth.js";

import {
  initCompany
} from "./modules/company.js";

import {
  loadChatData,
  initFilter
} from "./modules/script.js";

// ==========================================
// 1. ผูกฟังก์ชันเข้ากับ window
// ==========================================

window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;

// ==========================================
// 2. ตัวจัดการการทำงานเมื่อโหลดหน้าเว็บ
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    // ========================================
    // โหลดข้อมูล users.json เข้า localStorage
    // ========================================

    await initUsers();

    // ========================================
    // ระบบ Filter
    // ทำงานทุกหน้าที่มี #filterModal
    // ========================================

    initFilter();

    // ========================================
    // ดึงชื่อไฟล์ปัจจุบัน
    // ========================================

    const path =
      window.location.pathname;

    const fileName =
      path.split("/").pop();

    // ==========================================
    // ระบบค้นหาสถานประกอบการ
    // ==========================================

    const btnSearch =
      document.getElementById(
        "btnSearch"
      );

    const searchInput =
      document.getElementById(
        "searchInput"
      );

    const performSearch = () => {
      if (!searchInput) {
        return;
      }

      const query =
        searchInput.value.trim();

      window.location.href =
        `search_company.html?q=${encodeURIComponent(query)}`;
    };

    // ========================================
    // ปุ่มค้นหา
    // ========================================

    if (
      btnSearch &&
      searchInput
    ) {
      btnSearch.addEventListener(
        "click",
        performSearch
      );

      // ======================================
      // กด Enter เพื่อค้นหา
      // ======================================

      searchInput.addEventListener(
        "keypress",
        (event) => {

          if (
            event.key === "Enter"
          ) {
            performSearch();
          }
        }
      );
    }

    // ==========================================
    // หน้าแรก
    // index.html
    // ==========================================

    if (
      fileName === "index.html" ||
      fileName === ""
    ) {
      initCompany();

      loadChatData();

      return;
    }

    // ==========================================
    // นักศึกษาสหกิจศึกษา
    // student_coop.html
    // ==========================================

    if (
      fileName ===
      "student_coop.html"
    ) {
      const user =
        checkAuth("student");

      if (user) {
        displayUserName(user);
      }

      return;
    }

    // ==========================================
    // เจ้าหน้าที่ภาควิชา
    // officer.html
    // ==========================================

    if (
      fileName ===
      "officer.html"
    ) {
      const user =
        checkAuth("officer");

      if (user) {
        displayUserName(user);
      }

      return;
    }

    // ==========================================
    // อาจารย์สหกิจศึกษา
    // teacher_coop.html
    // ==========================================

    if (
      fileName ===
      "teacher_coop.html"
    ) {
      const user =
        checkAuth("teacher");

      if (user) {
        displayUserName(user);
      }

      return;
    }

    // ==========================================
    // หัวหน้าภาควิชา
    // head_department.html
    // ==========================================

    if (
      fileName ===
      "head_department.html"
    ) {
      const user =
        checkAuth(
          "head_department"
        );

      if (user) {
        displayUserName(user);
      }

      return;
    }

    // ==========================================
    // หน้าค้นหาสถานประกอบการ
    // search_company.html
    // ==========================================

    if (
      fileName ===
      "search_company.html"
    ) {
      const urlParams =
        new URLSearchParams(
          window.location.search
        );

      const searchQuery =
        urlParams.get("q");

      const searchResultText =
        document.getElementById(
          "searchResultText"
        );

      if (searchResultText) {
        if (searchQuery) {
          searchResultText.innerHTML = `
            ผลการค้นหาสำหรับ:
            <span style="color: #0284c7;">
              "${searchQuery}"
            </span>
          `;
        } else {
          searchResultText.innerHTML =
            "แสดงสถานประกอบการทั้งหมด";
        }
      }

      return;
    }
  }
);

// ==========================================
// 3. แสดงชื่อผู้ใช้งาน
// ==========================================

function displayUserName(user) {
  const userNameDisplay =
    document.getElementById(
      "userNameDisplay"
    );

  if (!userNameDisplay) {
    return;
  }

  userNameDisplay.innerText =
    `สวัสดี, ${user.name}`;
}
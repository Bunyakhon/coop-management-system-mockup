// ========================================
// โหลดข้อมูล users จาก users.json
// เข้า localStorage หากยังไม่มี
// ========================================

export async function initUsers() {
  if (!localStorage.getItem("users")) {
    try {
      const res = await fetch("users.json");

      if (!res.ok) {
        throw new Error("ไม่สามารถโหลด users.json ได้");
      }

      const data = await res.json();

      localStorage.setItem("users", JSON.stringify(data));

      console.log("โหลดข้อมูล users.json สำเร็จ");
    } catch (e) {
      console.error("Error loading users.json", e);
    }
  }
}

// ========================================
// ระบบสมัครสมาชิก
// ========================================

export function handleRegister(
  email,
  password,
  role = "student"
) {
  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
  const exists = users.find(
    (user) => user.email === email
  );

  if (exists) {
    alert("อีเมลนี้ถูกใช้งานในระบบแล้ว!");
    return false;
  }

  // สร้างข้อมูลผู้ใช้ใหม่
  const newUser = {
    email: email,
    password: password,
    role: role,
    name: email.split("@")[0],
  };

  // เพิ่มผู้ใช้เข้า Array
  users.push(newUser);

  // บันทึกกลับลง localStorage
  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");

  window.location.href = "login.html";

  return true;
}

// ========================================
// ระบบเข้าสู่ระบบ
// ========================================

export function handleLogin(email, password) {
  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  // ค้นหาผู้ใช้จาก Email และ Password
  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  // ถ้าไม่พบผู้ใช้
  if (!user) {
    alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง!");
    return false;
  }

  // ========================================
  // เซฟ Session
  // เสมือนว่าล็อกอินแล้ว
  // ========================================

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

  // ========================================
  // Redirect ตาม Role
  // ========================================

  redirectByRole(user);

  return true;
}

// ========================================
// นำทางตาม Role
// ไป Dashboard ของแต่ละสิทธิ์
// ========================================

export function redirectByRole(user) {
  // --------------------------
  // นักศึกษาสหกิจศึกษา
  // --------------------------

  if (user.role === "student") {
    window.location.href = "student_coop.html";
    return;
  }

  // --------------------------
  // เจ้าหน้าที่ภาควิชา
  // --------------------------

  if (user.role === "officer") {
    window.location.href = "officer.html";
    return;
  }

  // --------------------------
  // อาจารย์สหกิจศึกษา
  // --------------------------

  if (user.role === "teacher") {
    window.location.href = "teacher_coop.html";
    return;
  }

  // --------------------------
  // หัวหน้าภาควิชา
  // --------------------------

  if (user.role === "head_department") {
    window.location.href = "head_department.html";
    return;
  }

  // --------------------------
  // Role อื่น ๆ
  // --------------------------

  window.location.href = "index.html";
}

// ========================================
// ตรวจสอบสิทธิ์การเข้าใช้งานแต่ละหน้า
// Protection Guard
// ========================================

export function checkAuth(
  requiredRole = null
) {
  const currentUser =
    localStorage.getItem("currentUser");

  // ========================================
  // ถ้ายังไม่ได้ Login
  // ========================================

  if (!currentUser) {
    alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");

    window.location.href = "login.html";

    return null;
  }

  const user = JSON.parse(currentUser);

  // ========================================
  // ตรวจสอบ Role
  // ========================================

  if (
    requiredRole &&
    user.role !== requiredRole
  ) {
    alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้");

    redirectByRole(user);

    return null;
  }

  return user;
}

// ========================================
// ออกจากระบบ
// ========================================

export function logout() {
  localStorage.removeItem("currentUser");

  window.location.href = "login.html";
}
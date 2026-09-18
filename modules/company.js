// ==========================================
// 1. Data Source
// ตำแหน่งงานสหกิจศึกษาสายงาน IT ทั้งหมด 24 บริษัท
// ==========================================

const jobsData = [
  {
    icon: "fa-solid fa-laptop-code",
    company: "บริษัท เทค โซลูชันส์ จำกัด",
    location: "กรุงเทพมหานคร - ห้วยขวาง",
    title: "Frontend Developer (React/Vue)",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/พัฒนาเว็บไซต์",
    quota: "3 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-code",
    company: "CyberGuard Security",
    location: "กรุงเทพมหานคร - บางรัก",
    title: "Cybersecurity Analyst",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "Work from Home", type: "dark" },
    ],
    category: "ไอที/ความปลอดภัย",
    quota: "2 อัตรา",
    salary: "400 บาท / วัน",
  },
  {
    icon: "fa-solid fa-magnifying-glass-chart",
    company: "Data Research Asia",
    location: "กรุงเทพมหานคร - สาทร",
    title: "Data Analyst Assistant",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "Work from Home", type: "dark" },
    ],
    category: "ไอที/วิเคราะห์ข้อมูล",
    quota: "2 อัตรา",
    salary: "400 บาท / วัน",
  },
  {
    icon: "fa-solid fa-server",
    company: "Cloud Matrix Thailand",
    location: "กรุงเทพมหานคร - ปทุมวัน",
    title: "Backend Developer (Node.js/Go)",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/โปรแกรมเมอร์",
    quota: "2 อัตรา",
    salary: "400 บาท / วัน",
  },
  {
    icon: "fa-solid fa-mobile-screen-button",
    company: "AppWorks Innovation",
    location: "เชียงใหม่ - เมืองเชียงใหม่",
    title: "Mobile Developer (Flutter)",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/พัฒนาแอปพลิเคชัน",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-figma",
    company: "Creative Tech Studio",
    location: "กรุงเทพมหานคร - จตุจักร",
    title: "UI/UX Designer",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/ออกแบบระบบ",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-bug",
    company: "Quality Software Co., Ltd.",
    location: "นนทบุรี - ปากเกร็ด",
    title: "Software Tester / QA",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/ทดสอบระบบ",
    quota: "3 อัตรา",
    salary: "300 บาท / วัน",
  },
  {
    icon: "fa-solid fa-cloud-arrow-up",
    company: "Siam DevOps & Cloud",
    location: "กรุงเทพมหานคร - พญาไท",
    title: "DevOps Engineer Assistant",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "Work from Home", type: "dark" },
    ],
    category: "ไอที/โครงสร้างระบบ",
    quota: "1 อัตรา",
    salary: "450 บาท / วัน",
  },
  {
    icon: "fa-solid fa-brain",
    company: "AI Vision Technology",
    location: "กรุงเทพมหานคร - วัฒนา",
    title: "AI / Machine Learning",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/ปัญญาประดิษฐ์",
    quota: "2 อัตรา",
    salary: "450 บาท / วัน",
  },
  {
    icon: "fa-solid fa-network-wired",
    company: "NetCare Systems",
    location: "ปทุมธานี - คลองหลวง",
    title: "Network & System Admin",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/เครือข่าย",
    quota: "2 อัตรา",
    salary: "300 บาท / วัน",
  },
  {
    icon: "fa-solid fa-database",
    company: "DataVerse Thailand",
    location: "กรุงเทพมหานคร - ดินแดง",
    title: "Data Engineer Assistant",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/ฐานข้อมูล",
    quota: "2 อัตรา",
    salary: "400 บาท / วัน",
  },
  {
    icon: "fa-solid fa-headset",
    company: "IT Helpdesk Solutions",
    location: "สมุทรปราการ - บางพลี",
    title: "IT Support & Service Desk",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/สนับสนุนเทคนิค",
    quota: "4 อัตรา",
    salary: "300 บาท / วัน",
  },
  {
    icon: "fa-solid fa-shield-halved",
    company: "SECUREX Thailand",
    location: "กรุงเทพมหานคร - สาทร",
    title: "Cyber SOC Analyst",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/ความปลอดภัย",
    quota: "2 อัตรา",
    salary: "400 บาท / วัน",
  },
  {
    icon: "fa-solid fa-cubes",
    company: "Blockchain Next",
    location: "กรุงเทพมหานคร - พระราม 9",
    title: "Fullstack Developer (Web3)",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "Work from Home", type: "dark" },
    ],
    category: "ไอที/โปรแกรมเมอร์",
    quota: "2 อัตรา",
    salary: "450 บาท / วัน",
  },
  {
    icon: "fa-solid fa-chart-pie",
    company: "Business Intelligence Group",
    location: "กรุงเทพมหานคร - บางรัก",
    title: "Business Intelligence (BI)",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/วิเคราะห์ธุรกิจ",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-gamepad",
    company: "Pixel Studio Interactive",
    location: "กรุงเทพมหานคร - ลาดพร้าว",
    title: "Game Developer (Unity/Unreal)",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/พัฒนาเกม",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-vial-circle-check",
    company: "Automation Lab Thailand",
    location: "ชลบุรี - ศรีราชา",
    title: "QA Automation Tester",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/ทดสอบระบบ",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-diagram-project",
    company: "Agile Tech Software",
    location: "กรุงเทพมหานคร - คลองเตย",
    title: "IT Project Coordinator",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/บริหารโครงการ",
    quota: "1 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-robot",
    company: "RoboTech & Automation",
    location: "ระยอง - ปลวกแดง",
    title: "RPA Developer (UiPath)",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/ระบบอัตโนมัติ",
    quota: "2 อัตรา",
    salary: "400 บาท / วัน",
  },
  {
    icon: "fa-solid fa-gears",
    company: "ERP Systems Consulting",
    location: "กรุงเทพมหานคร - บางกะปิ",
    title: "SAP / ERP Functional",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/ระบบองค์กร",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-microchip",
    company: "Embedded Systems Lab",
    location: "ปทุมธานี - ธัญบุรี",
    title: "IoT & Embedded Developer",
    tags: [{ text: "สหกิจศึกษา", type: "green" }],
    category: "ไอที/ฮาร์ดแวร์",
    quota: "2 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-wand-magic-sparkles",
    company: "Prompt AI Lab",
    location: "กรุงเทพมหานคร - จตุจักร",
    title: "Generative AI Developer",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "Work from Home", type: "dark" },
    ],
    category: "ไอที/ปัญญาประดิษฐ์",
    quota: "2 อัตรา",
    salary: "450 บาท / วัน",
  },
  {
    icon: "fa-solid fa-cart-shopping",
    company: "E-Commerce Tech Group",
    location: "กรุงเทพมหานคร - ปทุมวัน",
    title: "E-Commerce Developer",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/พัฒนาเว็บ",
    quota: "3 อัตรา",
    salary: "350 บาท / วัน",
  },
  {
    icon: "fa-solid fa-file-code",
    company: "Digital Transformation Co.",
    location: "นครราชสีมา - เมืองนครราชสีมา",
    title: "Low-Code / No-Code Developer",
    tags: [
      { text: "สหกิจศึกษา", type: "green" },
      { text: "สัมภาษณ์ออนไลน์", type: "red" },
    ],
    category: "ไอที/โปรแกรมเมอร์",
    quota: "2 อัตรา",
    salary: "300 บาท / วัน",
  },
];

// ==========================================
// 2. Render Cards & Carousel Controls
// ==========================================

export function initCompany() {
  const cardsContainer = document.getElementById("cardsContainer");

  const dotsContainer = document.getElementById("dotsContainer");

  const prevBtn = document.getElementById("prevBtn");

  const nextBtn = document.getElementById("nextBtn");

  // ตรวจสอบว่าหน้าปัจจุบัน
  // มีส่วนแสดงตำแหน่งงานหรือไม่
  if (!cardsContainer) {
    return;
  }

  // ==========================================
  // Render การ์ดตำแหน่งงานสหกิจศึกษา
  // ==========================================

  function renderJobs() {
    cardsContainer.innerHTML = jobsData
      .map(
        (job) => `
          <div class="job-card">

            <div class="company-header">

              <div class="company-logo-icon">
                <i class="${job.icon}"></i>
              </div>

              <div class="company-info">

                <h4 class="company-name">
                  ${job.company}
                </h4>

                <span class="company-location">
                  ${job.location}
                </span>

              </div>

            </div>

            <h3 class="job-title">
              ${job.title}
            </h3>

            <div class="job-tags">

              ${job.tags
            .map(
              (tag) => `
                    <span class="tag tag-${tag.type}">
                      ${tag.text}
                    </span>
                  `,
            )
            .join("")}

            </div>

            <div class="job-details">

              <p>
                <span>หมวดหมู่ :</span>
                ${job.category}
              </p>

              <p>
                <span>จำนวนรับสมัคร :</span>
                ${job.quota}
              </p>

              <p class="salary">
                <span>เบี้ยเลี้ยง :</span>
                ${job.salary}
              </p>

            </div>

          </div>
        `,
      )
      .join("");
  }

  // ==========================================
  // ระบบ Carousel
  // ==========================================

  function setupCarousel() {
    const cardWidth = 270 + 20;

    const totalCards = jobsData.length;

    // จำนวนคอลัมน์
    // เนื่องจากแสดง 2 แถว
    const totalColumns = Math.ceil(totalCards / 2);

    const visibleColumns =
      Math.floor(cardsContainer.offsetWidth / cardWidth) || 1;

    const totalPages = Math.max(1, totalColumns - visibleColumns + 1);

    // ==========================================
    // สร้าง Dots
    // ==========================================

    if (dotsContainer) {
      dotsContainer.innerHTML = "";

      for (let index = 0; index < totalPages; index++) {
        const dot = document.createElement("span");

        dot.classList.add("dot");

        if (index === 0) {
          dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
          cardsContainer.scrollTo({
            left: index * cardWidth,
            behavior: "smooth",
          });
        });

        dotsContainer.appendChild(dot);
      }
    }

    // ==========================================
    // อัปเดต Dot เมื่อเลื่อน
    // ==========================================

    cardsContainer.addEventListener("scroll", () => {
      if (!dotsContainer) {
        return;
      }

      const scrollPosition = cardsContainer.scrollLeft;

      const activeIndex = Math.round(scrollPosition / cardWidth);

      const dots = dotsContainer.querySelectorAll(".dot");

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeIndex);
      });
    });

    // ==========================================
    // ปุ่ม Previous
    // ==========================================

    if (prevBtn) {
      prevBtn.onclick = () => {
        cardsContainer.scrollBy({
          left: -cardWidth * 2,
          behavior: "smooth",
        });
      };
    }

    // ==========================================
    // ปุ่ม Next
    // ==========================================

    if (nextBtn) {
      nextBtn.onclick = () => {
        cardsContainer.scrollBy({
          left: cardWidth * 2,
          behavior: "smooth",
        });
      };
    }
  }

  // ==========================================
  // เริ่มทำงาน
  // ==========================================

  renderJobs();
  setupCarousel();

  window.addEventListener("resize", setupCarousel);
}

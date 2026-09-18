let chatData = {};

// ==========================================
// 1. โหลดข้อมูลจาก data.json
// ==========================================

export async function loadChatData() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error("ไม่สามารถโหลด data.json ได้");
    }

    chatData = await response.json();

    initChatbot();
  } catch (error) {
    console.error(
      "Error loading chat data:",
      error
    );
  }
}

// ==========================================
// 2. เริ่มต้นระบบ Chatbot
// ==========================================

function initChatbot() {
  const btnToggleChat =
    document.getElementById("btnToggleChat");

  const btnCloseChat =
    document.getElementById("btnCloseChat");

  const chatWindow =
    document.getElementById("chatWindow");

  const navChatbotBtn =
    document.getElementById("navChatbotBtn");

  const btnSend =
    document.getElementById("btnSend");

  const chatInput =
    document.getElementById("chatInput");

  // ป้องกัน Error
  // หากหน้านั้นไม่มี Chatbot
  if (!chatWindow || !btnToggleChat) {
    return;
  }

  // ==========================================
  // เปิด / ปิด Chatbot
  // ==========================================

  const toggleChat = () => {
    chatWindow.classList.toggle("hidden");
  };

  btnToggleChat.addEventListener(
    "click",
    toggleChat
  );

  if (btnCloseChat) {
    btnCloseChat.addEventListener(
      "click",
      toggleChat
    );
  }

  if (navChatbotBtn) {
    navChatbotBtn.addEventListener(
      "click",
      (event) => {
        event.preventDefault();

        chatWindow.classList.remove(
          "hidden"
        );
      }
    );
  }

  // ==========================================
  // แสดงข้อความต้อนรับ
  // ==========================================

  renderBotMessage(
    chatData.botResponses?.welcome ||
      "สวัสดีครับ มีอะไรให้ผู้ช่วยระบบสหกิจศึกษาช่วยเหลือครับ?"
  );

  renderQuickReplies();

  // ==========================================
  // ส่งข้อความ
  // ==========================================

  const sendMessage = () => {
    if (!chatInput) {
      return;
    }

    const text =
      chatInput.value.trim();

    if (!text) {
      return;
    }

    renderUserMessage(text);

    chatInput.value = "";

    processBotReply(text);
  };

  if (btnSend) {
    btnSend.addEventListener(
      "click",
      sendMessage
    );
  }

  if (chatInput) {
    chatInput.addEventListener(
      "keypress",
      (event) => {
        if (event.key === "Enter") {
          sendMessage();
        }
      }
    );
  }
}

// ==========================================
// 3. แสดงข้อความของผู้ใช้
// ==========================================

function renderUserMessage(text) {
  const chatBody =
    document.getElementById("chatBody");

  if (!chatBody) {
    return;
  }

  const message =
    document.createElement("div");

  message.className = "msg user";

  message.innerText = text;

  chatBody.appendChild(message);

  chatBody.scrollTop =
    chatBody.scrollHeight;
}

// ==========================================
// 4. แสดงข้อความของ Chatbot
// ==========================================

function renderBotMessage(text) {
  const chatBody =
    document.getElementById("chatBody");

  if (!chatBody) {
    return;
  }

  const message =
    document.createElement("div");

  message.className = "msg bot";

  message.innerText = text;

  chatBody.appendChild(message);

  chatBody.scrollTop =
    chatBody.scrollHeight;
}

// ==========================================
// 5. แสดงคำถามแนะนำ
// ==========================================

function renderQuickReplies() {
  const quickRepliesContainer =
    document.getElementById(
      "quickReplies"
    );

  if (
    !quickRepliesContainer ||
    !chatData.quickQuestions
  ) {
    return;
  }

  quickRepliesContainer.innerHTML =
    chatData.quickQuestions
      .map(
        (question) => `
          <button
            class="quick-btn"
            onclick="window.handleQuickClick(${JSON.stringify(
              question
            )})"
          >
            ${question}
          </button>
        `
      )
      .join("");
}

// ==========================================
// 6. คลิกคำถามแนะนำ
// ==========================================

window.handleQuickClick = function (
  question
) {
  renderUserMessage(question);

  processBotReply(question);
};

// ==========================================
// 7. ประมวลผลคำตอบ Chatbot
// ==========================================

function processBotReply(text) {
  let reply =
    "ขออภัยครับ ระบบยังไม่เข้าใจคำถามนี้ สามารถสอบถามเกี่ยวกับคำร้องสหกิจศึกษา เอกสารส่งตัว การบันทึกการปฏิบัติงาน อาจารย์ที่ปรึกษาโครงการ หรือการอัปโหลดโครงการได้ครับ";

  if (chatData.botResponses) {
    for (
      const key in chatData.botResponses
    ) {
      if (
        key !== "welcome" &&
        text.includes(key)
      ) {
        reply =
          chatData.botResponses[key];

        break;
      }
    }
  }

  // จำลองเวลาพิมพ์ของ Chatbot
  setTimeout(() => {
    renderBotMessage(reply);
  }, 500);
}

// ==========================================
// 8. Filter Modal
// ==========================================

export function initFilter() {
  const btnOpenFilter =
    document.getElementById(
      "btnOpenFilter"
    );

  const btnCloseFilter =
    document.getElementById(
      "btnCloseFilter"
    );

  const filterModal =
    document.getElementById(
      "filterModal"
    );

  const btnResetFilter =
    document.getElementById(
      "btnResetFilter"
    );

  const btnApplyFilter =
    document.getElementById(
      "btnApplyFilter"
    );

  // ป้องกัน Error
  // หากหน้านี้ไม่มี Filter Modal
  if (!filterModal) {
    return;
  }

  // ==========================================
  // เปิด Filter
  // ==========================================

  if (btnOpenFilter) {
    btnOpenFilter.addEventListener(
      "click",
      () => {
        filterModal.classList.remove(
          "hidden"
        );
      }
    );
  }

  // ==========================================
  // ปิด Filter
  // ==========================================

  if (btnCloseFilter) {
    btnCloseFilter.addEventListener(
      "click",
      () => {
        filterModal.classList.add(
          "hidden"
        );
      }
    );
  }

  // ==========================================
  // ปิดเมื่อคลิกพื้นที่ด้านนอก
  // ==========================================

  window.addEventListener(
    "click",
    (event) => {
      if (
        event.target === filterModal
      ) {
        filterModal.classList.add(
          "hidden"
        );
      }
    }
  );

  // ==========================================
  // Reset Filter
  // ==========================================

  if (btnResetFilter) {
    btnResetFilter.addEventListener(
      "click",
      () => {
        document
          .querySelectorAll(
            ".filter-modal-body input"
          )
          .forEach((element) => {
            if (
              element.type ===
              "checkbox"
            ) {
              element.checked = false;
            } else {
              element.value = "";
            }
          });

        document
          .querySelectorAll(
            ".filter-modal-body select"
          )
          .forEach((element) => {
            element.selectedIndex = 0;
          });
      }
    );
  }

  // ==========================================
  // Apply Filter
  // ==========================================

  if (btnApplyFilter) {
    btnApplyFilter.addEventListener(
      "click",
      () => {
        alert(
          "ระบบทำการกรองข้อมูลเรียบร้อยแล้ว!"
        );

        filterModal.classList.add(
          "hidden"
        );
      }
    );
  }
}
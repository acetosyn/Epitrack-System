// ============================================================
// EPITRACK DASHBOARD — Dynamic Loading & UX Enhancements
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Dashboard] Initialized");

  initAnnouncementBar();
  animateStats();
  fadeInSections();
});

// Announcement bar close
function initAnnouncementBar() {
  const closeBtn = document.querySelector(".announcement button");
  closeBtn?.addEventListener("click", () => {
    closeBtn.parentElement.style.opacity = "0";
    setTimeout(() => closeBtn.parentElement.remove(), 300);
  });
}

// Fade-in animations
function fadeInSections() {
  const elements = document.querySelectorAll(".stat-card, .dept-card");
  elements.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";
    setTimeout(() => {
      el.style.transition = "all 0.6s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 120);
  });
}

// Simple stat number animation
function animateStats() {
  document.querySelectorAll(".value").forEach((el) => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 30);
  });
}

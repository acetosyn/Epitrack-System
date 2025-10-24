<<<<<<< HEAD
// ===========================================================
// dashboard.js — Fixed Sidebar, Submenu, Announcement & Stats
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  initSidebarToggle();
  initSubmenuToggle();
  initAnnouncementClose();
  initAnimatedStats();
  console.log("[dashboard.js] initialized ✅");
});

// ----------------------------
// Sidebar collapse toggle
// ----------------------------
function initSidebarToggle() {
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");
  if (!sidebar || !toggle) return;

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");

    // Adjust main content margins if inside base.html
    const main = document.querySelector(".main-content, .dashboard-main");
    if (main) {
      if (sidebar.classList.contains("collapsed")) {
        main.style.marginLeft = "80px";
      } else {
        main.style.marginLeft = "250px";
      }
    }
  });
}

// ----------------------------
// Submenu open/close
// ----------------------------
function initSubmenuToggle() {
  const submenuHeaders = document.querySelectorAll(".menu-header, .nav-parent");

  submenuHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const parent = header.closest(".menu-item, .nav-group");
      const submenu = parent.querySelector(".submenu, .nav-submenu");
      const arrow = header.querySelector(".arrow, .nav-arrow");

      // Collapse others
      document.querySelectorAll(".menu-item.open, .nav-group.open").forEach(openItem => {
        if (openItem !== parent) {
          openItem.classList.remove("open");
          const openArrow = openItem.querySelector(".arrow, .nav-arrow");
          if (openArrow) openArrow.textContent = "▸";
          const openSubmenu = openItem.querySelector(".submenu, .nav-submenu");
          if (openSubmenu) openSubmenu.style.maxHeight = null;
        }
      });

      // Toggle current
      parent.classList.toggle("open");
      if (parent.classList.contains("open")) {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        if (arrow) arrow.textContent = "▾";
      } else {
        submenu.style.maxHeight = null;
        if (arrow) arrow.textContent = "▸";
      }
    });
  });
}

// ----------------------------
// Close announcement
// ----------------------------
function initAnnouncementClose() {
  const closeBtn = document.getElementById("closeAnnouncement");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", () => {
    const announcement = closeBtn.closest(".announcement");
    if (!announcement) return;
    announcement.classList.add("fade-out");
    setTimeout(() => (announcement.style.display = "none"), 300);
  });
}

// ----------------------------
// Animate number counters
// ----------------------------
function initAnimatedStats() {
  const statValues = document.querySelectorAll(".stat-card .value");
  statValues.forEach(el => {
    const val = parseInt(el.textContent);
    if (isNaN(val)) return;
    let current = 0;
    const duration = 800;
    const steps = 30;
    const increment = val / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= val) {
        el.textContent = val;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, duration / steps);
  });
=======
// ===== SKELETON LOADER & CONTENT ANIMATION =====
window.addEventListener("load", () => {
  const skeletonLoader = document.getElementById("skeletonLoader")
  const dashboardContent = document.getElementById("dashboardContent")

  if (skeletonLoader && dashboardContent) {
    setTimeout(() => {
      skeletonLoader.style.display = "none"
      dashboardContent.style.display = "block"

      // Animate stat counters
      animateCounters()
    }, 800)
  }
})

// ===== ANIMATED COUNTERS =====
function animateCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.dataset.target)
    const duration = 1500
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        counter.textContent = Math.floor(current).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    updateCounter()
  })
>>>>>>> tango
}

// ===== QUICK ACTION BUTTONS =====
const quickActionBtns = document.querySelectorAll(".quick-action-btn")

function showToast(message, type) {
  // Implementation of showToast function
  console.log(`Toast: ${message} (${type})`)
}

quickActionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const actionTitle = btn.querySelector("span").textContent
    showToast(`${actionTitle} initiated successfully`, "success")
  })
})

// ===== STAT CARD INTERACTIONS =====
const statCards = document.querySelectorAll(".stat-card")

statCards.forEach((card) => {
  card.addEventListener("click", () => {
    const label = card.querySelector(".stat-label").textContent
    showToast(`Viewing ${label} details`, "info")
  })
})

// ===== DEPARTMENT CARD INTERACTIONS =====
const departmentCards = document.querySelectorAll(".department-card")

departmentCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)"
  })
})

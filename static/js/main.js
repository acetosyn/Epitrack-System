// =========================================================
//  EPITRACK MAIN APP SCRIPT (Updated for New Header)
// =========================================================

// ===== SIDEBAR TOGGLE =====
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarElement = document.getElementById("sidebar");

if (sidebarToggle && sidebarElement) {
  sidebarToggle.addEventListener("click", () => {
    sidebarElement.classList.toggle("collapsed");
    localStorage.setItem("sidebarCollapsed", sidebarElement.classList.contains("collapsed"));
  });

  // Restore saved state
  if (localStorage.getItem("sidebarCollapsed") === "true") {
    sidebarElement.classList.add("collapsed");
  }
}

// ===== GLOBAL SEARCH SHORTCUT (Press / ) =====
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  }
});

// ===== LIVE DATE & TIME =====
function updateLiveTime() {
  const dateEl = document.getElementById("timer-date");
  const timeEl = document.getElementById("timer-time");

  if (!dateEl || !timeEl) return;

  const now = new Date();
  dateEl.textContent = now.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  timeEl.textContent = now.toLocaleTimeString("en-GB", {
    hour12: false,
  });
}

setInterval(updateLiveTime, 1000);
updateLiveTime();

// ===== THEME TOGGLE (Sun → Moon) =====
const themeToggle = document.getElementById("theme-toggle");
const sunIcon = document.querySelector(".sun-icon");
const moonIcon = document.querySelector(".moon-icon");

function refreshTheme() {
  if (document.body.classList.contains("dark-mode")) {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  refreshTheme();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    refreshTheme();
  });
}

// ===== NOTIFICATION DRAWER =====
const notificationBtn = document.getElementById("notification-btn");
const notificationDrawer = document.getElementById("notification-drawer");
const drawerClose = document.getElementById("drawer-close");

if (notificationBtn && notificationDrawer) {
  notificationBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    notificationDrawer.classList.toggle("active");
  });
}

if (drawerClose) {
  drawerClose.addEventListener("click", () => {
    notificationDrawer.classList.remove("active");
  });
}

// Close drawer when clicking outside
document.addEventListener("click", (e) => {
  if (
    notificationDrawer &&
    !notificationDrawer.contains(e.target) &&
    !notificationBtn.contains(e.target)
  ) {
    notificationDrawer.classList.remove("active");
  }
});

// ===== ROLE SWITCH DROPDOWN =====
const roleBtn = document.getElementById("role-btn");
const roleDropdown = document.getElementById("role-dropdown");

if (roleBtn && roleDropdown) {
  roleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    roleDropdown.classList.toggle("active");
    roleBtn.classList.toggle("active");
  });
}

// Close user dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    roleDropdown &&
    !roleDropdown.contains(e.target) &&
    !roleBtn.contains(e.target)
  ) {
    roleDropdown.classList.remove("active");
    roleBtn.classList.remove("active");
  }
});

// ===== Keyboard: ESC closes menus =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    roleDropdown?.classList.remove("active");
    notificationDrawer?.classList.remove("active");
  }
});

// ===========================================================
// dashboard2.js — Optimized Sidebar & UI Logic for Dashboard
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  setupSidebarToggle()
  setupSubmenuToggle()
  setupAnnouncementClose()
  animateStats()
  console.log("[dashboard2] Initialized")
})

// ----------------------------
// Sidebar collapse toggle
// ----------------------------
function setupSidebarToggle() {
  const sidebar = document.getElementById("sidebar")
  const toggle = document.getElementById("sidebarToggle")
  if (!sidebar || !toggle) return

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
  })
}

// ----------------------------
// Expand / collapse submenus
// ----------------------------
function setupSubmenuToggle() {
  const submenuHeaders = document.querySelectorAll(".menu-item.has-submenu .menu-header")

  submenuHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const parent = header.parentElement
      const submenu = parent.querySelector(".submenu")
      const arrow = header.querySelector(".arrow")

      // Collapse others
      document.querySelectorAll(".menu-item.has-submenu.open").forEach((openItem) => {
        if (openItem !== parent) {
          openItem.classList.remove("open")
          const openArrow = openItem.querySelector(".arrow")
          if (openArrow) openArrow.textContent = "▸"
          const openSubmenu = openItem.querySelector(".submenu")
          if (openSubmenu) openSubmenu.style.maxHeight = null
        }
      })

      // Toggle this one
      parent.classList.toggle("open")
      if (parent.classList.contains("open")) {
        submenu.style.maxHeight = submenu.scrollHeight + "px"
        arrow.textContent = "▾"
      } else {
        submenu.style.maxHeight = null
        arrow.textContent = "▸"
      }
    })
  })
}

// ----------------------------
// Close announcement banner
// ----------------------------
function setupAnnouncementClose() {
  const closeBtn = document.getElementById("closeAnnouncement")
  if (!closeBtn) return

  closeBtn.addEventListener("click", () => {
    const announcement = closeBtn.parentElement
    announcement.classList.add("fade-out")
    setTimeout(() => (announcement.style.display = "none"), 300)
  })
}

// ----------------------------
// Animate number counters
// ----------------------------
function animateStats() {
  const stats = document.querySelectorAll(".stat-card .value")

  stats.forEach((el) => {
    const val = parseInt(el.textContent)
    if (isNaN(val)) return
    let current = 0
    const duration = 800
    const steps = 30
    const increment = val / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= val) {
        el.textContent = val
        clearInterval(timer)
      } else {
        el.textContent = Math.floor(current)
      }
    }, duration / steps)
  })
}

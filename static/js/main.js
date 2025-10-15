// Main JavaScript for EPITRACK

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Initialize all components
  initializeSidebar()
  initializeTimer()
  initializeThemeToggle()
  initializeNotifications()
  initializeRoleSwitcher()
  initializeModals()
  initializeSearch()
  initializeScrollTop()
  initializeFAB()
  initializeKeyboardShortcuts()

  console.log("[v0] EPITRACK initialized successfully")
}

// Sidebar Toggle & Navigation
function initializeSidebar() {
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const sidebar = document.getElementById("sidebar")
  const navParents = document.querySelectorAll(".nav-parent")

  // Toggle sidebar collapse
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
      localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"))
    })

    // Restore sidebar state
    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true"
    if (isCollapsed) {
      sidebar.classList.add("collapsed")
    }
  }

  // Department dropdown navigation
  navParents.forEach((parent) => {
    parent.addEventListener("click", (e) => {
      e.preventDefault()
      const navGroup = parent.closest(".nav-group")
      const isExpanded = navGroup.classList.contains("expanded")

      // Close all other groups
      document.querySelectorAll(".nav-group").forEach((group) => {
        if (group !== navGroup) {
          group.classList.remove("expanded")
        }
      })

      // Toggle current group
      navGroup.classList.toggle("expanded")
      parent.classList.toggle("expanded")

      // Save state
      const department = parent.dataset.department
      if (!isExpanded) {
        localStorage.setItem(`dept-${department}`, "expanded")
      } else {
        localStorage.removeItem(`dept-${department}`)
      }
    })

    // Restore expanded state
    const department = parent.dataset.department
    if (localStorage.getItem(`dept-${department}`) === "expanded") {
      parent.closest(".nav-group").classList.add("expanded")
      parent.classList.add("expanded")
    }
  })

  // Mobile sidebar toggle
  if (window.innerWidth <= 768) {
    sidebarToggle?.addEventListener("click", () => {
      sidebar?.classList.toggle("active")
    })
  }
}

// Live Timer
function initializeTimer() {
  const timerDate = document.getElementById("timer-date")
  const timerTime = document.getElementById("timer-time")

  function updateTimer() {
    const now = new Date()

    // Format date
    const dateOptions = { weekday: "short", year: "numeric", month: "short", day: "numeric" }
    const formattedDate = now.toLocaleDateString("en-US", dateOptions)

    // Format time
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")
    const formattedTime = `${hours}:${minutes}:${seconds}`

    if (timerDate) timerDate.textContent = formattedDate
    if (timerTime) timerTime.textContent = formattedTime
  }

  // Update immediately and then every second
  updateTimer()
  setInterval(updateTimer, 1000)
}

// Dark Mode Toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const sunIcon = themeToggle?.querySelector(".sun-icon")
  const moonIcon = themeToggle?.querySelector(".moon-icon")

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    if (sunIcon) sunIcon.style.display = "none"
    if (moonIcon) moonIcon.style.display = "block"
  }

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    const isDark = document.body.classList.contains("dark-mode")

    // Toggle icons
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? "none" : "block"
      moonIcon.style.display = isDark ? "block" : "none"
    }

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light")

    // Show toast
    showToast("success", "Theme Changed", `Switched to ${isDark ? "dark" : "light"} mode`)
  })
}

// Notification Drawer
function initializeNotifications() {
  const notificationBtn = document.getElementById("notification-btn")
  const notificationDrawer = document.getElementById("notification-drawer")
  const drawerClose = document.getElementById("drawer-close")

  notificationBtn?.addEventListener("click", () => {
    notificationDrawer?.classList.toggle("active")
  })

  drawerClose?.addEventListener("click", () => {
    notificationDrawer?.classList.remove("active")
  })

  // Close drawer when clicking outside
  document.addEventListener("click", (e) => {
    if (!notificationBtn?.contains(e.target) && !notificationDrawer?.contains(e.target)) {
      notificationDrawer?.classList.remove("active")
    }
  })
}

// Role Switcher Dropdown
function initializeRoleSwitcher() {
  const roleBtn = document.getElementById("role-btn")
  const roleDropdown = document.getElementById("role-dropdown")
  const roleOptions = document.querySelectorAll(".role-option")

  roleBtn?.addEventListener("click", (e) => {
    e.stopPropagation()
    roleDropdown?.classList.toggle("active")
    roleBtn.classList.toggle("active")
  })

  // Handle role selection
  roleOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const role = option.dataset.role

      if (option.classList.contains("logout")) {
        showToast("info", "Logged Out", "You have been logged out successfully")
        return
      }

      if (role) {
        const roleName = option.textContent.trim()
        const roleNameEl = roleBtn?.querySelector(".role-name")
        if (roleNameEl) roleNameEl.textContent = roleName

        // Update sidebar visibility based on role
        updateSidebarForRole(role)

        showToast("success", "Role Changed", `Switched to ${roleName} role`)
      }

      roleDropdown?.classList.remove("active")
      roleBtn?.classList.remove("active")
    })
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!roleBtn?.contains(e.target) && !roleDropdown?.contains(e.target)) {
      roleDropdown?.classList.remove("active")
      roleBtn?.classList.remove("active")
    }
  })
}

function updateSidebarForRole(role) {
  // This would dynamically show/hide sidebar sections based on role
  // For now, just log the role change
  console.log(`[v0] Role changed to: ${role}`)
}

// Modal Management
function initializeModals() {
  const modalTriggers = document.querySelectorAll("[data-modal]")
  const modalCloses = document.querySelectorAll(".modal-close, .modal-overlay")

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.dataset.modal
      const modal = document.getElementById(modalId)
      modal?.classList.toggle("active")
    })
  })

  modalCloses.forEach((close) => {
    close.addEventListener("click", (e) => {
      const modal = close.closest(".modal")
      modal?.classList.remove("active")
    })
  })

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach((modal) => {
        modal.classList.remove("active")
      })
    }
  })
}

// Global Search
function initializeSearch() {
  const searchInput = document.getElementById("global-search-input")

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    console.log(`[v0] Searching for: ${query}`)
    // This would trigger search across departments
    // For now, just log the search query
  })
}

// Scroll to Top Button
function initializeScrollTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn")
  const mainContent = document.querySelector(".main-content")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn?.classList.add("visible")
    } else {
      scrollTopBtn?.classList.remove("visible")
    }
  })

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Floating Action Button
function initializeFAB() {
  const fab = document.getElementById("quick-action-fab")
  const quickActionModal = document.getElementById("quick-action-modal")

  fab?.addEventListener("click", () => {
    quickActionModal?.classList.add("active")
  })
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Focus search on '/' key
    if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      const searchInput = document.getElementById("global-search-input")
      searchInput?.focus()
    }

    // Open new entry modal on 'n' key
    if (e.key === "n" && !e.ctrlKey && !e.metaKey) {
      const activeElement = document.activeElement
      if (activeElement?.tagName !== "INPUT" && activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault()
        const addItemModal = document.getElementById("add-item-modal")
        addItemModal?.classList.add("active")
      }
    }
  })
}

// Toast Notification System
function showToast(type, title, message) {
  const toastContainer = document.getElementById("toast-container")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  }

  toast.innerHTML = `
        <div class="toast-icon">${icons[type] || "ℹ"}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `

  toastContainer.appendChild(toast)

  // Close button
  const closeBtn = toast.querySelector(".toast-close")
  closeBtn?.addEventListener("click", () => {
    toast.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transform = "translateX(100%)"
    setTimeout(() => toast.remove(), 300)
  }, 5000)
}

// Export for use in other modules
window.EPITRACK = {
  showToast,
  updateSidebarForRole,
}

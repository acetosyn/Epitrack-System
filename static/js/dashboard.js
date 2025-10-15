// Dashboard JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard()
})

function initializeDashboard() {
  loadRecentRequests()
  loadLowStockItems()
  loadExpiringItems()
  loadRecentActivity()
  initializeRefreshButton()
  initializeAnnouncementBar()
  animateStats()

  console.log("[v0] Dashboard initialized")
}

// Load Recent Requests
function loadRecentRequests() {
  const container = document.getElementById("recent-requests")
  if (!container) return

  // Show skeleton loader
  container.innerHTML = createSkeletonLoader(3)

  // Simulate API call
  setTimeout(() => {
    const requests = [
      {
        id: "REQ-0021",
        title: "Amatem Softgel",
        department: "Pharmacy",
        status: "pending",
        time: "10 mins ago",
        requestedBy: "Dr. Olu",
      },
      {
        id: "REQ-0020",
        title: "Sample Reagent",
        department: "Lab",
        status: "approved",
        time: "25 mins ago",
        requestedBy: "Lab Tech",
      },
      {
        id: "REQ-0019",
        title: "Surgical Gloves",
        department: "Operations",
        status: "pending",
        time: "1 hour ago",
        requestedBy: "Nurse Ada",
      },
    ]

    container.innerHTML = requests
      .map(
        (req) => `
            <div class="request-item">
                <div class="item-icon ${req.status}">
                    ${req.status === "pending" ? "⏳" : "✓"}
                </div>
                <div class="item-content">
                    <div class="item-title">${req.title}</div>
                    <div class="item-subtitle">${req.id} • ${req.department}</div>
                    <div class="item-meta">Requested by ${req.requestedBy} • ${req.time}</div>
                </div>
                <span class="item-badge badge-${req.status}">${req.status}</span>
            </div>
        `,
      )
      .join("")
  }, 800)
}

// Load Low Stock Items
function loadLowStockItems() {
  const container = document.getElementById("low-stock-items")
  if (!container) return

  container.innerHTML = createSkeletonLoader(3)

  setTimeout(() => {
    const items = [
      {
        id: "STOCK-0021",
        name: "Amatem Softgel",
        current: 5,
        minimum: 50,
        level: "critical",
      },
      {
        id: "STOCK-0045",
        name: "Paracetamol 500mg",
        current: 25,
        minimum: 100,
        level: "low",
      },
      {
        id: "STOCK-0067",
        name: "Surgical Masks",
        current: 40,
        minimum: 200,
        level: "low",
      },
    ]

    container.innerHTML = items
      .map(
        (item) => `
            <div class="stock-item">
                <div class="item-icon ${item.level}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </div>
                <div class="item-content">
                    <div class="item-title">${item.name}</div>
                    <div class="item-subtitle">${item.id}</div>
                    <div class="item-meta">Current: ${item.current} units • Min: ${item.minimum} units</div>
                </div>
                <span class="item-badge badge-${item.level}">${item.level}</span>
            </div>
        `,
      )
      .join("")
  }, 1000)
}

// Load Expiring Items
function loadExpiringItems() {
  const container = document.getElementById("expiring-items")
  if (!container) return

  container.innerHTML = createSkeletonLoader(3)

  setTimeout(() => {
    const items = [
      {
        id: "EXP-0012",
        name: "Amoxicillin 250mg",
        expiryDate: "2025-02-20",
        daysLeft: 5,
        quantity: 30,
      },
      {
        id: "EXP-0034",
        name: "Vitamin C Tablets",
        expiryDate: "2025-03-15",
        daysLeft: 28,
        quantity: 50,
      },
      {
        id: "EXP-0056",
        name: "Antiseptic Solution",
        expiryDate: "2025-03-01",
        daysLeft: 14,
        quantity: 12,
      },
    ]

    container.innerHTML = items
      .map(
        (item) => `
            <div class="expiring-item">
                <div class="item-icon warning">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>
                <div class="item-content">
                    <div class="item-title">${item.name}</div>
                    <div class="item-subtitle">${item.id} • ${item.quantity} units</div>
                    <div class="item-meta">Expires: ${item.expiryDate} (${item.daysLeft} days left)</div>
                </div>
            </div>
        `,
      )
      .join("")
  }, 1200)
}

// Load Recent Activity
function loadRecentActivity() {
  const container = document.getElementById("recent-activity")
  if (!container) return

  container.innerHTML = createSkeletonLoader(4)

  setTimeout(() => {
    const activities = [
      {
        action: "Item Issued",
        description: "50 units of Paracetamol issued to Pharmacy",
        user: "Dr. Olu",
        time: "5 mins ago",
        icon: "info",
      },
      {
        action: "Request Approved",
        description: "Sample Reagent request approved",
        user: "HOP",
        time: "15 mins ago",
        icon: "approved",
      },
      {
        action: "Stock Received",
        description: "200 units of Surgical Masks received",
        user: "Inventory Staff",
        time: "1 hour ago",
        icon: "info",
      },
      {
        action: "Low Stock Alert",
        description: "Amatem Softgel below minimum level",
        user: "System",
        time: "2 hours ago",
        icon: "warning",
      },
    ]

    container.innerHTML = activities
      .map(
        (activity) => `
            <div class="activity-item">
                <div class="item-icon ${activity.icon}">
                    ${getActivityIcon(activity.icon)}
                </div>
                <div class="item-content">
                    <div class="item-title">${activity.action}</div>
                    <div class="item-subtitle">${activity.description}</div>
                    <div class="item-meta">${activity.user} • ${activity.time}</div>
                </div>
            </div>
        `,
      )
      .join("")
  }, 1400)
}

function getActivityIcon(type) {
  const icons = {
    info: "ℹ️",
    approved: "✓",
    warning: "⚠️",
    critical: "❌",
  }
  return icons[type] || "•"
}

// Create Skeleton Loader
function createSkeletonLoader(count) {
  let html = ""
  for (let i = 0; i < count; i++) {
    html += `
            <div class="request-item">
                <div class="skeleton" style="width: 40px; height: 40px; border-radius: var(--radius-lg);"></div>
                <div class="item-content" style="flex: 1;">
                    <div class="skeleton skeleton-text" style="width: 60%;"></div>
                    <div class="skeleton skeleton-text" style="width: 80%;"></div>
                    <div class="skeleton skeleton-text" style="width: 40%;"></div>
                </div>
            </div>
        `
  }
  return html
}

// Animate Stats
function animateStats() {
  const statValues = document.querySelectorAll(".stat-value")

  statValues.forEach((stat) => {
    const finalValue = stat.textContent
    const isNumber = !isNaN(Number.parseInt(finalValue))

    if (isNumber) {
      const target = Number.parseInt(finalValue)
      let current = 0
      const increment = target / 50
      const duration = 1000

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          stat.textContent = finalValue
          clearInterval(timer)
        } else {
          stat.textContent = Math.floor(current)
        }
      }, duration / 50)
    }
  })
}

// Initialize Refresh Button
function initializeRefreshButton() {
  const refreshBtn = document.getElementById("refresh-dashboard")

  refreshBtn?.addEventListener("click", () => {
    refreshBtn.style.transform = "rotate(360deg)"
    refreshBtn.style.transition = "transform 0.5s ease"

    setTimeout(() => {
      refreshBtn.style.transform = "rotate(0deg)"
    }, 500)

    // Reload all data
    loadRecentRequests()
    loadLowStockItems()
    loadExpiringItems()
    loadRecentActivity()

    window.EPITRACK?.showToast("success", "Dashboard Refreshed", "All data has been updated")
  })
}

// Initialize Announcement Bar
function initializeAnnouncementBar() {
  const announcementBar = document.querySelector(".announcement-bar")
  const closeBtn = document.querySelector(".announcement-close")

  closeBtn?.addEventListener("click", () => {
    announcementBar.style.opacity = "0"
    announcementBar.style.transform = "translateY(-20px)"
    setTimeout(() => {
      announcementBar.style.display = "none"
    }, 300)
  })
}

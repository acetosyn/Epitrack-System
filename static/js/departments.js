// Department Pages JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeDepartmentPages()
})

function initializeDepartmentPages() {
  const currentPage = window.location.pathname

  if (currentPage.includes("pharmacy")) {
    initializePharmacyPage()
  } else if (currentPage.includes("inventory")) {
    initializeInventoryPage()
  } else if (currentPage.includes("admin")) {
    initializeAdminPage()
  }

  console.log("[v0] Department pages initialized")
}

// Pharmacy Page
function initializePharmacyPage() {
  loadPharmacyItems()
  initializePharmacySearch()
  initializeFilterDrawer()
  initializePagination()

  const addDrugBtn = document.getElementById("add-drug-btn")
  addDrugBtn?.addEventListener("click", () => {
    window.EPITRACK?.showToast("info", "Add Drug", "Add drug modal would open here")
  })
}

function loadPharmacyItems() {
  const container = document.getElementById("pharmacy-items")
  if (!container) return

  const items = window.EPITRACK_DATA?.PHARMACY_ITEMS || []

  container.innerHTML = items
    .map(
      (item) => `
        <div class="item-card ${item.status}">
            <div class="item-card-header">
                <span class="item-id">${item.id}</span>
                <span class="status-badge status-${item.status}">${item.status.replace("-", " ")}</span>
            </div>
            <div class="item-card-body">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-category">${item.category}</p>
                <div class="item-details">
                    <div class="detail-row">
                        <span class="detail-label">Quantity:</span>
                        <span class="detail-value">${item.quantity} ${item.unit}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Price:</span>
                        <span class="detail-value">₦${item.price.toLocaleString()}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Expiry:</span>
                        <span class="detail-value">${item.expiryDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Location:</span>
                        <span class="detail-value">${item.location}</span>
                    </div>
                </div>
            </div>
            <div class="item-card-footer">
                <div class="item-meta">
                    <small>Created by ${item.createdBy}</small>
                    <small>Updated: ${item.lastUpdated}</small>
                </div>
                <div class="item-actions">
                    <button class="btn-icon" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function initializePharmacySearch() {
  const searchInput = document.getElementById("pharmacy-search")
  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    console.log(`[v0] Searching pharmacy items: ${query}`)
    // Filter logic would go here
  })
}

function initializeFilterDrawer() {
  const drawerBtn = document.getElementById("filter-drawer-btn")
  const drawer = document.getElementById("filter-drawer")
  const closeBtn = document.getElementById("filter-drawer-close")

  drawerBtn?.addEventListener("click", () => {
    drawer?.classList.add("active")
  })

  closeBtn?.addEventListener("click", () => {
    drawer?.classList.remove("active")
  })
}

function initializePagination() {
  const prevBtn = document.getElementById("prev-page")
  const nextBtn = document.getElementById("next-page")
  const pageInfo = document.getElementById("page-info")

  let currentPage = 1
  const totalPages = 5

  prevBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--
      updatePagination()
    }
  })

  nextBtn?.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++
      updatePagination()
    }
  })

  function updatePagination() {
    if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages}`
    if (prevBtn) prevBtn.disabled = currentPage === 1
    if (nextBtn) nextBtn.disabled = currentPage === totalPages
  }
}

// Inventory Page
function initializeInventoryPage() {
  loadInventoryTable()
  initializeInventorySearch()
  initializeViewToggle()

  const addInventoryBtn = document.getElementById("add-inventory-btn")
  addInventoryBtn?.addEventListener("click", () => {
    window.EPITRACK?.showToast("info", "Add Item", "Add inventory item modal would open here")
  })

  const printLabelsBtn = document.getElementById("print-labels-btn")
  printLabelsBtn?.addEventListener("click", () => {
    window.EPITRACK?.showToast("success", "Print Labels", "QR labels would be generated here")
  })
}

function loadInventoryTable() {
  const tbody = document.getElementById("inventory-tbody")
  if (!tbody) return

  const items = window.EPITRACK_DATA?.PHARMACY_ITEMS || []

  tbody.innerHTML = items
    .map(
      (item) => `
        <tr>
            <td><input type="checkbox"></td>
            <td><span class="table-id">${item.id}</span></td>
            <td><strong>${item.name}</strong></td>
            <td><span class="category-badge">${item.category}</span></td>
            <td>${item.quantity} ${item.unit}</td>
            <td>${item.location}</td>
            <td><span class="status-badge status-${item.status}">${item.status.replace("-", " ")}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon" title="View">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="btn-icon" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `,
    )
    .join("")
}

function initializeInventorySearch() {
  const searchInput = document.getElementById("inventory-search")
  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    console.log(`[v0] Searching inventory: ${query}`)
  })
}

function initializeViewToggle() {
  const viewToggle = document.getElementById("view-toggle")
  viewToggle?.addEventListener("click", () => {
    window.EPITRACK?.showToast("info", "View Toggle", "Switch between grid and table view")
  })
}

// Admin Page
function initializeAdminPage() {
  initializeAdminTabs()
  loadUsers()
  loadAuditLog()
}

function initializeAdminTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab

      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      btn.classList.add("active")
      document.getElementById(`${targetTab}-tab`)?.classList.add("active")
    })
  })
}

function loadUsers() {
  const container = document.getElementById("users-grid")
  if (!container) return

  const users = window.EPITRACK_DATA?.USERS || []

  container.innerHTML = users
    .map(
      (user) => `
        <div class="user-card">
            <div class="user-avatar-large">${user.name.split(" ")[0].charAt(0)}${user.name.split(" ")[1]?.charAt(0) || ""}</div>
            <div class="user-info">
                <h3 class="user-name">${user.name}</h3>
                <p class="user-email">${user.email}</p>
                <div class="user-badges">
                    <span class="role-badge role-${user.role.toLowerCase()}">${user.role}</span>
                    <span class="status-badge status-${user.status}">${user.status}</span>
                </div>
                <div class="user-meta">
                    <small>Last login: ${user.lastLogin}</small>
                    <small>Joined: ${user.createdDate}</small>
                </div>
            </div>
            <div class="user-actions">
                <button class="btn-icon" title="Edit User">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="btn-icon" title="Delete User">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function loadAuditLog() {
  const container = document.getElementById("audit-log")
  if (!container) return

  const logs = window.EPITRACK_DATA?.AUDIT_LOG || []

  container.innerHTML = logs
    .map(
      (log) => `
        <div class="audit-item">
            <div class="audit-icon audit-${log.category}">
                ${getAuditIcon(log.category)}
            </div>
            <div class="audit-content">
                <div class="audit-header">
                    <h4 class="audit-action">${log.action}</h4>
                    <span class="audit-time">${log.timestamp}</span>
                </div>
                <p class="audit-description">${log.description}</p>
                <div class="audit-meta">
                    <span>User: ${log.user}</span>
                    <span>IP: ${log.ipAddress}</span>
                    <span>ID: ${log.id}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function getAuditIcon(category) {
  const icons = {
    inventory: "📦",
    request: "📋",
    auth: "🔐",
    alert: "⚠️",
  }
  return icons[category] || "•"
}

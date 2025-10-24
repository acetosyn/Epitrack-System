// ===== DEPARTMENT PAGE INTERACTIONS =====

// Function declaration for showToast
function showToast(message, type) {
  console.log(`Toast: ${message} (${type})`)
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector(".search-input")
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const tableRows = document.querySelectorAll(".data-table tbody tr")

    tableRows.forEach((row) => {
      const text = row.textContent.toLowerCase()
      row.style.display = text.includes(searchTerm) ? "" : "none"
    })
  })
}

// ===== FILTER FUNCTIONALITY =====
const filterSelect = document.querySelector(".filter-select")
if (filterSelect) {
  filterSelect.addEventListener("change", (e) => {
    const filterValue = e.target.value
    const tableRows = document.querySelectorAll(".data-table tbody tr")

    tableRows.forEach((row) => {
      if (filterValue === "All") {
        row.style.display = ""
      } else {
        const statusBadge = row.querySelector(".badge")
        const status = statusBadge ? statusBadge.textContent : ""
        row.style.display = status.includes(filterValue) ? "" : "none"
      }
    })
  })
}

// ===== ACTION BUTTON INTERACTIONS =====
const actionBtns = document.querySelectorAll(".action-btn")
actionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    const action = btn.textContent.trim()
    const row = btn.closest("tr")
    const itemName = row.querySelector("td:nth-child(2)").textContent

    if (action === "Delete") {
      if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
        showToast(`"${itemName}" has been deleted`, "success")
        row.style.opacity = "0.5"
        setTimeout(() => row.remove(), 300)
      }
    } else {
      showToast(`${action} "${itemName}"`, "info")
    }
  })
})

// ===== SUB-DEPARTMENT CARD INTERACTIONS =====
const subDeptCards = document.querySelectorAll(".sub-dept-card")
subDeptCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Page navigation handled by href
  })
})

// ===== ACTIVITY ITEM INTERACTIONS =====
const activityItems = document.querySelectorAll(".activity-item")
activityItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.backgroundColor = "var(--bg-secondary)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.backgroundColor = "transparent"
  })
})

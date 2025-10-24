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

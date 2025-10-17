// ======================================
// EPITRACK Login + Typewriter (V3)
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  // ----- Toggle Password -----
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");
  const toggle = document.getElementById("togglePassword");
  const password = document.getElementById("password");

  toggle.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
  });

  // ----- Login Request -----
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      username: form.username.value.trim(),
      password: form.password.value.trim(),
      role: form.role.value
    };

    const res = await fetch("/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    const result = await res.json();
    message.textContent = result.message;
    message.style.color = result.success ? "green" : "red";

    if (result.success) {
      setTimeout(() => window.location.href = "/dashboard", 1000);
    }
  });

  // ----- Typewriter Effect -----
  const el = document.getElementById("typewriter");
  if (el) {
    const messages = [
      "Select your correct role before logging in...",
      "Use the right username and password for your department...",
      "Ensure your login details are accurate and secure..."
    ];
    let msgIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = messages[msgIndex];
      el.textContent = current.substring(0, charIndex);
      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          msgIndex = (msgIndex + 1) % messages.length;
        }
      }
      setTimeout(type, deleting ? 40 : 70);
    }

    type();
  }
});

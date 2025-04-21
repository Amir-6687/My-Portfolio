// document.addEventListener("DOMContentLoaded", function () {
//   // Animate skill bars
//   const skillBars = document.querySelectorAll(".skill-bar");

//   skillBars.forEach((bar) => {
//     const progress = bar.querySelector(".skill-progress");
//     const percentage = bar.dataset.percentage;
//     progress.style.width = percentage + "%";
//   });

//   // Mobile menu toggle
//   const menuBtn = document.querySelector(".menu-btn");
//   const navLinks = document.querySelector(".nav-links");

//   menuBtn.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
//     menuBtn.classList.toggle("active");
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  // Animate skill bars
  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach((bar) => {
    const progress = bar.querySelector(".skill-progress");
    const percentage = bar.dataset.percentage;
    progress.style.width = percentage + "%";
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  // Handle contact form submission
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    // const status = document.createElement("p");
    const status = document.getElementById("form-status");
    status.classList.add("form-status");

    try {
      const response = await fetch("https://formspree.io/f/xnndagaq", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        status.textContent = "✅ Nachricht erfolgreich gesendet!";
        status.style.color = "lightgreen";
        form.reset();
      } else {
        status.textContent = "❌ Fehler beim Senden der Nachricht.";
        status.style.color = "salmon";
      }
    } catch (error) {
      status.textContent = "⚠️ Ein unerwarteter Fehler ist aufgetreten.";
      status.style.color = "orange";
    }

    // نمایش پیام
    // form.appendChild(status);

    // حذف پیام بعد از چند ثانیه
    setTimeout(() => {
      status.remove();
    }, 5000);
  });
});

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
  AOS.init();

  // بارگذاری داده‌های پروژه‌ها از فایل JSON
  // 📌 بارگذاری پروژه‌ها از JSON و نمایش مرتب در گرید
  fetch("projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const projectsContainer = document.querySelector(".projects-grid"); // اصلاح شد

      projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");

        projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-img" />
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <a href="${project.link}" class="project-link" target="_blank">View Project</a>
    `;

        projectsContainer.appendChild(projectCard);
      });
    })
    .catch((error) => console.error("❌ Error loading the projects:", error));

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

  // 📩 Handle contact form submission
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // جلوگیری از ریفرش شدن صفحه

    const formData = new FormData(form); // جمع‌آوری داده‌ها از فرم
    status.classList.add("form-status");

    try {
      // ارسال فرم به Formspree
      const response = await fetch("https://formspree.io/f/xnndagaq", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        // ✅ موفقیت‌آمیز
        status.textContent = "✅ Nachricht erfolgreich gesendet!";
        status.style.color = "lightgreen";
        form.reset(); // پاک‌کردن فرم
      } else {
        // ❌ خطا در ارسال فرم (مثلاً فیلدی درست پر نشده)
        status.textContent = "❌ Fehler beim Senden der Nachricht.";
        status.style.color = "salmon";
      }
    } catch (error) {
      // ⚠️ خطای شبکه یا مشکلات دیگر
      status.textContent = "⚠️ Ein unerwarteter Fehler ist aufgetreten.";
      status.style.color = "orange";
    }

    // ⏳ حذف پیام بعد از 5 ثانیه
    setTimeout(() => {
      status.textContent = "";
    }, 5000);
  });

  // 🎯 انیمیشن افکت آبشاری برای پروژه‌ها
  const projectCards = document.querySelectorAll(".project-card");

  const revealProjects = () => {
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 200); // افکت آبشاری
    });
  };

  const projectSection = document.querySelector("#projects");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealProjects();
          observer.unobserve(projectSection);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(projectSection);

  // 🎯 Tooltips برای آیکون‌های مهارت
  // 🎯 Tooltips برای آیکون‌های مهارت
  const tooltip = document.createElement("div");
  tooltip.className = "skill-tooltip";
  tooltip.style.position = "absolute";
  tooltip.style.background = "#333";
  tooltip.style.color = "#fff";
  tooltip.style.padding = "5px 10px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.pointerEvents = "none";
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity 0.2s ease";
  document.body.appendChild(tooltip);

  const skillIcons = document.querySelectorAll(".skill-icon");

  skillIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", (e) => {
      tooltip.textContent = icon.getAttribute("data-skill");
      tooltip.style.opacity = "1";
    });

    icon.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.pageX + 15 + "px";
      tooltip.style.top = e.pageY + 15 + "px";
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
});

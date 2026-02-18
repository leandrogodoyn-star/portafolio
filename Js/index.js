// ==========================================
// LOADER - VERSIÓN ULTRA SIMPLE
// ==========================================
setTimeout(function () {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(function () {
      loader.style.display = "none";
      if (document.body) document.body.style.overflow = "";
    }, 800);
  }
}, 2500);

// Bloquear scroll inicial (esperar a que body exista)
if (document.body) {
  document.body.style.overflow = "hidden";
} else {
  window.addEventListener("DOMContentLoaded", function () {
    document.body.style.overflow = "hidden";
  });
}

// ==========================================
// POLVO ESTELAR
// ==========================================
window.addEventListener("load", function () {
  const stardustContainer = document.getElementById("stardustContainer");
  if (stardustContainer) {
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement("div");
      particle.className = "stardust-particle";

      const angle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 250;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.left = "calc(50% + " + x + "px)";
      particle.style.top = "calc(50% + " + y + "px)";
      particle.style.animationDelay =
        Math.random() * 4 + "s, " + Math.random() * 5 + "s";
      particle.style.setProperty("--trail-angle", Math.random() * 360 + "deg");

      stardustContainer.appendChild(particle);
    }
  }
});

// ==========================================
// DARK MODE
// ==========================================
window.addEventListener("load", function () {
  const darkToggle = document.getElementById("darkToggle");
  const darkToggleMobile = document.getElementById("darkToggleMobile");

  function setDark(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    const emoji = isDark ? "🌙" : "☀️";
    if (darkToggle)
      darkToggle.querySelector(".dark-toggle-thumb").textContent = emoji;
    if (darkToggleMobile)
      darkToggleMobile.querySelector(".dark-toggle-thumb").textContent = emoji;
    localStorage.setItem("darkMode", isDark);
  }

  if (localStorage.getItem("darkMode") === "true") setDark(true);

  if (darkToggle)
    darkToggle.addEventListener("click", function () {
      setDark(!document.body.classList.contains("dark-mode"));
    });
  if (darkToggleMobile)
    darkToggleMobile.addEventListener("click", function () {
      setDark(!document.body.classList.contains("dark-mode"));
    });
});

// ==========================================
// MENÚ HAMBURGUESA
// ==========================================
window.addEventListener("load", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      const isOpen = hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    const links = mobileMenu.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    }
  }
});

// ==========================================
// FORMA 3D + PARALLAX
// ==========================================
window.addEventListener("load", function () {
  const shapeWrapper = document.querySelector(".shape-wrapper");
  const shapeContainer = document.querySelector(".shape-container");
  let scrollY = 0,
    mouseX = 0,
    mouseY = 0;

  if (shapeWrapper && shapeContainer) {
    window.addEventListener("scroll", function () {
      scrollY = window.scrollY;
      updateShape();
    });

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
      updateShape();
    });

    function updateShape() {
      shapeWrapper.style.transform =
        "translate(-50%, -50%) " +
        "translateX(" +
        mouseX * 60 +
        "px) " +
        "translateY(" +
        mouseY * 60 +
        "px) " +
        "rotateX(" +
        mouseY * 40 +
        "deg) " +
        "rotateY(" +
        mouseX * -40 +
        "deg) " +
        "rotateZ(" +
        (mouseX + mouseY) * 20 +
        "deg)";

      shapeContainer.style.transform = "translateY(" + scrollY * 0.3 + "px)";
    }
  }
});

// ==========================================
// CURSOR
// ==========================================
window.addEventListener("load", function () {
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    const hoverElements = document.querySelectorAll("a, button, .project-card");
    for (let i = 0; i < hoverElements.length; i++) {
      hoverElements[i].addEventListener("mouseenter", function () {
        cursor.classList.add("hover");
      });
      hoverElements[i].addEventListener("mouseleave", function () {
        cursor.classList.remove("hover");
      });
    }
  }
});

// ==========================================
// HEADER SCROLL
// ==========================================
window.addEventListener("load", function () {
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
window.addEventListener("load", function () {
  const anchors = document.querySelectorAll('a[href^="#"]');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
window.addEventListener("load", function () {
  const revealElements = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale",
  );

  function checkVisibility() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.85; // 85% del viewport

    for (let i = 0; i < revealElements.length; i++) {
      const element = revealElements[i];
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerPoint) {
        element.classList.add("visible");
      }
    }
  }

  // Ejecutar al cargar y al hacer scroll
  checkVisibility();
  window.addEventListener("scroll", checkVisibility);

  // También ejecutar al redimensionar (por si cambia el viewport)
  window.addEventListener("resize", checkVisibility);
});

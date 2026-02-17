// ==========================================
// LOADER
// ==========================================
const loader = document.getElementById("loader");
document.body.style.overflow = "hidden";
setTimeout(() => {
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.8s ease";
  setTimeout(() => {
    loader.style.display = "none";
    document.body.style.overflow = "";
  }, 800);
}, 2500);

// ==========================================
// DARK MODE
// ==========================================
const darkToggle = document.getElementById("darkToggle");
const darkToggleMobile = document.getElementById("darkToggleMobile");

function setDark(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  const emoji = isDark ? "🌙" : "☀️";
  darkToggle.querySelector(".dark-toggle-thumb").textContent = emoji;
  darkToggleMobile.querySelector(".dark-toggle-thumb").textContent = emoji;
  localStorage.setItem("darkMode", isDark);
}

// Recuperar preferencia
if (localStorage.getItem("darkMode") === "true") setDark(true);

darkToggle.addEventListener("click", () =>
  setDark(!document.body.classList.contains("dark-mode")),
);
darkToggleMobile.addEventListener("click", () =>
  setDark(!document.body.classList.contains("dark-mode")),
);

// ==========================================
// MENÚ HAMBURGUESA
// ==========================================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isOpen = hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// Cerrar al hacer click en un link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ==========================================
// FORMA 3D + PARALLAX
// ==========================================
const shapeWrapper = document.querySelector(".shape-wrapper");
const shapeContainer = document.querySelector(".shape-container");
let scrollY = 0,
  mouseX = 0,
  mouseY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  updateShape();
});
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = e.clientY / window.innerHeight - 0.5;
  updateShape();
});

function updateShape() {
  shapeWrapper.style.transform = `
    translate(-50%, -50%)
    translateX(${mouseX * 60}px)
    translateY(${mouseY * 60}px)
    rotateX(${mouseY * 40}deg)
    rotateY(${mouseX * -40}deg)
    rotateZ(${(mouseX + mouseY) * 20}deg)
  `;
  shapeContainer.style.transform = `translateY(${scrollY * 0.3}px)`;
}

// ==========================================
// CURSOR
// ==========================================
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
document.querySelectorAll("a, button, .project-card").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// ==========================================
// HEADER SCROLL
// ==========================================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 100);
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

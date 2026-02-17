// ==========================================
// PANTALLA DE CARGA
// ==========================================
const loader = document.getElementById("loader");

document.body.style.overflow = "hidden";

setTimeout(function () {
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.8s ease";

  setTimeout(function () {
    loader.style.display = "none";
    document.body.style.overflow = "";
  }, 800);
}, 2500);

// ==========================================
// DARK MODE
// ==========================================
const darkToggle = document.getElementById("darkToggle");
const thumb = darkToggle.querySelector(".dark-toggle-thumb");

// Recuperar preferencia guardada
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  thumb.textContent = "🌙";
}

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  thumb.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("darkMode", isDark);
});

// ==========================================
// EFECTO 3D PARALLAX DE LA FORMA GEOMÉTRICA
// ==========================================
const shapeWrapper = document.querySelector(".shape-wrapper");
const shapeContainer = document.querySelector(".shape-container");
const geometricShape = document.querySelector(".geometric-shape");
let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

// Parallax con scroll
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  updateShapePosition();
});

// Efecto 3D con movimiento del mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = e.clientY / window.innerHeight - 0.5;
  updateShapePosition();
});

function updateShapePosition() {
  const parallaxY = scrollY * 0.3;

  const rotateX = mouseY * 40;
  const rotateY = mouseX * -40;
  const rotateZ = (mouseX + mouseY) * 20;
  const translateX = mouseX * 60;
  const translateY = mouseY * 60;

  shapeWrapper.style.transform = `
    translate(-50%, -50%)
    translateX(${translateX}px)
    translateY(${translateY}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    rotateZ(${rotateZ}deg)
  `;

  shapeContainer.style.transform = `translateY(${parallaxY}px)`;
}

// ==========================================
// CURSOR PERSONALIZADO
// ==========================================
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Efecto hover
const hoverElements = document.querySelectorAll("a, button, .project-card");
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// ==========================================
// HEADER AL HACER SCROLL
// ==========================================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ==========================================
// EFECTO 3D PARALLAX DE LA FORMA GEOMÉTRICA
// ========================================== */
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
  // Parallax scroll
  const parallaxY = scrollY * 0.3;

  // Efecto 3D en los 3 ejes
  const rotateX = mouseY * 40; // Rotación en eje X
  const rotateY = mouseX * -40; // Rotación en eje Y
  const rotateZ = (mouseX + mouseY) * 20; // Rotación en eje Z
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
let cursorMouseX = 0;
let cursorMouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  cursorMouseX = e.clientX;
  cursorMouseY = e.clientY;
});

function animateCursor() {
  const dx = cursorMouseX - cursorX;
  const dy = cursorMouseY - cursorY;

  cursorX += dx * 1;
  cursorY += dy * 1;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

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

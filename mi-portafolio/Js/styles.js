// TYPEWRITER EFFECT

const text = "Desarrollador Creativo";
const typewriter = document.getElementById("typewriter");
let i = 0;

function typing() {
  if (i < text.length) {
    typewriter.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 80);
  }
}

typing();

// SCROLL ANIMATION

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

// PARTICLES EFFECT (ANIME STYLE)

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 1 + 0.5;
  }

  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = "rgba(255, 60, 120, 0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// AURA FOLLOW MOUSE

const aura = document.querySelector(".aura");

document.addEventListener("mousemove", (e) => {
  aura.style.left = e.clientX + "px";
  aura.style.top = e.clientY + "px";
});

// Aura intensifies on hover buttons and cards

document.querySelectorAll(".btn, .project-card, .skill").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    aura.style.width = "350px";
    aura.style.height = "350px";
  });

  el.addEventListener("mouseleave", () => {
    aura.style.width = "250px";
    aura.style.height = "250px";
  });
});

// ======================
// MOBILE MENU TOGGLE
// ======================

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll("#nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });
});

const opening = document.getElementById("opening");
const site = document.getElementById("site");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

music.volume = 0.42;

openBtn.addEventListener("click", async () => {
  try {
    await music.play();
    musicBtn.textContent = "♫";
  } catch (e) {
    musicBtn.textContent = "🔇";
  }

  opening.classList.add("hide");
  site.classList.remove("hidden");
  musicBtn.classList.remove("hidden");

  setTimeout(() => opening.remove(), 1300);
  revealNow();
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
    musicBtn.textContent = "♫";
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

// Extra safety: restart at the beginning if a browser ignores loop.
music.addEventListener("ended", () => {
  music.currentTime = 0;
  music.play().catch(() => {});
});

document.querySelectorAll(".photo-open").forEach(btn => {
  btn.addEventListener("click", () => {
    lightboxImg.src = btn.dataset.src;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

function closeBox() {
  lightbox.classList.add("hidden");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}
closeLightbox.addEventListener("click", closeBox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeBox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeBox();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function revealNow() {
  document.querySelectorAll(".hero .reveal").forEach(el => el.classList.add("visible"));
}

// Gentle confetti when the final section is reached.
let confettiMade = false;
const finalSection = document.querySelector(".final");
const confetti = document.getElementById("confetti");

const finalObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || confettiMade) return;
  confettiMade = true;
  for (let i = 0; i < 70; i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDelay = (Math.random() * 1.8) + "s";
    p.style.animationDuration = (3 + Math.random() * 2.5) + "s";
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.background = ["#f4b6d9","#f6d7a7","#ffffff","#caa6ef"][Math.floor(Math.random()*4)];
    confetti.appendChild(p);
  }
}, {threshold: 0.3});

finalObserver.observe(finalSection);

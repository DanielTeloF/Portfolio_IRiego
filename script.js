document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".reveal");

  const updateRevealState = () => {
    const viewportHeight = window.innerHeight;

    animatedElements.forEach((element) => {
      const rect = element.getBoundingClientRect();

      const visibleTop = rect.top < viewportHeight * 0.82;
      const visibleBottom = rect.bottom > viewportHeight * 0.18;

      if (visibleTop && visibleBottom) {
        element.classList.add("revealed");
      } else {
        element.classList.remove("revealed");
      }
    });
  };

  updateRevealState();
  window.addEventListener("scroll", updateRevealState, { passive: true });
  window.addEventListener("resize", updateRevealState);

  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  const header = document.querySelector(".site-header");

  const handleHeaderState = () => {
    if (!header) return;

    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleHeaderState();
  window.addEventListener("scroll", handleHeaderState, { passive: true });

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});

document.querySelectorAll(".gif-sequence").forEach((container) => {
  const gifs = container.querySelectorAll("img");

  if (gifs.length < 2) return;

  let index = 0;

  const playNext = () => {
    const current = gifs[index];

    const duration =
      parseInt(current.dataset.duration) || 5000;

    setTimeout(() => {
      current.classList.remove("active");

      index = (index + 1) % gifs.length;

      gifs[index].classList.add("active");

      playNext();
    }, duration);
  };

  playNext();
});
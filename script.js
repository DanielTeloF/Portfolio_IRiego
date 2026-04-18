document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        } else {
          entry.target.classList.remove("revealed");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((element) => observer.observe(element));

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
  window.addEventListener("scroll", handleHeaderState);

  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
});
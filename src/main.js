/* ═══════════════════════════════════════════════════════════
   DEAD FREQUENCIES — Interaction Layer
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Scroll Reveal ─────────────────────────────────────── */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ── Parallax-lite on hero orbs (mouse only) ───────────── */
  const hero = document.querySelector(".hero");
  const orbs = document.querySelectorAll(".hero__orb");

  if (hero && orbs.length && window.matchMedia("(pointer: fine)").matches) {
    let ticking = false;

    hero.addEventListener("mousemove", (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        orbs.forEach((orb, i) => {
          const depth = (i + 1) * 6;
          orb.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
        });

        ticking = false;
      });
    });
  }

  /* ── Glitch burst on title (occasional random micro-glitch) */
  const titleBase = document.querySelector(".hero__title-layer--base");
  if (titleBase) {
    function triggerMicroGlitch() {
      const dx = (Math.random() - 0.5) * 4;
      titleBase.style.transform = `skewX(-1.6deg) translate3d(${dx}px, 0, 0)`;
      titleBase.style.opacity = (0.85 + Math.random() * 0.15).toString();

      setTimeout(() => {
        titleBase.style.transform = "";
        titleBase.style.opacity = "";
      }, 60 + Math.random() * 80);

      // Next glitch in 3–8 seconds
      setTimeout(triggerMicroGlitch, 3000 + Math.random() * 5000);
    }

    // Start after initial load
    setTimeout(triggerMicroGlitch, 2000);
  }

  /* ── Hide scroll hint on scroll ────────────────────────── */
  const scrollHint = document.querySelector(".hero__scroll-hint");
  if (scrollHint) {
    let hidden = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!hidden && window.scrollY > 80) {
          scrollHint.style.opacity = "0";
          scrollHint.style.transition = "opacity 0.5s ease";
          hidden = true;
        }
      },
      { passive: true }
    );
  }
})();

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
          const depth = (i + 1) * 8;
          orb.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
        });

        ticking = false;
      });
    });
  }

  /* ── Micro-glitch on title — irregular, organic ────────── */
  const titlePrimary = document.querySelector(".hero__primary");
  if (titlePrimary) {
    function triggerMicroGlitch() {
      const dx = (Math.random() - 0.5) * 3;
      const dy = (Math.random() - 0.5) * 1.5;
      titlePrimary.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      titlePrimary.style.opacity = (0.82 + Math.random() * 0.18).toString();

      setTimeout(() => {
        titlePrimary.style.transform = "";
        titlePrimary.style.opacity = "";
      }, 50 + Math.random() * 70);

      setTimeout(triggerMicroGlitch, 4000 + Math.random() * 6000);
    }

    setTimeout(triggerMicroGlitch, 2500);
  }

  /* ── Scar intensity pulse on mouse proximity ───────────── */
  const scars = document.querySelectorAll(".hero__scar");
  if (scars.length && hero && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const y = (e.clientY - rect.top) / rect.height;
      // Brighten scars when mouse is near center of title
      const proximity = 1 - Math.abs(y - 0.45) * 2.5;
      const intensity = Math.max(0.3, Math.min(1, proximity));
      scars.forEach((scar) => {
        scar.style.opacity = intensity.toString();
      });
    });
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

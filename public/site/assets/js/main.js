/* Rudra Graphics Pune — main.js */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // Page loader
  window.addEventListener("load", () => {
    const l = $(".loader");
    if (l) setTimeout(() => l.classList.add("hidden"), 300);
    if (window.AOS) AOS.init({ duration: 800, once: true, offset: 80, easing: "ease-out-cubic" });
  });

  // Navbar scrolled state + back-to-top
  const nav = $(".nav");
  const top = $(".fab-top");
  const onScroll = () => {
    if (window.scrollY > 30) nav?.classList.add("scrolled"); else nav?.classList.remove("scrolled");
    if (window.scrollY > 500) top?.classList.add("show"); else top?.classList.remove("show");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const burger = $(".hamburger");
  const links = $(".nav-links");
  burger?.addEventListener("click", () => links?.classList.toggle("open"));
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => links?.classList.remove("open")));

  // Back to top
  top?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Portfolio filter
  const filters = $$(".pf-filter");
  filters.forEach(f => f.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("active"));
    f.classList.add("active");
    const cat = f.dataset.filter;
    $$(".pf-item").forEach(item => {
      const show = cat === "all" || item.dataset.cat === cat;
      item.style.display = show ? "" : "none";
    });
  }));

  // FAQ
  $$(".faq-item").forEach(item => {
    item.querySelector(".faq-q")?.addEventListener("click", () => item.classList.toggle("open"));
  });

  // Lightbox
  const lb = $(".lightbox");
  if (lb) {
    const img = lb.querySelector("img");
    $$("[data-lightbox]").forEach(el => el.addEventListener("click", () => {
      img.src = el.src || el.dataset.lightbox;
      lb.classList.add("open");
    }));
    lb.addEventListener("click", () => lb.classList.remove("open"));
  }

  // Counter animation
  const counters = $$("[data-count]");
  if (counters.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const dur = 1600;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => obs.observe(c));
  }

  // Testimonial swiper
  if (window.Swiper && $(".testi-swiper")) {
    new Swiper(".testi-swiper", {
      slidesPerView: 1, spaceBetween: 24, loop: true, autoplay: { delay: 5000 },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
    });
  }

  // GSAP gentle hero parallax
  if (window.gsap) {
    gsap.utils.toArray(".float-card").forEach((el, i) => {
      gsap.from(el, { y: 30, opacity: 0, duration: 1, delay: 0.4 + i * 0.15, ease: "power3.out" });
    });
    gsap.from(".hero h1, .hero .lead, .hero-cta, .hero .stats", {
      y: 26, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out"
    });
  }

  // Contact form -> WhatsApp
  const form = $("#contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const text = `New Inquiry from Website%0A%0AName: ${d.get("name")}%0APhone: ${d.get("phone")}%0AEmail: ${d.get("email")}%0AService: ${d.get("service")}%0AMessage: ${d.get("message")}`;
    window.open(`https://wa.me/919527839464?text=${text}`, "_blank");
  });

  // Newsletter (demo)
  const nl = $("#newsletter");
  nl?.addEventListener("submit", (e) => { e.preventDefault(); nl.querySelector("button").textContent = "Subscribed ✓"; });
})();
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const requestForm = document.querySelector("[data-request-form]");
const revealItems = document.querySelectorAll(".section-head, .service-card, .map-panel, .contact-copy, .request-form");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(requestForm);
    const subject = "Anfrage über die Website";
    const body = [
      "Hallo Herr Beuth,",
      "",
      "ich möchte eine Anfrage stellen.",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Kontakt: ${formData.get("contact") || ""}`,
      `Ort: ${formData.get("location") || ""}`,
      `Leistung: ${formData.get("service") || ""}`,
      "",
      "Nachricht:",
      formData.get("message") || "",
      "",
      "Viele Grüße"
    ].join("\n");

    window.location.href = `mailto:BeuthHeimatWerk@gmx.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

if (revealItems.length) {
  revealItems.forEach((item) => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
}

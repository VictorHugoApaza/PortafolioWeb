document.addEventListener("DOMContentLoaded", () => {
  // 1. Selección de elementos del DOM
  const sections = document.querySelectorAll(".section");
  const dockItems = document.querySelectorAll(".dock-item");
  const tabBtns = document.querySelectorAll(".tab-btn");

  // 2. NAVEGACIÓN SUAVE AL HACER CLIC EN EL MENÚ (Móvil y Escritorio)
  // Al tocar o hacer clic en cualquier icono del dock, la página se desplaza suavemente a esa sección.
  dockItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // 3. DETECTOR DE SCROLL (IntersectionObserver)
  // Cambia automáticamente la clase 'active' al menú inferior cuando el usuario se desplaza por la pantalla.
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Configurado para responder rápido en pantallas de teléfono
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        dockItems.forEach((item) => {
          if (item.getAttribute("data-section") === id) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  // Activa la observación en cada sección (<section>) de la página
  sections.forEach((section) => {
    observer.observe(section);
  });

  // 4. CAMBIO DE PESTAÑAS EN LA SECCIÓN DE PROYECTOS (ALL, WEB, CLI)
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});

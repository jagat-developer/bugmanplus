const menuButton = document.querySelector("[data-menu-button]");
const primaryNav = document.querySelector("[data-primary-nav]");

if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      primaryNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-accordion]").forEach((accordion) => {
  accordion.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !accordion.contains(button)) return;

    const item = button.closest(".accordion-item");
    const panel = item.querySelector(".accordion-panel");
    const mark = button.querySelector(".accordion-mark");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    panel.hidden = isExpanded;
    if (mark) mark.textContent = isExpanded ? "+" : "-";
  });
});

const revealItems = document.querySelectorAll(".reveal");
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
    { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-quote-form]").forEach((form) => {
  const note = form.querySelector("[data-form-note]");
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  const locationName = params.get("location");
  const serviceSelect = form.querySelector("select[name='service']");
  const locationSelect = form.querySelector("select[name='location']");

  if (service && serviceSelect) {
    serviceSelect.value = service;
  }

  if (locationName && locationSelect) {
    locationSelect.value = locationName;
  }

  form.addEventListener("submit", () => {
    if (note) {
      note.textContent = "Thanks. Your email client should open with the request details.";
    }
  });
});

const discountModal = document.querySelector("[data-discount-modal]");
const discountForm = document.querySelector("[data-discount-form]");
const discountNote = document.querySelector("[data-discount-note]");
const discountStorageKey = "bugmanDiscountOfferDismissed";

const discountStorage = {
  get() {
    const cookieMatch = () => document.cookie.match(new RegExp(`${discountStorageKey}=true`))?.[0];
    try {
      return window.localStorage.getItem(discountStorageKey) || cookieMatch();
    } catch {
      return cookieMatch() || null;
    }
  },
  set() {
    try {
      window.localStorage.setItem(discountStorageKey, "true");
    } catch {
      // Ignore storage failures so the offer still works in private browsing.
    }
    document.cookie = `${discountStorageKey}=true; max-age=2592000; path=/; SameSite=Lax`;
  },
};

const closeDiscountModal = () => {
  if (!discountModal) return;
  discountModal.hidden = true;
  document.body.classList.remove("modal-open");
  discountStorage.set();
};

if (discountModal && !discountStorage.get()) {
  window.setTimeout(() => {
    discountModal.hidden = false;
    document.body.classList.add("modal-open");
  }, 1200);

  discountModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-discount-close]")) {
      closeDiscountModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !discountModal.hidden) {
      closeDiscountModal();
    }
  });
}

if (discountForm) {
  discountForm.addEventListener("submit", () => {
    discountStorage.set();
    if (discountNote) {
      discountNote.textContent = "Thanks. Your email client should open with the discount registration.";
    }
  });
}

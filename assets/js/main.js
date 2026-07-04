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
});

const discountModal = document.querySelector("[data-discount-modal]");
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

const submitLeadForm = async (form) => {
  const note = form.querySelector("[data-form-note], [data-discount-note]");
  const submitButton = form.querySelector("button[type='submit']");
  const successMessage = form.dataset.successMessage || "Thanks. Bugman Plus received your request.";
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.page = window.location.href;
  payload.pageTitle = document.title;

  if (note) {
    note.textContent = "Sending...";
    note.classList.remove("is-error");
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
  }

  try {
    const response = await fetch(form.action || "/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.ok === false) {
      throw new Error(result.message || "Submission failed.");
    }

    if (form.matches("[data-discount-form]")) {
      discountStorage.set();
    }

    form.reset();

    if (note) {
      note.textContent = successMessage;
    }
  } catch (error) {
    if (note) {
      note.textContent = "Something went wrong. Please call 905-924-2847 or try again.";
      note.classList.add("is-error");
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || "Submit";
    }
  }
};

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitLeadForm(form);
  });
});

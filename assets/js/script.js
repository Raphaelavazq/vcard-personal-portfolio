"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button (only if elements exist)
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // Handle form submission
  form.addEventListener("submit", function (e) {
    // Check if it's a formspree form (has action attribute)
    if (
      form.getAttribute("action") &&
      form.getAttribute("action").includes("formspree.io")
    ) {
      // Set the reply-to email dynamically
      const emailInput = form.querySelector('input[name="email"]');
      const replyToInput = form.querySelector('input[name="_replyto"]');
      if (emailInput && replyToInput) {
        replyToInput.value = emailInput.value;
      }

      // Update button state
      formBtn.innerHTML =
        '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
      formBtn.setAttribute("disabled", "");

      // Let the form submit normally to Formspree
      return true;
    }

    // Fallback to mailto if no form service is configured
    e.preventDefault();

    const formData = new FormData(form);
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const message = formData.get("message");

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${fullname}`);
    const body = encodeURIComponent(
      `Hello Tiago,\n\nI'm reaching out through your portfolio website.\n\n` +
        `Name: ${fullname}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}\n\n` +
        `Best regards,\n${fullname}`
    );

    const mailtoLink = `mailto:tiagopaquete@outlook.pt?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show user feedback
    formBtn.innerHTML =
      '<ion-icon name="checkmark-outline"></ion-icon><span>Email client opened!</span>';
    setTimeout(() => {
      formBtn.innerHTML =
        '<ion-icon name="paper-plane"></ion-icon><span data-lang="contact-send-button">Send Message</span>';
    }, 3000);
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Get the target page from data-lang attribute instead of innerHTML
    const targetPage = this.getAttribute("data-lang");
    let pageName = "";

    // Map navigation data-lang to page data-page values
    switch (targetPage) {
      case "nav-about":
        pageName = "about";
        break;
      case "nav-resume":
        pageName = "resume";
        break;
      case "nav-portfolio":
        pageName = "portfolio";
        break;
      case "nav-contact":
        pageName = "contact";
        break;
      default:
        // Fallback to innerHTML method for backwards compatibility
        pageName = this.innerHTML.toLowerCase();
    }

    for (let i = 0; i < pages.length; i++) {
      if (pageName === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

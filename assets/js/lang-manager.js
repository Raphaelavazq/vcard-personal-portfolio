// Language switching functionality
class LanguageManager {
  constructor() {
    this.currentLanguage = "en";
    this.languageData = null;
    this.init();
  }

  init() {
    // Check if languageData is already loaded
    if (typeof languageData !== "undefined") {
      this.languageData = languageData;
      this.setupLanguageManager();
    } else {
      // Wait for the script to load
      setTimeout(() => this.init(), 100);
    }
  }

  setupLanguageManager() {
    // Get saved language or use browser language
    this.currentLanguage = this.getSavedLanguage() || this.getBrowserLanguage();

    // Apply initial language
    this.applyLanguage(this.currentLanguage);

    // Setup language selector
    this.setupLanguageSelector();
  }

  getSavedLanguage() {
    return localStorage.getItem("portfolio-language");
  }

  getBrowserLanguage() {
    const browserLang = navigator.language.slice(0, 2);
    return this.languageData?.content[browserLang] ? browserLang : "en";
  }

  saveLanguage(lang) {
    localStorage.setItem("portfolio-language", lang);
  }

  setupLanguageSelector() {
    // Create language selector if it doesn't exist
    let langSelector = document.querySelector("[data-lang-selector]");
    if (!langSelector) {
      this.createLanguageSelector();
      langSelector = document.querySelector("[data-lang-selector]");
    }

    // Setup event listeners
    const langButtons = langSelector.querySelectorAll("[data-lang-btn]");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const lang = e.target.dataset.langBtn;
        this.switchLanguage(lang);
      });
    });

    // Update active state
    this.updateLanguageSelectorState();
  }

  createLanguageSelector() {
    const navbar = document.querySelector(".navbar-list");
    const langSelectorHtml = `
      <li class="navbar-item lang-selector" data-lang-selector>
        <button class="navbar-link lang-btn" data-lang-btn="en" title="English">EN</button>
        <span class="lang-divider">|</span>
        <button class="navbar-link lang-btn" data-lang-btn="de" title="Deutsch">DE</button>
      </li>
    `;
    navbar.insertAdjacentHTML("beforeend", langSelectorHtml);
  }

  updateLanguageSelectorState() {
    const langButtons = document.querySelectorAll("[data-lang-btn]");
    langButtons.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.langBtn === this.currentLanguage
      );
    });
  }

  switchLanguage(lang) {
    if (this.languageData?.content[lang]) {
      this.currentLanguage = lang;
      this.saveLanguage(lang);
      this.applyLanguage(lang);
      this.updateLanguageSelectorState();
    }
  }

  applyLanguage(lang) {
    if (!this.languageData?.content[lang]) return;

    const content = this.languageData.content[lang];

    // Update document language and title
    document.documentElement.lang = content.meta.lang;
    document.title = content.meta.title;

    // Update sidebar content
    this.updateElement('[data-lang="name"]', content.sidebar.name);
    this.updateElement('[data-lang="title"]', content.sidebar.title);
    this.updateElement(
      '[data-lang="show-contacts"]',
      content.sidebar.showContacts
    );

    // Update contact information
    this.updateElement(
      '[data-lang="contact-email-title"]',
      content.sidebar.contacts.email.title
    );
    this.updateElement(
      '[data-lang="contact-email-value"]',
      content.sidebar.contacts.email.value
    );
    this.updateElement(
      '[data-lang="contact-phone-title"]',
      content.sidebar.contacts.phone.title
    );
    this.updateElement(
      '[data-lang="contact-phone-value"]',
      content.sidebar.contacts.phone.value
    );
    this.updateElement(
      '[data-lang="contact-birthday-title"]',
      content.sidebar.contacts.birthday.title
    );
    this.updateElement(
      '[data-lang="contact-birthday-value"]',
      content.sidebar.contacts.birthday.value
    );
    this.updateElement(
      '[data-lang="contact-location-title"]',
      content.sidebar.contacts.location.title
    );
    this.updateElement(
      '[data-lang="contact-location-value"]',
      content.sidebar.contacts.location.value
    );
    this.updateElement(
      '[data-lang="contact-github-title"]',
      content.sidebar.contacts.github.title
    );
    this.updateElement(
      '[data-lang="contact-github-value"]',
      content.sidebar.contacts.github.value
    );
    this.updateElement(
      '[data-lang="contact-linkedin-title"]',
      content.sidebar.contacts.linkedin.title
    );
    this.updateElement(
      '[data-lang="contact-linkedin-value"]',
      content.sidebar.contacts.linkedin.value
    );

    // Update navigation
    Object.keys(content.navigation).forEach((key) => {
      this.updateElement(`[data-lang="nav-${key}"]`, content.navigation[key]);
    });

    // Update about section
    this.updateElement('[data-lang="about-title"]', content.about.title);
    content.about.description.forEach((desc, index) => {
      this.updateElement(`[data-lang="about-description-${index + 1}"]`, desc);
    });

    this.updateElement(
      '[data-lang="services-title"]',
      content.about.services.title
    );
    content.about.services.items.forEach((service, index) => {
      this.updateElement(
        `[data-lang="service-title-${index + 1}"]`,
        service.title
      );
      this.updateElement(
        `[data-lang="service-description-${index + 1}"]`,
        service.description
      );
    });

    // Update resume section
    this.updateElement('[data-lang="resume-title"]', content.resume.title);
    this.updateElement(
      '[data-lang="education-title"]',
      content.resume.education.title
    );
    this.updateElement(
      '[data-lang="experience-title"]',
      content.resume.experience.title
    );
    this.updateElement(
      '[data-lang="skills-title"]',
      content.resume.skills.title
    );

    // Update education items
    content.resume.education.items.forEach((item, index) => {
      this.updateElement(
        `[data-lang="education-title-${index + 1}"]`,
        item.title
      );
      this.updateElement(
        `[data-lang="education-period-${index + 1}"]`,
        item.period
      );
      this.updateElement(
        `[data-lang="education-description-${index + 1}"]`,
        item.description
      );
    });

    // Update experience items
    content.resume.experience.items.forEach((item, index) => {
      this.updateElement(
        `[data-lang="experience-title-${index + 1}"]`,
        item.title
      );
      this.updateElement(
        `[data-lang="experience-period-${index + 1}"]`,
        item.period
      );
      this.updateElement(
        `[data-lang="experience-description-${index + 1}"]`,
        item.description
      );
    });

    // Update skills
    content.resume.skills.items.forEach((skill, index) => {
      this.updateElement(`[data-lang="skill-name-${index + 1}"]`, skill.name);
    });

    // Update contact section
    this.updateElement('[data-lang="contact-title"]', content.contact.title);
    this.updateElement(
      '[data-lang="contact-form-title"]',
      content.contact.formTitle
    );
    this.updateElement(
      '[data-lang="contact-form-description"]',
      content.contact.formDescription
    );
    this.updateElement(
      '[data-lang="contact-send-button"]',
      content.contact.sendButton
    );
    this.updateElement(
      '[data-lang="contact-direct-title"]',
      content.contact.directTitle
    );
    this.updateElement(
      '[data-lang="contact-success-title"]',
      content.contact.successTitle
    );
    this.updateElement(
      '[data-lang="contact-success-message"]',
      content.contact.successMessage
    );

    // Update form placeholders
    const nameInput = document.querySelector(
      '[data-lang-placeholder="contact-name-placeholder"]'
    );
    const emailInput = document.querySelector(
      '[data-lang-placeholder="contact-email-placeholder"]'
    );
    const messageInput = document.querySelector(
      '[data-lang-placeholder="contact-message-placeholder"]'
    );

    if (nameInput) nameInput.placeholder = content.contact.namePlaceholder;
    if (emailInput) emailInput.placeholder = content.contact.emailPlaceholder;
    if (messageInput)
      messageInput.placeholder = content.contact.messagePlaceholder;
  }

  updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
      // Check if element is an anchor and needs href updates
      if (element.tagName === "A" && selector.includes("value")) {
        if (selector.includes("email")) {
          element.href = `mailto:${content}`;
        } else if (selector.includes("phone")) {
          element.href = `tel:${content.replace(/\D/g, "")}`;
        }
      }
      // Use innerHTML for title to allow HTML tags like <br>
      if (selector.includes("title") && content.includes("<br>")) {
        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    }
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LanguageManager();
});

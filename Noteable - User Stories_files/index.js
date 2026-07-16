"use strict";

// This toggles the hamburger menu
function hamburgerToggle() {
  console.log("hamburger toggle called");
  const navMenu = document.getElementById("navigation");
  const hamburgerButton = document.getElementById("hamburgerButton");
  const contactDropdown = document.getElementById("contactDropdown");
  const currentState = hamburgerButton.getAttribute("data-state");

  if (
    navMenu !== null &&
    typeof navMenu !== "undefined" &&
    contactDropdown !== null &&
    typeof contactDropdown !== "undefined"
  ) {
    console.log("hamburger toggle - navMenu and contactDropdown found");
    if (!currentState || currentState === "closed") {
      console.log("hamburger toggle - current state is closed, opening menu");
      navMenu.classList.add("responsive");
      navMenu.setAttribute("aria-expanded", "true");
      hamburgerButton.setAttribute("data-state", "opened");
      hamburgerButton.setAttribute("aria-expanded", "true");
      contactDropdown.setAttribute("aria-expanded", "true");
    } else {
      console.log("hamburger toggle - current state is opened, closing menu");
      navMenu.classList.remove("responsive");
      navMenu.setAttribute("aria-expanded", "false");
      hamburgerButton.className = "icon";
      hamburgerButton.setAttribute("data-state", "closed");
      hamburgerButton.setAttribute("aria-expanded", "false");
      contactDropdown.setAttribute("aria-expanded", "false");
    }
  }
}

// The contact-us sub-menu "aria-expanded" toggle
function setExpanded(expanded = "false") {
  const navMenu = document.getElementById("contactDropdown");
  if (navMenu !== null && typeof navMenu !== "undefined") {
    navMenu.setAttribute("aria-expanded", expanded);
  }
}

/* used by the menu system to identify the current page */
document
  .querySelectorAll("#navigation a")
  .forEach((currentValue, currentIndex, nodeObj) => {
    if (currentValue == location.href) {
      nodeObj[currentIndex].setAttribute("class", "current-page");
      nodeObj[currentIndex].setAttribute("aria-current", "page");
    }
  });

/* Used in the faq-templated pages, to ensure the just opened detail is visible*/
document.addEventListener("DOMContentLoaded", () => {
  const allDetails = document.querySelectorAll("details");

  allDetails.forEach((detail) => {
    detail.addEventListener("toggle", (event) => {
      if (detail.open) {
        allDetails.forEach((otherDetail) => {
          var target = detail.id;
          location.href = "#";
          location.href = "#" + target;
        });
      }
    });
  });
});

const toggle = document.querySelector(".toggle");
const toggleOverlay = document.querySelector(".toggle-overlay");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".item-overlay");
const mobileMenu = document.querySelector(".mobile-menu");

/* Event Listener */
if (toggle) {
  toggle.addEventListener("click", toggleMenu, false);
}
if (toggleOverlay) {
  toggleOverlay.addEventListener("click", toggleMenu, false);
}

/* Contact form */
const contactUsSubmit = document.querySelector("#contact-form button");
const contactUsForm = document.querySelector("#contact-form");
const contactUsErrorPlaceHolder = document.querySelector("#contact-form-error");
const contactUsSuccessPlaceHolder = document.querySelector(
  "#contact-form-success"
);
if (contactUsForm) {
  initContactUs();
}

function initContactUs() {
  contactUsForm.addEventListener("submit", async (e) => {
    if (e) {
      e.preventDefault();
    }

    contactUsSuccessPlaceHolder.setAttribute("hidden", "");
    contactUsErrorPlaceHolder.setAttribute("hidden", "");

    const body = {
      name: contactUsForm.elements.name.value,
      email: contactUsForm.elements.email.value,
      message: contactUsForm.elements.message.value,
      agreed_privacy_notice:
        contactUsForm.elements.agreed_privacy_notice.checked,
    };

    let response, enquiryResult;
    try {
      response = await fetch("/api/enquiry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: new URLSearchParams(body).toString(),
      });

      if (!response.ok) {
        enquiryResult = {
          errors: `Error connecting to server - ${response.status} - ${response.statusText}`,
        };
      } else {
        enquiryResult = await response.json();
      }
    } catch (e) {
      console.error(e);
    }

    if (enquiryResult && enquiryResult.status === "success") {
      contactUsSuccessPlaceHolder.removeAttribute("hidden");
      contactUsForm.setAttribute("hidden", "");
      return;
    }

    const errorMessage = enquiryResult
      ? enquiryResult.errors
      : "Unknown error connecting to server";
    contactUsErrorPlaceHolder.removeAttribute("hidden");
    contactUsErrorPlaceHolder.innerHTML = errorMessage;
  });
}

/* Trial signup form */
const trialSubmit = document.querySelector("#trial-form button");
const trialForm = document.querySelector("#trial-form");
const trialErrorPlaceHolder = document.querySelector("#trial-form-error");
const trialSuccessPlaceHolder = document.querySelector("#trial-form-success");
if (trialForm) {
  initTrial();
}

function initTrial() {
  trialForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    trialSuccessPlaceHolder.setAttribute("hidden", "");
    trialErrorPlaceHolder.setAttribute("hidden", "");

    const body = {
      first_name: trialForm.elements.firstName.value,
      last_name: trialForm.elements.lastName.value,
      email: trialForm.elements.email.value,
      company_name: trialForm.elements.companyName.value,
      job_title: trialForm.elements.jobTitle.value,
      country_region: trialForm.elements.countryRegion.value,
      phone_number: trialForm.elements.phoneNumber.value,
      seats: trialForm.elements.seats.value,
      acknowledgement: trialForm.elements.acknowledgement.checked,
      terms_agreement: trialForm.elements.terms_agreement.checked,
    };

    let response, trialResult;
    try {
      response = await fetch("/api/trial/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: new URLSearchParams(body).toString(),
      });

      if (!response.ok) {
        trialResult = {
          errors: `Error connecting to server - ${response.status} - ${response.statusText}`,
        };
      } else {
        trialResult = await response.json();
      }
    } catch (e) {
      console.error(e);
    }

    if (trialResult && trialResult.status === "success") {
      trialSuccessPlaceHolder.removeAttribute("hidden");
      trialForm.setAttribute("hidden", "");
      return;
    }

    const errorMessage = trialResult
      ? trialResult.errors
      : "Unknown error connecting to server";
    trialErrorPlaceHolder.removeAttribute("hidden");
    trialErrorPlaceHolder.innerHTML = errorMessage;
  });
}

/* report a probelm form */
const reportAProblemSubmit = document.querySelector(
  "#report-a-problem-form button"
);
const reportAProblemForm = document.querySelector("#report-a-problem-form");
const reportAProblemErrorPlaceHolder = document.querySelector(
  "#report-a-problem-form-error"
);
const reportAProblemSuccessPlaceHolder = document.querySelector(
  "#report-a-problem-form-success"
);
if (reportAProblemForm) {
  initReportAProblem();
}

function initReportAProblem() {
  reportAProblemForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    reportAProblemSuccessPlaceHolder.setAttribute("hidden", "");
    reportAProblemErrorPlaceHolder.setAttribute("hidden", "");

    const body = {
      name: reportAProblemForm.elements.name.value,
      email: reportAProblemForm.elements.email.value,
      message: reportAProblemForm.elements.message.value,
      agreed_privacy_notice:
        reportAProblemForm.elements.agreed_privacy_notice.checked,
    };

    let response, enquiryResult;
    try {
      response = await fetch("/api/reportaproblem/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: new URLSearchParams(body).toString(),
      });

      if (!response.ok) {
        enquiryResult = {
          errors: `Error connecting to server - ${response.status} - ${response.statusText}`,
        };
      } else {
        enquiryResult = await response.json();
      }
    } catch (e) {
      console.error(e);
    }

    if (enquiryResult && enquiryResult.status === "success") {
      reportAProblemSuccessPlaceHolder.removeAttribute("hidden");
      reportAProblemForm.setAttribute("hidden", "");
      return;
    }

    const errorMessage = enquiryResult
      ? enquiryResult.errors
      : "Unknown error connecting to server";
    reportAProblemErrorPlaceHolder.removeAttribute("hidden");
    reportAProblemErrorPlaceHolder.innerHTML = errorMessage;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var usernameError = true,
    emailError = true,
    passwordError = true;

  // Label effect
  document.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("focus", function () {
      this.parentNode.querySelector(".c-form__label").classList.add("active");
    });

    input.addEventListener("blur", function () {
      this.parentNode
        .querySelector(".c-form__label")
        .classList.remove("active");
    });
  });

  // Form validation
  document.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("blur", function () {
      // User Name
      if (this.id === "username") {
        if (this.value.length === 0) {
          showError(this, "Please type your full name");
          usernameError = true;
        } else if (this.value.length > 1 && this.value.length <= 6) {
          showError(this, "Please type at least 6 characters");
          usernameError = true;
        } else {
          hideError(this);
          usernameError = false;
        }
      }

      // Email
      if (this.id === "femail") {
        if (this.value.length === 0 || !isValidEmail(this.value)) {
          showError(this, "Please enter a valid email address");
          emailError = true;
        } else {
          hideError(this);
          emailError = false;
        }
      }

      // Password
      if (this.id === "fpass") {
        if (this.value.length < 8) {
          showError(this, "Please type at least 8 characters");
          passwordError = true;
        } else {
          hideError(this);
          passwordError = false;
        }
      }
    });
  });

  // Form submit
  document
    .querySelector("form.c-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      if (usernameError || emailError || passwordError) {
        document
          .querySelectorAll("#username, #femail, #fpass")
          .forEach(function (input) {
            input.blur();
          });
      } else {
        alert("Form submitted successfully!"); // Replace this with your form submission logic
      }
    });

  function showError(element, message) {
    var errorSpan = element.parentNode.querySelector(".c-form__groupLabel");
    errorSpan.textContent = message;
    errorSpan.style.color = "#f95959";
    element.parentNode.classList.add("hasError");
  }

  function hideError(element) {
    var errorSpan = element.parentNode.querySelector(".c-form__groupLabel");
    errorSpan.textContent = element.getAttribute("placeholder");
    errorSpan.style.color = "#bbb";
    element.parentNode.classList.remove("hasError");
  }

  function isValidEmail(email) {
    var emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
    return emailRegex.test(email);
  }
});

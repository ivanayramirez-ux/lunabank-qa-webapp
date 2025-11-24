const form = document.getElementById("reset-form");
const banner = document.getElementById("reset-banner");
const emailInput = document.getElementById("reset-email");
const emailError = document.getElementById("reset-email-error");

function isValidEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  banner.textContent = "";
  banner.className = "auth-banner";
  emailError.textContent = "";
  emailInput.classList.remove("input-error");

  const email = emailInput.value.trim();

  if (!email) {
    emailError.textContent = "Email is required.";
    emailInput.classList.add("input-error");
    return;
  }

  if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid email address.";
    emailInput.classList.add("input-error");
    return;
  }

  banner.textContent =
    "If an account exists for this email, we’ve sent a reset link.";
  banner.classList.add("auth-banner-success");
});

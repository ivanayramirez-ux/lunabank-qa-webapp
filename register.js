// Grab elements
const form = document.getElementById('register-form');
const banner = document.getElementById('register-banner');

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const confirmEmail = document.getElementById('confirm-email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const termsCheckbox = document.getElementById('terms-checkbox');

const firstError = document.getElementById('first-error');
const lastError = document.getElementById('last-error');
const emailError = document.getElementById('email-error');
const confirmEmailError = document.getElementById('confirm-email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const termsError = document.getElementById('terms-error');

function setError(inputEl, errorEl, message) {
  if (!errorEl) return;
  errorEl.textContent = message || '';
  if (message) {
    inputEl && inputEl.classList.add('input-error');
  } else {
    inputEl && inputEl.classList.remove('input-error');
  }
}

function clearAllErrors() {
  [firstError, lastError, emailError, confirmEmailError, passwordError, confirmPasswordError, termsError]
    .forEach(e => e && (e.textContent = ''));

  [firstName, lastName, email, confirmEmail, password, confirmPassword]
    .forEach(i => i && i.classList.remove('input-error'));

  termsError.textContent = '';
}

function clearBanner() {
  banner.textContent = '';
  banner.classList.remove('auth-banner-error', 'auth-banner-success');
}

function isValidEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function isStrongPassword(value) {

  return /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(value);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  clearBanner();
  clearAllErrors();

  let hasError = false;

  const first = firstName.value.trim();
  const last = lastName.value.trim();
  const mail = email.value.trim();
  const mail2 = confirmEmail.value.trim();
  const pass = password.value;
  const pass2 = confirmPassword.value;
  const termsChecked = termsCheckbox.checked;


  if (!first) {
    setError(firstName, firstError, 'First name is required.');
    hasError = true;
  }

  if (!last) {
    setError(lastName, lastError, 'Last name is required.');
    hasError = true;
  }

  if (!mail) {
    setError(email, emailError, 'Email is required.');
    hasError = true;
  } else if (!isValidEmail(mail)) {
    setError(email, emailError, 'Enter a valid email address.');
    hasError = true;
  }

  if (!mail2) {
    setError(confirmEmail, confirmEmailError, 'Please confirm your email.');
    hasError = true;
  } else if (mail2 !== mail) {
    setError(confirmEmail, confirmEmailError, 'Emails do not match.');
    hasError = true;
  }

  if (!pass) {
    setError(password, passwordError, 'Password is required.');
    hasError = true;
  } else if (!isStrongPassword(pass)) {
    setError(
      password,
      passwordError,
      'Password must be at least 8 characters and include 1 number, 1 uppercase, and 1 special character.'
    );
    hasError = true;
  }

  if (!pass2) {
    setError(confirmPassword, confirmPasswordError, 'Please confirm your password.');
    hasError = true;
  } else if (pass2 !== pass) {
    setError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
    hasError = true;
  }

  if (!termsChecked) {
    termsError.textContent = 'You must accept the Terms & Conditions.';
    hasError = true;
  }

  if (hasError) {
    banner.textContent = 'Please fix the highlighted fields and try again.';
    banner.classList.add('auth-banner-error');
    return;
  }


  banner.textContent = 'Account created successfully. You can now sign in.';
  banner.classList.add('auth-banner-success');

  window.scrollTo({ top: 0, behavior: 'smooth' });


  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2500);
});

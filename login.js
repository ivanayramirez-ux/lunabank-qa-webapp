// login.js

const VALID_EMAIL = 'test@lunabank.com';
const VALID_PASSWORD = 'EasyPass123';
const LOCKED_EMAIL = 'locked@lunabank.com';

const loginForm = document.getElementById('login-form');
const banner = document.getElementById('login-banner');

const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');
const emailError = document.getElementById('login-email-error');
const passwordError = document.getElementById('login-password-error');

function setFieldError(el, errorEl, msg) {
  if (!el || !errorEl) return;
  if (msg) {
    el.classList.add('input-error');
    errorEl.textContent = msg;
  } else {
    el.classList.remove('input-error');
    errorEl.textContent = '';
  }
}

function isValidEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // reset banner
  banner.textContent = '';
  banner.className = 'auth-banner';

  let hasError = false;
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Email validation
  if (!email) {
    setFieldError(emailInput, emailError, 'Email is required.');
    hasError = true;
  } else if (!isValidEmail(email)) {
    setFieldError(emailInput, emailError, 'Enter a valid email address.');
    hasError = true;
  } else {
    setFieldError(emailInput, emailError, '');
  }

  // Password validation
  if (!password) {
    setFieldError(passwordInput, passwordError, 'Password is required.');
    hasError = true;
  } else {
    setFieldError(passwordInput, passwordError, '');
  }

  if (hasError) return;

  // Locked account
  if (email === LOCKED_EMAIL) {
    banner.textContent = 'Your account is locked. Please contact LunaBank support.';
    banner.classList.add('auth-banner-error');
    return;
  }

  // ✅ Success: redirect to dashboard
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    banner.textContent = 'Login successful – redirecting to your dashboard...';
    banner.classList.add('auth-banner-success');

    // small delay so user sees the green message
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 800);

  } else {
    // Wrong creds
    banner.textContent = 'Incorrect email or password.';
    banner.classList.add('auth-banner-error');
  }
});

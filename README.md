# LunaBank QA Webapp

LunaBank is a small front-end banking app built specifically for QA automation practice.  
It simulates a simple online banking experience with login, registration, account dashboard, and transfer flows that can be tested end-to-end using tools like Selenium, Playwright, Cypress, or any other UI automation stack.

Ongoing Project

https://ivanayramirez-ux.github.io/lunabank-qa-webapp/

---

## 🎯 Purpose

This project is not a real banking app.  
It’s a controlled, front-end only playground where I can:

- Design realistic user journeys (login, forgot password, transfer funds).
- Practice writing UI automation tests and page objects.
- Build end-to-end regression scenarios for a “banking” domain.
- Show recruiters and teams that I can build both the app under test and the automation around it.

---

## 🧩 Features

### Authentication flows

- **Register**  
  - Form validation for required fields.  
  - Email + confirm email match check.  
  - Strong password rules (length, uppercase, number, special character).  
  - Terms & Conditions checkbox.  
  - Success banner with redirect to Login.

- **Login**  
  - Uses demo credentials:
    - Email: `test@lunabank.com`
    - Password: `EasyPass123`
  - Locked-account demo:
    - Email: `locked@lunabank.com`
    - Any password → error banner.
  - Inline validation + error banner:
    - “Incorrect email or password.”

- **Forgot Password**  
  - Email validation for format.  
  - If email is valid → green banner:
    - “If an account exists for this email, we’ve sent a reset link.”

### Dashboard (`dashboard.html`)

- Greeting banner: **“Welcome back, Moon”**.
- Account table powered by a small data store (`accounts-store.js`):
  - **Everyday Checking** – Checking – `$2,430.11` – Active  
  - **High-Yield Savings** – Savings – `$15,723.54` – Active  
  - **Travel Card** – Credit Card – `-$324.76` – Active
- **Filter by type** dropdown:
  - All / Checking / Savings / Credit.
- **Transfer funds** button → navigates to `transfer.html`.
- **Log out** button:
  - Clears local storage and returns to `login.html`.

### Transfer Funds (`transfer.html`)

- Fields:
  - **From account** (Checking / Savings / Credit Card).
  - **To account** (same options, must be different from From).
  - **Amount** (required, positive number).
- Validation:
  - From / To must be selected.
  - From and To cannot be the same.
  - Amount must be a valid positive number.
  - Insufficient funds check for non-credit accounts.
- On success:
  - Updates balances in `localStorage` via `accounts-store.js`.
  - Shows green banner:
    > “Transfer scheduled successfully. Transfer ID: TX-######”
- Transfer effects appear back on the **Dashboard** balances.

---

## 🛠 Tech Stack

- **HTML5** – structure and pages
- **CSS3** – custom styling (no framework)
- **Vanilla JavaScript** – form validation, state, and simple “session” logic
- **`localStorage`** – stores account balances and reflects transfers

No backend, no build step – this is a purely static app.

---

## 📁 Project Structure

```text
lunabank/
├── index.html            # Simple landing/home (optional entry point)
├── login.html            # Sign in page
├── register.html         # Create account page
├── forgot-password.html  # Forgot password flow
├── dashboard.html        # Account overview + logout + filter
├── transfer.html         # Transfer form and validation
├── styles.css            # Shared styling for all pages
├── accounts-store.js     # LocalStorage-backed "account" data store
├── dashboard.js          # Renders accounts + filtering on dashboard
├── login.js              # Login validation and redirect to dashboard
├── register.js           # Registration validation + success banner
├── forgot-password.js    # Forgot password validation + banner
└── transfer.js           # Transfer validation + updates balances

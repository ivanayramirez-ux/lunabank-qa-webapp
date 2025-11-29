# LunaBank QA Webapp

LunaBank is a small, mobile-friendly web app I built for a realistic place to practice UI automation and functional testing. It’s a fake digital banking site, but the layout and flows are similar to what you’d see at an actual bank login, dashboard, profile management, security settings, transactions, statements, etc.

There are also a couple of tiny references to one of my favorite novels, Project Hail Mary.

Happy Testing!

https://ivanayramirez-ux.github.io/lunabank-qa-webapp/

---

## 🎯 Purpose

What you can practice do with Lunabank:

-UI automation (Selenium / Playwright / Cypress)

-Form validation and state handling

-Responsive/mobile testing

-Negative test cases

-Table interaction, filters, and modals

-Accessibility checks

-File downloads

-Basic session-based state (localStorage)

Everything is front-end only, no real backend involved.

---

## 🧩 Features

## Authentication
- Login
- Register
- Forgot password (mock)

## Dashboard
- Account summaries
- Quick links
- Transfer funds entry
- Investment card with modal
- Filterable accounts table

## Profile
- Editable contact information
- Save/cancel behavior
- Notification preferences
- Recent devices list
- Security status indicators

## Security
- MFA and biometric toggles
- Login alert options (radio buttons)
- Trusted device count
- “Save changes” button that only enables when something is modified

## Transactions
- Dynamic list of recent activity
- Negative/positive/neutral amounts
- Useful for locator testing

## Statements
- Includes a downloadable sample PDF
- Good for file download automation cases

Everything is designed to be testable, including a few elements that are intentionally a bit harder to locate.

## Tech used
- HTML / CSS
- Vanilla JavaScript
- `localStorage` for temporary state
- Fully responsive layout
- Optional mock API (JSON Server) for separate API testing

---

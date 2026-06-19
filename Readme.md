# Playwright Automation Framework — 'The Internet' Login Testing Suite

This repository contains a modular, data-driven automated testing framework built with **Playwright (TypeScript)** targeting the authentication system of the classic Heroku web app, *The Internet*.

The framework implements the **Page Object Model (POM)** pattern to maximize script reusability, achieve clean structural isolation, and ease maintenance.

---

## 📋 Requirements & Test Coverage

The suite implements a robust testing scope consisting of **11 edge-case scenarios** to comprehensively assess the application's authentication flow and input validation logic.

### Covered Test Cases
* **Happy Path:** Successful login with valid admin credentials.
* **Input Validation & Variations:** 
  * Invalid admin username with valid password.
  * Valid username with invalid password.
  * Missing username field.
  * Missing password field.
  * Completely blank credentials submission.
  * Leading and trailing spaces within the input fields.
  * Incorrect case casing (uppercase) for sensitive input values.
* **Security & Injection Boundaries:**
  * Basic SQL Injection (`admin' OR '1'='1`) validation checks.
  * Cross-Site Scripting (XSS) payload script injection handling.
* **Account State (Skipped):** Locked-out user scenario validation.

---

## ⚙️ Project Architecture

The architecture maintains a strict separation of concerns across test configurations, raw page objects, static data pools, and execution logic.

* `pages/LoginPage.ts` — Houses element locators (`#username`, `#password`, `.radius`, `#flash`) and structural page interactions (`gotoLoginPage`, `fillLoginForm`).
* `test-data/LoginData.json` — A centralized data pool defining parameters, flags, and expected messaging configurations for every test variant.
* `tests/login.spec.ts` — Core execution file that dynamically loops over the JSON dataset to process scenarios asynchronously.

---

## 🛠️ Installation & Execution

### Prerequisites
Ensure that [Node.js](https://nodejs.org/) is installed on your local environment before proceeding.

### Setup Instructions
1. Clone the project repository and navigate into the folder directory.
2. Install the necessary node dependencies:
```bash
   npm install
```

1. Install required browser binaries via Playwright:

```
   npx playwright install
```

* **Running the Test Suite**

Execute the login test suite selectively across targeted test profiles:
```
* Run all active tests in headless mode (Chromium project)

npx playwright test tests/login.spec.ts --project=chromium

*Run tests sequentially with visual UI browser visibility (Headed mode)

npx playwright test tests/login.spec.ts --project=chromium --headed

* Run with a single worker thread to bypass aggressive server rate-limiting

npx playwright test tests/login.spec.ts --project=chromium --workers=1
```

---
# 🔍 Defects Found / Test Artifact Insights
During framework execution, 10 out of 11 tests completed their operational cycle based on application constraints. 1 test failed, uncovering a structural validation defect within the web application.

* **🐛 BUG-001: Incorrect Validation Message for Blank Login Credentials**
* **ID:** BUG-001

* **Test Case:** Login Data-Driven Tests › scenario - Login with blank credentials

* **Severity**: Medium

* **Status:** Open

* **Description**

When a user submits the login form without filling out either the username or password fields, the backend fails to apply standard mandatory-field constraints. Instead of throwing a combined error, it outputs a default string.

* **Test Execution Artifact**
```
Plaintext
Error: expect(locator).toContainText(expected) failed

Locator: locator('#flash')
- Expected substring: "Username and password are required!"
+ Received string:    "Your username is invalid!"
```

* **Step-by-Step Breakdown**

1. Navigate to https://the-internet.herokuapp.com/login.

2. Leave both input fields completely blank.

3. Click the .radius submission action button.

* **Actual vs Expected Results**
* **Expected Behavior:**
 The user should receive a clear notification:

  "Username and password are required!" or field-specific notifications reminding them both entries are mandatory.

* **Actual Behavior:** 

The system prints out a confusing, inaccurate failure message: "Your username is invalid!".

## Impact Analysis
The warning text is highly misleading to an end-user. Because no input string was provided, telling them an entered value is "invalid" obscures the actual requirement (missing required entries) and weakens the application's overall user experience.

---
```
<ElicitationsGroup message="With the bug documented, what would you like to handle next?">

  <Elicitation label="Update the JSON to make the test pass" query="How can I adjust the expectedMessage value in my LoginData.json so that the test suite passes until the bug is fixed?"/>
  <Elicitation label="Configure Playwright to mark this test as an expected failure" query="How do I use test.fail() in Playwright to flag BUG-001 cleanly so it doesn't break our CI build?"/>
</ElicitationsGroup>
```
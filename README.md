# Assignment-1_IT3040_playwright-Automation

Playwright automation tests for Singlish → Sinhala conversion using the SwiftTranslator web UI.

This repository contains Playwright tests that validate conversion of Singlish text to Sinhala on https://www.swifttranslator.com/. Tests are located in the `tests/` directory and the test runner configuration is provided by `playwright.config.js`.

---

## Contents

- `tests/all_fun.spec.js` — Primary test suite with positive functional tests, negative/expected-failure tests, and UI checks.
- `tests/example.spec.js` — Playwright example tests (title + get started).
- `playwright.config.js` — Playwright Test configuration (reporter, projects, retries, testDir, etc.).
- `package.json` — Project metadata and devDependencies (`@playwright/test`, `@types/node`).

---

## Prerequisites

- Node.js (LTS recommended). Node 16+ should work; using Node 18+ is recommended.
- npm (comes with Node.js)
- Internet connection (tests navigate to https://www.swifttranslator.com/)

Note: The repository's `package.json` currently specifies:
- devDependencies: `@playwright/test` ^1.58.0, `@types/node` ^25.0.10

---

## Install dependencies

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/pamoX/Assignment-1_IT3040_playwright-Automation.git
cd Assignment-1_IT3040_playwright-Automation
```

2. Install Node dependencies:

```bash
npm install
```

3. Install Playwright browsers (required to run tests):

```bash
npx playwright install
```

(If you need system dependencies for browsers on Linux, you can run `npx playwright install --with-deps`.)

---

## Recommended npm scripts

You can add the following helpful scripts to `package.json` under `"scripts"` to simplify running tests:

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:report": "npx playwright show-report",
    "test:install-browsers": "npx playwright install",
    "test:debug": "npx playwright test --debug"
  }
}
```

After adding these, you can run `npm run test`, `npm run test:headed`, etc.

---

## Running tests

- Run all tests (headless):

```bash
npx playwright test
# or if you added scripts:
npm run test
```

- Run tests in headed mode (see browser UI):

```bash
npx playwright test --headed
# or
npm run test:headed
```

- Run a single test file:

```bash
npx playwright test tests/IT23423688.spec.js
```

- Run tests whose titles match a pattern (e.g., run the UI test named `Pos_UI_0001`):

```bash
npx playwright test -g "Pos_UI_0001"
# or using --grep for regex:
npx playwright test --grep "Pos_UI_0001"
```

- Run tests in a specific project (config defines `chromium`):

```bash
npx playwright test --project=chromium
```

- Run with debug mode (open inspector / step-through):

```bash
npx playwright test --debug
# or
npm run test:debug
```

---

## Viewing the HTML report

The project config uses the HTML reporter. After a test run, open the report:

```bash
npx playwright show-report
# or if you used npm scripts:
npm run test:report
```

This will open the last generated HTML report in your browser.

---

## Tests overview

- `tests/IT23423688.spec.js`
  - Uses `require('@playwright/test')` (CommonJS style).
  - Contains:
    - Positive functional tests: `positiveTests` array — each test types Singlish input and asserts the Sinhala output.
    - Negative functional tests (expected failures) — marked `test.fail()`.
    - UI test `Pos_UI_0001` that verifies clearing behavior.
  - Locator selectors used:
    - Input: `textarea[placeholder="Input Your Singlish Text Here."]`
    - Output: `div.flex-grow.bg-slate-50`
  - The test navigates to `https://www.swifttranslator.com/`.

- `tests/example.spec.js`
  - Playwright example tests (may use `import` syntax).
  - Can be used to verify Playwright environment is working.

Note: `IT23423688.spec.js` uses CommonJS (`require`) while `example.spec.js` uses `import` (ESM). See the Troubleshooting section below if you encounter module-related errors.

---

## Configuration notes

Relevant settings in `playwright.config.js`:

- `testDir: './tests'` — test files location
- `fullyParallel: true` — tests in files run in parallel
- `forbidOnly: !!process.env.CI` — fail if `test.only` left in code on CI
- `retries: process.env.CI ? 2 : 0` — retry on CI
- `workers: process.env.CI ? 1 : undefined` — limit parallelism on CI
- `reporter: 'html'`
- `trace: 'on-first-retry'` (traces are collected on first retry)

---

## Troubleshooting

- "Cannot use import statement outside a module"
  - This happens if a test file uses `import` but Node treats `.js` files as CommonJS.
  - Options:
    - Convert `tests/example.spec.js` to use CommonJS (`const { test, expect } = require('@playwright/test');`) OR
    - Change `package.json` `"type"` to `"module"` (may require other changes), OR
    - Rename files that use `import` to `.mjs`.
- Tests failing due to selectors or site changes
  - The tests rely on the live site `https://www.swifttranslator.com/`. If the site changes selectors/structure, update the selectors in `tests/IT23423688.spec.js`.
- Slow network / timeouts
  - Increase timeouts in tests (e.g., `test.setTimeout(60000)` is already used for some tests).
- Browser binaries not installed
  - Ensure `npx playwright install` completes successfully.

---

## CI considerations

- The `playwright.config.js` already adapts retries and workers when `process.env.CI` is set.
- Ensure Playwright browsers are installed in your CI job (run `npx playwright install`).
- Use `npx playwright show-report` as an artifact viewer (or publish the HTML report).

---

## Contributing

If you want to add more test cases:

1. Add new entries to `positiveTests` or `negativeTests` arrays in `tests/IT23423688.spec.js` following the existing pattern, or
2. Create new `.spec.js` files in the `tests/` directory and follow Playwright conventions.

Please keep tests deterministic and avoid hardcoded waits. Prefer locators and assertions that wait (e.g., `expect(...).toContainText(...)`).

---

## License

This project uses the ISC license as defined in `package.json`.

---

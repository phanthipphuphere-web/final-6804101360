
# Playwright Final Exam

**Student ID:** 6804101360  
**Student Name:** พรรณทิพย์ ภูพาดแร่

## System Under Test

This project uses https://www.saucedemo.com/ as the system under test.

## Test Cases

### Unit Tests
- UT-01: Login validation
- UT-02: Product button state and Cart Badge

### Integration Tests
- IT-01: Real Login and browser-level Inventory Stub
- IT-02: Driver login state, real Inventory, and Cart

### System Tests
- ST-01: Complete purchase of two products
- ST-02: Checkout validation and recovery

## Test Environment

- TypeScript
- Playwright Test
- Chromium
- Website: https://www.saucedemo.com/

## Run Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Reports

- HTML report: `playwright-report/index.html`
- JSON report: `reports/results.json`
- Test summary: `reports/test-summary.md`

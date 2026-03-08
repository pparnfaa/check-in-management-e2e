# check-in-management-e2e

E2E automation ด้วย **Playwright + Cucumber (TypeScript)** สำหรับทดสอบระบบ Check-in Management

## Prerequisites

- Node.js 18+ (แนะนำ LTS)
- npm 9+
- macOS / Linux / Windows

## Project Structure

```bash
features/
  core/                # browser manager
  pages/               # page objects (เตรียมไว้)
  step_definitions/    # cucumber steps
  support/             # hooks เช่น Before/After
cucumber.js            # cucumber runtime config
```

## Setup

1. ติดตั้ง dependencies

```bash
npm install
```

2. ติดตั้ง Playwright browser (Chromium)

```bash
npm run install-browsers
```

3. ตั้งค่า environment

สร้าง/แก้ไฟล์ `.env`:

```env
BASE_URL=http://127.0.0.1:3000/
```

> ถ้าไม่กำหนด `BASE_URL` ระบบจะ fallback เป็น `http://127.0.0.1:3000/`

## Run Tests

รันทั้งหมด:

```bash
npm test
```

รันแบบ debug output มากขึ้น:

```bash
npm run test:debug
```

## Reports

เมื่อรันเสร็จ Cucumber จะสร้าง report อัตโนมัติที่:

- `reports/cucumber-report.json`
- `reports/cucumber-report.html`

## Notes

- ต้องเปิดแอปที่ URL ตาม `BASE_URL` ก่อนรันเทส ไม่งั้นจะเจอ `ERR_CONNECTION_REFUSED`
- Hook จะเปิด browser ตอนเริ่ม scenario และปิดตอนจบ scenario
- ถ้าต้องการรันบน CI ให้ตั้ง `HEADLESS=true`

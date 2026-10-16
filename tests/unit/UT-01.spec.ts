
import { test, expect } from '@playwright/test';

test('UT-01.1: empty username and password', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบการ Login เมื่อไม่กรอก Username และ Password',
  },
}, async ({ page }) => {
  await test.step('เปิดหน้า Login', async () => {
    await page.goto('/');
  });

  await test.step('ส่งฟอร์มโดยไม่กรอกข้อมูล', async () => {
    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').fill('');
    await page.locator('[data-test="login-button"]').click();
  });

  await test.step('ตรวจสอบ Error และ URL', async () => {
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Username is required');
    await expect(page).not.toHaveURL(/inventory/);
  });
});

test('UT-01.2: missing password', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบการ Login เมื่อไม่กรอก Password',
  },
}, async ({ page }) => {
  await test.step('เปิดหน้า Login และกรอก Username', async () => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
  });

  await test.step('กด Login โดยไม่กรอก Password', async () => {
    await page.locator('[data-test="password"]').fill('');
    await page.locator('[data-test="login-button"]').click();
  });

  await test.step('ตรวจสอบ Error และ URL', async () => {
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Password is required');
    await expect(page).not.toHaveURL(/inventory/);
  });
});

test('UT-01.3: invalid login details', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบการ Login ด้วย Username และ Password ที่ไม่ถูกต้อง',
  },
}, async ({ page }) => {
  await test.step('เปิดหน้า Login และกรอกข้อมูลผิด', async () => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('wrong_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
  });

  await test.step('กด Login', async () => {
    await page.locator('[data-test="login-button"]').click();
  });

  await test.step('ตรวจสอบ Error และ URL', async () => {
    await expect(page.locator('[data-test="error"]'))
      .toContainText(
        'Username and password do not match any user in this service',
      );
    await expect(page).not.toHaveURL(/inventory/);
  });
});

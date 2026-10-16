
import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'First Name is required',
    );
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Last Name is required',
    );
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Postal Code is required',
    );
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    await page.locator('[data-test="postalCode"]').fill('50000');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
});

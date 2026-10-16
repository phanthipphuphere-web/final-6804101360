
import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบสถานะปุ่มสินค้าและ Cart Badge เมื่อเพิ่มและนำสินค้าออกจากตะกร้า',
  },
}, async ({ page }) => {
  await test.step('Login เข้าสู่ระบบ', async () => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {
    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
    ).toBeVisible();
  });

  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]'),
    ).toBeVisible();

    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toHaveText('1');
  });

  await test.step('ลบสินค้าออกจาก Cart', async () => {
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
    ).toBeVisible();

    await expect(page.locator('[data-test="shopping-cart-badge"]'))
      .toHaveCount(0);
  });
});


import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงและสร้าง Inventory Stub ด้วย page.setContent()',
  },
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory.html/);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Mock Inventory</title></head>
        <body>
          <h1>Mock Inventory Ready</h1>
          <div class="inventory_item">Mock Backpack</div>
          <div class="inventory_item">Mock Bike Light</div>
        </body>
      </html>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(
      page.getByRole('heading', { name: 'Mock Inventory Ready' }),
    ).toBeVisible();

    await expect(page.locator('.inventory_item')).toHaveCount(2);
    await expect(page.getByText('Mock Backpack')).toBeVisible();
    await expect(page.getByText('Mock Bike Light')).toBeVisible();
  });
});

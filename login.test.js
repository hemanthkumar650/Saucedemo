    const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

test.describe('Login Scenarios', () => {
  let page, loginPage, productsPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  const users = [
    { username: 'standard_user', expectedUrl: 'inventory.html', expectedError: null },
    { username: 'locked_out_user', expectedUrl: null, expectedError: 'Epic sadface: Sorry, this user has been locked out.' },
    { username: 'problem_user', expectedUrl: 'inventory.html', expectedError: null },
    { username: 'performance_glitch_user', expectedUrl: 'inventory.html', expectedError: null },
    { username: 'visual_user', expectedUrl: 'inventory.html', expectedError: null },
  ];

  for (let user of users) {
    test(`Login test for user: ${user.username}`, async () => {
      await loginPage.login(user.username, 'secret_sauce');
      
      if (user.expectedError) {
        const errorMessage = await page.locator('.error-message-container').innerText();
        expect(errorMessage).toBe(user.expectedError);
      } else {
        expect(page.url()).toContain(user.expectedUrl);
      }
    });
  }
});

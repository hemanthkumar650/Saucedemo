const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const fs = require('fs');

test.describe('Add Cart Functionality', () => {
  let page, loginPage, productsPage, cartPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test.afterAll(async () => {
    await page.close();
    if (fs.existsSync('productDetails.txt')) {
      fs.unlinkSync('productDetails.txt');
    }
  });

  test('Add product to cart and verify', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    expect(page.url()).toContain('inventory.html');

    await productsPage.getProductDetails();
    await productsPage.addFirstProductToCart();

    const productName = await productsPage.getProductName();
    const productPrice = await productsPage.getProductPrice();
    fs.writeFileSync('productDetails.txt', `Product Name: ${productName}\nProduct Price: ${productPrice}`, 'utf-8');

    await productsPage.goToCart();

    const productDetails = fs.readFileSync('productDetails.txt', 'utf-8');
    const productNameFromFile = productDetails.split('\n')[0].split(': ')[1];
    const productPriceFromFile = productDetails.split('\n')[1].split(': ')[1];

    await cartPage.verifyProductInCart(productNameFromFile, productPriceFromFile);

    await page.goto('https://www.saucedemo.com/');
    await page.waitForLoadState('load');
    expect(page.url()).toBe('https://www.saucedemo.com/');
  });
});

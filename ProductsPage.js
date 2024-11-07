class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productNameLocator = page.locator('.inventory_item_name'); 
    this.productPriceLocator = page.locator('.inventory_item_price');
    this.addToCartButton = page.locator('.btn_inventory');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async getProductName() {
    return await this.productNameLocator.first().innerText(); 
  }

  async getProductPrice() {
    return await this.productPriceLocator.first().innerText();
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click(); 
  }

  async goToCart() {
    await this.cartIcon.click(); 
  }

  async getProductDetails() {
    const name = await this.getProductName();
    const price = await this.getProductPrice();
    return { name, price };
  }
}

module.exports = ProductsPage;

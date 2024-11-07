class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItemName = page.locator('.inventory_item_name');
    }
    
    async verifyProductInCart(expectedName) {
      const cartName = await this.cartItemName.innerText();
      if (cartName !== expectedName) {
        throw new Error(`Expected product ${expectedName} not found in cart.`);
      }
    }
  }
  
  module.exports = CartPage;
  
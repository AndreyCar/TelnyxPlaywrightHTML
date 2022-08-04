const { Page } = require('./page');

class CartPage extends Page {
	CartIsEmptyLabel = 'react-my-cart .tx-Z1VR9ee';
	addSimToCartButton = 'react-my-cart div[class^="AddSIMToCartDropdown__SimDropdownContainer"]+button';
	removeFromCartButton = 'td:last-child button';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		await this.page.goto(`https://portal.telnyx.com/#/app/cart`);
		await this.page.waitForLoadState('load');
	}
}

module.exports = { CartPage };

const { Page } = require('./page');

class AccountHomePage extends Page {
	updateAccountbutton = 'react-title-bar .tx-ZupKLN+div button';
	promoInput = '[name="promocode"]';
	promoAddButton = '//input[@name="promocode"]//following::div//button';
	promoErrorMessage = '[type="error"] span';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		await this.page.goto(`https://portal.telnyx.com/#/app/home`);
		await this.page.waitForLoadState('load');
	}
}

module.exports = { AccountHomePage };

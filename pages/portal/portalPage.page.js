const { expect } = require('@playwright/test');
const { Page } = require('../page');

class PortalPage extends Page {
	profile = 'react-title-bar  [class="d-flex align-items-center tx-ZLaFj1"]';
	logOutProfileDDLButton = 'button.tx-1Iv0kw';
	updateAccountbutton = 'react-title-bar .tx-ZupKLN+div button';
	promoInput = '[name="promocode"]';
	promoAddButton = '//input[@name="promocode"]//following::div//button';
	promoErrorMessage = '[type="error"] span';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto(url) {
		await this.page.goto(`https://portal.telnyx.com/#/app/${url}`);
		await this.page.waitForLoadState('load');
	}

	async logout() {
		await this.hover(this.profile);
		await this.click(this.logOutProfileDDLButton);
		await expect
	}
}

module.exports = { PortalPage };

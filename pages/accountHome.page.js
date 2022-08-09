const { PortalPage } = require('./portal/portalPage');

class AccountHomePage extends PortalPage {
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

const { Page } = require('../pages/page');
const { LogInPage } = require('../pages/logIn.page');
const { HomePage } = require('../pages/homePage/home.page');
const { PortalPage } = require('../pages/portal/portalPage.page');
const { expect } = require('@playwright/test');

class Account extends Page {
	constructor(page) {
		super(page);
		this.page = page;
	}

	homePage = new HomePage(this.page);
	logInPage = new LogInPage(this.page);
	portalPage = new PortalPage(this.page);

	async login(email = 'testcasesignin@gmail.com', password = 'Testpassword1!') {
		await this.homePage.goto('');
		await this.homePage.closeCookies();
		await this.homePage.click(this.homePage.logInButton);
		await this.page.waitForLoadState('load');
		await this.logInPage.login(email, password);
		await expect(this.page).toHaveURL(/app/, { timeout: 30000 });
	}

	async logout() {
		await this.portalPage.hover(this.portalPage.profile);
		await this.portalPage.click(this.portalPage.logOutProfileDDLButton);
		await expect(this.page).toHaveURL(/login\/sign-in/);
	}
}

module.exports = { Account };

const { Page } = require('./page');

class LogInPage extends Page {
	emailInput = '[aria-label="loginForm"] [name="email"]';
	passwordInput = '[aria-label="loginForm"] [name="password"]';
	submitButton = '[aria-label="loginForm"]>button';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		await this.page.goto(`https://portal.telnyx.com/`);
		await this.page.waitForLoadState('load');
	}

	async login(email, password) {
		await this.fill(this.emailInput, email);
		await this.fill(this.passwordInput, password);
		await this.click(this.submitButton);
		await this.page.waitForLoadState('load');
	}
}

module.exports = { LogInPage };

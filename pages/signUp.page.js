const { expect } = require('@playwright/test');

exports.SignUpPage = class SignUpPage {
	constructor(page) {
		this.page = page;
		this.getEmailInput = page.locator('#email');
		this.getFullNameInput = page.locator('#full_name');
		this.getPasswordInput = page.locator('#password');
		this.getTermsConditionsButton = page.locator('.sc-26f7330-5.lBxvj .sc-e117dd75-0.jSawLe');
		this.getSubmitsButton = page.locator('.sc-5d3a275a-0.jdjrgE button');
	}

	async goto() {
		await this.page.goto('https://telnyx.com/sign-up');
	}

	async toBeVisibleEnabled(element) {
		await expect(element).toBeVisible();
		await expect(element).toBeEnabled();
	}

	async emailInputClick() {
		await this.toBeVisibleEnabled(this.getEmailInput);
		await this.getEmailInput.click();
	}

	async emailFill(email) {
		await this.toBeVisibleEnabled(this.getEmailInput);
		await this.getEmailInput.fill(email);
	}

	async fullNameInputClick() {
		await this.toBeVisibleEnabled(this.getFullNameInput);
		await this.getFullNameInput.click();
	}

	async fullNameFill(fullName) {
		await this.toBeVisibleEnabled(this.getFullNameInput);
		await this.getFullNameInput.fill(fullName);
	}

	async passwordInputClick() {
		await this.toBeVisibleEnabled(this.getPasswordInput);
		await this.getPasswordInput.click();
	}

	async passwordFill(password) {
		await this.toBeVisibleEnabled(this.getPasswordInput);
		await this.getPasswordInput.fill(password);
	}

	async termsConditionsButtonClick() {
		await this.toBeVisibleEnabled(this.getTermsConditionsButton);
		await this.getTermsConditionsButton.click();
	}

	async submitsButtonClick() {
		await this.toBeVisibleEnabled(this.getSubmitsButton);
		await this.getSubmitsButton.click();
	}
};

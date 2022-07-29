class Page {
	cookiesCloseButton = '[aria-label="close and deny"]';
	footer = 'main+footer';

	constructor(page) {
		this.page = page;
	}

	async goto(url) {
		await this.page.goto(`https://telnyx.com/${url}`);
		await this.page.waitForLoadState('load');
	}

	async closeCookies() {
		await this.click(this.cookiesCloseButton);
	}

	async getElement(selector) {
		return await this.page.locator(selector);
	}

	async getElementByIndex(selector, index) {
		return await this.page.locator(selector).nth(index);
	}

	async click(selector) {
		await this.page.locator(selector).click();
	}

	async clickByIndex(selector, index) {
		await this.page.locator(selector).nth(index).click();
	}

	async hover(selector) {
		await this.page.locator(selector).hover();
	}

	async hoverByIndex(selector, index) {
		await this.page.locator(selector).nth(index).hover();
	}

	async count(selector) {
		return await this.page.locator(selector).count();
	}

	async textContent(selector) {
		return this.page.locator(selector).textContent();
	}

	async textContentByIndex(selector, index) {
		return await this.page.locator(selector).nth(index).textContent();
	}

	async getAttribute(selector, name) {
		return this.page.locator(selector).getAttribute(name);
	}

	async getAttributeByIndex(selector, index, name) {
		return await this.page.locator(selector).nth(index).getAttribute(name);
	}

	async scrollIntoView(selector) {
		await this.page.locator(selector).scrollIntoViewIfNeeded();
	}

	async scrollIntoViewByIndex(selector, index) {
		await this.page.locator(selector).nth(index).scrollIntoViewIfNeeded();
	}

	async selectOption(selector, option) {
		await this.page.locator(selector).selectOption(option);
	}

	async selectOptionByIndex(selector, index, option) {
		await this.page.locator(selector).nth(index).selectOption(option);
	}

	async fill(selector, text) {
		await this.page.locator(selector).fill(text);
	}

	async fillByIndex(selector, index, text) {
		await this.page.locator(selector).nth(index).fill(text);
	}
}

module.exports = { Page };

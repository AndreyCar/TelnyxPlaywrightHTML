const { expect } = require('@playwright/test');
const { Page } = require('./page');

class TwilioPricingCalculatorPage extends Page {
	productsButtons = '//input[@type="checkbox"]//parent::div';
	continueButton = '.sc-5d3a275a-0.eKznVb button';
	firstNameInput = '#FirstName';
	lastNameInput = '#LastName';
	emailInput = '#Email';
	websiteInput = '#Website';
	submitButton = 'button[type="submit"]';
	savingPriceTexts = '//p//span[contains(text(),"$")]';
	goBackButton = '(//main//header//p)[1]';
	productsLableButton = 'div[class="Text-sc-5o8owa-0 sc-7a587bdc-1 knOJT dBluGE"]';
	subtractButtons = '//main//input//preceding-sibling::button';
	volumeInput = '//input//following-sibling::button//preceding-sibling::input';
	additionButtons = '//main//input//following-sibling::button';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		super.goto(`twilio-pricing-calculator`);
	}

	async priceToIntByIndex(element, index) {
		return parseInt((await this.textContentByIndex(element, index)).replace('$', '').replace(',', ''), 10);
	}

	async clickAndGetTextByIndex(index) {
		await this.clickByIndex(this.productsButtons, index);
		return await this.textContentByIndex(this.productsButtons, index);
	}

	async checkSubtractAndAdditionButtons() {
		const inputCount = await this.count(this.volumeInput);
		let value = 0;
		for (let index = 0; index < inputCount; index++) {
			value = parseInt(await this.getAttributeByIndex(this.volumeInput, index, 'value'), 10);
			await this.clickByIndex(this.subtractButtons, index);
			await expect(parseInt(await this.getAttributeByIndex(this.volumeInput, index, 'value'), 10)).toBeLessThan(
				value
			);
			await this.clickByIndex(this.additionButtons, index);
			await expect(parseInt(await this.getAttributeByIndex(this.volumeInput, index, 'value'), 10)).toEqual(value);
		}
	}
}

module.exports = { TwilioPricingCalculatorPage };

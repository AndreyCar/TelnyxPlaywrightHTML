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

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		super.goto(`twilio-pricing-calculator`);
	}

	async replaceFromCostByIndex(element, index) {
		return parseInt((await this.textContentByIndex(element, index)).replace('$', '').replace(',', ''), 10);
	}
}

module.exports = { TwilioPricingCalculatorPage };

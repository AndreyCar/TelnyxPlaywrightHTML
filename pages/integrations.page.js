const { expect } = require('@playwright/test');
const { Page } = require('./page');

class IntegrationsPage extends Page {
	becomeBetaTester = '#become-a-beta-tester h3';
	firstNameInput = '#FirstName';
	lastNameInput = '#LastName';
	emailInput = '#Email';
	websiteInput = '#Website';
	industryInput = '#Industry';
	useCaseSelect = '#Use_Case_Form__c';
	useCaseOption = '#Use_Case_Form__c option';
	submitButton = '#become-a-beta-tester [type="submit"]';
	errorWebsiteMessage = '#ValidMsgWebsite span';
	errorEmailMessage = '#ValidMsgEmail span';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		super.goto(`integrations`);
	}

	async completeTheQuestionnaire(firstName, lastName, email, website, industry, useCase) {
		await this.fill(this.firstNameInput, firstName);
		await this.fill(this.lastNameInput, lastName);
		await this.fill(this.emailInput, email);
		await this.fill(this.websiteInput, website);
		await this.fill(this.industryInput, industry);
		await this.selectOption(
			this.useCaseSelect,
			await this.getAttributeByIndex(this.useCaseOption, useCase, 'value')
		);
	}
}

module.exports = { IntegrationsPage };

const { expect } = require('@playwright/test');
const { HomePage } = require('./home.page');

class SaveWithTelnyxPage extends HomePage {
	switchSelectedButton = '.ButtonGroup__Container-sc-6knlsx-0 button.Button__SecondaryButton-vntg8h-4';
	optionsLabel = '.sc-1a5981e5-1.eKnlno';
	title = 'h2>.mchNoDecorate';
	localNumbersRDB = '#local-numbers';
	tollFreeNumbersRDB = '#toll-free-numbers';
	programmableVoiceYesRBD = '#yes';
	programmableVoiceNoRBD = '#no';
	costsTexts = '//span[text()="$"]';

	async replaceFromCost(text) {
		return parseInt(text.replace('$', '').replace(',', ''), 10);
	}

	async checkCosts(selector1, selector2) {
		await this.click(selector1);
		const costTelnyx = await this.replaceFromCost(await this.textContentByIndex(this.costsTexts, 0));
		await this.click(selector2);
		expect(await this.replaceFromCost(await this.textContentByIndex(this.costsTexts, 0))).not.toEqual(costTelnyx);
	}

	constructor(page) {
		super(page);
		this.page = page;
	}
}

module.exports = { SaveWithTelnyxPage };

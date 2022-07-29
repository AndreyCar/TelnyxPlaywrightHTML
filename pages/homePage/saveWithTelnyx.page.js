const { HomePage } = require('./home.page');

class SaveWithTelnyxPage extends HomePage {
	switchSelectedButton = '.ButtonGroup__Container-sc-6knlsx-0 button.Button__SecondaryButton-vntg8h-4';
	optionsLabel = '.sc-1a5981e5-1.eKnlno';
	title = 'h2>.mchNoDecorate';

	constructor(page) {
		super(page);
		this.page = page;
	}
}

module.exports = { SaveWithTelnyxPage };

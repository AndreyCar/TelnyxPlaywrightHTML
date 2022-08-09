const { PortalPage } = require('./portalPage.page');

class SearchAndBuyNumbersPage extends PortalPage {
	searchArea = 'react-buy-numbers>div+div';
	improvedSearchArea = 'react-buy-numbers>div+div[class^="BuyNumbersV2"]';
	searchTypeButton = 'react-buy-numbers button[role="switch"]';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		await this.page.goto(`https://portal.telnyx.com/#/app/numbers/search-numbers`);
		await this.page.waitForLoadState('load');
	}
}

module.exports = { SearchAndBuyNumbersPage };

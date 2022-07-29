const { Page } = require('../page');

class HomePage extends Page {
	headerMenu = 'header ul>li>span';
	headerDropDownMenu = 'header .mchNoDecorate.fVDMEa span';
	headerPricingDropDownMenu = 'header .mchNoDecorate.fVDMEa[href^="/pricing/"] span';
	switchSelectedButton = '.ButtonGroup__Container-sc-6knlsx-0 button.Button__SecondaryButton-vntg8h-4';
	powerFullProductsTitle = 'header>h2:first-child';
	powerFullProducts = 'main ul>li>.mchNoDecorate[href^="/products/"]';

	constructor(page) {
		super(page);
		this.page = page;
	}
}

module.exports = { HomePage };

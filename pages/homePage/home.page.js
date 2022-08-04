const { Page } = require('../page');

class HomePage extends Page {
	headerMenu = 'header ul>li>span';
	headerDropDownMenu = 'header .mchNoDecorate.fVDMEa span';
	headerPricingDropDownMenu = 'header .mchNoDecorate.fVDMEa[href^="/pricing/"] span';
	switchSelectedButton = '.ButtonGroup__Container-sc-6knlsx-0 button.Button__SecondaryButton-vntg8h-4';
	powerFullProductsTitle = 'header>h2:first-child';
	powerFullProducts = 'main ul>li>.mchNoDecorate[href^="/products/"]';
	footerSocialButtons = 'footer [data-e2e="Footer--navItem-social"] ul>li a';
	logInButton = 'header #dialogAudio+.mchNoDecorate+[href="https://portal.telnyx.com/"]';

	constructor(page) {
		super(page);
		this.page = page;
	}
}

module.exports = { HomePage };

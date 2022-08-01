const { Page } = require('./page');

class DevelopersPage extends Page {
	warningMessageV2button = '#__next>div>div>p>a';
	apiV2Button = '//button[@selected]';
	apiV1Button = '//button[@selected]//preceding::button';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto(version, url) {
		await this.page.goto(`https://developers.telnyx.com/docs/${version}${url}`);
		await this.page.waitForLoadState('load');
	}
}

module.exports = { DevelopersPage };

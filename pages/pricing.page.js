const { expect } = require('@playwright/test');
const { Page } = require('./page');

class PricingPage extends Page {
	countryDropDownMenu = 'div:nth-child(1)>[aria-haspopup="listbox"]';
	currencyDropDownMenu = 'div:nth-child(2)>[aria-haspopup="listbox"]';
	currencyDropDownMenuWithoutCountry = 'div>[aria-haspopup="listbox"]';
	currencyDropDownMenuSelect = 'div:nth-child(2)>[aria-haspopup="listbox"]+div>ul>li';
	currencyDropDownMenuSelectWithoutCountry = 'div>[aria-haspopup="listbox"]+div>ul>li';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto(url) {
		super.goto(`pricing/${url}`);
	}
}

module.exports = { PricingPage };

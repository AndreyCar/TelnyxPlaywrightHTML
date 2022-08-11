const base = require('@playwright/test');
const { Account } = require('./helper/account.helper');
const { SearchAndBuyNumbersPage } = require('./pages/portal/searchAndBuyNumbers.page');
const { SIPConnectionsPage } = require('./pages/portal/sipConnections.page');
const { HomePage } = require('./pages/homePage/home.page');
const { CartPage } = require('./pages/cart.page');
const { PortalPage } = require('./pages/portal/portalPage.page');
const { DevelopersPage } = require('./pages/developers.page');
const { IntegrationsPage } = require('./pages/integrations.page');
const { SaveWithTelnyxPage } = require('./pages/homePage/saveWithTelnyx.page');
const { PricingPage } = require('./pages/pricing.page');
const { TwilioPricingCalculatorPage } = require('./pages/twilioPricingCalculator.page');

exports.test = base.test.extend({
	account: async ({ page }, use) => {
		await use(new Account(page));
	},
	searchAndBuyNumbersPage: async ({ page }, use) => {
		await use(new SearchAndBuyNumbersPage(page));
	},
	sipConnectionsPage: async ({ page }, use) => {
		await use(new SIPConnectionsPage(page));
	},
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	cartPage: async ({ page }, use) => {
		await use(new CartPage(page));
	},
	portalPage: async ({ page }, use) => {
		await use(new PortalPage(page));
	},
	developersPage: async ({ page }, use) => {
		await use(new DevelopersPage(page));
	},
	integrationsPage: async ({ page }, use) => {
		await use(new IntegrationsPage(page));
	},
	saveWithTelnyxPage: async ({ page }, use) => {
		await use(new SaveWithTelnyxPage(page));
	},
	pricingPage: async ({ page }, use) => {
		await use(new PricingPage(page));
	},
	twilioPricingCalculatorPage: async ({ page }, use) => {
		await use(new TwilioPricingCalculatorPage(page));
	},
});

exports.expect = base.expect;

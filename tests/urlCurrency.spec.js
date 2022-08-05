const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage/home.page');
const { PricingPage } = require('../pages/pricing.page');

test.use({ timeout: 60 * 1000 });

test.beforeEach(async ({ page }, testInfo) => {
	const homePage = new HomePage(page);
	await homePage.goto('');
	await homePage.closeCookies();
});

test.describe('Pricing currency in url', () => {
	test('should check if the url contains the selected currency', async ({ page }) => {
		const homePage = new HomePage(page);
		const pricingPage = new PricingPage(page);
		const pricingDropDownMenuCount = await homePage.count(homePage.headerPricingDropDownMenu);
		for (let i = 0; i < pricingDropDownMenuCount; ++i) {
			await homePage.hoverByIndex(homePage.headerMenu, 5);
			if (i != 6) {
				await homePage.clickByIndex(homePage.headerPricingDropDownMenu, i);
				await page.waitForLoadState('load');
				let currencyDropDownMenu = '';
				let currencyDropDownMenuSelect = '';

				if (i == 3 && i == 7) {
					currencyDropDownMenu = pricingPage.currencyDropDownMenuWithoutCountry;
					currencyDropDownMenuSelect = pricingPage.currencyDropDownMenuSelectWithoutCountry;
				} else {
					currencyDropDownMenu = pricingPage.currencyDropDownMenu;
					currencyDropDownMenuSelect = pricingPage.currencyDropDownMenuSelect;
				}
				const currencyCount = await pricingPage.count(currencyDropDownMenuSelect);
				for (let j = 0; j < currencyCount; ++j) {
					await pricingPage.click(currencyDropDownMenu);
					const currency = await pricingPage.textContentByIndex(currencyDropDownMenuSelect, j);
					await pricingPage.clickByIndex(currencyDropDownMenuSelect, j);
					await expect(page).toHaveURL(RegExp(currency, 'i'));
				}
				await homePage.goto('');
			}
		}
	});
});

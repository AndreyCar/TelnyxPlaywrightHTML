const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage/home.page');

test.beforeEach(async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto('');
	await homePage.closeCookies();
	await homePage.scrollIntoView(homePage.powerFullProductsTitle);
});

test.describe('Powerful products', () => {
	test('should check if the url contains the selected product href', async ({ page }) => {
		const homePage = new HomePage(page);
		const powerFullProductsCount = await homePage.count(homePage.powerFullProducts);

		for (let i = 0; i < powerFullProductsCount; i++) {
			const productUrl = await homePage.getAttributeByIndex(homePage.powerFullProducts, i, 'href');
			await homePage.scrollIntoViewByIndex(homePage.powerFullProducts, i);
			await homePage.clickByIndex(homePage.powerFullProducts, i);
			await page.waitForLoadState('load');
			await expect(page).toHaveURL(RegExp(productUrl, 'i'));
			await page.goBack();
		}
	});
});

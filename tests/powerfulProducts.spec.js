const { test, expect } = require('../test');

test.beforeEach(async ({ homePage }) => {
	await homePage.goto('');
	await homePage.closeCookies();
	await homePage.scrollIntoView(homePage.powerFullProductsTitle);
});

test.describe('Powerful products', () => {
	test('should check if the url contains the selected product href', async ({ homePage, page }) => {
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

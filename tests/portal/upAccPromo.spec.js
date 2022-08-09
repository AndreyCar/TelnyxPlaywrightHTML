const { test, expect } = require('../../test');

test.beforeEach(async ({ account }) => {
	await account.login();
});

test.describe('Update account promo Functionality', () => {
	test('Should enter the invalid promo code and check if the error is displayed', async ({ portalPage, page }) => {
		page.waitForLoadState('load');
		await portalPage.hover(portalPage.updateAccountbutton);
		await portalPage.fill(portalPage.promoInput, 'goodPromo');
		await portalPage.click(portalPage.promoAddButton);
		await expect(await portalPage.getElement(portalPage.promoErrorMessage)).toBeVisible();
	});
});

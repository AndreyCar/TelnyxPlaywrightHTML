const { test, expect } = require('../../test');

test.beforeEach(async ({ account }) => {
	await account.login();
});

test.describe('Switch search type', () => {
	test('Should switch search type and check if the new options is displayed', async ({ searchAndBuyNumbersPage }) => {
		await expect(await searchAndBuyNumbersPage.getElement(searchAndBuyNumbersPage.searchArea)).toBeVisible({
			timeout: 20000,
		});
		await searchAndBuyNumbersPage.click(searchAndBuyNumbersPage.searchTypeButton);
		await expect(await searchAndBuyNumbersPage.getElement(searchAndBuyNumbersPage.improvedSearchArea)).toBeVisible({
			timeout: 20000,
		});
	});
});

const { test, expect } = require('../test');

test.beforeEach(async ({ developersPage }) => {
	await developersPage.goto('', '');
});

test.describe('Dev API versions Functionality', () => {
	test('Should check if the API version buttons send the user to the correct page', async ({
		developersPage,
		page,
	}) => {
		await developersPage.click(developersPage.apiV1Button);
		await expect(page).toHaveURL(/docs\/v1/);
		await developersPage.click(developersPage.warningMessageV2button);
		await expect(page).toHaveURL(/docs\/v2/);
	});
});

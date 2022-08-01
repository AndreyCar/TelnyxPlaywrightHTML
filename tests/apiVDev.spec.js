const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage/home.page');
const { DevelopersPage } = require('../pages/developers.page');

test.beforeEach(async ({ page }) => {
	const homePage = new HomePage(page);
	const developersPage = new DevelopersPage(page);
	await developersPage.goto('', '');
});

test.describe('Dev API versions Functionality', () => {
	test('should check if the API version buttons send the user to the correct page', async ({ page }) => {
		const homePage = new HomePage(page);
		const developersPage = new DevelopersPage(page);
		await developersPage.click(developersPage.apiV1Button);
		await expect(page).toHaveURL(/docs\/v1/);
		await developersPage.click(developersPage.warningMessageV2button);
		await expect(page).toHaveURL(/docs\/v2/);
	});
});

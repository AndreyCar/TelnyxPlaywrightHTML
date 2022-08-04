const { test, expect } = require('@playwright/test');
const { AccountHomePage } = require('../pages/accountHome.page');
const { Account } = require('../helper/account.helper');

test.beforeEach(async ({ page }) => {
	const account = new Account(page);
	await account.login();
});

test.describe('Update account promo Functionality', () => {
	test('Should enter the invalid promo code and check if the error is displayed', async ({ page }) => {
		const accountHomePage = new AccountHomePage(page);
		await accountHomePage.hover(accountHomePage.updateAccountbutton);
		await accountHomePage.fill(accountHomePage.promoInput, 'goodPromo');
		await accountHomePage.click(accountHomePage.promoAddButton);
		await expect(await accountHomePage.getElement(accountHomePage.promoErrorMessage)).toBeVisible();
	});
});

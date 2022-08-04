const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cart.page');
const { Account } = require('../helper/account.helper');

test.beforeEach(async ({ page }) => {
	const account = new Account(page);
	await account.login();
});

test.describe('Empty cart', () => {
	test('Should add and remove the product from the cart and check is the cart is empty', async ({ page }) => {
		const cartPage = new CartPage(page);
		await cartPage.goto();
		await expect(await cartPage.getElement(cartPage.CartIsEmptyLabel)).toBeVisible({ timeout: 10000 });
		await cartPage.click(cartPage.addSimToCartButton);
		await expect(await cartPage.getElement(cartPage.CartIsEmptyLabel)).not.toBeVisible();
		await cartPage.click(cartPage.removeFromCartButton);
		await expect(await cartPage.getElement(cartPage.CartIsEmptyLabel)).toBeVisible();
	});
});

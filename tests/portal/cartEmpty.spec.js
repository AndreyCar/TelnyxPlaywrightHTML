const { test, expect} = require('../../test');

test.beforeEach(async ({ cartPage, account }) => {
	await account.login();
	await cartPage.goto();
});

test.describe('Empty cart', () => {
	test('Should add and remove the product from the cart and check is the cart is empty', async ({ cartPage }) => {
		await expect(await cartPage.getElement(cartPage.cartIsEmptyLabel)).toBeVisible({ timeout: 10000 });
		await cartPage.click(cartPage.addSimToCartButton);
		await expect(await cartPage.getElement(cartPage.cartIsEmptyLabel)).not.toBeVisible();
		await cartPage.click(cartPage.removeFromCartButton);
		await expect(await cartPage.getElement(cartPage.cartIsEmptyLabel)).toBeVisible();
	});
});

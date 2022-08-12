const { test, expect } = require('../test');

test.describe('Savings calculator Functionality', () => {
	test.beforeEach(async ({ twilioPricingCalculatorPage }) => {
		await twilioPricingCalculatorPage.goto();
		await twilioPricingCalculatorPage.closeCookies();
	});

	test('Should check if the saving price is the same', async ({ twilioPricingCalculatorPage }) => {
		await twilioPricingCalculatorPage.clickByIndex(twilioPricingCalculatorPage.productsButtons, 0);
		await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.continueButton);
		await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.continueButton);
		await twilioPricingCalculatorPage.fill(twilioPricingCalculatorPage.firstNameInput, 'test');
		await twilioPricingCalculatorPage.fill(twilioPricingCalculatorPage.lastNameInput, 'test');
		await twilioPricingCalculatorPage.fill(twilioPricingCalculatorPage.emailInput, 'test@test.com');
		await twilioPricingCalculatorPage.fill(twilioPricingCalculatorPage.websiteInput, 'https://test.com/');
		await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.submitButton);
		expect(
			await twilioPricingCalculatorPage.priceToIntByIndex(twilioPricingCalculatorPage.savingPriceTexts, 0)
		).toEqual(await twilioPricingCalculatorPage.priceToIntByIndex(twilioPricingCalculatorPage.savingPriceTexts, 1));
	});

	test('Should check if the selected produts are displayed on the last page', async ({
		twilioPricingCalculatorPage,
		page,
	}) => {
		let productsName = [];
		for (let i = 0; i < 7; i++) {
			if (i < 3) {
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(i));
			} else if (i == 3 || i == 4) {
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(i - 3));
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(i - 3 + 1));
			} else if (i == 5) {
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(0));
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(2));
			} else if (i == 6) {
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(0));
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(1));
				productsName.push(await twilioPricingCalculatorPage.clickAndGetTextByIndex(2));
			}
			await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.continueButton);
			await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.continueButton);
			for (let j = 0; j < productsName.length; j++) {
				await expect(productsName[j]).toMatch(
					RegExp(
						await twilioPricingCalculatorPage.textContentByIndex(
							twilioPricingCalculatorPage.productsLableButton,
							j
						),
						'i'
					)
				);
			}
			await twilioPricingCalculatorPage.goto();
			productsName = [];
			await page.waitForTimeout(1000);
		}
	});

	test.only('Should check if the subtract and addition buttons work correct', async ({
		twilioPricingCalculatorPage,
	}) => {
		for (let index = 0; index < 3; index++)
			await twilioPricingCalculatorPage.clickByIndex(twilioPricingCalculatorPage.productsButtons, index);
		await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.continueButton);
		await twilioPricingCalculatorPage.checkSubtractAndAdditionButtons();
		await twilioPricingCalculatorPage.click(twilioPricingCalculatorPage.continueButton);
		await twilioPricingCalculatorPage.checkSubtractAndAdditionButtons();
	});
});

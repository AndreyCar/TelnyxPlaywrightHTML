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
			await twilioPricingCalculatorPage.replaceFromCostByIndex(twilioPricingCalculatorPage.savingPriceTexts, 0)
		).toEqual(
			await twilioPricingCalculatorPage.replaceFromCostByIndex(twilioPricingCalculatorPage.savingPriceTexts, 1)
		);
	});
});

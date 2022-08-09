const { test, expect } = require('../test');

const socialMediaName = ['linkedin', 'twitter', 'facebook'];

test.beforeEach(async ({ homePage }) => {
	await homePage.goto('');
	await homePage.closeCookies();
	await homePage.scrollIntoView(homePage.powerFullProductsTitle);
});

test.describe('Social media', () => {
	test('should check if the social media buttons have correct text and href', async ({ homePage, page }) => {
		const footerSocialButtonsCount = await homePage.count(homePage.footerSocialButtons);
		for (let i = 0; i < footerSocialButtonsCount; i++) {
			await homePage.scrollIntoView(homePage.footer);
			await expect(await homePage.getElementByIndex(homePage.footerSocialButtons, i)).toContainText(
				socialMediaName[i],
				{ ignoreCase: true }
			);
			const [newPage] = await Promise.all([
				page.context().waitForEvent('page'),
				await homePage.clickByIndex(homePage.footerSocialButtons, i),
			]);
			await expect(newPage).toHaveURL(RegExp(socialMediaName[i], 'i'));
			await newPage.close();
		}
	});
});

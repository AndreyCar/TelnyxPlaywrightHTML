const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage/home.page');

const socialMedia = [
	['linkedin', 'twitter', 'facebook'],
	['https://www.linkedin.com/company/telnyx/', 'https://twitter.com/telnyx', 'https://www.facebook.com/Telnyx/'],
];

test.beforeEach(async ({ page }) => {
	const homePage = new HomePage(page);
	await homePage.goto('');
	await homePage.closeCookies();
	await homePage.scrollIntoView(homePage.powerFullProductsTitle);
});

test.describe('Social media', () => {
	test('should check if the social media buttons have correct text and href', async ({ page }) => {
		const homePage = new HomePage(page);

		const footerSocialButtonsCount = await homePage.count(homePage.footerSocialButtons);
		for (let i = 0; i < footerSocialButtonsCount; i++) {
			await homePage.scrollIntoView(homePage.footer);
			await expect(await homePage.getElementByIndex(homePage.footerSocialButtons, i)).toContainText(
				socialMedia[0][i],
				{ ignoreCase: true }
			);
			await expect(await homePage.getElementByIndex(homePage.footerSocialButtons, i)).toHaveAttribute(
				'href',
				socialMedia[1][i],
				{ ignoreCase: true }
			);
		}
	});
});

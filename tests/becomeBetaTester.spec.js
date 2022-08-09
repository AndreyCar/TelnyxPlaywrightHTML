// @ts-check
const { test, expect } = require('../test');

test.beforeEach(async ({ integrationsPage }) => {
	await integrationsPage.goto();
	await integrationsPage.closeCookies();
});

test.describe('Become a Beta Tester Functionality', () => {
	test('should successfully complete the questionnaire with valid data', async ({ integrationsPage, page }) => {
		await integrationsPage.scrollIntoViewByIndex(integrationsPage.footer, 0);
		await integrationsPage.scrollIntoView(integrationsPage.becomeBetaTester);
		await integrationsPage.completeTheQuestionnaire(
			'Andrii',
			'Krv',
			'andrii@krv.com',
			'http://www.Andrii.com/',
			'AndriiKRV',
			0
		);
		await integrationsPage.click(integrationsPage.submitButton);
		await page.waitForLoadState('load');
		await expect(page).toHaveURL('https://go.telnyx.com/prog-video-follow-up.html');
	});

	test('should complete the questionnaire with invalid email', async ({ integrationsPage, page }) => {
		await integrationsPage.scrollIntoViewByIndex(integrationsPage.footer, 0);
		await integrationsPage.scrollIntoView(integrationsPage.becomeBetaTester);
		await integrationsPage.completeTheQuestionnaire(
			'Andrii',
			'Krv',
			'andrii',
			'http://www.Andrii.com/',
			'AndriiKRV',
			0
		);
		await integrationsPage.click(integrationsPage.submitButton);
		await integrationsPage.click(integrationsPage.emailInput);
		await expect(await integrationsPage.getElement(integrationsPage.errorEmailMessage)).toHaveText(
			'example@yourdomain.com'
		);
	});

	test('should complete the questionnaire with invalid website', async ({ integrationsPage, page }) => {
		await integrationsPage.scrollIntoViewByIndex(integrationsPage.footer, 0);
		await integrationsPage.scrollIntoView(integrationsPage.becomeBetaTester);
		await integrationsPage.completeTheQuestionnaire('Andrii', 'Krv', 'andrii@krv.com', 'andrii', 'AndriiKRV', 0);
		await integrationsPage.click(integrationsPage.submitButton);
		await integrationsPage.click(integrationsPage.websiteInput);
		await expect(await integrationsPage.getElement(integrationsPage.errorWebsiteMessage)).toHaveText(
			'http://www.example.com/'
		);
	});

	test('should successfully complete the questionnaire without data', async ({ integrationsPage, page }) => {
		await integrationsPage.scrollIntoViewByIndex(integrationsPage.footer, 0);
		await integrationsPage.scrollIntoView(integrationsPage.becomeBetaTester);
		await integrationsPage.click(integrationsPage.submitButton);
		await page.waitForLoadState('load');
		await expect(page).toHaveURL('https://go.telnyx.com/prog-video-follow-up.html');
	});
});

const { test, expect } = require('../../../test');

test.beforeEach(async ({ account, sipConnectionsPage }) => {
	await account.login();
	await sipConnectionsPage.goto();
});

test.afterAll(async ({ account }) => {
	await account.logout();
});

test.describe('SIP Connections filter Functionality', () => {
	test('Should check if the connect with us link goes to the correct page', async ({ sipConnectionsPage, page }) => {
		const [sipTelnyxPage] = await Promise.all([
			page.context().waitForEvent('page'),
			await sipConnectionsPage.click(sipConnectionsPage.connectWithUsLink),
		]);
		await expect(sipTelnyxPage).toHaveURL('https://sip.telnyx.com/');
	});
});

const { test, expect } = require('../../../test');
const { getRandomInt } = require('../../../helper/random.helper');

const sipConnectionsname = 'sip_connection';

test.describe('SIP Connections Anchor Site Functionality', () => {
	test.beforeEach(async ({ account, sipConnectionsPage }) => {
		await account.login();
		await sipConnectionsPage.goto();
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
		await sipConnectionsPage.createSIPConnection(sipConnectionsname);
		await sipConnectionsPage.goto();
	});

	test.afterEach(async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.goto();
		await sipConnectionsPage.deleteSIPConnections(1);
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
	});

	test.afterAll(async ({ account }) => {
		await account.logout();
	});

	test('Should choose anchor site in the table and check if the text in the basic options is the same', async ({
		sipConnectionsPage,
	}) => {
		const number = getRandomInt(1, 10);
		await sipConnectionsPage.click(sipConnectionsPage.anchorSiteTableButton);
		await sipConnectionsPage.clickByIndex(sipConnectionsPage.anchorSiteDDL, number);
		const anchorSite = await sipConnectionsPage.textContent(sipConnectionsPage.anchorSiteText);
		await sipConnectionsPage.click(sipConnectionsPage.basicOptionButtons);
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.anchorSiteModalText)).toHaveText(
			anchorSite
		);
	});

	test('Should choose anchor site in the basic options and check if the text in the table is the same', async ({
		sipConnectionsPage,
	}) => {
		const number = getRandomInt(1, 10);
		await sipConnectionsPage.click(sipConnectionsPage.basicOptionButtons);
		await sipConnectionsPage.click(sipConnectionsPage.anchorSiteModalButton);
		await sipConnectionsPage.clickByIndex(sipConnectionsPage.anchorSiteModalDDL, number);
		const anchorSite = await sipConnectionsPage.textContent(sipConnectionsPage.anchorSiteModalText);
		await sipConnectionsPage.click(sipConnectionsPage.saveAllChanges);
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.anchorSiteText)).toHaveText(anchorSite);
	});
});

const { test, expect } = require('../../../test');
const { rand } = require('../../../helper/random.helper');

const sipConnectionsCount = 3,
	sipConnectionsname = 'sip_connection';

test.describe('SIP Connections filter Functionality', () => {
	test.beforeEach(async ({ account, sipConnectionsPage }) => {
		await account.login();
		await sipConnectionsPage.goto();
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
		for (let index = 0; index < sipConnectionsCount; index++) {
			await sipConnectionsPage.createSIPConnection(sipConnectionsname + '_' + index);
		}
	});

	test.afterEach(async ({sipConnectionsPage }) => {
		await sipConnectionsPage.goto();
		await sipConnectionsPage.deleteSIPConnections(sipConnectionsCount);
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
	});

	test.afterAll(async ({account }) => {
		await account.logout();
	});

	test('Should filter by valid name', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.fill(sipConnectionsPage.filterByNameInput, sipConnectionsname);
		await sipConnectionsPage.click(sipConnectionsPage.applyFilterButton);
		for (
			let index = 0;
			index < (await sipConnectionsPage.count(sipConnectionsPage.tableSipConnectionNameInputs));
			index++
		) {
			await expect(
				await sipConnectionsPage.getElementByIndex(sipConnectionsPage.tableSipConnectionNameInputs, index)
			).toHaveValue(RegExp(sipConnectionsname, 'i'));
		}
	});

	test('Should filter by invalid name', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.fill(sipConnectionsPage.filterByNameInput, 'invalid name');
		await sipConnectionsPage.click(sipConnectionsPage.applyFilterButton);
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
	});

	test('Should filter by id, when no ip is added', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.fill(sipConnectionsPage.filterByIPInput, 'ip');
		await sipConnectionsPage.click(sipConnectionsPage.applyFilterButton);
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.errorMessage)).toBeVisible();
	});

	test('Should filter by auth username', async ({ sipConnectionsPage, page }) => {
		await sipConnectionsPage.clickByIndex(sipConnectionsPage.basicOptionButtons, 0);
		await sipConnectionsPage.click(sipConnectionsPage.credentialsButton);
		const username = rand(11, 'string');
		await sipConnectionsPage.click(sipConnectionsPage.credentialsEditUsernameButton);
		await sipConnectionsPage.fill(sipConnectionsPage.credentialsUsernameInput, '');
		await sipConnectionsPage.fill(sipConnectionsPage.credentialsUsernameInput, username);
		await sipConnectionsPage.click(sipConnectionsPage.saveAllChanges);
		await sipConnectionsPage.fill(sipConnectionsPage.filterByAuthInput, username);
		await sipConnectionsPage.click(sipConnectionsPage.applyFilterButton);
		for (
			let index = 0;
			index < (await sipConnectionsPage.count(sipConnectionsPage.tableSipConnectionNameInputs));
			index++
		) {
			await expect(await page.$eval('#connectionsTable input[e2e="username"]', (e) => e.value)).toEqual(
				username
			);
		}
	});
});

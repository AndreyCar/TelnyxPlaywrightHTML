const { test, expect } = require('../../../test');
const { rand } = require('../../../helper/random.helper');

const sipConnectionsCount = 3,
	sipConnectionsname = 'sip_connection';

test.beforeEach(async ({ account, sipConnectionsPage }) => {
	await account.login();
	await sipConnectionsPage.goto();
});

test.afterAll(async ({ sipConnectionsPage, account }) => {
	await sipConnectionsPage.goto();
	await sipConnectionsPage.deleteSIPConnections(sipConnectionsCount);
	await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
	await account.logout();
});

test.describe('SIP Connections sort Functionality', () => {
	test(`Should create ${sipConnectionsCount} SIP Connections`, async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.goto();
		await expect(await sipConnectionsPage.getElement(sipConnectionsPage.emptyTableMessage)).toBeVisible();
		for (let index = 0; index < sipConnectionsCount; index++) {
			await sipConnectionsPage.createSIPConnection(sipConnectionsname + '_' + index);
		}
	});

	test.skip('Should sort by creation date', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.click(sipConnectionsPage.sortByButton);
		await sipConnectionsPage.click(sipConnectionsPage.sortDDL + '0');
		const sortOrder = await sipConnectionsPage.getAttribute(sipConnectionsPage.sortOrder, 'class');
		for (let i = 0; i < 2; i++) {
			if (sortOrder == 'fa fa-angle-up') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + `_${sipConnectionsCount - 1 - index}`);
				}
			} else if (sortOrder == 'fa fa-angle-down') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + `_${index}`);
				}
			}
			await sipConnectionsPage.click(sipConnectionsPage.sortOrder);
		}
	});

	test.skip('Should sort by SIP connection name', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.click(sipConnectionsPage.sortByButton);
		await sipConnectionsPage.click(sipConnectionsPage.sortDDL + '1');
		const sortOrder = await sipConnectionsPage.getAttribute(sipConnectionsPage.sortOrder, 'class');
		for (let i = 0; i < 2; i++) {
			if (sortOrder == 'fa fa-angle-up') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + `_${sipConnectionsCount - 1 - index}`);
				}
			} else if (sortOrder == 'fa fa-angle-down') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + `_${index}`);
				}
			}
			await sipConnectionsPage.click(sipConnectionsPage.sortOrder);
		}
	});

	test('Should sort by active', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.clickByIndex(sipConnectionsPage.activeSwitchButton, 0);
		await sipConnectionsPage.click(sipConnectionsPage.confirmButton);

		await sipConnectionsPage.click(sipConnectionsPage.sortByButton);
		await sipConnectionsPage.click(sipConnectionsPage.sortDDL + '2');

		const sortOrder = await sipConnectionsPage.getAttribute(sipConnectionsPage.sortOrder, 'class');
		for (let i = 0; i < 2; i++) {
			await sipConnectionsPage.click(sipConnectionsPage.sortOrder);
			if (sortOrder == 'fa fa-angle-down') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + (index == 0 ? '_0' : `_${sipConnectionsCount - 1 - index}`));
				}
			} else if (sortOrder == 'fa fa-angle-up') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + `_${index}`);
				}
			}
		}
	});

	test.skip('Should sort by Auth type', async ({ sipConnectionsPage }) => {
		await sipConnectionsPage.clickByIndex(sipConnectionsPage.basicOptionButtons, 0);
		await sipConnectionsPage.click(sipConnectionsPage.credentialsButton);
		const username = rand(10, 'string');
		await sipConnectionsPage.click(sipConnectionsPage.credentialsEditUsernameButton);
		await sipConnectionsPage.fill(sipConnectionsPage.credentialsUsernameInput, '');
		await sipConnectionsPage.fill(sipConnectionsPage.credentialsUsernameInput, username);
		await sipConnectionsPage.click(sipConnectionsPage.saveAllChanges);
		await sipConnectionsPage.goto();
		await sipConnectionsPage.click(sipConnectionsPage.sortByButton);
		await sipConnectionsPage.click(sipConnectionsPage.sortDDL + '3');

		const sortOrder = await sipConnectionsPage.getAttribute(sipConnectionsPage.sortOrder, 'class');
		for (let i = 0; i < 2; i++) {
			await sipConnectionsPage.click(sipConnectionsPage.sortOrder);
			if (sortOrder == 'fa fa-angle-down') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + `_${index}`);
				}
			} else if (sortOrder == 'fa fa-angle-up') {
				for (let index = 0; index < sipConnectionsCount; index++) {
					await expect(
						await sipConnectionsPage.getElementByIndex(
							sipConnectionsPage.tableSipConnectionNameInputs,
							index
						)
					).toHaveValue(sipConnectionsname + (index == 0 ? '_0' : `_${sipConnectionsCount - 1 - index}`));
				}
			}
		}
	});
});

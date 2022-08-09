const { Page } = require('../page');
const { expect } = require('@playwright/test');

class SIPConnectionsPage extends Page {
	addSIPConnectionButton = '#addConnectionBtn	 button';
	errorMessage = '.alert-container div[type="danger"]';
	//table
	deleteSIPConnectionButtons = 'button[e2e="deleteConnection"]';
	basicOptionButtons = 'button[e2e="basicOption"]';
	emptyTableMessage = '.empty-table-message';
	tableSipConnectionNameInputs = '#connectionsTable input[e2e="connectionNameCell"]';
	tableAuthDetailInputs = '#connectionsTable input[e2e="username"]';
	//filter
	filterByNameInput = '.card-header input[e2e="connectionName"]';
	filterByIPInput = '.card-header input[e2e="ipAddress"]';
	filterByAuthInput = '.card-header input[e2e="authUsername"]';
	applyFilterButton = '.card-header button[type="submit"]';
	clearFilterButton = '.card-header button[e2e="filter"]';
	//modal
	sipConnectionNameInput = '.modal-dialog #name';
	createSIPConnectionButton = '.modal-dialog #name+span button';
	successCreateMessage = '.modal-alert [type="success"]';
	saveAndFinishEditing = '.modal-footer button';
	saveAllChanges = '.modal-footer button[type="submit"]';
	confirmButton = '.modal-content button+button';
	sipConnectionTypeButtons = '.modal-content #accordiongroup-5173-279-panel button';
	saveNameButton = '#name+span>button';
	//modal//credentials
	credentialsButton = '.modal-content [e2e="registration"]';
	credentialsUsernameInput = '.modal-content [name="credentialUsername"]';
	credentialsEditUsernameButton = '.modal-content button[e2e="editUserName"]';

	constructor(page) {
		super(page);
		this.page = page;
	}

	async goto() {
		await this.page.goto(`https://portal.telnyx.com/#/app/connections`);
		await this.page.waitForLoadState('load');
	}

	async createSIPConnection(nameOfSIPConnection) {
		await this.click(this.addSIPConnectionButton);
		await this.fill(this.sipConnectionNameInput, nameOfSIPConnection);
		await this.click(this.createSIPConnectionButton);
		await expect(await this.getElement(this.successCreateMessage)).toBeVisible();
		await this.click(this.saveAndFinishEditing);
	}
	async delete(numberOfSIPConnection) {
		for (let index = 0; index < numberOfSIPConnection; index++) {
			await this.clickByIndex(this.deleteSIPConnectionButtons, 0);
			await this.click(this.confirmButton);
		}
	}
	async deleteSIPConnections(howMany) {
		var sipConnectionCount = this.count(this.deleteSIPConnectionButtons);
		if (howMany == 'all' || howMany == 'All' || howMany == 'ALL') {
			this.delete(sipConnectionCount);
			await expect(await this.getElement(this.emptyTableMessage)).toBeVisible();
		} else {
			this.delete(howMany);
		}
	}
}

module.exports = { SIPConnectionsPage };

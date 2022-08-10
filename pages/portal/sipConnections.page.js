const { Page } = require('../page');
const { expect } = require('@playwright/test');

class SIPConnectionsPage extends Page {
	addSIPConnectionButton = '#addConnectionBtn	 button';
	sortByButton = '.card-block [e2e="sort"]';
	sortDDL = '#ui-select-choices-row-0-';
	sortOrder = '.card-block .btn-group>button>i';
	errorMessage = '.alert-container div[type="danger"]';
	connectWithUsLink = '.tab-content a[href="https://sip.telnyx.com"]';
	//table
	deleteSIPConnectionButtons = 'button[e2e="deleteConnection"]';
	basicOptionButtons = 'button[e2e="basicOption"]';
	emptyTableMessage = '.empty-table-message';
	tableSipConnectionNameInputs = '#connectionsTable input[e2e="connectionNameCell"]';
	tableAuthDetailInputs = '#connectionsTable input[e2e="username"]';
	activeSwitchButton = 'table [role="switch"]';
	anchorSiteTableButton = 'table div[e2e="anchorSite"]';
	anchorSiteDDL = '[id^="ui-select-choices-row"]';
	anchorSiteText = 'table div[e2e="anchorSite"]  span[class="ng-binding ng-scope"]';
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
	//modal/sipConnectionType/credentials
	credentialsButton = '.modal-content [e2e="registration"]';
	credentialsUsernameInput = '.modal-content [name="credentialUsername"]';
	credentialsEditUsernameButton = '.modal-content button[e2e="editUserName"]';
	//modal/anchorSite
	anchorSiteModalButton = '.modal-dialog  [class^="connection-anchorsite"]';
	anchorSiteModalText = '.modal-dialog  [class^="connection-anchorsite"] small';
	anchorSiteModalDDL = '.modal-dialog  [class^="connection-anchorsite"] input';

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
	async deleteSIPConnections(numberOfSIPConnection) {
		var sipConnectionCount = this.count(this.deleteSIPConnectionButtons);
		if (numberOfSIPConnection == 'all' || numberOfSIPConnection == 'All' || numberOfSIPConnection == 'ALL') {
			this.delete(sipConnectionCount);
		} else {
			this.delete(numberOfSIPConnection);
		}
	}
}

module.exports = { SIPConnectionsPage };

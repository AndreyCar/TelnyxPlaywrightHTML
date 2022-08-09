const { test, expect } = require('../test');

test.beforeEach(async ({ saveWithTelnyxPage }) => {
	await saveWithTelnyxPage.goto('');
	await saveWithTelnyxPage.closeCookies();
	await saveWithTelnyxPage.scrollIntoView(saveWithTelnyxPage.title);
});

test.describe('Save with Telnyx', () => {
	test('should check if the product option titles contains the selected product name', async ({
		saveWithTelnyxPage,
		page,
	}) => {
		for (let i = 0; i < 2; i++) {
			const optionsCount = await saveWithTelnyxPage.count(saveWithTelnyxPage.optionsLabel);

			for (let j = 0; j < optionsCount; j++) {
				if (i == 0 && j != optionsCount - 1)
					await expect(
						await saveWithTelnyxPage.getElementByIndex(saveWithTelnyxPage.optionsLabel, j)
					).toContainText('calls');
				else if (i == 1)
					await expect(
						await saveWithTelnyxPage.getElementByIndex(saveWithTelnyxPage.optionsLabel, j)
					).toContainText('messages');
			}

			if (i == 0) await saveWithTelnyxPage.click(saveWithTelnyxPage.switchSelectedButton);
		}
	});
});

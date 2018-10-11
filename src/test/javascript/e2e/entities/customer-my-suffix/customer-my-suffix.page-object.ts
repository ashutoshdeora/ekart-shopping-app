import { element, by, ElementFinder } from 'protractor';

export class CustomerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-customer-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-customer-my-suffix div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CustomerUpdatePage {
    pageTitle = element(by.id('jhi-customer-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    customerNameInput = element(by.id('field_customerName'));
    customerCategoryInput = element(by.id('field_customerCategory'));
    userIdInput = element(by.id('field_userId'));
    creditRatingInput = element(by.id('field_creditRating'));
    billToAddressSelect = element(by.id('field_billToAddress'));
    shipToAddressSelect = element(by.id('field_shipToAddress'));
    contactDetailsSelect = element(by.id('field_contactDetails'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCustomerNameInput(customerName) {
        await this.customerNameInput.sendKeys(customerName);
    }

    async getCustomerNameInput() {
        return this.customerNameInput.getAttribute('value');
    }

    async setCustomerCategoryInput(customerCategory) {
        await this.customerCategoryInput.sendKeys(customerCategory);
    }

    async getCustomerCategoryInput() {
        return this.customerCategoryInput.getAttribute('value');
    }

    async setUserIdInput(userId) {
        await this.userIdInput.sendKeys(userId);
    }

    async getUserIdInput() {
        return this.userIdInput.getAttribute('value');
    }

    async setCreditRatingInput(creditRating) {
        await this.creditRatingInput.sendKeys(creditRating);
    }

    async getCreditRatingInput() {
        return this.creditRatingInput.getAttribute('value');
    }

    async billToAddressSelectLastOption() {
        await this.billToAddressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async billToAddressSelectOption(option) {
        await this.billToAddressSelect.sendKeys(option);
    }

    getBillToAddressSelect(): ElementFinder {
        return this.billToAddressSelect;
    }

    async getBillToAddressSelectedOption() {
        return this.billToAddressSelect.element(by.css('option:checked')).getText();
    }

    async shipToAddressSelectLastOption() {
        await this.shipToAddressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async shipToAddressSelectOption(option) {
        await this.shipToAddressSelect.sendKeys(option);
    }

    getShipToAddressSelect(): ElementFinder {
        return this.shipToAddressSelect;
    }

    async getShipToAddressSelectedOption() {
        return this.shipToAddressSelect.element(by.css('option:checked')).getText();
    }

    async contactDetailsSelectLastOption() {
        await this.contactDetailsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async contactDetailsSelectOption(option) {
        await this.contactDetailsSelect.sendKeys(option);
    }

    getContactDetailsSelect(): ElementFinder {
        return this.contactDetailsSelect;
    }

    async getContactDetailsSelectedOption() {
        return this.contactDetailsSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CustomerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-customer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-customer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

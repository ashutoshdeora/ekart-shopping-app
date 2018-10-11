import { element, by, ElementFinder } from 'protractor';

export class NotificationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-notification-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-notification-my-suffix div h2#page-heading span')).first();

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

export class NotificationUpdatePage {
    pageTitle = element(by.id('jhi-notification-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    notificationDateInput = element(by.id('field_notificationDate'));
    notificationStatusInput = element(by.id('field_notificationStatus'));
    reciepentAddressInput = element(by.id('field_reciepentAddress'));
    notificationBodyInput = element(by.id('field_notificationBody'));
    orderDetailsSelect = element(by.id('field_orderDetails'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNotificationDateInput(notificationDate) {
        await this.notificationDateInput.sendKeys(notificationDate);
    }

    async getNotificationDateInput() {
        return this.notificationDateInput.getAttribute('value');
    }

    async setNotificationStatusInput(notificationStatus) {
        await this.notificationStatusInput.sendKeys(notificationStatus);
    }

    async getNotificationStatusInput() {
        return this.notificationStatusInput.getAttribute('value');
    }

    async setReciepentAddressInput(reciepentAddress) {
        await this.reciepentAddressInput.sendKeys(reciepentAddress);
    }

    async getReciepentAddressInput() {
        return this.reciepentAddressInput.getAttribute('value');
    }

    async setNotificationBodyInput(notificationBody) {
        await this.notificationBodyInput.sendKeys(notificationBody);
    }

    async getNotificationBodyInput() {
        return this.notificationBodyInput.getAttribute('value');
    }

    async orderDetailsSelectLastOption() {
        await this.orderDetailsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async orderDetailsSelectOption(option) {
        await this.orderDetailsSelect.sendKeys(option);
    }

    getOrderDetailsSelect(): ElementFinder {
        return this.orderDetailsSelect;
    }

    async getOrderDetailsSelectedOption() {
        return this.orderDetailsSelect.element(by.css('option:checked')).getText();
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

export class NotificationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-notification-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-notification'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

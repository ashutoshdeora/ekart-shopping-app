import { element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-contact-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-contact-my-suffix div h2#page-heading span')).first();

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

export class ContactUpdatePage {
    pageTitle = element(by.id('jhi-contact-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    mobileInput = element(by.id('field_mobile'));
    workPhoneInput = element(by.id('field_workPhone'));
    homePhoneInput = element(by.id('field_homePhone'));
    emailInput = element(by.id('field_email'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setMobileInput(mobile) {
        await this.mobileInput.sendKeys(mobile);
    }

    async getMobileInput() {
        return this.mobileInput.getAttribute('value');
    }

    async setWorkPhoneInput(workPhone) {
        await this.workPhoneInput.sendKeys(workPhone);
    }

    async getWorkPhoneInput() {
        return this.workPhoneInput.getAttribute('value');
    }

    async setHomePhoneInput(homePhone) {
        await this.homePhoneInput.sendKeys(homePhone);
    }

    async getHomePhoneInput() {
        return this.homePhoneInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
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

export class ContactDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-contact-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-contact'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

import { element, by, ElementFinder } from 'protractor';

export class OrderLineComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-order-line-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-order-line-my-suffix div h2#page-heading span')).first();

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

export class OrderLineUpdatePage {
    pageTitle = element(by.id('jhi-order-line-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));
    rateInput = element(by.id('field_rate'));
    totalPriceInput = element(by.id('field_totalPrice'));
    discountInput = element(by.id('field_discount'));
    orderBookSelect = element(by.id('field_orderBook'));
    itemSelect = element(by.id('field_item'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setQuantityInput(quantity) {
        await this.quantityInput.sendKeys(quantity);
    }

    async getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    async setRateInput(rate) {
        await this.rateInput.sendKeys(rate);
    }

    async getRateInput() {
        return this.rateInput.getAttribute('value');
    }

    async setTotalPriceInput(totalPrice) {
        await this.totalPriceInput.sendKeys(totalPrice);
    }

    async getTotalPriceInput() {
        return this.totalPriceInput.getAttribute('value');
    }

    async setDiscountInput(discount) {
        await this.discountInput.sendKeys(discount);
    }

    async getDiscountInput() {
        return this.discountInput.getAttribute('value');
    }

    async orderBookSelectLastOption() {
        await this.orderBookSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async orderBookSelectOption(option) {
        await this.orderBookSelect.sendKeys(option);
    }

    getOrderBookSelect(): ElementFinder {
        return this.orderBookSelect;
    }

    async getOrderBookSelectedOption() {
        return this.orderBookSelect.element(by.css('option:checked')).getText();
    }

    async itemSelectLastOption() {
        await this.itemSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async itemSelectOption(option) {
        await this.itemSelect.sendKeys(option);
    }

    getItemSelect(): ElementFinder {
        return this.itemSelect;
    }

    async getItemSelectedOption() {
        return this.itemSelect.element(by.css('option:checked')).getText();
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

export class OrderLineDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orderLine-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orderLine'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

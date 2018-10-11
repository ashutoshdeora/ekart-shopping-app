import { element, by, ElementFinder } from 'protractor';

export class OrderBookComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-order-book-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-order-book-my-suffix div h2#page-heading span')).first();

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

export class OrderBookUpdatePage {
    pageTitle = element(by.id('jhi-order-book-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    orderDateInput = element(by.id('field_orderDate'));
    totalPriceInput = element(by.id('field_totalPrice'));
    discountInput = element(by.id('field_discount'));
    priceAfterDiscountInput = element(by.id('field_priceAfterDiscount'));
    orderStatusInput = element(by.id('field_orderStatus'));
    customerSelect = element(by.id('field_customer'));
    deliveryAddressSelect = element(by.id('field_deliveryAddress'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setOrderDateInput(orderDate) {
        await this.orderDateInput.sendKeys(orderDate);
    }

    async getOrderDateInput() {
        return this.orderDateInput.getAttribute('value');
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

    async setPriceAfterDiscountInput(priceAfterDiscount) {
        await this.priceAfterDiscountInput.sendKeys(priceAfterDiscount);
    }

    async getPriceAfterDiscountInput() {
        return this.priceAfterDiscountInput.getAttribute('value');
    }

    async setOrderStatusInput(orderStatus) {
        await this.orderStatusInput.sendKeys(orderStatus);
    }

    async getOrderStatusInput() {
        return this.orderStatusInput.getAttribute('value');
    }

    async customerSelectLastOption() {
        await this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async customerSelectOption(option) {
        await this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    async getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
    }

    async deliveryAddressSelectLastOption() {
        await this.deliveryAddressSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async deliveryAddressSelectOption(option) {
        await this.deliveryAddressSelect.sendKeys(option);
    }

    getDeliveryAddressSelect(): ElementFinder {
        return this.deliveryAddressSelect;
    }

    async getDeliveryAddressSelectedOption() {
        return this.deliveryAddressSelect.element(by.css('option:checked')).getText();
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

export class OrderBookDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-orderBook-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-orderBook'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

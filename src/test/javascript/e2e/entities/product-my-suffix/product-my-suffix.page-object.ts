import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-product-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-product-my-suffix div h2#page-heading span')).first();

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

export class ProductUpdatePage {
    pageTitle = element(by.id('jhi-product-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    productNameInput = element(by.id('field_productName'));
    productDescriptionInput = element(by.id('field_productDescription'));
    productCategoryInput = element(by.id('field_productCategory'));
    availableStockInput = element(by.id('field_availableStock'));
    costInput = element(by.id('field_cost'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setProductNameInput(productName) {
        await this.productNameInput.sendKeys(productName);
    }

    async getProductNameInput() {
        return this.productNameInput.getAttribute('value');
    }

    async setProductDescriptionInput(productDescription) {
        await this.productDescriptionInput.sendKeys(productDescription);
    }

    async getProductDescriptionInput() {
        return this.productDescriptionInput.getAttribute('value');
    }

    async setProductCategoryInput(productCategory) {
        await this.productCategoryInput.sendKeys(productCategory);
    }

    async getProductCategoryInput() {
        return this.productCategoryInput.getAttribute('value');
    }

    async setAvailableStockInput(availableStock) {
        await this.availableStockInput.sendKeys(availableStock);
    }

    async getAvailableStockInput() {
        return this.availableStockInput.getAttribute('value');
    }

    async setCostInput(cost) {
        await this.costInput.sendKeys(cost);
    }

    async getCostInput() {
        return this.costInput.getAttribute('value');
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

export class ProductDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-product-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-product'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}

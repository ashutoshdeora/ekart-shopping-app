/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderBookComponentsPage, OrderBookDeleteDialog, OrderBookUpdatePage } from './order-book-my-suffix.page-object';

const expect = chai.expect;

describe('OrderBook e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let orderBookUpdatePage: OrderBookUpdatePage;
    let orderBookComponentsPage: OrderBookComponentsPage;
    let orderBookDeleteDialog: OrderBookDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load OrderBooks', async () => {
        await navBarPage.goToEntity('order-book-my-suffix');
        orderBookComponentsPage = new OrderBookComponentsPage();
        expect(await orderBookComponentsPage.getTitle()).to.eq('ekartshoppingappApp.orderBook.home.title');
    });

    it('should load create OrderBook page', async () => {
        await orderBookComponentsPage.clickOnCreateButton();
        orderBookUpdatePage = new OrderBookUpdatePage();
        expect(await orderBookUpdatePage.getPageTitle()).to.eq('ekartshoppingappApp.orderBook.home.createOrEditLabel');
        await orderBookUpdatePage.cancel();
    });

    it('should create and save OrderBooks', async () => {
        const nbButtonsBeforeCreate = await orderBookComponentsPage.countDeleteButtons();

        await orderBookComponentsPage.clickOnCreateButton();
        await promise.all([
            orderBookUpdatePage.setOrderDateInput('2000-12-31'),
            orderBookUpdatePage.setTotalPriceInput('5'),
            orderBookUpdatePage.setDiscountInput('discount'),
            orderBookUpdatePage.setPriceAfterDiscountInput('5'),
            orderBookUpdatePage.setOrderStatusInput('orderStatus'),
            orderBookUpdatePage.customerSelectLastOption(),
            orderBookUpdatePage.deliveryAddressSelectLastOption()
        ]);
        expect(await orderBookUpdatePage.getOrderDateInput()).to.eq('2000-12-31');
        expect(await orderBookUpdatePage.getTotalPriceInput()).to.eq('5');
        expect(await orderBookUpdatePage.getDiscountInput()).to.eq('discount');
        expect(await orderBookUpdatePage.getPriceAfterDiscountInput()).to.eq('5');
        expect(await orderBookUpdatePage.getOrderStatusInput()).to.eq('orderStatus');
        await orderBookUpdatePage.save();
        expect(await orderBookUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await orderBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrderBook', async () => {
        const nbButtonsBeforeDelete = await orderBookComponentsPage.countDeleteButtons();
        await orderBookComponentsPage.clickOnLastDeleteButton();

        orderBookDeleteDialog = new OrderBookDeleteDialog();
        expect(await orderBookDeleteDialog.getDialogTitle()).to.eq('ekartshoppingappApp.orderBook.delete.question');
        await orderBookDeleteDialog.clickOnConfirmButton();

        expect(await orderBookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

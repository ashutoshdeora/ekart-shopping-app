/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderLineComponentsPage, OrderLineDeleteDialog, OrderLineUpdatePage } from './order-line-my-suffix.page-object';

const expect = chai.expect;

describe('OrderLine e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let orderLineUpdatePage: OrderLineUpdatePage;
    let orderLineComponentsPage: OrderLineComponentsPage;
    let orderLineDeleteDialog: OrderLineDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load OrderLines', async () => {
        await navBarPage.goToEntity('order-line-my-suffix');
        orderLineComponentsPage = new OrderLineComponentsPage();
        expect(await orderLineComponentsPage.getTitle()).to.eq('ekartshoppingappApp.orderLine.home.title');
    });

    it('should load create OrderLine page', async () => {
        await orderLineComponentsPage.clickOnCreateButton();
        orderLineUpdatePage = new OrderLineUpdatePage();
        expect(await orderLineUpdatePage.getPageTitle()).to.eq('ekartshoppingappApp.orderLine.home.createOrEditLabel');
        await orderLineUpdatePage.cancel();
    });

    it('should create and save OrderLines', async () => {
        const nbButtonsBeforeCreate = await orderLineComponentsPage.countDeleteButtons();

        await orderLineComponentsPage.clickOnCreateButton();
        await promise.all([
            orderLineUpdatePage.setQuantityInput('5'),
            orderLineUpdatePage.setRateInput('5'),
            orderLineUpdatePage.setTotalPriceInput('5'),
            orderLineUpdatePage.setDiscountInput('5'),
            orderLineUpdatePage.orderBookSelectLastOption(),
            orderLineUpdatePage.itemSelectLastOption()
        ]);
        expect(await orderLineUpdatePage.getQuantityInput()).to.eq('5');
        expect(await orderLineUpdatePage.getRateInput()).to.eq('5');
        expect(await orderLineUpdatePage.getTotalPriceInput()).to.eq('5');
        expect(await orderLineUpdatePage.getDiscountInput()).to.eq('5');
        await orderLineUpdatePage.save();
        expect(await orderLineUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await orderLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last OrderLine', async () => {
        const nbButtonsBeforeDelete = await orderLineComponentsPage.countDeleteButtons();
        await orderLineComponentsPage.clickOnLastDeleteButton();

        orderLineDeleteDialog = new OrderLineDeleteDialog();
        expect(await orderLineDeleteDialog.getDialogTitle()).to.eq('ekartshoppingappApp.orderLine.delete.question');
        await orderLineDeleteDialog.clickOnConfirmButton();

        expect(await orderLineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

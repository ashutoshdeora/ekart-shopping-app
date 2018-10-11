/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NotificationComponentsPage, NotificationDeleteDialog, NotificationUpdatePage } from './notification-my-suffix.page-object';

const expect = chai.expect;

describe('Notification e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let notificationUpdatePage: NotificationUpdatePage;
    let notificationComponentsPage: NotificationComponentsPage;
    let notificationDeleteDialog: NotificationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Notifications', async () => {
        await navBarPage.goToEntity('notification-my-suffix');
        notificationComponentsPage = new NotificationComponentsPage();
        expect(await notificationComponentsPage.getTitle()).to.eq('ekartshoppingappApp.notification.home.title');
    });

    it('should load create Notification page', async () => {
        await notificationComponentsPage.clickOnCreateButton();
        notificationUpdatePage = new NotificationUpdatePage();
        expect(await notificationUpdatePage.getPageTitle()).to.eq('ekartshoppingappApp.notification.home.createOrEditLabel');
        await notificationUpdatePage.cancel();
    });

    it('should create and save Notifications', async () => {
        const nbButtonsBeforeCreate = await notificationComponentsPage.countDeleteButtons();

        await notificationComponentsPage.clickOnCreateButton();
        await promise.all([
            notificationUpdatePage.setNotificationDateInput('2000-12-31'),
            notificationUpdatePage.setNotificationStatusInput('5'),
            notificationUpdatePage.setReciepentAddressInput('reciepentAddress'),
            notificationUpdatePage.setNotificationBodyInput('notificationBody'),
            notificationUpdatePage.orderDetailsSelectLastOption()
        ]);
        expect(await notificationUpdatePage.getNotificationDateInput()).to.eq('2000-12-31');
        expect(await notificationUpdatePage.getNotificationStatusInput()).to.eq('5');
        expect(await notificationUpdatePage.getReciepentAddressInput()).to.eq('reciepentAddress');
        expect(await notificationUpdatePage.getNotificationBodyInput()).to.eq('notificationBody');
        await notificationUpdatePage.save();
        expect(await notificationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Notification', async () => {
        const nbButtonsBeforeDelete = await notificationComponentsPage.countDeleteButtons();
        await notificationComponentsPage.clickOnLastDeleteButton();

        notificationDeleteDialog = new NotificationDeleteDialog();
        expect(await notificationDeleteDialog.getDialogTitle()).to.eq('ekartshoppingappApp.notification.delete.question');
        await notificationDeleteDialog.clickOnConfirmButton();

        expect(await notificationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EkartshoppingappSharedModule } from 'app/shared';
import {
    NotificationMySuffixComponent,
    NotificationMySuffixDetailComponent,
    NotificationMySuffixUpdateComponent,
    NotificationMySuffixDeletePopupComponent,
    NotificationMySuffixDeleteDialogComponent,
    notificationRoute,
    notificationPopupRoute
} from './';

const ENTITY_STATES = [...notificationRoute, ...notificationPopupRoute];

@NgModule({
    imports: [EkartshoppingappSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NotificationMySuffixComponent,
        NotificationMySuffixDetailComponent,
        NotificationMySuffixUpdateComponent,
        NotificationMySuffixDeleteDialogComponent,
        NotificationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        NotificationMySuffixComponent,
        NotificationMySuffixUpdateComponent,
        NotificationMySuffixDeleteDialogComponent,
        NotificationMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EkartshoppingappNotificationMySuffixModule {}

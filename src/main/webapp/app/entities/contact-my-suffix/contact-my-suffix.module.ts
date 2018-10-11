import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EkartshoppingappSharedModule } from 'app/shared';
import {
    ContactMySuffixComponent,
    ContactMySuffixDetailComponent,
    ContactMySuffixUpdateComponent,
    ContactMySuffixDeletePopupComponent,
    ContactMySuffixDeleteDialogComponent,
    contactRoute,
    contactPopupRoute
} from './';

const ENTITY_STATES = [...contactRoute, ...contactPopupRoute];

@NgModule({
    imports: [EkartshoppingappSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContactMySuffixComponent,
        ContactMySuffixDetailComponent,
        ContactMySuffixUpdateComponent,
        ContactMySuffixDeleteDialogComponent,
        ContactMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ContactMySuffixComponent,
        ContactMySuffixUpdateComponent,
        ContactMySuffixDeleteDialogComponent,
        ContactMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EkartshoppingappContactMySuffixModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EkartshoppingappSharedModule } from 'app/shared';
import {
    AddressMySuffixComponent,
    AddressMySuffixDetailComponent,
    AddressMySuffixUpdateComponent,
    AddressMySuffixDeletePopupComponent,
    AddressMySuffixDeleteDialogComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [...addressRoute, ...addressPopupRoute];

@NgModule({
    imports: [EkartshoppingappSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressMySuffixComponent,
        AddressMySuffixDetailComponent,
        AddressMySuffixUpdateComponent,
        AddressMySuffixDeleteDialogComponent,
        AddressMySuffixDeletePopupComponent
    ],
    entryComponents: [
        AddressMySuffixComponent,
        AddressMySuffixUpdateComponent,
        AddressMySuffixDeleteDialogComponent,
        AddressMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EkartshoppingappAddressMySuffixModule {}

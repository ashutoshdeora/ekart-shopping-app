import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EkartshoppingappSharedModule } from 'app/shared';
import {
    OrderBookMySuffixComponent,
    OrderBookMySuffixDetailComponent,
    OrderBookMySuffixUpdateComponent,
    OrderBookMySuffixDeletePopupComponent,
    OrderBookMySuffixDeleteDialogComponent,
    orderBookRoute,
    orderBookPopupRoute
} from './';

const ENTITY_STATES = [...orderBookRoute, ...orderBookPopupRoute];

@NgModule({
    imports: [EkartshoppingappSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderBookMySuffixComponent,
        OrderBookMySuffixDetailComponent,
        OrderBookMySuffixUpdateComponent,
        OrderBookMySuffixDeleteDialogComponent,
        OrderBookMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OrderBookMySuffixComponent,
        OrderBookMySuffixUpdateComponent,
        OrderBookMySuffixDeleteDialogComponent,
        OrderBookMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EkartshoppingappOrderBookMySuffixModule {}

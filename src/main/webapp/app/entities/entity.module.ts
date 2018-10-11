import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EkartshoppingappCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { EkartshoppingappProductMySuffixModule } from './product-my-suffix/product-my-suffix.module';
import { EkartshoppingappAddressMySuffixModule } from './address-my-suffix/address-my-suffix.module';
import { EkartshoppingappContactMySuffixModule } from './contact-my-suffix/contact-my-suffix.module';
import { EkartshoppingappCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { EkartshoppingappOrderBookMySuffixModule } from './order-book-my-suffix/order-book-my-suffix.module';
import { EkartshoppingappNotificationMySuffixModule } from './notification-my-suffix/notification-my-suffix.module';
import { EkartshoppingappOrderLineMySuffixModule } from './order-line-my-suffix/order-line-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EkartshoppingappCountryMySuffixModule,
        EkartshoppingappProductMySuffixModule,
        EkartshoppingappAddressMySuffixModule,
        EkartshoppingappContactMySuffixModule,
        EkartshoppingappCustomerMySuffixModule,
        EkartshoppingappOrderBookMySuffixModule,
        EkartshoppingappNotificationMySuffixModule,
        EkartshoppingappOrderLineMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EkartshoppingappEntityModule {}

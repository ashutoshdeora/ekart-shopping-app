import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';
import { AddressMySuffixService } from 'app/entities/address-my-suffix';
import { IContactMySuffix } from 'app/shared/model/contact-my-suffix.model';
import { ContactMySuffixService } from 'app/entities/contact-my-suffix';

@Component({
    selector: 'jhi-customer-my-suffix-update',
    templateUrl: './customer-my-suffix-update.component.html'
})
export class CustomerMySuffixUpdateComponent implements OnInit {
    customer: ICustomerMySuffix;
    isSaving: boolean;

    billtoaddresses: IAddressMySuffix[];

    shiptoaddresses: IAddressMySuffix[];

    contactdetails: IContactMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMySuffixService,
        private addressService: AddressMySuffixService,
        private contactService: ContactMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
        this.addressService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<IAddressMySuffix[]>) => {
                if (!this.customer.billToAddressId) {
                    this.billtoaddresses = res.body;
                } else {
                    this.addressService.find(this.customer.billToAddressId).subscribe(
                        (subRes: HttpResponse<IAddressMySuffix>) => {
                            this.billtoaddresses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.addressService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<IAddressMySuffix[]>) => {
                if (!this.customer.shipToAddressId) {
                    this.shiptoaddresses = res.body;
                } else {
                    this.addressService.find(this.customer.shipToAddressId).subscribe(
                        (subRes: HttpResponse<IAddressMySuffix>) => {
                            this.shiptoaddresses = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.contactService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<IContactMySuffix[]>) => {
                if (!this.customer.contactDetailsId) {
                    this.contactdetails = res.body;
                } else {
                    this.contactService.find(this.customer.contactDetailsId).subscribe(
                        (subRes: HttpResponse<IContactMySuffix>) => {
                            this.contactdetails = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerMySuffix>>) {
        result.subscribe((res: HttpResponse<ICustomerMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAddressById(index: number, item: IAddressMySuffix) {
        return item.id;
    }

    trackContactById(index: number, item: IContactMySuffix) {
        return item.id;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';
import { OrderBookMySuffixService } from './order-book-my-suffix.service';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';
import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';
import { AddressMySuffixService } from 'app/entities/address-my-suffix';

@Component({
    selector: 'jhi-order-book-my-suffix-update',
    templateUrl: './order-book-my-suffix-update.component.html'
})
export class OrderBookMySuffixUpdateComponent implements OnInit {
    orderBook: IOrderBookMySuffix;
    isSaving: boolean;

    customers: ICustomerMySuffix[];

    deliveryaddresses: IAddressMySuffix[];
    orderDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderBookService: OrderBookMySuffixService,
        private customerService: CustomerMySuffixService,
        private addressService: AddressMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderBook }) => {
            this.orderBook = orderBook;
        });
        this.customerService.query({ filter: 'orderbook-is-null' }).subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                if (!this.orderBook.customerId) {
                    this.customers = res.body;
                } else {
                    this.customerService.find(this.orderBook.customerId).subscribe(
                        (subRes: HttpResponse<ICustomerMySuffix>) => {
                            this.customers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.addressService.query({ filter: 'orderbook-is-null' }).subscribe(
            (res: HttpResponse<IAddressMySuffix[]>) => {
                if (!this.orderBook.deliveryAddressId) {
                    this.deliveryaddresses = res.body;
                } else {
                    this.addressService.find(this.orderBook.deliveryAddressId).subscribe(
                        (subRes: HttpResponse<IAddressMySuffix>) => {
                            this.deliveryaddresses = [subRes.body].concat(res.body);
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
        if (this.orderBook.id !== undefined) {
            this.subscribeToSaveResponse(this.orderBookService.update(this.orderBook));
        } else {
            this.subscribeToSaveResponse(this.orderBookService.create(this.orderBook));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderBookMySuffix>>) {
        result.subscribe((res: HttpResponse<IOrderBookMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomerMySuffix) {
        return item.id;
    }

    trackAddressById(index: number, item: IAddressMySuffix) {
        return item.id;
    }
}

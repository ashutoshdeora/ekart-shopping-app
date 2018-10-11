import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { INotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';
import { NotificationMySuffixService } from './notification-my-suffix.service';
import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';
import { OrderBookMySuffixService } from 'app/entities/order-book-my-suffix';

@Component({
    selector: 'jhi-notification-my-suffix-update',
    templateUrl: './notification-my-suffix-update.component.html'
})
export class NotificationMySuffixUpdateComponent implements OnInit {
    notification: INotificationMySuffix;
    isSaving: boolean;

    orderdetails: IOrderBookMySuffix[];
    notificationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private notificationService: NotificationMySuffixService,
        private orderBookService: OrderBookMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notification }) => {
            this.notification = notification;
        });
        this.orderBookService.query({ filter: 'notification-is-null' }).subscribe(
            (res: HttpResponse<IOrderBookMySuffix[]>) => {
                if (!this.notification.orderDetailsId) {
                    this.orderdetails = res.body;
                } else {
                    this.orderBookService.find(this.notification.orderDetailsId).subscribe(
                        (subRes: HttpResponse<IOrderBookMySuffix>) => {
                            this.orderdetails = [subRes.body].concat(res.body);
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
        if (this.notification.id !== undefined) {
            this.subscribeToSaveResponse(this.notificationService.update(this.notification));
        } else {
            this.subscribeToSaveResponse(this.notificationService.create(this.notification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INotificationMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<INotificationMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackOrderBookById(index: number, item: IOrderBookMySuffix) {
        return item.id;
    }
}

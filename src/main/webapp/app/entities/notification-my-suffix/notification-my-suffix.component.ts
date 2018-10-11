import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';
import { Principal } from 'app/core';
import { NotificationMySuffixService } from './notification-my-suffix.service';

@Component({
    selector: 'jhi-notification-my-suffix',
    templateUrl: './notification-my-suffix.component.html'
})
export class NotificationMySuffixComponent implements OnInit, OnDestroy {
    notifications: INotificationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notificationService: NotificationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.notificationService.query().subscribe(
            (res: HttpResponse<INotificationMySuffix[]>) => {
                this.notifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNotifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INotificationMySuffix) {
        return item.id;
    }

    registerChangeInNotifications() {
        this.eventSubscriber = this.eventManager.subscribe('notificationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

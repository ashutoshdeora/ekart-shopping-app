import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';

@Component({
    selector: 'jhi-notification-my-suffix-detail',
    templateUrl: './notification-my-suffix-detail.component.html'
})
export class NotificationMySuffixDetailComponent implements OnInit {
    notification: INotificationMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notification }) => {
            this.notification = notification;
        });
    }

    previousState() {
        window.history.back();
    }
}

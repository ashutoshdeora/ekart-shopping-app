import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';
import { NotificationMySuffixService } from './notification-my-suffix.service';
import { NotificationMySuffixComponent } from './notification-my-suffix.component';
import { NotificationMySuffixDetailComponent } from './notification-my-suffix-detail.component';
import { NotificationMySuffixUpdateComponent } from './notification-my-suffix-update.component';
import { NotificationMySuffixDeletePopupComponent } from './notification-my-suffix-delete-dialog.component';
import { INotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class NotificationMySuffixResolve implements Resolve<INotificationMySuffix> {
    constructor(private service: NotificationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((notification: HttpResponse<NotificationMySuffix>) => notification.body));
        }
        return of(new NotificationMySuffix());
    }
}

export const notificationRoute: Routes = [
    {
        path: 'notification-my-suffix',
        component: NotificationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.notification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-my-suffix/:id/view',
        component: NotificationMySuffixDetailComponent,
        resolve: {
            notification: NotificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.notification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-my-suffix/new',
        component: NotificationMySuffixUpdateComponent,
        resolve: {
            notification: NotificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.notification.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notification-my-suffix/:id/edit',
        component: NotificationMySuffixUpdateComponent,
        resolve: {
            notification: NotificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.notification.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificationPopupRoute: Routes = [
    {
        path: 'notification-my-suffix/:id/delete',
        component: NotificationMySuffixDeletePopupComponent,
        resolve: {
            notification: NotificationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.notification.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

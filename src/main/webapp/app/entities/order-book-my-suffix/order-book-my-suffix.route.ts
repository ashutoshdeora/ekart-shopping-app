import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';
import { OrderBookMySuffixService } from './order-book-my-suffix.service';
import { OrderBookMySuffixComponent } from './order-book-my-suffix.component';
import { OrderBookMySuffixDetailComponent } from './order-book-my-suffix-detail.component';
import { OrderBookMySuffixUpdateComponent } from './order-book-my-suffix-update.component';
import { OrderBookMySuffixDeletePopupComponent } from './order-book-my-suffix-delete-dialog.component';
import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderBookMySuffixResolve implements Resolve<IOrderBookMySuffix> {
    constructor(private service: OrderBookMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderBook: HttpResponse<OrderBookMySuffix>) => orderBook.body));
        }
        return of(new OrderBookMySuffix());
    }
}

export const orderBookRoute: Routes = [
    {
        path: 'order-book-my-suffix',
        component: OrderBookMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.orderBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-book-my-suffix/:id/view',
        component: OrderBookMySuffixDetailComponent,
        resolve: {
            orderBook: OrderBookMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.orderBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-book-my-suffix/new',
        component: OrderBookMySuffixUpdateComponent,
        resolve: {
            orderBook: OrderBookMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.orderBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-book-my-suffix/:id/edit',
        component: OrderBookMySuffixUpdateComponent,
        resolve: {
            orderBook: OrderBookMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.orderBook.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderBookPopupRoute: Routes = [
    {
        path: 'order-book-my-suffix/:id/delete',
        component: OrderBookMySuffixDeletePopupComponent,
        resolve: {
            orderBook: OrderBookMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.orderBook.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

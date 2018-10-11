import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressMySuffix } from 'app/shared/model/address-my-suffix.model';
import { AddressMySuffixService } from './address-my-suffix.service';
import { AddressMySuffixComponent } from './address-my-suffix.component';
import { AddressMySuffixDetailComponent } from './address-my-suffix-detail.component';
import { AddressMySuffixUpdateComponent } from './address-my-suffix-update.component';
import { AddressMySuffixDeletePopupComponent } from './address-my-suffix-delete-dialog.component';
import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class AddressMySuffixResolve implements Resolve<IAddressMySuffix> {
    constructor(private service: AddressMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((address: HttpResponse<AddressMySuffix>) => address.body));
        }
        return of(new AddressMySuffix());
    }
}

export const addressRoute: Routes = [
    {
        path: 'address-my-suffix',
        component: AddressMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-my-suffix/:id/view',
        component: AddressMySuffixDetailComponent,
        resolve: {
            address: AddressMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-my-suffix/new',
        component: AddressMySuffixUpdateComponent,
        resolve: {
            address: AddressMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-my-suffix/:id/edit',
        component: AddressMySuffixUpdateComponent,
        resolve: {
            address: AddressMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-my-suffix/:id/delete',
        component: AddressMySuffixDeletePopupComponent,
        resolve: {
            address: AddressMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

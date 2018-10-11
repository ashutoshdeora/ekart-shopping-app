import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactMySuffix } from 'app/shared/model/contact-my-suffix.model';
import { ContactMySuffixService } from './contact-my-suffix.service';
import { ContactMySuffixComponent } from './contact-my-suffix.component';
import { ContactMySuffixDetailComponent } from './contact-my-suffix-detail.component';
import { ContactMySuffixUpdateComponent } from './contact-my-suffix-update.component';
import { ContactMySuffixDeletePopupComponent } from './contact-my-suffix-delete-dialog.component';
import { IContactMySuffix } from 'app/shared/model/contact-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ContactMySuffixResolve implements Resolve<IContactMySuffix> {
    constructor(private service: ContactMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((contact: HttpResponse<ContactMySuffix>) => contact.body));
        }
        return of(new ContactMySuffix());
    }
}

export const contactRoute: Routes = [
    {
        path: 'contact-my-suffix',
        component: ContactMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contact-my-suffix/:id/view',
        component: ContactMySuffixDetailComponent,
        resolve: {
            contact: ContactMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contact-my-suffix/new',
        component: ContactMySuffixUpdateComponent,
        resolve: {
            contact: ContactMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contact-my-suffix/:id/edit',
        component: ContactMySuffixUpdateComponent,
        resolve: {
            contact: ContactMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: 'contact-my-suffix/:id/delete',
        component: ContactMySuffixDeletePopupComponent,
        resolve: {
            contact: ContactMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ekartshoppingappApp.contact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

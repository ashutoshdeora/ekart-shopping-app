import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactMySuffix } from 'app/shared/model/contact-my-suffix.model';

@Component({
    selector: 'jhi-contact-my-suffix-detail',
    templateUrl: './contact-my-suffix-detail.component.html'
})
export class ContactMySuffixDetailComponent implements OnInit {
    contact: IContactMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contact }) => {
            this.contact = contact;
        });
    }

    previousState() {
        window.history.back();
    }
}

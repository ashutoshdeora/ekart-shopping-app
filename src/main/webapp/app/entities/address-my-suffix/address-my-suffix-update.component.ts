import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAddressMySuffix } from 'app/shared/model/address-my-suffix.model';
import { AddressMySuffixService } from './address-my-suffix.service';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix';

@Component({
    selector: 'jhi-address-my-suffix-update',
    templateUrl: './address-my-suffix-update.component.html'
})
export class AddressMySuffixUpdateComponent implements OnInit {
    address: IAddressMySuffix;
    isSaving: boolean;

    countries: ICountryMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private addressService: AddressMySuffixService,
        private countryService: CountryMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
        this.countryService.query({ filter: 'address-is-null' }).subscribe(
            (res: HttpResponse<ICountryMySuffix[]>) => {
                if (!this.address.countryId) {
                    this.countries = res.body;
                } else {
                    this.countryService.find(this.address.countryId).subscribe(
                        (subRes: HttpResponse<ICountryMySuffix>) => {
                            this.countries = [subRes.body].concat(res.body);
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
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAddressMySuffix>>) {
        result.subscribe((res: HttpResponse<IAddressMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCountryById(index: number, item: ICountryMySuffix) {
        return item.id;
    }
}

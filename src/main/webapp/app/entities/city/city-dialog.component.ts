import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { City } from './city.model';
import { CityPopupService } from './city-popup.service';
import { CityService } from './city.service';
import { Country, CountryService } from '../country';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-city-dialog',
    templateUrl: './city-dialog.component.html'
})
export class CityDialogComponent implements OnInit {

    city: City;
    authorities: any[];
    isSaving: boolean;

    countries: Country[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private cityService: CityService,
        private countryService: CountryService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.countryService.query()
            .subscribe((res: ResponseWrapper) => { this.countries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityService.update(this.city), false);
        } else {
            this.subscribeToSaveResponse(
                this.cityService.create(this.city), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<City>, isCreated: boolean) {
        result.subscribe((res: City) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: City, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'firstAppApp.city.created'
            : 'firstAppApp.city.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'cityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-city-popup',
    template: ''
})
export class CityPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.cityPopupService
                    .open(CityDialogComponent, params['id']);
            } else {
                this.modalRef = this.cityPopupService
                    .open(CityDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

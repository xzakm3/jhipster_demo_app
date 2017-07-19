import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { City } from './city.model';
import { CityService } from './city.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import {Country} from "../country/country.model";

@Component({
    selector: 'jhi-city',
    templateUrl: './city.component.html'
})
export class CityComponent implements OnInit, OnDestroy {
    cities: City[];
    countriesNames: string[];
    selectedCountryName: string;
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(
        private cityService: CityService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private parseLinks: ParseLinks,
        private principal: Principal
    ) {
        this.selectedCountryName = null;
        this.countriesNames = [];
        this.cities = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.countriesNames = [];
        this.cityService.queryAll({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json),
            () => this.getUniqueCountries(this.cities)
        );

    }

    getUniqueCountries(cities: City[]) {
        const flags = [];
        for (let i = 0; i < cities.length; i++) {
            if (flags[cities[i].country.countryName] !== true) {
                flags[cities[i].country.countryName] = true;
                this.countriesNames.push(cities[i].country.countryName);
            }
        }
    }

    changeCountry() {
        this.cityService.querySpecific({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        },
            this.selectedCountryName
        ).subscribe(
            (res: ResponseWrapper) => {
                this.onSuccess(res.json, res.headers);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.cities = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: City) {
        return item.id;
    }
    registerChangeInCities() {
        this.eventSubscriber = this.eventManager.subscribe('cityListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    makeArrayEmpty(array: any[]) {
        return (array = []);
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.cities = data;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

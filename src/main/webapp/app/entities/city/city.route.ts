import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { CityComponent } from './city.component';
import { CityDetailComponent } from './city-detail.component';
import { CityPopupComponent } from './city-dialog.component';
import { CityDeletePopupComponent } from './city-delete-dialog.component';

import { Principal } from '../../shared';

export const cityRoute: Routes = [
    {
        path: 'city',
        component: CityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'firstAppApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'city/:id',
        component: CityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'firstAppApp.city.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cityPopupRoute: Routes = [
    {
        path: 'city-new',
        component: CityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'firstAppApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city/:id/edit',
        component: CityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'firstAppApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'city/:id/delete',
        component: CityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'firstAppApp.city.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

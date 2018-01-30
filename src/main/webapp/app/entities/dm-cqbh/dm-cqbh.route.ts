import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DmCqbhComponent } from './dm-cqbh.component';
import { DmCqbhDetailComponent } from './dm-cqbh-detail.component';
import { DmCqbhPopupComponent } from './dm-cqbh-dialog.component';
import { DmCqbhDeletePopupComponent } from './dm-cqbh-delete-dialog.component';

@Injectable()
export class DmCqbhResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const dmCqbhRoute: Routes = [
    {
        path: 'dm-cqbh',
        component: DmCqbhComponent,
        resolve: {
            'pagingParams': DmCqbhResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.dmCqbh.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dm-cqbh/:id',
        component: DmCqbhDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.dmCqbh.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dmCqbhPopupRoute: Routes = [
    {
        path: 'dm-cqbh-new',
        component: DmCqbhPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.dmCqbh.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-cqbh/:id/edit',
        component: DmCqbhPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.dmCqbh.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dm-cqbh/:id/delete',
        component: DmCqbhDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.dmCqbh.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

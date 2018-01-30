import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { HoSoCnComponent } from './ho-so-cn.component';
import { HoSoCnDetailComponent } from './ho-so-cn-detail.component';
import { HoSoCnPopupComponent } from './ho-so-cn-dialog.component';
import { HoSoCnDeletePopupComponent } from './ho-so-cn-delete-dialog.component';

@Injectable()
export class HoSoCnResolvePagingParams implements Resolve<any> {

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

export const hoSoCnRoute: Routes = [
    {
        path: 'ho-so-cn',
        component: HoSoCnComponent,
        resolve: {
            'pagingParams': HoSoCnResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.hoSoCn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ho-so-cn/:id',
        component: HoSoCnDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.hoSoCn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hoSoCnPopupRoute: Routes = [
    {
        path: 'ho-so-cn-new',
        component: HoSoCnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.hoSoCn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ho-so-cn/:id/edit',
        component: HoSoCnPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.hoSoCn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ho-so-cn/:id/delete',
        component: HoSoCnDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'savemeappApp.hoSoCn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

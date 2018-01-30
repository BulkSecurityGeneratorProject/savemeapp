import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SavemeappSharedModule } from '../../shared';
import {
    HoSoCnService,
    HoSoCnPopupService,
    HoSoCnComponent,
    HoSoCnDetailComponent,
    HoSoCnDialogComponent,
    HoSoCnPopupComponent,
    HoSoCnDeletePopupComponent,
    HoSoCnDeleteDialogComponent,
    hoSoCnRoute,
    hoSoCnPopupRoute,
    HoSoCnResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...hoSoCnRoute,
    ...hoSoCnPopupRoute,
];

@NgModule({
    imports: [
        SavemeappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HoSoCnComponent,
        HoSoCnDetailComponent,
        HoSoCnDialogComponent,
        HoSoCnDeleteDialogComponent,
        HoSoCnPopupComponent,
        HoSoCnDeletePopupComponent,
    ],
    entryComponents: [
        HoSoCnComponent,
        HoSoCnDialogComponent,
        HoSoCnPopupComponent,
        HoSoCnDeleteDialogComponent,
        HoSoCnDeletePopupComponent,
    ],
    providers: [
        HoSoCnService,
        HoSoCnPopupService,
        HoSoCnResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SavemeappHoSoCnModule {}

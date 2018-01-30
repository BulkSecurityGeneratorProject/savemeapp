import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SavemeappSharedModule } from '../../shared';
import {
    DmCqbhService,
    DmCqbhPopupService,
    DmCqbhComponent,
    DmCqbhDetailComponent,
    DmCqbhDialogComponent,
    DmCqbhPopupComponent,
    DmCqbhDeletePopupComponent,
    DmCqbhDeleteDialogComponent,
    dmCqbhRoute,
    dmCqbhPopupRoute,
    DmCqbhResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dmCqbhRoute,
    ...dmCqbhPopupRoute,
];

@NgModule({
    imports: [
        SavemeappSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DmCqbhComponent,
        DmCqbhDetailComponent,
        DmCqbhDialogComponent,
        DmCqbhDeleteDialogComponent,
        DmCqbhPopupComponent,
        DmCqbhDeletePopupComponent,
    ],
    entryComponents: [
        DmCqbhComponent,
        DmCqbhDialogComponent,
        DmCqbhPopupComponent,
        DmCqbhDeleteDialogComponent,
        DmCqbhDeletePopupComponent,
    ],
    providers: [
        DmCqbhService,
        DmCqbhPopupService,
        DmCqbhResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SavemeappDmCqbhModule {}

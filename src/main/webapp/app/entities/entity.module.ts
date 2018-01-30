import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SavemeappHoSoCnModule } from './ho-so-cn/ho-so-cn.module';
import { SavemeappDmCqbhModule } from './dm-cqbh/dm-cqbh.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SavemeappHoSoCnModule,
        SavemeappDmCqbhModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SavemeappEntityModule {}

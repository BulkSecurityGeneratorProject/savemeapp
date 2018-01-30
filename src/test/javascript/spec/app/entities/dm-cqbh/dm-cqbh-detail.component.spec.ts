/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SavemeappTestModule } from '../../../test.module';
import { DmCqbhDetailComponent } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh-detail.component';
import { DmCqbhService } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.service';
import { DmCqbh } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.model';

describe('Component Tests', () => {

    describe('DmCqbh Management Detail Component', () => {
        let comp: DmCqbhDetailComponent;
        let fixture: ComponentFixture<DmCqbhDetailComponent>;
        let service: DmCqbhService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [DmCqbhDetailComponent],
                providers: [
                    DmCqbhService
                ]
            })
            .overrideTemplate(DmCqbhDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmCqbhDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmCqbhService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DmCqbh(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dmCqbh).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

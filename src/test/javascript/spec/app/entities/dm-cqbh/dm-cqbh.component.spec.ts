/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SavemeappTestModule } from '../../../test.module';
import { DmCqbhComponent } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.component';
import { DmCqbhService } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.service';
import { DmCqbh } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.model';

describe('Component Tests', () => {

    describe('DmCqbh Management Component', () => {
        let comp: DmCqbhComponent;
        let fixture: ComponentFixture<DmCqbhComponent>;
        let service: DmCqbhService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [DmCqbhComponent],
                providers: [
                    DmCqbhService
                ]
            })
            .overrideTemplate(DmCqbhComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmCqbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmCqbhService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DmCqbh(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dmCqbhs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

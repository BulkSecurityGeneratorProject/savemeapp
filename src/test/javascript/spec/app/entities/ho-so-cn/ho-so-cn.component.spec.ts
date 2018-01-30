/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SavemeappTestModule } from '../../../test.module';
import { HoSoCnComponent } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.component';
import { HoSoCnService } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.service';
import { HoSoCn } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.model';

describe('Component Tests', () => {

    describe('HoSoCn Management Component', () => {
        let comp: HoSoCnComponent;
        let fixture: ComponentFixture<HoSoCnComponent>;
        let service: HoSoCnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [HoSoCnComponent],
                providers: [
                    HoSoCnService
                ]
            })
            .overrideTemplate(HoSoCnComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoSoCnComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoCnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new HoSoCn(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.hoSoCns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

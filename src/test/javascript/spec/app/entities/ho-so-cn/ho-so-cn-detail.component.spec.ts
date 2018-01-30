/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SavemeappTestModule } from '../../../test.module';
import { HoSoCnDetailComponent } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn-detail.component';
import { HoSoCnService } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.service';
import { HoSoCn } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.model';

describe('Component Tests', () => {

    describe('HoSoCn Management Detail Component', () => {
        let comp: HoSoCnDetailComponent;
        let fixture: ComponentFixture<HoSoCnDetailComponent>;
        let service: HoSoCnService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [HoSoCnDetailComponent],
                providers: [
                    HoSoCnService
                ]
            })
            .overrideTemplate(HoSoCnDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoSoCnDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoCnService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HoSoCn(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.hoSoCn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

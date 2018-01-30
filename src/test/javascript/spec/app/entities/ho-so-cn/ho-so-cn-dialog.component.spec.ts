/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SavemeappTestModule } from '../../../test.module';
import { HoSoCnDialogComponent } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn-dialog.component';
import { HoSoCnService } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.service';
import { HoSoCn } from '../../../../../../main/webapp/app/entities/ho-so-cn/ho-so-cn.model';

describe('Component Tests', () => {

    describe('HoSoCn Management Dialog Component', () => {
        let comp: HoSoCnDialogComponent;
        let fixture: ComponentFixture<HoSoCnDialogComponent>;
        let service: HoSoCnService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [HoSoCnDialogComponent],
                providers: [
                    HoSoCnService
                ]
            })
            .overrideTemplate(HoSoCnDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HoSoCnDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HoSoCnService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HoSoCn(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.hoSoCn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hoSoCnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new HoSoCn();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.hoSoCn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hoSoCnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

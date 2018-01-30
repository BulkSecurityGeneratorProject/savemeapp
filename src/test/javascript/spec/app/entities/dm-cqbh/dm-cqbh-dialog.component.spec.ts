/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SavemeappTestModule } from '../../../test.module';
import { DmCqbhDialogComponent } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh-dialog.component';
import { DmCqbhService } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.service';
import { DmCqbh } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.model';

describe('Component Tests', () => {

    describe('DmCqbh Management Dialog Component', () => {
        let comp: DmCqbhDialogComponent;
        let fixture: ComponentFixture<DmCqbhDialogComponent>;
        let service: DmCqbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [DmCqbhDialogComponent],
                providers: [
                    DmCqbhService
                ]
            })
            .overrideTemplate(DmCqbhDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmCqbhDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmCqbhService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DmCqbh(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.dmCqbh = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dmCqbhListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DmCqbh();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.dmCqbh = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dmCqbhListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

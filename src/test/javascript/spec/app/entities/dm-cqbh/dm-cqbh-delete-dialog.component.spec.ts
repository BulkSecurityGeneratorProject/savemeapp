/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SavemeappTestModule } from '../../../test.module';
import { DmCqbhDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh-delete-dialog.component';
import { DmCqbhService } from '../../../../../../main/webapp/app/entities/dm-cqbh/dm-cqbh.service';

describe('Component Tests', () => {

    describe('DmCqbh Management Delete Component', () => {
        let comp: DmCqbhDeleteDialogComponent;
        let fixture: ComponentFixture<DmCqbhDeleteDialogComponent>;
        let service: DmCqbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SavemeappTestModule],
                declarations: [DmCqbhDeleteDialogComponent],
                providers: [
                    DmCqbhService
                ]
            })
            .overrideTemplate(DmCqbhDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DmCqbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DmCqbhService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

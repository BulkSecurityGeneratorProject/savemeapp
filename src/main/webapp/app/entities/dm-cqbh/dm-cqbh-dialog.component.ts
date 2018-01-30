import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DmCqbh } from './dm-cqbh.model';
import { DmCqbhPopupService } from './dm-cqbh-popup.service';
import { DmCqbhService } from './dm-cqbh.service';

@Component({
    selector: 'jhi-dm-cqbh-dialog',
    templateUrl: './dm-cqbh-dialog.component.html'
})
export class DmCqbhDialogComponent implements OnInit {

    dmCqbh: DmCqbh;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dmCqbhService: DmCqbhService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        console.log(this.dmCqbh);
        this.isSaving = true;
        if (this.dmCqbh.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dmCqbhService.update(this.dmCqbh));
        } else {
            this.subscribeToSaveResponse(
                this.dmCqbhService.create(this.dmCqbh));
        }
    }

    private subscribeToSaveResponse(result: Observable<DmCqbh>) {
        result.subscribe((res: DmCqbh) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DmCqbh) {
        this.eventManager.broadcast({ name: 'dmCqbhListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-dm-cqbh-popup',
    template: ''
})
export class DmCqbhPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dmCqbhPopupService: DmCqbhPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dmCqbhPopupService
                    .open(DmCqbhDialogComponent as Component, params['id']);
            } else {
                this.dmCqbhPopupService
                    .open(DmCqbhDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

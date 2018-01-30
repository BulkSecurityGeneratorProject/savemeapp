import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HoSoCn } from './ho-so-cn.model';
import { HoSoCnPopupService } from './ho-so-cn-popup.service';
import { HoSoCnService } from './ho-so-cn.service';

@Component({
    selector: 'jhi-ho-so-cn-dialog',
    templateUrl: './ho-so-cn-dialog.component.html'
})
export class HoSoCnDialogComponent implements OnInit {

    hoSoCn: HoSoCn;
    isSaving: boolean;
    ngaySinhDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private hoSoCnService: HoSoCnService,
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
        this.isSaving = true;
        if (this.hoSoCn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hoSoCnService.update(this.hoSoCn));
        } else {
            this.subscribeToSaveResponse(
                this.hoSoCnService.create(this.hoSoCn));
        }
    }

    private subscribeToSaveResponse(result: Observable<HoSoCn>) {
        result.subscribe((res: HoSoCn) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: HoSoCn) {
        this.eventManager.broadcast({ name: 'hoSoCnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ho-so-cn-popup',
    template: ''
})
export class HoSoCnPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hoSoCnPopupService: HoSoCnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hoSoCnPopupService
                    .open(HoSoCnDialogComponent as Component, params['id']);
            } else {
                this.hoSoCnPopupService
                    .open(HoSoCnDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DmCqbh } from './dm-cqbh.model';
import { DmCqbhPopupService } from './dm-cqbh-popup.service';
import { DmCqbhService } from './dm-cqbh.service';

@Component({
    selector: 'jhi-dm-cqbh-delete-dialog',
    templateUrl: './dm-cqbh-delete-dialog.component.html'
})
export class DmCqbhDeleteDialogComponent {

    dmCqbh: DmCqbh;

    constructor(
        private dmCqbhService: DmCqbhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dmCqbhService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dmCqbhListModification',
                content: 'Deleted an dmCqbh'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dm-cqbh-delete-popup',
    template: ''
})
export class DmCqbhDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dmCqbhPopupService: DmCqbhPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dmCqbhPopupService
                .open(DmCqbhDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

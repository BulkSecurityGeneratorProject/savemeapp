import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { HoSoCn } from './ho-so-cn.model';
import { HoSoCnPopupService } from './ho-so-cn-popup.service';
import { HoSoCnService } from './ho-so-cn.service';

@Component({
    selector: 'jhi-ho-so-cn-delete-dialog',
    templateUrl: './ho-so-cn-delete-dialog.component.html'
})
export class HoSoCnDeleteDialogComponent {

    hoSoCn: HoSoCn;

    constructor(
        private hoSoCnService: HoSoCnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hoSoCnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hoSoCnListModification',
                content: 'Deleted an hoSoCn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ho-so-cn-delete-popup',
    template: ''
})
export class HoSoCnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hoSoCnPopupService: HoSoCnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hoSoCnPopupService
                .open(HoSoCnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { HoSoCn } from './ho-so-cn.model';
import { HoSoCnService } from './ho-so-cn.service';

@Component({
    selector: 'jhi-ho-so-cn-detail',
    templateUrl: './ho-so-cn-detail.component.html'
})
export class HoSoCnDetailComponent implements OnInit, OnDestroy {

    hoSoCn: HoSoCn;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hoSoCnService: HoSoCnService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHoSoCns();
    }

    load(id) {
        this.hoSoCnService.find(id).subscribe((hoSoCn) => {
            this.hoSoCn = hoSoCn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHoSoCns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hoSoCnListModification',
            (response) => this.load(this.hoSoCn.id)
        );
    }
}

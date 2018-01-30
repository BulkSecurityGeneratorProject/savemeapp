import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DmCqbh } from './dm-cqbh.model';
import { DmCqbhService } from './dm-cqbh.service';

@Component({
    selector: 'jhi-dm-cqbh-detail',
    templateUrl: './dm-cqbh-detail.component.html'
})
export class DmCqbhDetailComponent implements OnInit, OnDestroy {

    dmCqbh: DmCqbh;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dmCqbhService: DmCqbhService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDmCqbhs();
    }

    load(id) {
        this.dmCqbhService.find(id).subscribe((dmCqbh) => {
            this.dmCqbh = dmCqbh;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDmCqbhs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dmCqbhListModification',
            (response) => this.load(this.dmCqbh.id)
        );
    }
}

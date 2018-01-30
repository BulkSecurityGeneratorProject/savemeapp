import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HoSoCn } from './ho-so-cn.model';
import { HoSoCnService } from './ho-so-cn.service';

@Injectable()
export class HoSoCnPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private hoSoCnService: HoSoCnService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.hoSoCnService.find(id).subscribe((hoSoCn) => {
                    if (hoSoCn.ngaySinh) {
                        hoSoCn.ngaySinh = {
                            year: hoSoCn.ngaySinh.getFullYear(),
                            month: hoSoCn.ngaySinh.getMonth() + 1,
                            day: hoSoCn.ngaySinh.getDate()
                        };
                    }
                    this.ngbModalRef = this.hoSoCnModalRef(component, hoSoCn);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.hoSoCnModalRef(component, new HoSoCn());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    hoSoCnModalRef(component: Component, hoSoCn: HoSoCn): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.hoSoCn = hoSoCn;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}

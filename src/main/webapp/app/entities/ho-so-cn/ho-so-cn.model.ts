import { BaseEntity } from './../../shared';

export class HoSoCn implements BaseEntity {
    constructor(
        public id?: number,
        public maSo?: string,
        public hoTen?: string,
        public ngaySinh?: any,
        public gioiTinh?: number,
        public diaChi?: string,
    ) {
    }
}

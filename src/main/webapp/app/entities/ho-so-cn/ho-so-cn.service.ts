import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { HoSoCn } from './ho-so-cn.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class HoSoCnService {

    private resourceUrl =  SERVER_API_URL + 'api/ho-so-cns';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(hoSoCn: HoSoCn): Observable<HoSoCn> {
        const copy = this.convert(hoSoCn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(hoSoCn: HoSoCn): Observable<HoSoCn> {
        const copy = this.convert(hoSoCn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<HoSoCn> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to HoSoCn.
     */
    private convertItemFromServer(json: any): HoSoCn {
        const entity: HoSoCn = Object.assign(new HoSoCn(), json);
        entity.ngaySinh = this.dateUtils
            .convertLocalDateFromServer(json.ngaySinh);
        return entity;
    }

    /**
     * Convert a HoSoCn to a JSON which can be sent to the server.
     */
    private convert(hoSoCn: HoSoCn): HoSoCn {
        const copy: HoSoCn = Object.assign({}, hoSoCn);
        copy.ngaySinh = this.dateUtils
            .convertLocalDateToServer(hoSoCn.ngaySinh);
        return copy;
    }
}

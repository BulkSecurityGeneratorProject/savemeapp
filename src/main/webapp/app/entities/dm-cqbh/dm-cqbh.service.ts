import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DmCqbh } from './dm-cqbh.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DmCqbhService {

    private resourceUrl =  SERVER_API_URL + 'api/dm-cqbhs';

    constructor(private http: Http) { }

    create(dmCqbh: DmCqbh): Observable<DmCqbh> {
        const copy = this.convert(dmCqbh);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dmCqbh: DmCqbh): Observable<DmCqbh> {
        const copy = this.convert(dmCqbh);
        console.log(copy);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DmCqbh> {
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
     * Convert a returned JSON object to DmCqbh.
     */
    private convertItemFromServer(json: any): DmCqbh {
        const entity: DmCqbh = Object.assign(new DmCqbh(), json);
        return entity;
    }

    /**
     * Convert a DmCqbh to a JSON which can be sent to the server.
     */
    private convert(dmCqbh: DmCqbh): DmCqbh {
        const copy: DmCqbh = Object.assign({}, dmCqbh);
        return copy;
    }
}

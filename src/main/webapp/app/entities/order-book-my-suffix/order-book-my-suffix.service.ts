import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

type EntityResponseType = HttpResponse<IOrderBookMySuffix>;
type EntityArrayResponseType = HttpResponse<IOrderBookMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrderBookMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/order-books';

    constructor(private http: HttpClient) {}

    create(orderBook: IOrderBookMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderBook);
        return this.http
            .post<IOrderBookMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(orderBook: IOrderBookMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderBook);
        return this.http
            .put<IOrderBookMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrderBookMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrderBookMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(orderBook: IOrderBookMySuffix): IOrderBookMySuffix {
        const copy: IOrderBookMySuffix = Object.assign({}, orderBook, {
            orderDate: orderBook.orderDate != null && orderBook.orderDate.isValid() ? orderBook.orderDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.orderDate = res.body.orderDate != null ? moment(res.body.orderDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((orderBook: IOrderBookMySuffix) => {
            orderBook.orderDate = orderBook.orderDate != null ? moment(orderBook.orderDate) : null;
        });
        return res;
    }
}

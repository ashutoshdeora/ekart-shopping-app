import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';

type EntityResponseType = HttpResponse<INotificationMySuffix>;
type EntityArrayResponseType = HttpResponse<INotificationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class NotificationMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/notifications';

    constructor(private http: HttpClient) {}

    create(notification: INotificationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(notification);
        return this.http
            .post<INotificationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(notification: INotificationMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(notification);
        return this.http
            .put<INotificationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INotificationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INotificationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(notification: INotificationMySuffix): INotificationMySuffix {
        const copy: INotificationMySuffix = Object.assign({}, notification, {
            notificationDate:
                notification.notificationDate != null && notification.notificationDate.isValid()
                    ? notification.notificationDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.notificationDate = res.body.notificationDate != null ? moment(res.body.notificationDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((notification: INotificationMySuffix) => {
            notification.notificationDate = notification.notificationDate != null ? moment(notification.notificationDate) : null;
        });
        return res;
    }
}

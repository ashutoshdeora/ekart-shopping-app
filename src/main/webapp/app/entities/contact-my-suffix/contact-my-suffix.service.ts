import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactMySuffix } from 'app/shared/model/contact-my-suffix.model';

type EntityResponseType = HttpResponse<IContactMySuffix>;
type EntityArrayResponseType = HttpResponse<IContactMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ContactMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/contacts';

    constructor(private http: HttpClient) {}

    create(contact: IContactMySuffix): Observable<EntityResponseType> {
        return this.http.post<IContactMySuffix>(this.resourceUrl, contact, { observe: 'response' });
    }

    update(contact: IContactMySuffix): Observable<EntityResponseType> {
        return this.http.put<IContactMySuffix>(this.resourceUrl, contact, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContactMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContactMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}

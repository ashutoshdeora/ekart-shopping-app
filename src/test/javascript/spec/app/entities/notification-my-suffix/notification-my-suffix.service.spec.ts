/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { NotificationMySuffixService } from 'app/entities/notification-my-suffix/notification-my-suffix.service';
import { INotificationMySuffix, NotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';

describe('Service Tests', () => {
    describe('NotificationMySuffix Service', () => {
        let injector: TestBed;
        let service: NotificationMySuffixService;
        let httpMock: HttpTestingController;
        let elemDefault: INotificationMySuffix;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(NotificationMySuffixService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new NotificationMySuffix(0, currentDate, 0, 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        notificationDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a NotificationMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        notificationDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        notificationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new NotificationMySuffix(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a NotificationMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        notificationDate: currentDate.format(DATE_FORMAT),
                        notificationStatus: 1,
                        reciepentAddress: 'BBBBBB',
                        notificationBody: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        notificationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of NotificationMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        notificationDate: currentDate.format(DATE_FORMAT),
                        notificationStatus: 1,
                        reciepentAddress: 'BBBBBB',
                        notificationBody: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        notificationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a NotificationMySuffix', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});

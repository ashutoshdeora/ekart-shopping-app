/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { OrderBookMySuffixService } from 'app/entities/order-book-my-suffix/order-book-my-suffix.service';
import { IOrderBookMySuffix, OrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

describe('Service Tests', () => {
    describe('OrderBookMySuffix Service', () => {
        let injector: TestBed;
        let service: OrderBookMySuffixService;
        let httpMock: HttpTestingController;
        let elemDefault: IOrderBookMySuffix;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(OrderBookMySuffixService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new OrderBookMySuffix(0, currentDate, 0, 'AAAAAAA', 0, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        orderDate: currentDate.format(DATE_FORMAT)
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

            it('should create a OrderBookMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        orderDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        orderDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new OrderBookMySuffix(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a OrderBookMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        orderDate: currentDate.format(DATE_FORMAT),
                        totalPrice: 1,
                        discount: 'BBBBBB',
                        priceAfterDiscount: 1,
                        orderStatus: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        orderDate: currentDate
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

            it('should return a list of OrderBookMySuffix', async () => {
                const returnedFromService = Object.assign(
                    {
                        orderDate: currentDate.format(DATE_FORMAT),
                        totalPrice: 1,
                        discount: 'BBBBBB',
                        priceAfterDiscount: 1,
                        orderStatus: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        orderDate: currentDate
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

            it('should delete a OrderBookMySuffix', async () => {
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

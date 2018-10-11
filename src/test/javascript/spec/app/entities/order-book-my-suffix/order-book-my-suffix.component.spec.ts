/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EkartshoppingappTestModule } from '../../../test.module';
import { OrderBookMySuffixComponent } from 'app/entities/order-book-my-suffix/order-book-my-suffix.component';
import { OrderBookMySuffixService } from 'app/entities/order-book-my-suffix/order-book-my-suffix.service';
import { OrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderBookMySuffix Management Component', () => {
        let comp: OrderBookMySuffixComponent;
        let fixture: ComponentFixture<OrderBookMySuffixComponent>;
        let service: OrderBookMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [OrderBookMySuffixComponent],
                providers: []
            })
                .overrideTemplate(OrderBookMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderBookMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderBookMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderBookMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderBooks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

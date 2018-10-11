/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EkartshoppingappTestModule } from '../../../test.module';
import { OrderBookMySuffixDetailComponent } from 'app/entities/order-book-my-suffix/order-book-my-suffix-detail.component';
import { OrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderBookMySuffix Management Detail Component', () => {
        let comp: OrderBookMySuffixDetailComponent;
        let fixture: ComponentFixture<OrderBookMySuffixDetailComponent>;
        const route = ({ data: of({ orderBook: new OrderBookMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [OrderBookMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderBookMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderBookMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderBook).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

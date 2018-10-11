/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EkartshoppingappTestModule } from '../../../test.module';
import { OrderBookMySuffixUpdateComponent } from 'app/entities/order-book-my-suffix/order-book-my-suffix-update.component';
import { OrderBookMySuffixService } from 'app/entities/order-book-my-suffix/order-book-my-suffix.service';
import { OrderBookMySuffix } from 'app/shared/model/order-book-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderBookMySuffix Management Update Component', () => {
        let comp: OrderBookMySuffixUpdateComponent;
        let fixture: ComponentFixture<OrderBookMySuffixUpdateComponent>;
        let service: OrderBookMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [OrderBookMySuffixUpdateComponent]
            })
                .overrideTemplate(OrderBookMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderBookMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderBookMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderBookMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderBook = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderBookMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderBook = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EkartshoppingappTestModule } from '../../../test.module';
import { OrderBookMySuffixDeleteDialogComponent } from 'app/entities/order-book-my-suffix/order-book-my-suffix-delete-dialog.component';
import { OrderBookMySuffixService } from 'app/entities/order-book-my-suffix/order-book-my-suffix.service';

describe('Component Tests', () => {
    describe('OrderBookMySuffix Management Delete Component', () => {
        let comp: OrderBookMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OrderBookMySuffixDeleteDialogComponent>;
        let service: OrderBookMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [OrderBookMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(OrderBookMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderBookMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderBookMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});

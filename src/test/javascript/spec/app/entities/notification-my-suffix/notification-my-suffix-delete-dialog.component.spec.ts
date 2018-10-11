/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EkartshoppingappTestModule } from '../../../test.module';
import { NotificationMySuffixDeleteDialogComponent } from 'app/entities/notification-my-suffix/notification-my-suffix-delete-dialog.component';
import { NotificationMySuffixService } from 'app/entities/notification-my-suffix/notification-my-suffix.service';

describe('Component Tests', () => {
    describe('NotificationMySuffix Management Delete Component', () => {
        let comp: NotificationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<NotificationMySuffixDeleteDialogComponent>;
        let service: NotificationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [NotificationMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(NotificationMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NotificationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationMySuffixService);
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
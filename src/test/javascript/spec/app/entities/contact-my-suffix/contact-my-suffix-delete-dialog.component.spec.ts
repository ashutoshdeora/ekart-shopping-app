/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EkartshoppingappTestModule } from '../../../test.module';
import { ContactMySuffixDeleteDialogComponent } from 'app/entities/contact-my-suffix/contact-my-suffix-delete-dialog.component';
import { ContactMySuffixService } from 'app/entities/contact-my-suffix/contact-my-suffix.service';

describe('Component Tests', () => {
    describe('ContactMySuffix Management Delete Component', () => {
        let comp: ContactMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ContactMySuffixDeleteDialogComponent>;
        let service: ContactMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [ContactMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ContactMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMySuffixService);
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

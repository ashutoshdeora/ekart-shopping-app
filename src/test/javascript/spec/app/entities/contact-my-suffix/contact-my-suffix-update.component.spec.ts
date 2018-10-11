/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EkartshoppingappTestModule } from '../../../test.module';
import { ContactMySuffixUpdateComponent } from 'app/entities/contact-my-suffix/contact-my-suffix-update.component';
import { ContactMySuffixService } from 'app/entities/contact-my-suffix/contact-my-suffix.service';
import { ContactMySuffix } from 'app/shared/model/contact-my-suffix.model';

describe('Component Tests', () => {
    describe('ContactMySuffix Management Update Component', () => {
        let comp: ContactMySuffixUpdateComponent;
        let fixture: ComponentFixture<ContactMySuffixUpdateComponent>;
        let service: ContactMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [ContactMySuffixUpdateComponent]
            })
                .overrideTemplate(ContactMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContactMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contact = entity;
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
                    const entity = new ContactMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contact = entity;
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

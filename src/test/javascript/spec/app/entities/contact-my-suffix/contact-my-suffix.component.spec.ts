/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EkartshoppingappTestModule } from '../../../test.module';
import { ContactMySuffixComponent } from 'app/entities/contact-my-suffix/contact-my-suffix.component';
import { ContactMySuffixService } from 'app/entities/contact-my-suffix/contact-my-suffix.service';
import { ContactMySuffix } from 'app/shared/model/contact-my-suffix.model';

describe('Component Tests', () => {
    describe('ContactMySuffix Management Component', () => {
        let comp: ContactMySuffixComponent;
        let fixture: ComponentFixture<ContactMySuffixComponent>;
        let service: ContactMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [ContactMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ContactMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContactMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContactMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

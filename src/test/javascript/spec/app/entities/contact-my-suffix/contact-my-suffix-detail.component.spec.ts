/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EkartshoppingappTestModule } from '../../../test.module';
import { ContactMySuffixDetailComponent } from 'app/entities/contact-my-suffix/contact-my-suffix-detail.component';
import { ContactMySuffix } from 'app/shared/model/contact-my-suffix.model';

describe('Component Tests', () => {
    describe('ContactMySuffix Management Detail Component', () => {
        let comp: ContactMySuffixDetailComponent;
        let fixture: ComponentFixture<ContactMySuffixDetailComponent>;
        const route = ({ data: of({ contact: new ContactMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [ContactMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContactMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContactMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contact).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

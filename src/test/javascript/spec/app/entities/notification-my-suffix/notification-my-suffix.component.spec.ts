/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EkartshoppingappTestModule } from '../../../test.module';
import { NotificationMySuffixComponent } from 'app/entities/notification-my-suffix/notification-my-suffix.component';
import { NotificationMySuffixService } from 'app/entities/notification-my-suffix/notification-my-suffix.service';
import { NotificationMySuffix } from 'app/shared/model/notification-my-suffix.model';

describe('Component Tests', () => {
    describe('NotificationMySuffix Management Component', () => {
        let comp: NotificationMySuffixComponent;
        let fixture: ComponentFixture<NotificationMySuffixComponent>;
        let service: NotificationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EkartshoppingappTestModule],
                declarations: [NotificationMySuffixComponent],
                providers: []
            })
                .overrideTemplate(NotificationMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotificationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NotificationMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.notifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTicketbyUserComponent } from './dialog-ticketby-user.component';

describe('DialogTicketbyUserComponent', () => {
  let component: DialogTicketbyUserComponent;
  let fixture: ComponentFixture<DialogTicketbyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTicketbyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTicketbyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

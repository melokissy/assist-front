import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusTicketsComponent } from './meus-tickets.component';

describe('MeusTicketsComponent', () => {
  let component: MeusTicketsComponent;
  let fixture: ComponentFixture<MeusTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

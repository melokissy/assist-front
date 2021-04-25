import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTicketComponent } from './cadastro-ticket.component';

describe('CadastroTicketComponent', () => {
  let component: CadastroTicketComponent;
  let fixture: ComponentFixture<CadastroTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

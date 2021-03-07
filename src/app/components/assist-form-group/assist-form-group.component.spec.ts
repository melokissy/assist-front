import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistFormGroupComponent } from './assist-form-group.component';

describe('AssistFormGroupComponent', () => {
  let component: AssistFormGroupComponent;
  let fixture: ComponentFixture<AssistFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogticketbyprojectComponent } from './dialogticketbyproject.component';

describe('DialogticketbyprojectComponent', () => {
  let component: DialogticketbyprojectComponent;
  let fixture: ComponentFixture<DialogticketbyprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogticketbyprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogticketbyprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

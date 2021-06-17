import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataCommentComponent } from './dialog-data-comment.component';

describe('DialogDataCommentComponent', () => {
  let component: DialogDataCommentComponent;
  let fixture: ComponentFixture<DialogDataCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDataCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

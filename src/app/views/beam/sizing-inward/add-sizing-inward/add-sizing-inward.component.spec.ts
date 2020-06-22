import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSizingInwardComponent } from './add-sizing-inward.component';

describe('AddSizingInwardComponent', () => {
  let component: AddSizingInwardComponent;
  let fixture: ComponentFixture<AddSizingInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSizingInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSizingInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

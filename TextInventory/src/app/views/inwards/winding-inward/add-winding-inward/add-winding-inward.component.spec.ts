import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWindingInwardComponent } from './add-winding-inward.component';

describe('AddWindingInwardComponent', () => {
  let component: AddWindingInwardComponent;
  let fixture: ComponentFixture<AddWindingInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWindingInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWindingInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

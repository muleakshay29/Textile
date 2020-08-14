import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWindingOutwardComponent } from './add-winding-outward.component';

describe('AddWindingOutwardComponent', () => {
  let component: AddWindingOutwardComponent;
  let fixture: ComponentFixture<AddWindingOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWindingOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWindingOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

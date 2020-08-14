import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryChalanComponent } from './add-delivery-chalan.component';

describe('AddDeliveryChalanComponent', () => {
  let component: AddDeliveryChalanComponent;
  let fixture: ComponentFixture<AddDeliveryChalanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeliveryChalanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryChalanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasePaymentComponent } from './add-purchase-payment.component';

describe('AddPurchasePaymentComponent', () => {
  let component: AddPurchasePaymentComponent;
  let fixture: ComponentFixture<AddPurchasePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchasePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchasePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

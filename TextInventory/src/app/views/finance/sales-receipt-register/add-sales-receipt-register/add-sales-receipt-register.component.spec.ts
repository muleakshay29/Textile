import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesReceiptRegisterComponent } from './add-sales-receipt-register.component';

describe('AddSalesReceiptRegisterComponent', () => {
  let component: AddSalesReceiptRegisterComponent;
  let fixture: ComponentFixture<AddSalesReceiptRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesReceiptRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesReceiptRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

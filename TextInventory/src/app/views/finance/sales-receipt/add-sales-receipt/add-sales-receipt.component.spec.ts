import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesReceiptComponent } from './add-sales-receipt.component';

describe('AddSalesReceiptComponent', () => {
  let component: AddSalesReceiptComponent;
  let fixture: ComponentFixture<AddSalesReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

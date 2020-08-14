import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesInvoiceManualComponent } from './add-sales-invoice-manual.component';

describe('AddSalesInvoiceManualComponent', () => {
  let component: AddSalesInvoiceManualComponent;
  let fixture: ComponentFixture<AddSalesInvoiceManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesInvoiceManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesInvoiceManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

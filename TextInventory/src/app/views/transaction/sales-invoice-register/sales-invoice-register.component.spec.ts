import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceRegisterComponent } from './sales-invoice-register.component';

describe('SalesInvoiceRegisterComponent', () => {
  let component: SalesInvoiceRegisterComponent;
  let fixture: ComponentFixture<SalesInvoiceRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

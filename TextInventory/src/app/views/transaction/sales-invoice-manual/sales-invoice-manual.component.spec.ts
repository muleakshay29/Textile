import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceManualComponent } from './sales-invoice-manual.component';

describe('SalesInvoiceManualComponent', () => {
  let component: SalesInvoiceManualComponent;
  let fixture: ComponentFixture<SalesInvoiceManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

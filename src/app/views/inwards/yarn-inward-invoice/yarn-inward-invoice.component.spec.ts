import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnInwardInvoiceComponent } from './yarn-inward-invoice.component';

describe('YarnInwardInvoiceComponent', () => {
  let component: YarnInwardInvoiceComponent;
  let fixture: ComponentFixture<YarnInwardInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnInwardInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnInwardInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

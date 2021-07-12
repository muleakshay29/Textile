import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDesign3Component } from './invoice-design3.component';

describe('InvoiceDesign3Component', () => {
  let component: InvoiceDesign3Component;
  let fixture: ComponentFixture<InvoiceDesign3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDesign3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDesign3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

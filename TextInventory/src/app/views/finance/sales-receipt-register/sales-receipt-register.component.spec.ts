import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReceiptRegisterComponent } from './sales-receipt-register.component';

describe('SalesReceiptRegisterComponent', () => {
  let component: SalesReceiptRegisterComponent;
  let fixture: ComponentFixture<SalesReceiptRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReceiptRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReceiptRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

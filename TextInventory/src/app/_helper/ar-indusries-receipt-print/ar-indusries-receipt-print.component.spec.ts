import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArIndusriesReceiptPrintComponent } from './ar-indusries-receipt-print.component';

describe('ArIndusriesReceiptPrintComponent', () => {
  let component: ArIndusriesReceiptPrintComponent;
  let fixture: ComponentFixture<ArIndusriesReceiptPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArIndusriesReceiptPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArIndusriesReceiptPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerReportPrintComponent } from './ledger-report-print.component';

describe('LedgerReportPrintComponent', () => {
  let component: LedgerReportPrintComponent;
  let fixture: ComponentFixture<LedgerReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

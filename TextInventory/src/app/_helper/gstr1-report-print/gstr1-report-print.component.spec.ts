import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gstr1ReportPrintComponent } from './gstr1-report-print.component';

describe('Gstr1ReportPrintComponent', () => {
  let component: Gstr1ReportPrintComponent;
  let fixture: ComponentFixture<Gstr1ReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gstr1ReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gstr1ReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

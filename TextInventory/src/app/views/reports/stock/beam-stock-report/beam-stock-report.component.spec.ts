import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamStockReportComponent } from './beam-stock-report.component';

describe('BeamStockReportComponent', () => {
  let component: BeamStockReportComponent;
  let fixture: ComponentFixture<BeamStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

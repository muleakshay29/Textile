import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamPerformanceReportComponent } from './beam-performance-report.component';

describe('BeamPerformanceReportComponent', () => {
  let component: BeamPerformanceReportComponent;
  let fixture: ComponentFixture<BeamPerformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamPerformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TageStockReportComponent } from './tage-stock-report.component';

describe('TageStockReportComponent', () => {
  let component: TageStockReportComponent;
  let fixture: ComponentFixture<TageStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TageStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TageStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

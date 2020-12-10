import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnStockReportComponent } from './yarn-stock-report.component';

describe('YarnStockReportComponent', () => {
  let component: YarnStockReportComponent;
  let fixture: ComponentFixture<YarnStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

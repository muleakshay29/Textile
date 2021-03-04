import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerReportComponent } from './broker-report.component';

describe('BrokerReportComponent', () => {
  let component: BrokerReportComponent;
  let fixture: ComponentFixture<BrokerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

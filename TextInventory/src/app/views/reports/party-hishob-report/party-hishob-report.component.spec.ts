import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHishobReportComponent } from './party-hishob-report.component';

describe('PartyHishobReportComponent', () => {
  let component: PartyHishobReportComponent;
  let fixture: ComponentFixture<PartyHishobReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyHishobReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyHishobReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

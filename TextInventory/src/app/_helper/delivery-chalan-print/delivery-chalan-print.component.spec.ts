import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChalanPrintComponent } from './delivery-chalan-print.component';

describe('DeliveryChalanPrintComponent', () => {
  let component: DeliveryChalanPrintComponent;
  let fixture: ComponentFixture<DeliveryChalanPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChalanPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChalanPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

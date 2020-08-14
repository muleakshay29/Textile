import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChalanComponent } from './delivery-chalan.component';

describe('DeliveryChalanComponent', () => {
  let component: DeliveryChalanComponent;
  let fixture: ComponentFixture<DeliveryChalanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChalanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChalanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

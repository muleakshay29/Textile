import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChalanRegisterComponent } from './delivery-chalan-register.component';

describe('DeliveryChalanRegisterComponent', () => {
  let component: DeliveryChalanRegisterComponent;
  let fixture: ComponentFixture<DeliveryChalanRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryChalanRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryChalanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

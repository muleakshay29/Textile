import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPaymentRegisterComponent } from './party-payment-register.component';

describe('PartyPaymentRegisterComponent', () => {
  let component: PartyPaymentRegisterComponent;
  let fixture: ComponentFixture<PartyPaymentRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyPaymentRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyPaymentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

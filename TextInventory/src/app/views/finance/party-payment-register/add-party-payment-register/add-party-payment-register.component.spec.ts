import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartyPaymentRegisterComponent } from './add-party-payment-register.component';

describe('AddPartyPaymentRegisterComponent', () => {
  let component: AddPartyPaymentRegisterComponent;
  let fixture: ComponentFixture<AddPartyPaymentRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartyPaymentRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartyPaymentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

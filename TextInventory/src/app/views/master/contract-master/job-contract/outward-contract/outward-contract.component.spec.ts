import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardContractComponent } from './outward-contract.component';

describe('OutwardContractComponent', () => {
  let component: OutwardContractComponent;
  let fixture: ComponentFixture<OutwardContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutwardContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutwardContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardContractComponent } from './inward-contract.component';

describe('InwardContractComponent', () => {
  let component: InwardContractComponent;
  let fixture: ComponentFixture<InwardContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InwardContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InwardContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutwardContractComponent } from './add-outward-contract.component';

describe('AddOutwardContractComponent', () => {
  let component: AddOutwardContractComponent;
  let fixture: ComponentFixture<AddOutwardContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOutwardContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutwardContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

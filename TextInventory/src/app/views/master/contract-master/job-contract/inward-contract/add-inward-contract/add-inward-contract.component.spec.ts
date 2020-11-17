import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInwardContractComponent } from './add-inward-contract.component';

describe('AddInwardContractComponent', () => {
  let component: AddInwardContractComponent;
  let fixture: ComponentFixture<AddInwardContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInwardContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInwardContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

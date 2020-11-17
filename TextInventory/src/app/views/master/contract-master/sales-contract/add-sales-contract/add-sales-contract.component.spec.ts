import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesContractComponent } from './add-sales-contract.component';

describe('AddSalesContractComponent', () => {
  let component: AddSalesContractComponent;
  let fixture: ComponentFixture<AddSalesContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

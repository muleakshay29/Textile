import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYarnContractComponent } from './add-yarn-contract.component';

describe('AddYarnContractComponent', () => {
  let component: AddYarnContractComponent;
  let fixture: ComponentFixture<AddYarnContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYarnContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYarnContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnContractComponent } from './yarn-contract.component';

describe('YarnContractComponent', () => {
  let component: YarnContractComponent;
  let fixture: ComponentFixture<YarnContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

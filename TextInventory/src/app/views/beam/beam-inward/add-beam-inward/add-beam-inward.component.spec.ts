import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeamInwardComponent } from './add-beam-inward.component';

describe('AddBeamInwardComponent', () => {
  let component: AddBeamInwardComponent;
  let fixture: ComponentFixture<AddBeamInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBeamInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeamInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

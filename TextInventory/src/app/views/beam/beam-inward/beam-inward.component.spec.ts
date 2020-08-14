import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeamInwardComponent } from './beam-inward.component';

describe('BeamInwardComponent', () => {
  let component: BeamInwardComponent;
  let fixture: ComponentFixture<BeamInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeamInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeamInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

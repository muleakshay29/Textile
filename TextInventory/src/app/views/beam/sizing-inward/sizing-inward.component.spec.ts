import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizingInwardComponent } from './sizing-inward.component';

describe('SizingInwardComponent', () => {
  let component: SizingInwardComponent;
  let fixture: ComponentFixture<SizingInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizingInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizingInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

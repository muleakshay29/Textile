import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindingInwardComponent } from './winding-inward.component';

describe('WindingInwardComponent', () => {
  let component: WindingInwardComponent;
  let fixture: ComponentFixture<WindingInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindingInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindingInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

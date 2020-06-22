import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindingOutwardComponent } from './winding-outward.component';

describe('WindingOutwardComponent', () => {
  let component: WindingOutwardComponent;
  let fixture: ComponentFixture<WindingOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindingOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindingOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

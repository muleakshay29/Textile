import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYarnOutwardComponent } from './add-yarn-outward.component';

describe('AddYarnOutwardComponent', () => {
  let component: AddYarnOutwardComponent;
  let fixture: ComponentFixture<AddYarnOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYarnOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYarnOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

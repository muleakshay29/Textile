import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYarnInwardComponent } from './add-yarn-inward.component';

describe('AddYarnInwardComponent', () => {
  let component: AddYarnInwardComponent;
  let fixture: ComponentFixture<AddYarnInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYarnInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYarnInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

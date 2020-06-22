import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeavingLoadAutoComponent } from './add-weaving-load-auto.component';

describe('AddWeavingLoadAutoComponent', () => {
  let component: AddWeavingLoadAutoComponent;
  let fixture: ComponentFixture<AddWeavingLoadAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeavingLoadAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeavingLoadAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

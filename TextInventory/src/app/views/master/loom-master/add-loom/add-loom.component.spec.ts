import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoomComponent } from './add-loom.component';

describe('AddLoomComponent', () => {
  let component: AddLoomComponent;
  let fixture: ComponentFixture<AddLoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

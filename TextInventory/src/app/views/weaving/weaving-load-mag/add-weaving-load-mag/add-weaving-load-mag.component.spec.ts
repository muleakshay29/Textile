import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeavingLoadMagComponent } from './add-weaving-load-mag.component';

describe('AddWeavingLoadMagComponent', () => {
  let component: AddWeavingLoadMagComponent;
  let fixture: ComponentFixture<AddWeavingLoadMagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeavingLoadMagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeavingLoadMagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

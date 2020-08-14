import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualityComponent } from './edit-quality.component';

describe('EditQualityComponent', () => {
  let component: EditQualityComponent;
  let fixture: ComponentFixture<EditQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

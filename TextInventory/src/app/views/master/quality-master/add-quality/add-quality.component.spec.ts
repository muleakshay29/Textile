import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualityComponent } from './add-quality.component';

describe('AddQualityComponent', () => {
  let component: AddQualityComponent;
  let fixture: ComponentFixture<AddQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

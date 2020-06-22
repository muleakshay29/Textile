import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutoProductionComponent } from './add-auto-production.component';

describe('AddAutoProductionComponent', () => {
  let component: AddAutoProductionComponent;
  let fixture: ComponentFixture<AddAutoProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutoProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutoProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

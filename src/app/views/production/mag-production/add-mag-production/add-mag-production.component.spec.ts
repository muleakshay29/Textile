import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMagProductionComponent } from './add-mag-production.component';

describe('AddMagProductionComponent', () => {
  let component: AddMagProductionComponent;
  let fixture: ComponentFixture<AddMagProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMagProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMagProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

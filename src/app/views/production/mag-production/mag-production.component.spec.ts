import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagProductionComponent } from './mag-production.component';

describe('MagProductionComponent', () => {
  let component: MagProductionComponent;
  let fixture: ComponentFixture<MagProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

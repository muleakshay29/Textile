import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoProductionComponent } from './auto-production.component';

describe('AutoProductionComponent', () => {
  let component: AutoProductionComponent;
  let fixture: ComponentFixture<AutoProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

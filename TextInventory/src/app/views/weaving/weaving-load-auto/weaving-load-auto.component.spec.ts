import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeavingLoadAutoComponent } from './weaving-load-auto.component';

describe('WeavingLoadAutoComponent', () => {
  let component: WeavingLoadAutoComponent;
  let fixture: ComponentFixture<WeavingLoadAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeavingLoadAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeavingLoadAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

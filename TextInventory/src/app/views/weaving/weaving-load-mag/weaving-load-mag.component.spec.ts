import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeavingLoadMagComponent } from './weaving-load-mag.component';

describe('WeavingLoadMagComponent', () => {
  let component: WeavingLoadMagComponent;
  let fixture: ComponentFixture<WeavingLoadMagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeavingLoadMagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeavingLoadMagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

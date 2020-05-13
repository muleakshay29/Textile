import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnOutwardComponent } from './yarn-outward.component';

describe('YarnOutwardComponent', () => {
  let component: YarnOutwardComponent;
  let fixture: ComponentFixture<YarnOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

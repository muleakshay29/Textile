import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnMasterComponent } from './yarn-master.component';

describe('YarnMasterComponent', () => {
  let component: YarnMasterComponent;
  let fixture: ComponentFixture<YarnMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

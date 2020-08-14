import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoomMasterComponent } from './loom-master.component';

describe('LoomMasterComponent', () => {
  let component: LoomMasterComponent;
  let fixture: ComponentFixture<LoomMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoomMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoomMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

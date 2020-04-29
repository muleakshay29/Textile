import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmMasterComponent } from './firm-master.component';

describe('FirmMasterComponent', () => {
  let component: FirmMasterComponent;
  let fixture: ComponentFixture<FirmMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

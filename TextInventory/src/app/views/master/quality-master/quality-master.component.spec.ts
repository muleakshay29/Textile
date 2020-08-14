import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMasterComponent } from './quality-master.component';

describe('QualityMasterComponent', () => {
  let component: QualityMasterComponent;
  let fixture: ComponentFixture<QualityMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

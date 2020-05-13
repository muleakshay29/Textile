import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYarnInwardInvoiceComponent } from './add-yarn-inward-invoice.component';

describe('AddYarnInwardInvoiceComponent', () => {
  let component: AddYarnInwardInvoiceComponent;
  let fixture: ComponentFixture<AddYarnInwardInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYarnInwardInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYarnInwardInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

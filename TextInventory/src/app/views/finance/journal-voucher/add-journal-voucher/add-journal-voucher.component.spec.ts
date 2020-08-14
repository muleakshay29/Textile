import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalVoucherComponent } from './add-journal-voucher.component';

describe('AddJournalVoucherComponent', () => {
  let component: AddJournalVoucherComponent;
  let fixture: ComponentFixture<AddJournalVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJournalVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJournalVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

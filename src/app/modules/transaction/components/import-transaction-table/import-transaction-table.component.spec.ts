import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportTransactionTableComponent } from './import-transaction-table.component';

describe('ImportTransactionTableComponent', () => {
  let component: ImportTransactionTableComponent;
  let fixture: ComponentFixture<ImportTransactionTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTransactionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

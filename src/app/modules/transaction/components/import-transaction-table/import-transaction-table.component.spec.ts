import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTransactionTableComponent } from './import-transaction-table.component';

describe('ImportTransactionTableComponent', () => {
  let component: ImportTransactionTableComponent;
  let fixture: ComponentFixture<ImportTransactionTableComponent>;

  beforeEach(async(() => {
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

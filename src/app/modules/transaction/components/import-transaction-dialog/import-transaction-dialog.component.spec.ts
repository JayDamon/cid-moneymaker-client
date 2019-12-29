import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTransactionDialogComponent } from './import-transaction-dialog.component';

describe('ImportTransactionDialogComponent', () => {
  let component: ImportTransactionDialogComponent;
  let fixture: ComponentFixture<ImportTransactionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTransactionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

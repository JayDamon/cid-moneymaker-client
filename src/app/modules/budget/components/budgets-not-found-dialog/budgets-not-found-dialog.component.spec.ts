import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsNotFoundDialogComponent } from './budgets-not-found-dialog.component';

describe('BudgetsNotFoundDialogComponent', () => {
  let component: BudgetsNotFoundDialogComponent;
  let fixture: ComponentFixture<BudgetsNotFoundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetsNotFoundDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsNotFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BudgetTypeInputComponent } from './budget-type-input.component';

describe('BudgetTypeInputComponent', () => {
  let component: BudgetTypeInputComponent;
  let fixture: ComponentFixture<BudgetTypeInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetTypeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetTypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

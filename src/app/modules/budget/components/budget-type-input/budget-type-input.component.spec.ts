import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTypeInputComponent } from './budget-type-input.component';

describe('BudgetTypeInputComponent', () => {
  let component: BudgetTypeInputComponent;
  let fixture: ComponentFixture<BudgetTypeInputComponent>;

  beforeEach(async(() => {
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

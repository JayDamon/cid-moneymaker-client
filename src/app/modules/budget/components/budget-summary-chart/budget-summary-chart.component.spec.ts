import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSummaryChartComponent } from './budget-summary-chart.component';

describe('BudgetSummaryChartComponent', () => {
  let component: BudgetSummaryChartComponent;
  let fixture: ComponentFixture<BudgetSummaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetSummaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

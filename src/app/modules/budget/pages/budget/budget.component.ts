import { Observable } from 'rxjs';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Router } from '@angular/router';
import { Budget } from 'src/app/shared/models/Budget';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  budgetService: BudgetService;
  router: Router;

  firstMonthBudgetSummary: BudgetSummary[];
  secondMonthBudgetSummary: BudgetSummary[];
  budgets: Array<Budget>;
  budgetExists: Boolean;
  
  constructor(budgetService: BudgetService, router: Router) {
    this.budgetService = budgetService;
    this.router = router;
    this.getBudgets();
    this.getBudgetSummaries();
  }

  private getBudgets() {
    this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
      this.budgetExists = budgets.length > 0;
      // this.budgetExists = false;
    });
  }

  private getBudgetSummaries() {

    this.budgetService.getBudgetSummary(2017, 1).subscribe((budgetSummaries: Array<BudgetSummary>)=>{
      this.firstMonthBudgetSummary = budgetSummaries;
    })

    this.budgetService.getBudgetSummary(2017, 2).subscribe((budgetSummaries: Array<BudgetSummary>)=>{
      this.secondMonthBudgetSummary = budgetSummaries;
    })

  }

}

import { Observable } from 'rxjs';
import { BudgetDataService } from 'src/app/core/services/budget/budget-data.service';
import { Injectable, OnInit } from '@angular/core';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { Budget } from 'src/app/shared/models/Budget';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetSummary: Observable<Array<BudgetSummary[]>>;
  private budgetTypes: Observable<Array<BudgetType>>;
  private budgets: Observable<Array<Budget>>;
  private newBudgets: Array<Budget> = [];

  constructor(private budgetDataService : BudgetDataService) {
    this.budgetSummary = this.budgetDataService.getBudgetSummary();
    this.budgetTypes = this.budgetDataService.getBudgetTypes();
    this.budgets = this.budgetDataService.getBudgets();
  }

  getBudgetSummary(): Observable<Array<BudgetSummary[]>> {
    return this.budgetSummary;
  }

  getBudgetTypes(): Observable<Array<BudgetType>> {
    return this.budgetTypes;
  }

  saveNewBudgets() {

    let savedBudgets = this.budgetDataService.saveNewBudgets(this.newBudgets);

    savedBudgets.subscribe((savedBudgets: Array<Budget>) => {
      this.budgets.pipe(map(budgets => {
          budgets.concat(savedBudgets);
      }))
    });

  }

  getBudgets(): Observable<Array<Budget>> {
    return this.budgets;
  }

  addBudget(budget: Budget) {
    this.newBudgets.push(budget);
  }

  removeBudget(budget: Budget) {
    let budgetIndex = this.newBudgets.indexOf(budget);
    if (budgetIndex !== -1) {
      this.newBudgets.splice(budgetIndex, 1);
    }
  }

}

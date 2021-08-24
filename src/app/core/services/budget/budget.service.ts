import { Observable, BehaviorSubject } from 'rxjs';
import { BudgetDataService } from 'src/app/core/services/budget/budget-data.service';
import { Injectable, OnInit } from '@angular/core';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { Budget } from 'src/app/shared/models/Budget';
import { map, share } from 'rxjs/operators';
import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgets: Observable<Array<Budget>>;
  private budgetSummary: Observable<Array<BudgetSummary>>;
  private budgetTypes: Observable<Array<BudgetType>>;

  private budgetCategories: Observable<Array<BudgetCategory>>;
  private newBudgets: Array<Budget> = [];

  constructor(private budgetDataService: BudgetDataService) {
    this.budgetTypes = this.budgetDataService.getBudgetTypes();
    this.budgetCategories = this.budgetDataService.getBudgetCategories();
  }

  getBudgetSummary(year: number, month: number): Observable<Array<BudgetSummary>> {
    this.budgetSummary = this.budgetDataService.getBudgetSummary(year, month);
    return this.budgetSummary;
  }

  getBudgetTypes(): Observable<Array<BudgetType>> {
    return this.budgetTypes;
  }

  saveNewBudgets(): Observable<Array<Budget>> {
    let savedBudgets: Observable<Array<Budget>> = this.budgetDataService.saveNewBudgets(this.newBudgets);

    savedBudgets.subscribe((savedBudgets: Array<Budget>) => {
          this.budgets.pipe(
            map(budgets => {
              budgets.concat(savedBudgets);
      }))
    });
    return savedBudgets;
  }

  updateBudget(budget: Budget) {
    this.budgetDataService.updateBudget(budget, budget.id)
      .subscribe(data => {
        this.budgets.pipe(map(budgets => {
          budgets.push(data);
          return data;
        }));
    });

  }

  getBudgets(): Observable<Array<Budget>> {
    this.budgets = this.budgetDataService.getBudgets();
    return this.budgets;
  }

  addBudget(budget: Budget) {
    this.newBudgets.push(budget);
  }

  removeBudget(budget: Budget) {
    const budgetIndex = this.newBudgets.indexOf(budget);
    if (budgetIndex !== -1) {
      this.newBudgets.splice(budgetIndex, 1);
    }
  }

  getBudgetCategories(): Observable<Array<BudgetCategory>> {
    return this.budgetCategories;
  }

}

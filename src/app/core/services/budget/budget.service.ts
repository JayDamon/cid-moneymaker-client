import { Observable, BehaviorSubject } from 'rxjs';
import { BudgetDataService } from 'src/app/core/services/budget/budget-data.service';
import { Injectable, OnInit } from '@angular/core';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { Budget } from 'src/app/shared/models/Budget';
import { map } from 'rxjs/operators';
import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private _budgets = new BehaviorSubject<Budget[]>([]);
  private budgetsStore: { budgets: Budget[] } = { budgets: [] }
  readonly budgets = this._budgets.asObservable();

  private _budgetsExist = false;


  private budgetSummary: Observable<Array<BudgetSummary[]>>;
  private budgetTypes: Observable<Array<BudgetType>>;
  
  private budgetCategories: Observable<Array<BudgetCategory>>;
  private newBudgets: Array<Budget> = [];

  constructor(private budgetDataService : BudgetDataService) {
    this.budgetSummary = this.budgetDataService.getBudgetSummary(); // TODO: update to be like budgets
    this.budgetTypes = this.budgetDataService.getBudgetTypes(); // TODO: update to be like budgets
    this.loadAllBudgets();
    this.budgetCategories = this.budgetDataService.getBudgetCategories(); // TODO: update to be like budgets
  }

  loadAllBudgets() {
    this.budgetDataService.getBudgets().subscribe(data => {
      this.budgetsStore.budgets = data;
      this._budgets.next(Object.assign({}, this.budgetsStore).budgets);
      this._budgetsExist = data.length > 0;
    });
  }

  getBudgetSummary(): Observable<Array<BudgetSummary[]>> {
    return this.budgetSummary;
  }

  getBudgetTypes(): Observable<Array<BudgetType>> {
    return this.budgetTypes;
  }

  saveNewBudgets() {

    this.budgetDataService.saveNewBudgets(this.newBudgets).subscribe((savedBudgets: Array<Budget>) => {
      this.budgets.pipe(map(budgets => {
          budgets.concat(savedBudgets);
      }))
    });

  }

  updateBudget(budget: Budget) {
    this.budgetDataService.updateBudget(budget, budget.id)
      .subscribe(data => {
        this.budgetsStore.budgets.forEach((b, i) => {
          if (b.id === data.id) {
            this.budgetsStore.budgets[i] = data;
          }
        });
        this._budgets.next(Object.assign({}, this.budgetsStore).budgets);
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

  getBudgetCategories(): Observable<Array<BudgetCategory>> {
    return this.budgetCategories;
  }

  get budgetsExist(): boolean {
    return this._budgetsExist;
  }

}

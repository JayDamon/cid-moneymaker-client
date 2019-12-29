import { TransactionBudgetCategory } from './../../../../shared/models/TransactionBudgetCategory';
import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Budget } from 'src/app/shared/models/Budget';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent {

  _budgets: MatTableDataSource<Budget>;
  columnsToDisplay: string[] = ['name', 'startDate', 'endDate', 'frequency', 'inUse', 'category'];

  @Output() budgetChange = new EventEmitter();

  @Input() budgetCategories: Array<TransactionBudgetCategory> = [];
  @Input() frequencyTypes: Array<FrequencyType> = [];

  @Input()
  set budgets(budgets: Array<Budget>) {
      this._budgets = new MatTableDataSource(budgets);
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  updateBudget(budget: Budget) {
    this.budgetChange.emit(budget);
  }

}

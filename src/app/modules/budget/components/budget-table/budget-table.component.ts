import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Budget } from 'src/app/shared/models/Budget';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { FrequencyService } from 'src/app/core/services/frequency/frequency.service';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent {

  budgets: MatTableDataSource<Budget>;
  frequencyTypes: FrequencyType[] = [];
  columnsToDisplay: String[] = ['name', 'startDate', 'endDate', 'frequency', 'inUse', 'category'];

  constructor(private budgetService: BudgetService, private frequencyService: FrequencyService) { 
    this.budgetService.getBudgets().subscribe((budgets: Budget[]) => {
      this.budgets = new MatTableDataSource(budgets);
    })
    this.frequencyService.getFrequencyTypes().subscribe((frequencyTypes: Array<FrequencyType>) => {
      this.frequencyTypes = frequencyTypes;
    })
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

}

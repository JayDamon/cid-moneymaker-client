import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Component } from '@angular/core';
import { Budget } from 'src/app/shared/models/Budget';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { FrequencyService } from 'src/app/core/services/frequency/frequency.service';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent {

  budgets: Array<Budget>;
  budgetCategories: Array<BudgetCategory>;
  frequencyTypes: Array<FrequencyType>;

  constructor(private budgetService: BudgetService, private frequencyService: FrequencyService) {
    this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
      this.budgets = budgets;
    });

    this.budgetService.getBudgetCategories().subscribe((budgetCategories: Array<BudgetCategory>) => {
      this.budgetCategories = budgetCategories;
    });

    this.frequencyService.getFrequencyTypes().subscribe((frequencyTypes: Array<FrequencyType>) => {
      this.frequencyTypes = frequencyTypes;
    });
  }

  updateBudget(budget: Budget) {
    this.budgetService.updateBudget(budget);
  }

}

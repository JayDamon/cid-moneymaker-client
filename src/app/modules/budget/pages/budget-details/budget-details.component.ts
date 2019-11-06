import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { Component } from '@angular/core';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Budget } from 'src/app/shared/models/Budget';
import { FrequencyService } from 'src/app/core/services/frequency/frequency.service';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent {

  budgets: Budget[] = [];
  frequencyTypes: FrequencyType[] = [];

  constructor(private budgetService: BudgetService, private frequencyService: FrequencyService) { 
    this.budgetService.getBudgets().subscribe((budgets: Budget[]) => {
      this.budgets = budgets;
    })
    this.frequencyService.getFrequencyTypes().subscribe((frequencyTypes: Array<FrequencyType>) => {
      this.frequencyTypes = frequencyTypes;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { BudgetService } from 'src/app/core/services/budget/budget.service';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.scss']
})
export class NewBudgetComponent implements OnInit {

  budgetTypes: BudgetType[] = [];

  constructor(private budgetService: BudgetService) {
    
   }

   ngOnInit() {
    this.addBudgetCategories();
  }

  addBudgetCategories() {
    this.budgetService.getBudgetTypes().subscribe((budgetTypes: BudgetType[]) => {
      this.budgetTypes = budgetTypes;
    })
  }

  saveBudgets() {
    this.budgetService.saveNewBudgets();
  }

}

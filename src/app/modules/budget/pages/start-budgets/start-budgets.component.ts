import { Component, OnInit } from '@angular/core';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-budgets',
  templateUrl: './start-budgets.component.html',
  styleUrls: ['./start-budgets.component.scss']
})
export class StartBudgetsComponent implements OnInit {

  budgetTypes: BudgetType[] = [];

  constructor(private budgetService: BudgetService, private router: Router) {

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
    this.budgetService.saveNewBudgets().subscribe(() => {
      this.router.navigate(["/budgets"]);
    });
  }

}

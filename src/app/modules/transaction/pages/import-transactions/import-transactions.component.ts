import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Budget } from 'src/app/shared/models/Budget';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-import-transactions',
  templateUrl: './import-transactions.component.html',
  styleUrls: ['./import-transactions.component.scss']
})
export class ImportTransactionsComponent implements OnInit {

  subscriptions: Subscription = new Subscription();

  budgets: Array<Budget> = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
        this.budgets = budgets;
      })
    );
  }

}

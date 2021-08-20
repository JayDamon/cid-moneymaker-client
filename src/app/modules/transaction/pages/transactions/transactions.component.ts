import { BudgetService } from './../../../../core/services/budget/budget.service';
import { Subscription } from 'rxjs';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Budget } from 'src/app/shared/models/Budget';
import { Category } from 'src/app/shared/models/Category';
import { MatDialog } from '@angular/material/dialog';
import { NoResourcesDialogComponent } from 'src/app/shared/components/no-resources-dialog/no-resources-dialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  opened: boolean;
  showTransactionSpinner = true;

  transactions: Array<Transaction>;
  budgets: Array<Budget>;
  transactionCategories: Array<Category>;

  constructor(
    private transactionService: TransactionService,
    private budgetService: BudgetService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.transactionService.getTransactions().subscribe((transactions: Array<Transaction>) => {
        this.transactions = transactions;
        this.showTransactionSpinner = false;
        if (this.transactions.length <= 0) this.showTransactionUpdateDialog();
      })
    );

    this.subscriptions.add(
      this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
        this.budgets = budgets;
      })
    );

    this.subscriptions.add(
      this.transactionService.getTransactionCategories().subscribe((categories: Array<Category>) => {
        this.transactionCategories = categories;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private showTransactionUpdateDialog() {
    this.dialog.open(NoResourcesDialogComponent, {
      data: {
        displayText: "You have not added any transactions yet, would you like to import some now?",
        route: "transactions-import"
      }
    });
  }

}

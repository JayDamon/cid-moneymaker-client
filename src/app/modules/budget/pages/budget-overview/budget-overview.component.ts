import { TransactionService } from '../../../../core/services/transaction/transaction.service';
import { Subscription } from 'rxjs';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { Component, OnDestroy } from '@angular/core';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Budget } from 'src/app/shared/models/Budget';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { NoResourcesDialogData } from 'src/app/shared/models/NoResourcesDialogData';
import { NoResourcesDialogComponent } from 'src/app/shared/components/no-resources-dialog/no-resources-dialog.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss']
})
export class BudgetOverviewComponent implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  showSpinner = true;
  showTransactionSpiner = true;
  showBudgetSummarySpinner = true;

  firstMonthBudgetSummary: BudgetSummary[];
  secondMonthBudgetSummary: BudgetSummary[];
  budgets: Array<Budget>;
  budgetsExist: boolean;
  _budgetsHaveAStartDate: boolean;
  transactions: Array<Transaction>;

  constructor(private budgetService: BudgetService, private transactionService: TransactionService, private dialog: MatDialog) {
    this.getBudgets();
    this.updateBudgetSummaries();
    this.getTransactions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private showBudgetUpdateDialog(budgetsExist: boolean, budgetsHaveAStartDate: boolean) {

    let dialogData: NoResourcesDialogData;

    if (!budgetsExist) {
      dialogData = {
        displayText: "You have not added any budgets yet, would you like to create some now?",
        route: "/new-budgets"
      }
    } else if (!budgetsHaveAStartDate) {
      dialogData = {
        displayText: "You have not set a start date for any of your budgets so we can not display an overview. Would you like to eidt your budgets to add a start date now?",
        route: "budgets"
      }
    }

    console.log(dialogData);

    this.dialog.open(NoResourcesDialogComponent, {
      data: dialogData
    });

  }

  private getBudgets() {
    this.subscriptions.add(this.budgetService.getBudgets().subscribe(budgets => {
      this.budgets = budgets;
      this.showSpinner = false;
      let budgetsHaveAStartDate = this.budgetsHaveStartDate(budgets);
      let budgetsExist = budgets.length > 0;
      console.log("budgets exist | ", budgetsExist, "budgts have start date | ", budgetsHaveAStartDate);
      if (!budgetsHaveAStartDate || !budgetsExist) {
        this.showBudgetUpdateDialog(budgetsExist, budgetsHaveAStartDate);
      }
    }));
  }

  private budgetsHaveStartDate(budgets: Array<Budget>): boolean {

    for (let b of budgets) {
      if (b.startDate != null) return true;
    }
    return false;
  }


  private getTransactions(): void {
    this.subscriptions.add(this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.showTransactionSpiner = false;
    }));
  }

  updateCategories(moment: Moment) {
    this.updateBudgetSummariesForDate(moment.toDate());
  }

  private updateBudgetSummaries() {
    this.updateBudgetSummariesForDate(new Date());
  }

  private updateBudgetSummariesForDate(date: Date) {

    let secondMonthBudget = new Date(
      date.getFullYear(),
      date.getMonth() + 2,
      1
    );

    this.subscriptions.add(
      this.budgetService.getBudgetSummary(
        date.getFullYear(),
        date.getMonth() + 1
      ).subscribe(
        (budgetSummaries: Array<BudgetSummary>) => {
          this.firstMonthBudgetSummary = budgetSummaries;
          this.showBudgetSummarySpinner = false;
        }
      )
    );

    this.subscriptions.add(
      this.budgetService.getBudgetSummary(
          secondMonthBudget.getFullYear(),
          secondMonthBudget.getMonth()
        ).subscribe((budgetSummaries: Array<BudgetSummary>) => {
        this.secondMonthBudgetSummary = budgetSummaries;
      })
    );

  }

}

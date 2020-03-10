import { Subscription } from 'rxjs';
import { BudgetService } from './../../../../core/services/budget/budget.service';
import { TransactionCsvParseService } from '../../../../core/services/transaction/transaction-csv-parse.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';
import { CsvHeader } from 'src/app/shared/models/CsvHeader';
import { Budget } from 'src/app/shared/models/Budget';
import { BudgetCount } from '../../models/BudgetCount';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { AccountDataService } from 'src/app/core/services/account/account-data.service';

const DATA: Transaction[] = [
  {date: new Date('12/27/2019'), description: 'description 1', amount: 52.02} as Transaction,
  {date: new Date('12/20/2019'), description: 'description 2', amount: 82} as Transaction,
  {date: new Date('12/15/2019'), description: 'description 3', amount: 51} as Transaction,
  {date: new Date('12/05/2019'), description: 'description 4', amount: 108} as Transaction,
  {date: new Date('12/01/2019'), description: 'description 5', amount: 725.35} as Transaction,
  {date: new Date('12/29/2019'), description: 'description 6', amount: 524.21} as Transaction,
  {date: new Date('12/30/2019'), description: 'description 7', amount: 12.23} as Transaction,
  {date: new Date('12/17/2019'), description: 'description 8', amount: 6.31} as Transaction,
]

export interface BudgetCountMap {
  name: string;
  budgetCounts: Array<BudgetCount>;
}

@Component({
  selector: 'app-import-transactions',
  templateUrl: './import-transactions.component.html',
  styleUrls: ['./import-transactions.component.scss']
})
export class ImportTransactionsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  file: File;
  // isCsv = false;
  isCsv = true;
  headers: Array<string> = [];
  expectedHeaders: Array<string> =
    ['Transaction Date', 'Description', 'Debit', 'Credit'];
  requiredHeaders: Array<CsvHeader> = [];
  transactions: Array<Transaction> = DATA;
  // transactions: Array<Transaction>;

  budgets: Array<Budget> = [];
  accounts: Array<FinancialAccount> = [];
  selectedAccount: FinancialAccount;

  budgetCounts: Array<BudgetCountMap> = [];

  columnsToDisplay: string[] =
      ['date', 'description', 'amount'];

  constructor(
    private parseService: TransactionCsvParseService,
    private budgetService: BudgetService,
    private transactionService: TransactionService,
    private accountService: AccountDataService) {}

  ngOnInit() {

    this.subscriptions.add(
      this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
        this.budgets = budgets;

        for (const budget of this.budgets) {
          const budgetCount = {} as BudgetCount;
          budgetCount.budget = budget;
          budgetCount.count = 0;
          let categoryName: string = budget.budgetCategory.name;
          let budgetFound: boolean;
          for (let b of this.budgetCounts) {
            if (b.name == categoryName) {
              budgetFound = true;
              b.budgetCounts.push(budgetCount);
            }
          }
          if (!budgetFound) {
            let newBudgetCounts: Array<BudgetCount> = [];
            newBudgetCounts.push(budgetCount);
            let bcm: BudgetCountMap = {
              name: categoryName,
              budgetCounts: newBudgetCounts
            }
            this.budgetCounts.push(bcm);
          }
        }

      })
    );

    this.subscriptions.add(
      this.accountService.getAccounts().subscribe((accounts: Array<FinancialAccount>) => {
        this.accounts = accounts;
      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe;
  }

  parseFile(file: File) {
    if (file) {
      if (file.name.includes('.csv')) {
        this.parseService.csvHeaders.subscribe(value => {
          this.headers = value;
        });
        this.isCsv = true;
        this.file = file;
        this.parseService.getCsvHeader(this.file);
      } else {
        console.error(file.type + ' Is not a supported file type');
      }
    } else {
      this.file = null;
      this.isCsv = false;
    }

  }

  importCsv(headers: Array<CsvHeader>) {
    this.parseService.csvBody.subscribe(value => {
      this.transactions = value;
    });
    this.parseService.parseCsv(this.file, headers);
  }

  addBudgetedTransactions(transactions: Array<Transaction>) {
    for (let x in transactions) {
      transactions[x].account = this.selectedAccount;
    }
    this.transactionService.saveNewTrasnactions(transactions);
  }

}

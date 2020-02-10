import { transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { BudgetService } from './../../../../core/services/budget/budget.service';
import { TransactionCsvParseService } from '../../../../core/services/transaction/transaction-csv-parse.service';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';
import { CsvHeader } from 'src/app/shared/models/CsvHeader';
import { Budget } from 'src/app/shared/models/Budget';
import { BudgetCount } from '../../models/BudgetCount';

const DATA: Transaction[] = [
  {id: 1, date: new Date('12/27/2019'), description: 'description 1', amount: 52.02} as Transaction,
  {id: 1, date: new Date('12/20/2019'), description: 'description 2', amount: 82} as Transaction,
  {id: 1, date: new Date('12/15/2019'), description: 'description 3', amount: 51} as Transaction,
  {id: 1, date: new Date('12/05/2019'), description: 'description 4', amount: 108} as Transaction,
  {id: 1, date: new Date('12/01/2019'), description: 'description 5', amount: 725.35} as Transaction,
  {id: 1, date: new Date('12/29/2019'), description: 'description 6', amount: 524.21} as Transaction,
  {id: 1, date: new Date('12/30/2019'), description: 'description 7', amount: 12.23} as Transaction,
  {id: 1, date: new Date('12/17/2019'), description: 'description 8', amount: 6.31} as Transaction,
]

@Component({
  selector: 'app-import-transactions',
  templateUrl: './import-transactions.component.html',
  styleUrls: ['./import-transactions.component.scss']
})
export class ImportTransactionsComponent implements OnInit {

  private subscriptions: Subscription = new Subscription();

  file: File;
  // isCsv = false;
  isCsv = true;
  headers: Array<string> = [];
  expectedHeaders: Array<string> =
    ['Transaction Date', 'Account Number', 'Description', 'Debit', 'Credit'];
  requiredHeaders: Array<CsvHeader> = [];
  transactions: Array<Transaction> = DATA;

  @Input() budgets: Array<Budget> = [];

  budgetCounts: Array<BudgetCount> = [];

  columnsToDisplay: string[] =
      ['date', 'description', 'amount'];

  constructor(
    private parseService: TransactionCsvParseService,
    private budgetService: BudgetService) {}

  ngOnInit() {

    this.subscriptions.add(
      this.budgetService.getBudgets().subscribe((budgets: Array<Budget>) => {
        this.budgets = budgets;

        for (const budget of this.budgets) {
          const budgetCount = {} as BudgetCount;
          budgetCount.budget = budget;
          budgetCount.count = 0;
          this.budgetCounts.push(budgetCount);
        }

      })
    );
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
        console.log(file.type + ' Is not a supported file type');
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

  addTransactionsToBudget(value) {
    console.log("Do some stuff");
  }

}

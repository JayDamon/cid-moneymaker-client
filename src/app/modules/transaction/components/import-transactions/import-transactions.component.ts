import { TransactionCsvParseService } from './../../../../core/services/transaction/transaction-csv-parse.service';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';
import { CsvHeader } from 'src/app/shared/models/CsvHeader';
import { Category } from 'src/app/shared/models/Category';
import { Budget } from 'src/app/shared/models/Budget';

interface BudgetCount {
  budget: Budget;
  count: number;
}

@Component({
  selector: 'app-import-transactions',
  templateUrl: './import-transactions.component.html',
  styleUrls: ['./import-transactions.component.scss']
})
export class ImportTransactionsComponent implements OnInit {

  file: File;
  isCsv = false;
  headers: Array<string> = [];
  expectedHeaders: Array<string> =
    ['Transaction Date', 'Account Number', 'Description', 'Debit', 'Credit'];
  requiredHeaders: Array<CsvHeader> = [];
  transactions: Array<Transaction> = [];

  @Input() budgets: Array<Budget> = [];

  budgetCounts: Array<BudgetCount> = [];

  columnsToDisplay: string[] =
      ['date', 'transactionCategory', 'description', 'amount'];

  constructor(private parseService: TransactionCsvParseService) {}

  ngOnInit() {

    if (this.budgets) {
      for (const budget of this.budgets) {
        const budgetCount = {} as BudgetCount;
        budgetCount.budget = budget;
        budgetCount.count = 0;
        this.budgetCounts.push(budgetCount);
      }
    }

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

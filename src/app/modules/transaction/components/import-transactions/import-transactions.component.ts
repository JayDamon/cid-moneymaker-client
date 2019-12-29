import { TransactionCsvParseService } from './../../../../core/services/transaction/transaction-csv-parse.service';
import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';
import { CsvHeader } from 'src/app/shared/models/CsvHeader';
import { Category } from 'src/app/shared/models/Category';
import { Budget } from 'src/app/shared/models/Budget';

interface CategoryCount {
  category: Category;
  count: number;
}

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
  requiredHeaders: Array<CsvHeader> = [];
  transactions: Array<Transaction> = [];

  @Input() budgets: Array<Budget> = [];

  budgetCounts: Array<BudgetCount> = [];

  columnsToDisplay: string[] =
      ['date', 'transactionCategory', 'description', 'amount'];

  constructor(private parseService: TransactionCsvParseService) {}

  ngOnInit() {
    this.requiredHeaders.push({requiredValue: 'Transaction Date'} as CsvHeader);
    this.requiredHeaders.push({requiredValue: 'Account Number'} as CsvHeader);
    this.requiredHeaders.push({requiredValue: 'Description'} as CsvHeader);
    this.requiredHeaders.push({requiredValue: 'Debit'} as CsvHeader);
    this.requiredHeaders.push({requiredValue: 'Credit'} as CsvHeader);

    if (this.budgets) {
      for (const budget of this.budgets) {
        const budgetCount = {} as BudgetCount;
        budgetCount.budget = budget;
        budgetCount.count = 0;
        this.budgetCounts.push(budgetCount);
      }
    }

  }

  updateRequiredHeaders(head: CsvHeader, value) {
    head.csvHeaderValue = value;
    for (const i in this.requiredHeaders) {
      if (this.requiredHeaders[i].requiredValue === head.requiredValue) {
        this.requiredHeaders[i] = head;
        break;
      }
    }
  }

  onSelect(event) {
    const files: Array<File> = event.addedFiles;

    if (files.length > 1) {
      console.log('Must not add more than one file');
    } else {
      const file = files[0];
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
    }

  }

  importCsv() {
    this.parseService.csvBody.subscribe(value => {
      this.transactions = value;
    });
    console.log(this.requiredHeaders);
    this.parseService.parseCsv(this.file, this.requiredHeaders);
  }

  onRemove() {
    this.isCsv = false;
    this.file = null;
  }

}

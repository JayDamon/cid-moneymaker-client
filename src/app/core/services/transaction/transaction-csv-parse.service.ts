import { FinancialAccount } from './../../../shared/models/FinancialAccount';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Category } from 'src/app/shared/models/Category';
import { Budget } from 'src/app/shared/models/Budget';
import { CsvHeader } from 'src/app/shared/models/CsvHeader';

@Injectable({
  providedIn: 'root'
})
export class TransactionCsvParseService {

  csvHeaders: BehaviorSubject<Array<string>> = new BehaviorSubject([]);
  csvBody: BehaviorSubject<Array<Transaction>> = new BehaviorSubject([]);

  transactions: Array<Transaction> = [];

  constructor(private parser: Papa) { }

  public parseCsv(csvFile: File, headers: Array<CsvHeader>): void {

    const options = {
      step: (results) => {
        const data = results.data;
        const transaction: Transaction = this.createEmptyTransaction();
        headers.forEach(element => {
          const value = data[element.csvHeaderValue];
          if (element.requiredValue === 'Transaction Date') {
            transaction.date = new Date(value);
          } else if (element.requiredValue === 'Account Number') {
            transaction.account = value;
          } else if (element.requiredValue === 'Description') {
            transaction.description = value;
          } else if (element.requiredValue === 'Debit') {
            if (value) {
              transaction.amount = value * -1;
            }
          } else if (element.requiredValue === 'Credit') {
            if (value) {
              transaction.amount = value;
            }
          }
        });
        this.transactions.push(transaction);
      },
      complete: () => {
        this.csvBody.next(this.transactions);
      },
      header: true
    };

    this.parser.parse(csvFile, options);
  }

  private createEmptyTransaction(): Transaction {
    const transaction: Transaction = {} as Transaction;
    transaction.account = {} as FinancialAccount;
    transaction.budget = {} as Budget;
    transaction.budget.name = null;

    return transaction;
  }

  public getCsvHeader(csvFile: File): void {

    const options = {
      step: (results, parser) => {
        this.csvHeaders.next(results.meta.fields);
        parser.abort();
      },
      header: true
    };

    this.parser.parse(csvFile, options);
  }

}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Budget } from 'src/app/shared/models/Budget';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-import-transaction-table',
  templateUrl: './import-transaction-table.component.html',
  styleUrls: ['./import-transaction-table.component.scss']
})
export class ImportTransactionTableComponent {

  _transactions: MatTableDataSource<Transaction>;

  @Input() budgets: Array<Budget> = [];
  @Input() transactionCategories: Array<Category> = [];

  @Input()
  columnsToDisplay: string[] =
      ['date', 'transactionCategory', 'budgetName', 'description', 'amount'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  set transactions(transactions: Array<Transaction>) {
    this._transactions = new MatTableDataSource(transactions);
    this._transactions.sort = this.sort;
  }

  constructor() { }

}

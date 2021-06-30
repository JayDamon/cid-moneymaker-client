import { Component, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../models/Transaction';


@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {

  _transactions: MatTableDataSource<Transaction>;

  @Input()
  columnsToDisplay: string[] =
      ['date', 'accountName', 'budgetName', "budgetCategoryName", 'description', 'amount'];

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    @Input()
    set transactions(transactions: Array<Transaction>) {
      this._transactions = new MatTableDataSource(transactions);
      this._transactions.sort = this.sort;
    }

    constructor() {
    }

}

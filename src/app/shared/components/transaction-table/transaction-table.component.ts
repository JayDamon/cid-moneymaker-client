import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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

      this._transactions.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'accountName': return item.account.name;
          case 'budgetName': return item.budget?.name;
          case 'budgetCategoryName': return item.budget?.budgetCategory?.name;
          default: return item[property];
        }
      }

      this._transactions.sort = this.sort;
    }

    constructor() {
    }

}

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

      this._transactions.filterPredicate = (data, filter) => {

        if (filter === "TT_TYPE_expense") {
          return data.amount < 0;
        } else if (filter === "TT_TYPE_income") {
          return data.amount > 0;
        }

        const accumulator = (currentTerm, key) => {
          if (key === 'account') return currentTerm + data.account.name;
          if (key === 'budget') return currentTerm + data.budget.name;
          if (key === 'category') return currentTerm + data.budget?.budgetCategory?.name;
          return currentTerm + data[key];
        }

        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) != -1;
      }

      this._transactions.sort = this.sort;
    }

    constructor() {
    }

    public applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this._transactions.filter = filterValue.trim().toLocaleLowerCase();
    }

    public applyTypeFilter(filter: string) {
      if (filter !== "all") {
        this._transactions.filter = "TT_TYPE_" + filter;
      } else {
        this._transactions.filter = '';
      }
    }

}

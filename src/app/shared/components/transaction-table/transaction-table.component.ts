import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { Transaction } from '../../models/Transaction';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {

  transactionService: TransactionService;
  transactions: MatTableDataSource<Transaction>;
  columnsToDisplay: String[] = ['date', 'accountName', 'transactionCategory', 'description', 'amount'];

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
    this.addTransactions();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
  }

  addTransactions() {
    this.transactionService.getTransactions().subscribe((transactions: Transaction[])=>{
      this.transactions = new MatTableDataSource(transactions);
      this.transactions.sort = this.sort;
    });
  }

}

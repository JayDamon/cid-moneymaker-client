import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionDataService } from './transaction-data.service';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Category } from 'src/app/shared/models/Category';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionCategories: Observable<Array<Category>>;

  constructor(private transactionDataService: TransactionDataService) { }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionDataService.getTransactions();
  }

  getTransactionCategories(): Observable<Array<Category>> {
    this.transactionCategories = this.transactionDataService.getTransactionCategories();
    return this.transactionCategories;
  }

  saveNewTrasnactions(transactions: Array<Transaction>) {
    this.transactionDataService.saveNewTransactions(transactions);
  }

}

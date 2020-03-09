import { Injectable, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/shared/models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionDragDropService {

  constructor() { }

  transactionsToAdd: EventEmitter<Array<Transaction>> = new EventEmitter();

  transactionsAdded: EventEmitter<Array<Transaction>> = new EventEmitter();

  public emitTransactionChanges(transactions: Array<Transaction>) {
    this.transactionsToAdd.emit(transactions);
  }

  public emitTransactionsAddedOnChanges(transactions: Array<Transaction>) {
    this.transactionsAdded.emit(transactions);
  }

  public getTransactionsToAddEmitter() {
    return this.transactionsToAdd;
  }

  public getTransactionsAddedEmitter() {
    return this.transactionsAdded;
  }

}

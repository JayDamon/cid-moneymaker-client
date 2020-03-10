import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { BudgetCount } from '../../models/BudgetCount';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Subscription } from 'rxjs';
import { TransactionDragDropService } from '../../services/transaction-drag-drop.service';
import { Budget } from 'src/app/shared/models/Budget';

@Component({
  selector: 'app-budget-count',
  templateUrl: './budget-count.component.html',
  styleUrls: ['./budget-count.component.scss']
})
export class BudgetCountComponent implements OnInit, OnDestroy {

  @Input()
  budgetCounts: Array<BudgetCount> = [];

  @Input()
  transactionsToAdd: Array<Transaction> = [];

  @Output() 
  emitBudgetedTransactions = new EventEmitter();

  transactionsBeingDragged: Array<Transaction> = [];

  transactionSubscription: Subscription;

  constructor(private dragDropService: TransactionDragDropService) { }

  ngOnInit() {
    this.transactionSubscription = this.dragDropService.getTransactionsToAddEmitter()
      .subscribe(transactions => this.transactionsBeingDragged = transactions)
  }

  ngOnDestroy() {
    this.transactionSubscription.unsubscribe();
  }

  drag(event) {
    const target: HTMLElement = event.target as HTMLElement;
    target.parentElement.classList.add('dragover');
  }

  dragOver(event) {
    event.preventDefault();
  }

  dragExit(event) {
    this.removeDragover(event);
  }

  drop(event, budgetCount: BudgetCount) {

    budgetCount.count = budgetCount.count + this.transactionsBeingDragged.length;
    if (budgetCount.transactions == undefined) {
      budgetCount.transactions = [];
    }
    budgetCount.transactions = budgetCount.transactions.concat(this.transactionsBeingDragged);

    this.addBudgetToTransactions(this.transactionsBeingDragged, budgetCount.budget);
    
    this.dragDropService.emitTransactionsAddedOnChanges(this.transactionsBeingDragged);
    this.removeDragover(event);

  }

  addBudgetToTransactions(transactions: Array<Transaction>, budget: Budget) {
    for (let i = 0; i < transactions.length; i++) {
      transactions[i].budget = budget;
    }
    this.emitBudgetedTransactions.emit(transactions);
  }

  private removeDragover(event) {
    const target: HTMLElement = event.target as HTMLElement;
    target.parentElement.classList.remove('dragover');
  }

}

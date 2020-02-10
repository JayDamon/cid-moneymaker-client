import { Component, OnInit, Input } from '@angular/core';
import { BudgetCount } from '../../models/BudgetCount';
import { Transaction } from 'src/app/shared/models/Transaction';
import { bufferCount } from 'rxjs/operators';

@Component({
  selector: 'app-budget-count',
  templateUrl: './budget-count.component.html',
  styleUrls: ['./budget-count.component.scss']
})
export class BudgetCountComponent implements OnInit {

  @Input()
  budgetCounts: Array<BudgetCount> = [];

  @Input()
  transactionsToAdd: Array<Transaction> = [];

  constructor() { }

  ngOnInit() {
  }

  drag(event) {
    const target: HTMLElement = event.target as HTMLElement;
    target.parentElement.classList.add('dragover');
  }

  dragOver(event) {
    event.preventDefault();
  }

  dragExit(event) {
    const target: HTMLElement = event.target as HTMLElement;
    target.parentElement.classList.remove('dragover');
  }

  drop(event, budgetCount: BudgetCount) {
    console.log(event);
    const transactions: Array<Transaction> = JSON.parse(event.dataTransfer.getData('transactions'));
    budgetCount.count = budgetCount.count + transactions.length;
    budgetCount.transactions = transactions;
    event.dataTransfer.setData('ended', JSON.stringify({successful: true}));
    this.dragExit(event);
  }

}

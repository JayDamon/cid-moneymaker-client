import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { BudgetCount } from '../../models/BudgetCount';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Subscription } from 'rxjs';
import { TransactionDragDropService } from '../../services/transaction-drag-drop.service';
import { Budget } from 'src/app/shared/models/Budget';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface BudgetCountNode {
  name: string;
  budgetCount?: BudgetCount;
  children?: Array<BudgetCountNode>;
}

interface FlatBudgetNode {
  expandable: boolean;
  name: string;
  budgetCount: BudgetCount;
  level: number;
}

@Component({
  selector: 'app-budget-count',
  templateUrl: './budget-count.component.html',
  styleUrls: ['./budget-count.component.scss']
})
export class BudgetCountComponent implements OnInit, OnDestroy, OnChanges {

  @Input() budgetCounts: Array<BudgetCount> = [];

  @Output()
  emitBudgetedTransactions = new EventEmitter();

  private _transformer = (node: BudgetCountNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      budgetCount: node.budgetCount
    };
  }

  transactionsBeingDragged: Array<Transaction> = [];

  transactionSubscription: Subscription;

  treeControl = new FlatTreeControl<FlatBudgetNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private dragDropService: TransactionDragDropService) { }

  ngOnInit() {

    this.transactionSubscription = this.dragDropService.getTransactionsToAddEmitter()
      .subscribe(transactions => this.transactionsBeingDragged = transactions);

    if (this.budgetCounts) {
      this.setUpTreeNode(this.budgetCounts);
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    let counts: Array<BudgetCount> = changes.budgetCounts.currentValue;
    if (counts) {
      this.setUpTreeNode(counts);
    }
  }

  private setUpTreeNode(budgetCounts: Array<BudgetCount>) {

    let budgetMap = new Map();
    // TODO: this needs to split out in more detail, based on line 89
    for (let bc of budgetCounts) {

      let budgetCategoryType: string = bc.budget.budgetCategory.type;
      let budgetCategoryName: string = bc.budget.budgetCategory.name;
      let fullCatname: string = budgetCategoryType.charAt(0).toUpperCase() + budgetCategoryType.slice(1) + ' ' + budgetCategoryName.charAt(0).toUpperCase() + budgetCategoryName.slice(1);

      let node: BudgetCountNode;

      if (budgetMap.has(fullCatname)) {
        node = budgetMap.get(fullCatname);
      } else {
        node = {
          name: fullCatname,
          children: []
        }
      }

      let childNode: BudgetCountNode = {
        name: bc.budget.name,
        budgetCount: bc
      }

      node.children.push(childNode);

      budgetMap.set(fullCatname, node);

    }

    let nodes: Array<BudgetCountNode> = [];

    for (let value of budgetMap.values()) {
      nodes.push(value);
    }

    this.dataSource.data = nodes;
  }

  hasChild = (_: number, node: FlatBudgetNode) => node.expandable;

  ngOnDestroy() {
    this.transactionSubscription.unsubscribe();
  }

  drag(event) {
    event.preventDefault();
    const target: HTMLElement = event.target as HTMLElement;
    target.parentElement.classList.add('dragover');
  }

  dragOver(event, node) {
    this.treeControl.collapseAll();
    this.treeControl.expand(node);
    event.preventDefault();
  }

  dragOverChild(event) {
    event.preventDefault();
  }

  dragExit(event) {
    this.removeDragover(event);
  }

  drop(event, budgetCountNode) {

    let budgetCount = budgetCountNode.budgetCount;

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

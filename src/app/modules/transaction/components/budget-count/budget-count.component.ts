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
  budgetCount: BudgetCountNode;
  level: number;
}

@Component({
  selector: 'app-budget-count',
  templateUrl: './budget-count.component.html',
  styleUrls: ['./budget-count.component.scss']
})
export class BudgetCountComponent implements OnInit, OnDestroy, OnChanges {

  @Input() budgetCounts: Array<BudgetCount> = [];

  @Input()
  transactionsToAdd: Array<Transaction> = [];

  @Output() 
  emitBudgetedTransactions = new EventEmitter();

  private _transformer = (node: BudgetCountNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: Node.name,
      level: level,
    };
  }

  transactionsBeingDragged: Array<Transaction> = [];

  transactionSubscription: Subscription;

  treeControl = new FlatTreeControl<FlatBudgetNode>(
    node => node.level, node => node.expandable);

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
    // let counts: Array<BudgetCount> = changes.budgetCounts.currentValue;
    // if (counts) {
    //   console.log("Counts ", counts);
    //   this.setUpTreeNode(counts);
    //   console.log("Final Data ", this.dataSource.data);
    // }
  }

  private setUpTreeNode(budgetCounts: Array<BudgetCount>) {
    
    console.log(budgetCounts);

    let budgetMap = new Map();
    for (let bc of budgetCounts) {
      let budgetCategoryName: string = bc.budget.budgetCategory.type;

      let node: BudgetCountNode;

      if (budgetMap.has(budgetCategoryName)) {
        node = budgetMap.get(budgetCategoryName);
      } else {
        node = {
          name: budgetCategoryName,
          children: []
        }
      }

      let childNode: BudgetCountNode = {
        name: bc.budget.name,
        budgetCount: bc
      }

      node.children.push(childNode);

      budgetMap.set(budgetCategoryName, node);

    }

    let nodes: Array<BudgetCountNode> = [];

    for (let value of budgetMap.values()) {
      nodes.push(value);
    } 

    console.log("nodes ", nodes);
    this.dataSource.data = nodes;
  }

  hasChild = (_: number, node: FlatBudgetNode) => node.expandable;

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

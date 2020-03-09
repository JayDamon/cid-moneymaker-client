import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Budget } from 'src/app/shared/models/Budget';
import { Category } from 'src/app/shared/models/Category';
import { SelectionModel } from '@angular/cdk/collections';
import { TransactionDragDropService } from '../../services/transaction-drag-drop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-import-transaction-table',
  templateUrl: './import-transaction-table.component.html',
  styleUrls: ['./import-transaction-table.component.scss']
})
export class ImportTransactionTableComponent implements OnInit, OnDestroy {

  @Input() budgets: Array<Budget> = [];
  @Input() transactionCategories: Array<Category> = [];

  @Input()
  columnsToDisplay: string[] =
      ['date', 'description', 'amount'];

  @Input()
  set transactions(transactions: Array<Transaction>) {
    this.dataSource = new MatTableDataSource(transactions);
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(d => this.renderedData = d);
  }

  @Output() addToBudget = new EventEmitter();

  private transactionsDroppedSubscription: Subscription;

  private transactionsDropped: Array<Transaction> = [];

  dataSource: MatTableDataSource<Transaction>;
  renderedData: Array<Transaction>;
  selection = new SelectionModel<Transaction>(true, []);

  lastSelected = -1;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('transactionTable', {read: ElementRef, static: true} ) transactionTable: ElementRef;

  constructor(private renderer: Renderer2, private dragDropService: TransactionDragDropService) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const element: HTMLElement = e.target as HTMLElement;
      const tableElement: HTMLElement = this.transactionTable.nativeElement as HTMLElement;
      if (e.target !== this.transactionTable.nativeElement && !tableElement.contains(element)) {
        this.selection.clear();
      }
    });
  }

  ngOnInit() {
    this.transactionsDroppedSubscription = this.dragDropService.getTransactionsAddedEmitter()
    .subscribe(transactions => {
      this.transactionsDropped = transactions;
    })
  }

  ngOnDestroy() {
    this.transactionsDroppedSubscription.unsubscribe();
  }

  clickHandler(event, row: Transaction, index: number) {

    if (event.ctrlKey) {
      this.selection.toggle(row);
    } else if (event.shiftKey) {
      this.selectRowsFill(index);
    } else {
      this.lastSelected = index;
      this.selectElment(row);
    }

  }

  selectElment(row: Transaction) {
    if (!this.selection.isSelected(row)) {
      this.selection.clear();
      this.selection.toggle(row);
    } else {
      this.selection.clear();
    }
  }

  selectRowsFill(index: number) {
    if (this.lastSelected >= 0) {
      const indexA = this.lastSelected;
      const indexB = index;
      if (indexA > indexB) {
        this.selectRowsBetween(indexB, indexA);
      } else {
        this.selectRowsBetween(indexA, indexB);
      }
    } else {
      this.lastSelected = index;
    }
  }

  private selectRowsBetween(start: number, end: number) {
    let currentIndex = 0;
    this.renderedData.forEach(row => {
      if (currentIndex >= start && currentIndex <= end) {
        this.selection.select(row);
      }
      currentIndex++;
    });
  }

  drag(row, index) {
    const transactionsToSave: Array<Transaction> = [];
    this.lastSelected = index;
    if (!this.selection.isSelected(row)) {
        this.selection.toggle(row);
      }
    this.renderedData.forEach(item => {
      if (this.selection.isSelected(item)) {
        transactionsToSave.push(item);
      }
    });
    this.dragDropService.emitTransactionChanges(transactionsToSave);
  }

  dragEnded() {

    const transactionsToRemove: Array<Transaction> = this.transactionsDropped;

    for (let j = 0 ; j < transactionsToRemove.length; j ++) {
      const index = this.dataSource.data.indexOf(transactionsToRemove[j]);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
    
    this.dragDropService.emitTransactionsAddedOnChanges([]);
    
  }

}

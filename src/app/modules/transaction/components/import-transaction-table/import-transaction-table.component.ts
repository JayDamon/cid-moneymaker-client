import { Component, OnInit, Input, ViewChild, Output, EventEmitter, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Budget } from 'src/app/shared/models/Budget';
import { Category } from 'src/app/shared/models/Category';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-import-transaction-table',
  templateUrl: './import-transaction-table.component.html',
  styleUrls: ['./import-transaction-table.component.scss']
})
export class ImportTransactionTableComponent {

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

  dataSource: MatTableDataSource<Transaction>;
  renderedData: Array<Transaction>;
  selection = new SelectionModel<Transaction>(true, []);

  lastSelected = -1;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('transactionTable', {read: ElementRef, static: true} ) transactionTable: ElementRef;

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const element: HTMLElement = e.target as HTMLElement;
      const tableElement: HTMLElement = this.transactionTable.nativeElement as HTMLElement;
      if (e.target !== this.transactionTable.nativeElement && !tableElement.contains(element)) {
        this.selection.clear();
      }
    });
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
    // TODO: this prevents deselction, need new strategy
    this.selection.clear();
    this.selection.toggle(row);
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

  drag(event, row, index) {
    const transactionsToSave: Array<Transaction> = [];
    // this.lastSelected = index;
    // if (!this.selection.isSelected(row)) {
      //   this.selection.toggle(row);
      // }
    this.renderedData.forEach(item => {
      if (this.selection.isSelected(item)) {
        transactionsToSave.push(item);
      }
    });
    event.dataTransfer.setData('transactions', JSON.stringify(transactionsToSave));
    // TODO: how do i check that the drop was completed successfully? Should i send a callback or use an event emmiter?
  }

  dragEnded(event) {
    console.log(event);
    console.log(event.dataTransfer.getData('ended'));
    console.log("ended", JSON.parse(event.dataTransfer.getData('ended')));
  }

}

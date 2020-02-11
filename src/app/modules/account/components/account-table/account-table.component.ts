import { AccountType } from './../../../../shared/models/AccountType';
import { AccountClassification } from './../../../../shared/models/AccountClassification';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent {

  _accounts: Array<FinancialAccount>;
  columnsToDisplay: String[] = ['name', 'type', 'startingBalance', 'currentBalance', 'classification', 'isPrimary'];
  expandedElement: FinancialAccount | null;

  @Output() accountChange = new EventEmitter();

  @Input() accountTypes: Array<AccountType> = [];
  @Input() accountClassifications: Array<AccountClassification> = [];

  @Input() 
  set accounts(accounts: Array<FinancialAccount>) {
    this._accounts = accounts;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  updateAccount(account: FinancialAccount) {
    this.accountChange.emit(account);
  }

}

import { AccountType } from './../../../shared/models/AccountType';
import { AccountDataService } from './account-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { AccountClassification } from 'src/app/shared/models/AccountClassification';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _accounts = new BehaviorSubject<Array<FinancialAccount>>([]);
  private accountStore: { accounts: Array<FinancialAccount> } = { accounts: [] }
  readonly accounts = this._accounts.asObservable();
  private accountTypes: Observable<Array<AccountType>>;
  private accountClassifications: Observable<Array<AccountClassification>>;

  private _accountsExist: Boolean;

  constructor(private accountDataService : AccountDataService) {
    this.loadAllAccounts();
    this.loadAllAccountTypes();
    this.loadAllAccountClassifications();
   }

  private loadAllAccounts() {
    this.accountDataService.getAccounts().subscribe(data => {
      this.accountStore.accounts = data;
      this._accounts.next(Object.assign({}, this.accountStore).accounts);
      this._accountsExist = data.length > 0;
    })
  }

  private loadAllAccountTypes() {
    this.accountTypes = this.accountDataService.getAccountTypes();
  }

  private loadAllAccountClassifications() {
    this.accountClassifications = this.accountDataService.getAccountClassifications();
  }

  public getAccounts(): Observable<Array<FinancialAccount>> {
    return this.accounts;
  }

  accountsExist(): Boolean {
    return this._accountsExist;
  }

  createAccount(account: FinancialAccount) {
    this.accountDataService.createAccount(account).subscribe((savedAccount: FinancialAccount) => {
      this.accounts.pipe(map(accounts => {
        accounts.push(savedAccount);
      }));
    })
  }

  updateaccount(account: FinancialAccount) {
    this.accountDataService.updateAccount(account, account.id).subscribe((savedAccount: FinancialAccount) => {
      this.accountStore.accounts.forEach((a, i) => {
        if (a.id === savedAccount.id) {
          this.accountStore.accounts[i] = savedAccount;
        }
      })
      this._accounts.next(Object.assign({}, this.accountStore).accounts);
    });
  }

  getAccountTypes(): Observable<Array<AccountType>> {
    return this.accountTypes;
  }

  getAccountClassifications(): Observable<Array<AccountClassification>> {
    return this.accountClassifications;
  }


}

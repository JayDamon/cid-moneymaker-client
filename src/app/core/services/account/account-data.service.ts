import { AccountType } from './../../../shared/models/AccountType';
import { Observable } from 'rxjs';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {

  constructor(private apiService: ApiService) { }

  getAccounts(): Observable<Array<FinancialAccount>> {
    return this.apiService.get('/v1/accounts');
  }

  updateAccount(account: FinancialAccount, id: number): Observable<FinancialAccount> {
    return this.apiService.patch("/v1/accounts/", account, id);
  }

  createAccount(account: FinancialAccount): Observable<FinancialAccount> {
    return this.apiService.post("/v1/accounts", account);
  }

  getAccountTypes(): Observable<Array<AccountType>> {
    return this.apiService.get("/v1/account-types");
  }

}

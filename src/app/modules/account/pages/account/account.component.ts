import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/account/account.service';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { AccountType } from 'src/app/shared/models/AccountType';
import { AccountClassification } from 'src/app/shared/models/AccountClassification';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  accounts: Array<FinancialAccount>;
  accountsCreated: Boolean;
  accountTypes: Array<AccountType> = [];
  accountClassifications: Array<AccountClassification> = [];

  constructor(private accountService: AccountService) { 
  
    this.accountService.getAccounts().subscribe((accounts: Array<FinancialAccount>) => {
      this.accounts = accounts;
      this.accountsCreated = accounts.length > 0;
    })

    this.accountService.getAccountTypes().subscribe((accountTypes: Array<AccountType>) => {
      this.accountTypes = accountTypes;
    })

    this.accountService.getAccountClassifications().subscribe((accountClassifications: Array<AccountClassification>) => {
      this.accountClassifications = accountClassifications;
    })
        
  }

  updateAccount(account: FinancialAccount) {
    this.accountService.updateaccount(account);
  }

}

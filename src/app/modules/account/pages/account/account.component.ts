import { Component } from '@angular/core';
// import { AccountService } from 'src/app/core/services/account/account.service';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { AccountType } from 'src/app/shared/models/AccountType';
import { AccountClassification } from 'src/app/shared/models/AccountClassification';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountComponent } from '../../components/new-account/new-account.component';
import { AccountDataService } from 'src/app/core/services/account/account-data.service';

export interface DialogData {
  accountTypes: Array<AccountType>;
  accountClassifications: Array<AccountClassification>;
  newAccount: FinancialAccount;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  accounts: Array<FinancialAccount>;
  accountsCreated: Boolean;
  dataLoading: Boolean = true;
  accountTypes: Array<AccountType> = [];
  accountClassifications: Array<AccountClassification> = [];

  constructor(private accountService: AccountDataService, public dialog: MatDialog) { 
  
    this.addAccountSubscriptions(this.accountService);
        
  }

  private addAccountSubscriptions(accountService: AccountDataService) {
    accountService.getAccounts().subscribe((accounts: Array<FinancialAccount>) => {
      this.accounts = accounts;
      this.dataLoading = false;
      this.accountsCreated = accounts.length > 0;
    })

    accountService.getAccountTypes().subscribe((accountTypes: Array<AccountType>) => {
      this.accountTypes = accountTypes;
    })

    accountService.getAccountClassifications().subscribe((accountClassifications: Array<AccountClassification>) => {
      this.accountClassifications = accountClassifications;
    })
  }

  updateAccount(account: FinancialAccount) {
    this.accountService.updateAccount(account, account.id).subscribe((savedAccount: FinancialAccount) => {
      this.accounts.forEach((a, i) => {
        if (a.id === savedAccount.id) {
          this.accounts[i] = savedAccount;
        }
      });
    });
  }

  createAccount() {

    let emptyAccunt: FinancialAccount = {
      id: null,
      name: '',
      type: null,
      startingBalance: null,
      currentBalance: null,
      classification: null,
      isPrimary: false,
      isInCashFlow: false
    };

    const dialogRef = this.dialog.open(NewAccountComponent, {
      data: {
        accountTypes: this.accountTypes, 
        newAccount: emptyAccunt,
        accountClassifications: this.accountClassifications
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.accountService.createAccount(result).subscribe((newAccount => {
        this.accounts.push(newAccount);
      }));
    })

  }

}

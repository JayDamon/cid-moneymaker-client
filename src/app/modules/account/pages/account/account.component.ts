import { Component } from '@angular/core';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { AccountType } from 'src/app/shared/models/AccountType';
import { MatDialog } from '@angular/material/dialog';
import { NewAccountComponent } from '../../components/new-account/new-account.component';
import { AccountDataService } from 'src/app/core/services/account/account-data.service';
import { NoResourcesDialogComponent } from 'src/app/shared/components/no-resources-dialog/no-resources-dialog.component';

export interface NewAccountDialogData {
  accountTypes: Array<AccountType>;
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

  constructor(private accountService: AccountDataService, private dialog: MatDialog) {
    this.addAccountSubscriptions(this.accountService);
  }

  private addAccountSubscriptions(accountService: AccountDataService) {
    accountService.getAccounts().subscribe((accounts: Array<FinancialAccount>) => {
      this.accounts = accounts;
      this.dataLoading = false;
      this.accountsCreated = accounts.length > 0;
      if (!this.accountsCreated) this.showAccountUpdateDialog();
    })

    accountService.getAccountTypes().subscribe((accountTypes: Array<AccountType>) => {
      this.accountTypes = accountTypes;
    })
  }

  private showAccountUpdateDialog() {
    const dialogRef = this.dialog.open(NoResourcesDialogComponent, {
      data: {
        displayText: "You have not added any accounts yet, would you like to create some now?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "Yes") {
        this.createAccount();
      }
    })
  }

  updateAccount(account: FinancialAccount) {
    this.accountService.updateAccount(account, account.id).subscribe((savedAccount: FinancialAccount) => {
      this.accounts.forEach((a, i) => {
        if (a.id === savedAccount.id) {
          savedAccount.type.fullName = account.type.fullName;
          this.accounts[i] = savedAccount;
          this.updateAccountArray();
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
      isPrimary: false,
      isInCashFlow: false
    };

    const dialogRef = this.dialog.open(NewAccountComponent, {
      data: {
        accountTypes: this.accountTypes,
        newAccount: emptyAccunt
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.createAccount(result).subscribe((newAccount => {
          this.accounts.push(newAccount);
          this.updateAccountArray();
        }));
      }
    });
  }

  private updateAccountArray() {
    let accounts = [];
    this.accounts.forEach(account => accounts.push(account));
    this.accounts = accounts;
  }

}

import { Component, Input, Inject } from '@angular/core';
import { AccountType } from 'src/app/shared/models/AccountType';
import { FinancialAccount } from 'src/app/shared/models/FinancialAccount';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewAccountDialogData } from '../../pages/account/account.component';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  @Input() accountTypes: Array<AccountType> = [];

  account: FinancialAccount;

  constructor(
    public dialogRef: MatDialogRef<NewAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewAccountDialogData) {

      this.account = data.newAccount;

      this.accountTypes = data.accountTypes;
  }

  cancelInput() {
    this.dialogRef.close();
  }

}

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-import-transaction-dialog',
  templateUrl: './import-transaction-dialog.component.html',
  styleUrls: ['./import-transaction-dialog.component.scss']
})
export class ImportTransactionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImportTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  exit(): void {
    this.dialogRef.close();
  }

}

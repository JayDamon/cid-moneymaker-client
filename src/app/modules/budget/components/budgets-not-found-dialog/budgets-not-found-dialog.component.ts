import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RedirectDialogData } from '../../pages/budget-overview/budget-overview.component';

@Component({
  selector: 'app-budgets-not-found-dialog',
  templateUrl: './budgets-not-found-dialog.component.html',
  styleUrls: ['./budgets-not-found-dialog.component.scss']
})
export class BudgetsNotFoundDialogComponent {

  dialogText: string;
  route: string;

  constructor(public dialogRef: MatDialogRef<BudgetsNotFoundDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RedirectDialogData,
    private router: Router) {

      this.dialogText = data.displayText;
      this.route = data.route;

     }

  onYesClick(): void {
    this.router.navigate([this.route]);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

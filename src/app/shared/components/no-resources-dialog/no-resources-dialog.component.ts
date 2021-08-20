import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoResourcesDialogData } from '../../models/NoResourcesDialogData';

@Component({
  selector: 'app-no-resources-dialog',
  templateUrl: './no-resources-dialog.component.html',
  styleUrls: ['./no-resources-dialog.component.scss']
})
export class NoResourcesDialogComponent {

  dialogText: string;
  route: string;

  constructor(public dialogRef: MatDialogRef<NoResourcesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NoResourcesDialogData,
    private router: Router) {

      this.dialogText = data.displayText;
      this.route = data.route;

     }

  onYesClick(): void {
    if (this.route == null) {
      this.dialogRef.close("Yes");
    } else {
      this.router.navigate([this.route]);
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

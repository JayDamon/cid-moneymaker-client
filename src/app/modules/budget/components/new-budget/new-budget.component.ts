import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Budget } from 'src/app/shared/models/Budget';
import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { NewBudgetDialogData } from '../../pages/budget-details/budget-details.component';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.scss']
})
export class NewBudgetComponent {

  @Input() frequencyTypes: Array<FrequencyType>;
  @Input() budgetCategories: Array<BudgetCategory>;

  budget: Budget;

  constructor(
    private dialogRef: MatDialogRef<NewBudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewBudgetDialogData) {

      this.frequencyTypes = data.frequencyTypes;
      this.budgetCategories = data.budgetCategories;

      this.budget = data.newBudget;
  }

  cancelInput() {
    this.dialogRef.close();
  }

}

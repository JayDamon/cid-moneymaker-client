import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/core/services/budget/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {


  budgetService: BudgetService;
  router: Router;

  firstMonthBudgetSummary: BudgetSummary[];
  secondMonthBudgetSummary: BudgetSummary[];
  budgetExists: Boolean;
  
  constructor(budgetService: BudgetService, router: Router) {
    this.budgetService = budgetService;
    this.router = router;
    this.budgetExists = true;
    this.getBudgetSummaries();
  }

  ngOnInit(): void {
    if (this.budgetExists) {
      this.router.navigate(['newBudget']);
    }
  }

  private getBudgetSummaries() {

    this.budgetService.getBudgetSummary().subscribe((budgetSummaries: Array<BudgetSummary[]>)=>{
      this.firstMonthBudgetSummary = budgetSummaries[0];
      this.secondMonthBudgetSummary = budgetSummaries[1];
    })

  }

}

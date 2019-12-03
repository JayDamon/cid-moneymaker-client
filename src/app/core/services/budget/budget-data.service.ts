import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { ApiService } from '../api/api.service';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { Budget } from 'src/app/shared/models/Budget';
import { BudgetCategory } from 'src/app/shared/models/BudgetCategory';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {

  constructor(private apiService : ApiService) { 
  }

  getBudgetSummary(year: Number, month: Number): Observable<Array<BudgetSummary>> {
    return this.apiService.get('/v1/budgets/summary', new HttpParams().set("year", year.toString()).set("month", month.toString()));
  }

  getBudgetTypes(): Observable<Array<BudgetType>> {
    return this.apiService.get('/v1/budgetTypes');
  }

  saveNewBudgets(budgets: Budget[]): Observable<Array<Budget>> {
    return this.apiService.post("/v1/budgets", budgets);
  }

  updateBudget(budget: Budget, id: number): Observable<Budget> {
    return this.apiService.patch("/v1/budgets/", budget, id);
  }

  getBudgets(): Observable<Array<Budget>> {
    return this.apiService.get("/v1/budgets");
  }

  getBudgetCategories(): Observable<Array<BudgetCategory>> {
    return this.apiService.get("/v1/budgetCategories");
  }
  
}

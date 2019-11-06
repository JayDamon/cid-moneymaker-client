import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetSummary } from 'src/app/shared/models/BudgetSummary';
import { ApiService } from '../api/api.service';
import { BudgetType } from 'src/app/shared/models/BudgetType';
import { Budget } from 'src/app/shared/models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {

  constructor(private apiService : ApiService) { 
  }

  getBudgetSummary(): Observable<Array<BudgetSummary[]>> {
    return this.apiService.get('/v1/budgetSummary');
  }

  getBudgetTypes(): Observable<Array<BudgetType>> {
    return this.apiService.get('/v1/budgetTypes');
  }

  saveNewBudgets(budgets: Budget[]): Observable<Array<Budget>> {
    return this.apiService.post("/v1/budgets", budgets);
  }

  getBudgets(): Observable<Array<Budget>> {
    return this.apiService.get("/v1/budgets");
  }
  
}

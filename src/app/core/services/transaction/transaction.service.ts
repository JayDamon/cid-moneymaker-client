import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../../shared/models/Transaction';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private apiService : ApiService) { }
  
  getTransactions(): Observable<Transaction[]> {

    return this.apiService.get('/v1/transactions');

  }

}

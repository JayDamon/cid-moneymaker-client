import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Transaction } from 'src/app/shared/models/Transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  constructor(private apiService : ApiService) { }

  getTransactions(): Observable<Transaction[]> {

    return this.apiService.get('/v1/transactions');

  }

}

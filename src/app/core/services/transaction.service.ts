import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../shared/models/Transaction';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http: HttpClient) { }
  
  getTransactions(): Observable<Transaction[]> {
    // return ["Transaction 1", "Transaction 2", "Transaction 3"];

    return this.http.get<Transaction[]>('http://localhost:8080/oaka/v1/transactions');

  }

}

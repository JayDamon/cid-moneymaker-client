import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';

@Injectable({
  providedIn: 'root'
})
export class FrequencyDataService {

  constructor(private apiService : ApiService) { }

  getFrequencyTypes(): Observable<Array<FrequencyType>> {
    return this.apiService.get('/v1/budgets/frequency-types');
  }

}

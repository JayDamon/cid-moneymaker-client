import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FrequencyType } from 'src/app/shared/models/FrequencyType';
import { FrequencyDataService } from './frequency-data.service';

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  private frequencyTypes: Observable<Array<FrequencyType>>;

  constructor(private frequencyDataService: FrequencyDataService) {
    this.frequencyTypes = this.frequencyDataService.getFrequencyTypes();
  }

  getFrequencyTypes() {
    return this.frequencyTypes;
  }
}

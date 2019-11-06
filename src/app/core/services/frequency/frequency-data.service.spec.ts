import { TestBed } from '@angular/core/testing';

import { FrequencyDataService } from './frequency-data.service';

describe('FrequencyDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrequencyDataService = TestBed.get(FrequencyDataService);
    expect(service).toBeTruthy();
  });
});

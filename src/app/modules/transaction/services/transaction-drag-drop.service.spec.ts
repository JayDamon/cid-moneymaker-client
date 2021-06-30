import { TestBed } from '@angular/core/testing';

import { TransactionDragDropService } from './transaction-drag-drop.service';

describe('TransactionDragDropService', () => {
  let service: TransactionDragDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionDragDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

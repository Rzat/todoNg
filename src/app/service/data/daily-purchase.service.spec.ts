import { TestBed } from '@angular/core/testing';

import { DailyPurchaseService } from './daily-purchase.service';

describe('DailyPurchaseService', () => {
  let service: DailyPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DailySaleService } from './daily-sale.service';

describe('DailySaleService', () => {
  let service: DailySaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailySaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

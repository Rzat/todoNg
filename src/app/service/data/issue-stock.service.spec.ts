import { TestBed } from '@angular/core/testing';

import { IssueStockService } from './issue-stock.service';

describe('IssueStockService', () => {
  let service: IssueStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

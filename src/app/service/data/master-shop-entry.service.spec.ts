import { TestBed } from '@angular/core/testing';

import { MasterShopEntryService } from './master-shop-entry.service';

describe('MasterShopEntryService', () => {
  let service: MasterShopEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterShopEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

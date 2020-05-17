import { TestBed } from '@angular/core/testing';

import { MasterBrandEntryService } from './master-brand-entry.service';

describe('MasterBrandEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterBrandEntryService = TestBed.get(MasterBrandEntryService);
    expect(service).toBeTruthy();
  });
});

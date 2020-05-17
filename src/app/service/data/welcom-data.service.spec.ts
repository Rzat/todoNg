import { TestBed } from '@angular/core/testing';

import { WelcomDataService } from './welcom-data.service';

describe('WelcomDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WelcomDataService = TestBed.get(WelcomDataService);
    expect(service).toBeTruthy();
  });
});

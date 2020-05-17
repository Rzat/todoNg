import { TestBed } from '@angular/core/testing';

import { AddingParchaService } from './adding-parcha.service';

describe('AddingParchaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddingParchaService = TestBed.get(AddingParchaService);
    expect(service).toBeTruthy();
  });
});

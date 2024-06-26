import { TestBed } from '@angular/core/testing';

import { DashdataService } from './dashdata.service';

describe('DashdataService', () => {
  let service: DashdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

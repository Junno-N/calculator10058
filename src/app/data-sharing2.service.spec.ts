import { TestBed } from '@angular/core/testing';

import { DataSharing2Service } from './data-sharing2.service';

describe('DataSharing2Service', () => {
  let service: DataSharing2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharing2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

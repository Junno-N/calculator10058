import { TestBed } from '@angular/core/testing';

import { GettagService } from './gettag.service';

describe('GettagService', () => {
  let service: GettagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GettagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

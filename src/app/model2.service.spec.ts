import { TestBed } from '@angular/core/testing';

import { Model2Service } from './model2.service';

describe('Model2Service', () => {
  let service: Model2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Model2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

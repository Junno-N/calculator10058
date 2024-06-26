import { TestBed } from '@angular/core/testing';

import { TutorialService2 } from './services.service';

describe('ServicesService', () => {
  let service: TutorialService2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialService2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

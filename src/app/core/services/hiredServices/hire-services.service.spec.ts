import { TestBed } from '@angular/core/testing';

import { HireServicesService } from './hire-services.service';

describe('HireServicesService', () => {
  let service: HireServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

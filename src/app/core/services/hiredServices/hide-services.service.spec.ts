import { TestBed } from '@angular/core/testing';

import { HideServicesService } from './hide-services.service';

describe('HideServicesService', () => {
  let service: HideServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BillRestService } from './bill-rest.service';

describe('BillRestService', () => {
  let service: BillRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

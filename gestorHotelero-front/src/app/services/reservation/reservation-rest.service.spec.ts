import { TestBed } from '@angular/core/testing';

import { ReservationRestService } from './reservation-rest.service';

describe('ReservationRestService', () => {
  let service: ReservationRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

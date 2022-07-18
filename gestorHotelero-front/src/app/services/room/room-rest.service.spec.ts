import { TestBed } from '@angular/core/testing';

import { RoomRestService } from './room-rest.service';

describe('RoomRestService', () => {
  let service: RoomRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

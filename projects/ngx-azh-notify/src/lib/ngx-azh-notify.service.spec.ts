import { TestBed } from '@angular/core/testing';

import { NgxAzhNotifyService } from './ngx-azh-notify.service';

describe('NgxAzhNotifyService', () => {
  let service: NgxAzhNotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAzhNotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

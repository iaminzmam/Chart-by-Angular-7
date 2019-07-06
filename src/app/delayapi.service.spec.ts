import { TestBed } from '@angular/core/testing';

import { DelayapiService } from './delayapi.service';

describe('DelayapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelayapiService = TestBed.get(DelayapiService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MomentumUserService } from './momentum-user.service';

describe('MomentumUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentumUserService = TestBed.get(MomentumUserService);
    expect(service).toBeTruthy();
  });
});

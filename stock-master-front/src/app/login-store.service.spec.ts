import { TestBed, inject } from '@angular/core/testing';

import { LoginStoreService } from './login-store.service';

describe('LoginStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginStoreService]
    });
  });

  it('should be created', inject([LoginStoreService], (service: LoginStoreService) => {
    expect(service).toBeTruthy();
  }));
});

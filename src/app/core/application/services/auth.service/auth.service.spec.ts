import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    expect(service.login({
      username: 'test',
      password: 'test',
    })).toBeTruthy();
  });

  it('should logout', () => {
    expect(service.logout()).toBeTruthy();
  });



  it('should get access token', () => {
    expect(service.getAccessToken()).toBeTruthy();
  });

  it('should get refresh token', () => {
    expect(service.getRefreshToken()).toBeTruthy();
  });



});

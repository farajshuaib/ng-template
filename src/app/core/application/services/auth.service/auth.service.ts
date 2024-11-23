import {Injectable} from '@angular/core';
import {AppHttpClientService} from '../../../infrastructure/AppHttpClient/app-http-client.service';
import {AuthenticateDto} from "../../../domain/dto/authenticate.dto";
import {CoreResponseDto} from "../../../domain/abstract/CoreResponseDto";
import {AuthenticateResponseDto} from "../../../domain/models/authenticate.model";
import {User} from "../../../domain/models/user.model";
import {RefreshTokenResponseDto} from "../../../domain/models/refreshToken.model";
import {Router} from "@angular/router";
import {RoutesName} from "../../../domain/constant/ERoutesName";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: AppHttpClientService) {
  }

  login(request: AuthenticateDto) {
    return this.httpClient.post<CoreResponseDto<AuthenticateResponseDto>>(`api/Authentication/authenticate`, request);
  }

  profile() {
    return this.httpClient.get<CoreResponseDto<User>>(`api/Authentication/get-profile`);
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  refreshToken() {
    return this.httpClient.post<CoreResponseDto<RefreshTokenResponseDto>>(`api/authentication/refreshToken`, {
      refreshToken: this.getRefreshToken(),
    });
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }


  setAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }


}

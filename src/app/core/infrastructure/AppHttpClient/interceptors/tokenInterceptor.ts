import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../../application/services/auth.service/auth.service';
import { AppConfigService } from '../../../application/services/config.service/json-app-config.service';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  const header = new HttpHeaders({
    Authorization: `Bearer ${authService.getAccessToken()}`,
  });

  req = req.clone({
    headers: header,
  });

  return next(req);
}

import {
  HttpClient, HttpErrorResponse,
  HttpEvent,
  HttpEventType, HttpHandler,
  HttpHandlerFn, HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, from, map, Observable, of, pipe, retry, switchMap, tap, throwError} from 'rxjs';
import {AuthService} from '../../../application/services/auth.service/auth.service';
import {AuthStore} from "../../../application/features/auth/authStore";
import {CoreResponseDto} from "../../../domain/abstract/CoreResponseDto";

export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);
  const isRefreshing = new BehaviorSubject<boolean>(false);


  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status != 200 && request.url.includes('refreshToken')) {
        authStore.logout();
        return throwError(() => error);
      }


      if (error.status === 401 && authService.getAccessToken()) {
        // Call refreshToken to get a new token
        return from(authStore.refreshToken()).pipe(
          switchMap(() => {
            const newAccessToken = authService.getAccessToken();
            const clonedRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              }
            });
            // Retry the request with the new token
            isRefreshing.next(false);
            return next(clonedRequest);
          }),
          catchError(refreshError => {
            return throwError(() => refreshError);
          })
        );
      }


      if(error.status === 403) {
        const appError:CoreResponseDto<null> = {
          content: null,
          success: false,
          message: 'You do not have permission to do this action'
        }
        return throwError(() => {
          return {
            error: appError,
            status: 403,
            statusText: 'Forbidden'
          }
        });
      }


      return throwError(() => error);
    })
  );


}

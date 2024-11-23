import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {AppConfigService} from "../../application/services/config.service/json-app-config.service";

@Injectable({
  providedIn: 'root',
})
export class AppHttpClientService {

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(private http: HttpClient, private config: AppConfigService) {
  }


  public get<T extends unknown>(
    url: string,
    options: {
      headers?: HttpHeaders;
      params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      }
    } = {}): Promise<T> {
    return lastValueFrom(this.http.get<T>(this.getFullUrl(url), {
      headers: this.mergeHeaders(options.headers),
      params: {...options.params},
    }));
  }

  public post<T>(url: string, body: any, options: {
    headers?: HttpHeaders;
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  } = {}): Promise<T> {
    return lastValueFrom(this.http.post<T>(this.getFullUrl(url), body, {
      headers: this.mergeHeaders(options.headers),
      params: options.params
    }));
  }

  public put<T>(url: string, body: any, options: {
    headers?: HttpHeaders;
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  } = {}): Promise<T> {
    return lastValueFrom(this.http.put<T>(this.getFullUrl(url), body, {
      headers: this.mergeHeaders(options.headers),
      params: options.params
    }));
  }

  public delete<T>(url: string, options: {
    headers?: HttpHeaders;
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  } = {}): Promise<T> {
    return lastValueFrom(this.http.delete<T>(this.getFullUrl(url), {
      headers: this.mergeHeaders(options.headers),
      params: options.params
    }));
  }

  public patch<T>(url: string, body: any, options: {
    headers?: HttpHeaders;
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    }
  } = {}): Promise<T> {
    return lastValueFrom(this.http.patch<T>(this.getFullUrl(url), body, {
      headers: this.mergeHeaders(options.headers),
      params: options.params
    }));
  }

  private mergeHeaders(headers?: HttpHeaders): HttpHeaders {
    return new HttpHeaders({
      ...this.defaultHeaders,
      ...headers,
    })
  }

  private getFullUrl(url: string): string {
    if (!this.config.baseURL) {
      this.config.load();
    }
    return `${this.config.baseURL}/${url}`;
  }

  public formatQueryParams(queryParameterObject: any) {
    return Object.entries(queryParameterObject).reduce(
      (acc, [key, value]) => {
        // remove undefined and null values values
        return {
          ...acc,
          ...(value !== undefined && value !== null && {[key]: value}),
        }
      },
      {}
    )
  }
}

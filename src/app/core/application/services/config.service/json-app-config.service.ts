import {Injectable} from '@angular/core';
import {AppConfig} from '../../../domain/models/appConfig';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppConfigService extends AppConfig {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  async load() {
    try {
      const response = await lastValueFrom(this.httpClient.get('assets/app-config.json'))
      Object.assign(this, response);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to load app config');
    }
  }
}

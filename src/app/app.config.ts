import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {routes} from './core/application/routes/app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {tokenInterceptor} from './core/infrastructure/AppHttpClient/interceptors/tokenInterceptor';
import {authInterceptor} from './core/infrastructure/AppHttpClient/interceptors/authInterceptor';
import {appInitializer} from "./core/application/providers/initializeApp";


export const appConfig: ApplicationConfig = {
  providers: [
    appInitializer(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptors([tokenInterceptor, authInterceptor])
    ),
    provideAnimationsAsync(),
  ],
};

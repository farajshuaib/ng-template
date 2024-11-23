import {APP_INITIALIZER, Provider} from "@angular/core";
import {AppConfigService} from "../services/config.service/json-app-config.service";


function initializeApp(appSettingsService: AppConfigService) {
  return () => appSettingsService.load();
}

export const appInitializer: () => Provider = () => {
  return {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [AppConfigService],
    multi: true,
  }
}

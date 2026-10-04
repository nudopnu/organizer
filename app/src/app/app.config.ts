import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTablerIcons, IconHome, IconArrowBigLeft, IconDevice3dCamera, IconAntennaBars5, IconMenu2, IconSearch, IconPlus, IconRefreshAlert } from '@tabler/icons-angular';

const icons = { IconHome, IconMenu2, IconSearch, IconPlus, IconArrowBigLeft, IconDevice3dCamera, IconAntennaBars5, IconRefreshAlert, };
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTablerIcons(icons),
  ]
};

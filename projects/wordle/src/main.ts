import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (window) {
    (window.console.log = function (..._: unknown[]) {}),
      (window.console.warn = function (..._: unknown[]) {}),
      (window.console.error = function (..._: unknown[]) {}),
      (window.console.time = function (..._: unknown[]) {}),
      (window.console.timeEnd = function (..._: unknown[]) {});
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

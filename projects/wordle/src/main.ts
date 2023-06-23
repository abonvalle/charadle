import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (!window.console) {
    var console = {
      log: function (..._: unknown[]) {},
      warn: function (..._: unknown[]) {},
      error: function (..._: unknown[]) {},
      time: function (..._: unknown[]) {},
      timeEnd: function (..._: unknown[]) {}
    };
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

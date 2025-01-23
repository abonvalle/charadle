import { enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app/app-routing.module';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log(`
                                           .......
                                         -+#@##%@@@
                                         @@@*#***#+@
                                         #%**%%#***#
                                        =#%+*+####++
                                         #%+++##+#++
                                         *##*#%+=#=
                                        .:#%###@%#
                                    ..%%%*##%#*##
                                 ..+%#%%%%%##*#+%=@@+-
                               %.*+#=...*%@@%**%==#%@@@=.
                             ...-+++*#%%@+%@%@@%.+%#-@#@@+
                             .+**++++*#%%%%#@%%%@%#*%%%#@@#
                           ..***+++++++%#%%%@%%@@%#=%#%**@@#
                          ..+***+++##+=%%%%%@%%%%*##%%#=+@@@%
                         ..=*#**+*%##@%%%%%%%%%%%%##%#%%%@+++=                   .
                        ..=*++++@%@#%%@%%%%%%%%%@%%%%+*++++++++##-...           #
                      ..+*+++++##@%###%%@@@@@#%%%%@##  =++===+++*#***+-...  :#.#*:
                     ..***+++   #+#*=+%#@@%%%%%@@%%###     =++++++++++++**@@@%##@@@@#%%%
                   ..-**##*+      #%%%%%@%@@%%%%%%##+           =========*%%%@@@@@@@%..+
                  ..****++        #%%##%%#%%%%##%%%%=
                 ..+***+          #######%%%%%%#%%%#+
                ..+#*+-           #%%%%%%%%%%%%%%%#%#
                .-%#=             ##%%###%%%%%%####*=
               #%##               +++*##%#%%%%%@%%###
              .%*%#              .==++#####%%%@%+##%#-
             .#*%*-              #++++###%##%%#%*###%##
            #%%*%%#              *==++###%##%#####%##@#
           *..%+#                ==++*#####%%###+##%%%#=
          .####*                 -=**###%#####%%+*###%##
         :+###+                  *=**#####%###%%**####%##
       .*##+                     -=+++**+*##%###**####%%#%
     .####                       +-+++++*+++#%###***#*+##%
   .#+##+                         -+++++**+++=++*++====###=
  +*#**                           :++++**+*+++++++=-=-==++-
.##**                              =+++*+*+*++=++==-====++=
###+                               +*+####+++++++=--=-=++++
+                                  =***#######+=+=-====++++=
                                  -*#######+##===-=-++++++
    _                                               _                _            _        _                _   ___
   / \\   _ __ ___   _   _  ___  _   _   _ __   ___ | |_    ___ _ __ | |_ ___ _ __| |_ __ _(_)_ __   ___  __| | |__ \\
  / _ \\ | '__/ _ \\ | | | |/ _ \\| | | | | '_ \\ / _ \\| __|  / _ \\ '_ \\| __/ _ \\ '__| __/ _\` | | '_ \\ / _ \\/ _\` |   / /
 / ___ \\| | |  __/ | |_| | (_) | |_| | | | | | (_) | |_  |  __/ | | | ||  __/ |  | || (_| | | | | |  __/ (_| |  |_|
/_/   \\_\\_|  \\___|  \\__, |\\___/ \\__,_| |_| |_|\\___/ \\__|  \\___|_| |_|\\__\\___|_|   \\__\\__,_|_|_| |_|\\___|\\__,_|  (_)
                     |___/
  `);
    (window.console.log = function (..._: unknown[]) {}),
      (window.console.warn = function (..._: unknown[]) {}),
      (window.console.error = function (..._: unknown[]) {}),
      (window.console.time = function (..._: unknown[]) {}),
      (window.console.timeEnd = function (..._: unknown[]) {});
  }
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, CoreModule, AppRoutingModule, NgHcaptchaModule.forRoot({
            siteKey: '4be39cb9-ee10-4877-9d2c-3ebcec2bcda9'
        })),
        provideNoopAnimations()
    ]
})
  .catch((err) => console.error(err));

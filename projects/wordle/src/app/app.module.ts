import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgHcaptchaModule.forRoot({
      siteKey: '4be39cb9-ee10-4877-9d2c-3ebcec2bcda9'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '@modules/shared/shared.module';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { AboutDialogComponent } from './components/about-dialog/about-dialog.component';
import { ChangeWordleDialogComponent } from './components/change-wordle-dialog/change-wordle-dialog.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { IssueReportDialogComponent } from './components/issue-report-dialog/issue-report-dialog.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NameReportDialogComponent } from './components/name-report-dialog/name-report-dialog.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const components: any = [
  LayoutComponent,
  TopbarComponent,
  SettingsDialogComponent,
  HelpDialogComponent,
  NameReportDialogComponent,
  ChangeWordleDialogComponent,
  AboutDialogComponent,
  IssueReportDialogComponent
];

/**
 * @description The Core module must contain the code specific to the application, it must be imported only once in the AppModule.
 *  It must contain :
 *    - Singleton services (logging service, path builder, HTTP interceptors, errors handlers, ...)
 *    - Specific "app level" components (navigation bar, header, footer, ...)
 *    - Models specifics to the app and reused in multiples modules (routes, business logic, ..)
 */
@NgModule({
  declarations: [...components],
  imports: [
    SharedModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    NgHcaptchaModule,
    MatSelectModule
  ],
  exports: []
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@modules/shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const MODULES: any = [LayoutComponent, TopbarComponent];

/**
 * @description The Core module must contain the code specific to the application, it must be imported only once in the AppModule.
 *  It must contain :
 *    - Singleton services (logging service, path builder, HTTP interceptors, errors handlers, ...)
 *    - Specific "app level" components (navigation bar, header, footer, ...)
 *    - Models specifics to the app and reused in multiples modules (routes, business logic, ..)
 */
@NgModule({
  declarations: [...MODULES],
  imports: [SharedModule, MatMenuModule, MatDialogModule],
  exports: []
})
export class CoreModule {}

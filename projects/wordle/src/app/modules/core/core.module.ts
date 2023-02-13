import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';

const MODULES: any = [LayoutComponent];

/**
 * @description The Core module must contain the code specific to the application, it must be imported only once in the AppModule.
 *  It must contain :
 *    - Singleton services (logging service, path builder, HTTP interceptors, errors handlers, ...)
 *    - Specific "app level" components (navigation bar, header, footer, ...)
 *    - Models specifics to the app and reused in multiples modules (routes, business logic, ..)
 */
@NgModule({
  declarations: [...MODULES],
  imports: [SharedModule],
  exports: []
})
export class CoreModule {}

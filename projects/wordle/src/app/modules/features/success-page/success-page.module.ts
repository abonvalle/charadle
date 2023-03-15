import { NgModule } from '@angular/core';
import { ShareService } from '@core/services/share.service';
import { SharedModule } from '@modules/shared/shared.module';
import { SuccessPageRoutingModule } from './success-page-routing.module';
import { SuccessPageComponent } from './success-page.component';
@NgModule({
  declarations: [SuccessPageComponent],
  providers: [ShareService],
  imports: [SharedModule, SuccessPageRoutingModule],
  exports: [SuccessPageComponent]
})
export class SuccessPageModule {}

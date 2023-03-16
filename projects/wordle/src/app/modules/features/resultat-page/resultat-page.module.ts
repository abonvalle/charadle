import { NgModule } from '@angular/core';
import { ShareService } from '@core/services/share.service';
import { SharedModule } from '@modules/shared/shared.module';
import { ResultatPageRoutingModule } from './resultat-page-routing.module';
import { ResultatPageComponent } from './resultat-page.component';
@NgModule({
  declarations: [ResultatPageComponent],
  providers: [ShareService],
  imports: [SharedModule, ResultatPageRoutingModule],
  exports: [ResultatPageComponent]
})
export class ResultatPageModule {}

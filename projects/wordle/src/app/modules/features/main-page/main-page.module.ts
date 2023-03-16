import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShareService } from '@core/services/share.service';
import { BoardgameModule } from '@features/boardgame/boardgame.module';
import { JokersModule } from '@features/jokers/jokers.module';
import { SuccessPageModule } from '@features/success-page/success-page.module';
import { SharedModule } from '@modules/shared/shared.module';
import { KeyboardComponent } from '../../../standalone-components/keyboard/keyboard.component';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
@NgModule({
  declarations: [MainPageComponent],
  providers: [ShareService],
  imports: [
    SharedModule,
    MainPageRoutingModule,
    MatTooltipModule,
    KeyboardComponent,
    BoardgameModule,
    JokersModule,
    SuccessPageModule
  ]
})
export class MainPageModule {}

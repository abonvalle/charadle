import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BoardgameModule } from '@features/boardgame/boardgame.module';
import { SharedModule } from '@modules/shared/shared.module';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
@NgModule({
  declarations: [MainPageComponent],
  imports: [SharedModule, MainPageRoutingModule, MatTooltipModule, BoardgameModule]
})
export class MainPageModule {}

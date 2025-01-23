import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShareService } from '@core/services/share.service';
import { BoardgameModule } from '@features/boardgame/boardgame.module';
import { JokersModule } from '@features/jokers/jokers.module';
import { ResultatPageModule } from '@features/resultat-page/resultat-page.module';
import { SharedModule } from '@modules/shared/shared.module';
import { KeyboardComponent } from '../../../standalone-components/keyboard/keyboard.component';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
@NgModule({
    providers: [ShareService],
    imports: [
        SharedModule,
        MainPageRoutingModule,
        MatTooltipModule,
        KeyboardComponent,
        BoardgameModule,
        JokersModule,
        ResultatPageModule,
        MainPageComponent
    ]
})
export class MainPageModule {}

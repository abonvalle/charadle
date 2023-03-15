import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShareService } from '@core/services/share.service';
import { BoardgameModule } from '@features/boardgame/boardgame.module';
import { JokersModule } from '@features/jokers/jokers.module';
import { SuccessPageModule } from '@features/success-page/success-page.module';
import { SharedModule } from '@modules/shared/shared.module';
import { KeyboardComponent } from '../../../standalone-components/keyboard/keyboard.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { NameInputDialogComponent } from './components/name-input/name-input-dialog.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
@NgModule({
  declarations: [
    MainPageComponent,
    HelpDialogComponent,
    SettingsDialogComponent,
    NameInputDialogComponent,
    SuccessDialogComponent
  ],
  providers: [ShareService],
  imports: [
    SharedModule,
    MainPageRoutingModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    KeyboardComponent,
    BoardgameModule,
    JokersModule,
    SuccessPageModule
  ]
})
export class MainPageModule {}

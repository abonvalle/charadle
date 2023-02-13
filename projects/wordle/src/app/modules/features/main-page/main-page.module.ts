import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@modules/shared/shared.module';
import { BoardgameComponent } from './components/boardgame/boardgame.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { JokerButtonComponent } from './components/joker-button/joker-button.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { SettingsDialogComponent } from './components/settings-dialog/settings.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    TopbarComponent,
    KeyboardComponent,
    BoardgameComponent,
    JokerButtonComponent,
    HelpDialogComponent,
    SettingsDialogComponent
  ],
  imports: [SharedModule, MainPageRoutingModule, MatMenuModule, MatDialogModule]
})
export class MainPageModule {}

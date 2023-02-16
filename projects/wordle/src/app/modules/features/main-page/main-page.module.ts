import { NgModule } from '@angular/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { SharedModule } from '@modules/shared/shared.module';
import { BoardgameComponent } from './components/boardgame/boardgame.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { JokerButtonComponent } from './components/joker-button/joker-button.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { NameInputDialogComponent } from './components/name-input/name-input.component';
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
    SettingsDialogComponent,
    NameInputDialogComponent
  ],
  imports: [SharedModule, MainPageRoutingModule, MatMenuModule, MatDialogModule, MatSlideToggleModule]
})
export class MainPageModule {}

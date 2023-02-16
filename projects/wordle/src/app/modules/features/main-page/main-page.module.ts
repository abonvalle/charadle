import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@modules/shared/shared.module';
import { BoardgameComponent } from './components/boardgame/boardgame.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { JokerButtonComponent } from './components/joker-button/joker-button.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { NameInputDialogComponent } from './components/name-input/name-input-dialog.component';
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
  imports: [
    SharedModule,
    MainPageRoutingModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class MainPageModule {}

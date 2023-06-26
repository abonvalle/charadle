import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';
import { BoardgameV2Component } from './boardgame-v2.component';
import { BoardLetterBoxComponent } from './components/board-letter-box/board-letter-box.component';
import { BoardLineComponent } from './components/board-line/board-line.component';

@NgModule({
  declarations: [BoardgameV2Component, BoardLineComponent, BoardLetterBoxComponent],
  imports: [SharedModule],
  exports: [BoardgameV2Component, BoardLineComponent, BoardLetterBoxComponent]
})
export class BoardgameV2Module {}

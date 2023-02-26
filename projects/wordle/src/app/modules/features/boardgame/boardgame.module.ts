import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';
import { BoardgameComponent } from './boardgame.component';
import { BoardLetterBoxComponent } from './components/board-letter-box/board-letter-box.component';
import { BoardLineComponent } from './components/board-line/board-line.component';

@NgModule({
  declarations: [BoardgameComponent, BoardLineComponent, BoardLetterBoxComponent],
  imports: [SharedModule],
  exports: [BoardgameComponent, BoardLineComponent, BoardLetterBoxComponent]
})
export class BoardgameModule {}

import { Component } from '@angular/core';
import { GameService } from '@core/services/game.service';

@Component({
  selector: 'main-page',
  styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent {
  constructor(private _gameService: GameService) {}
  onLetterClick(letter: string) {
    this._gameService.enterLetter(letter);
  }
}

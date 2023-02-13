import { Component } from '@angular/core';
import { Letter } from '@core/models';
import { GameService } from '@core/services/game.service';

@Component({
  selector: 'keyboard',
  templateUrl: 'keyboard.component.html'
})
export class KeyboardComponent {
  letters: Map<string, Letter>;
  keyboard: { [row: number]: string[] };
  constructor(public gameService: GameService) {
    this.letters = new Map();
    this.keyboard = {};
    this._setKeyboardAndLetters();
  }

  enter() {
    this.gameService.submitGuess();
  }

  delete() {
    this.gameService.removeLastGuessLetter();
  }

  enterLetter(letter: string) {
    this.gameService.addCurrentGuessLetter(letter);
  }

  private _setKeyboardAndLetters() {
    this.keyboard = {
      1: ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      2: ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
      3: ['enter', 'w', 'x', 'c', 'v', 'b', 'n', 'delete']
    };

    Object.entries(this.keyboard).forEach(([rowNumber, letters]) => {
      letters.forEach((letter, index) => {
        this.letters.set(letter, new Letter(letter, parseInt(rowNumber), index));
      });
    });
  }
}

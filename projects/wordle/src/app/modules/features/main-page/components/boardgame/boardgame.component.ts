import { Component } from '@angular/core';
import { GameService } from '@core/services/game.service';

@Component({
  selector: 'boardgame',
  templateUrl: 'boardgame.component.html',
  styles: [':host{flex-grow:1}']
  // styleUrls: ['boardgame.component.css']
})
export class BoardgameComponent {
  constructor(public gameService: GameService) {}
  get boxLetterSize(): string {
    let size = 0;
    switch (this.gameService.wordleLength) {
      case 2:
      case 3:
      case 4:
        size = 20;
        break;
      case 5:
        size = 16;
        break;
      case 6:
        size = 14;
        break;
      case 7:
      case 8:
      case 9:
        size = 12;
        break;
      case 10:
        size = 10;
        break;
      case 11:
      case 12:
        size = 8;
        break;
    }
    return size + 'vw';
  }
  get letterSize(): string {
    let size = 0;
    switch (this.gameService.wordleLength) {
      case 2:
      case 3:
      case 4:
        size = 20;
        break;
      case 5:
        size = 16;
        break;
      case 6:
        size = 14;
        break;
      case 7:
      case 8:
      case 9:
        size = 12;
        break;
      case 10:
        size = 10;
        break;
      case 11:
      case 12:
        size = 8;
        break;
    }
    return size / 1.8 + 'vw';
  }
  getLetterStateClass(letter: string, index: number): string {
    const state = this.gameService.getLetterState(letter, index);
    return `border-${state} bg-${state}`;
  }
}

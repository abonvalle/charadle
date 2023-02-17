import { Component } from '@angular/core';
import { GameService } from '@core/services/game.service';

@Component({
  selector: 'boardgame',
  templateUrl: 'boardgame.component.html',
  styles: [':host{flex-grow:1}']
  // styleUrls: ['boardgame.component.css']
})
export class BoardgameComponent {
  constructor(public gameService: GameService) {
    this.test();
  }
  get boxLetterSize(): string {
    let size = 0;
    switch (this.gameService.wordle$.value?.length) {
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
    switch (this.gameService.wordle$.value?.length) {
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
    return `animate-[flip-${state}_1.5s_ease-in-out_${Math.floor(index * 0.3 * 10) / 10}s_forwards]`;
    // return `border-${state} bg-${state}`;
  }
  test() {
    // const words = [
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'philip',
    //   'otis',
    //   'viserys',
    //   'janine',
    //   'karen',
    //   'dwight',
    //   'creed',
    //   'malcolm',
    //   'felipe',
    //   'kevin',
    //   'ross',
    //   'fred',
    //   'XXX',
    //   'XXX',
    //   'lizzie',
    //   'peach',
    //   'stannis',
    //   'ivar',
    //   'dale',
    //   'leslie',
    //   'gregg',
    //   'andrea',
    //   'javier',
    //   'benjamin',
    //   'jeremiah',
    //   'DEC2',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'brian',
    //   'rajesh',
    //   'clementine',
    //   'dylan',
    //   'shayla',
    //   'ramsay',
    //   'daenerys',
    //   'rosa',
    //   'phillip',
    //   'edward',
    //   'gendry',
    //   'DEC3',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'silene',
    //   'alex',
    //   'robb',
    //   'esme',
    //   'sang-woo',
    //   'phyllis',
    //   'angela',
    //   'marienne',
    //   'irene',
    //   'emma',
    //   'andres',
    //   'DEC4',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'norman',
    //   'jose',
    //   'horacio',
    //   'melisandre',
    //   'jim',
    //   'will',
    //   'lagertha',
    //   'carla',
    //   'tata',
    //   'nadia',
    //   'rachel',
    //   'DEC5',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'guinevere',
    //   'hank',
    //   'michael',
    //   'carlota',
    //   'vince',
    //   'oscar',
    //   'sophia',
    //   'geralt',
    //   'rita',
    //   'floki',
    //   'michonne',
    //   'DEC6',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'nicky',
    //   'ashley',
    //   'theodore',
    //   'lori',
    //   'ron',
    //   'jan',
    //   'saul',
    //   'marshall',
    //   'mary',
    //   'todd',
    //   'deok-su',
    //   'DEC7',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'sunil',
    //   'jackson',
    //   'pam',
    //   'anibal',
    //   'tom',
    //   'ragnar',
    //   'luke',
    //   'jean-jacques',
    //   'henry',
    //   'june',
    //   'maria',
    //   'DEC8',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'linda',
    //   'lucerys',
    //   'samwell',
    //   'harry',
    //   'nick',
    //   'blanca',
    //   'valeria',
    //   'lily',
    //   'tuco',
    //   'angelo',
    //   'marie',
    //   'DEC9',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'claudette',
    //   'judith',
    //   'sylvain',
    //   'margaery',
    //   'aegon',
    //   'lucas',
    //   'joyce',
    //   'ryan',
    //   'raymond',
    //   'catelyn',
    //   'vaemond',
    //   'DEC10',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'bernard',
    //   'hope',
    //   'jaskier',
    //   'allston',
    //   'sarah',
    //   'prune',
    //   'roy',
    //   'yennefer',
    //   'debbie',
    //   'cary',
    //   'kelly',
    //   'DEC11',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'tiffany',
    //   'larry',
    //   'negan',
    //   'robert',
    //   'cindy',
    //   'tissaia',
    //   'vivien',
    //   'charlotte',
    //   'arya',
    //   'james',
    //   'sigurd',
    //   'DEC12',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'henri',
    //   'sansa',
    //   'leonard',
    //   'chandler',
    //   'cleo',
    //   'jaime',
    //   'erica',
    //   'agata',
    //   'darryl',
    //   'joey',
    //   'amy',
    //   'DEC13',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'dustin',
    //   'billy',
    //   'galina',
    //   'bradley',
    //   'nancy',
    //   'marie-jeanne',
    //   'franklin',
    //   'leon',
    //   'mark',
    //   'alicent',
    //   'jakob',
    //   'DEC14',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'debra',
    //   'hal',
    //   'fringilla',
    //   'gi-hun',
    //   'samuel',
    //   'glenn',
    //   'stuart',
    //   'pablo',
    //   'monica',
    //   'erik',
    //   'reese',
    //   'DEC15',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'jacqui',
    //   'rhaenys',
    //   'varys',
    //   'Drogo',
    //   'alma',
    //   'chuck',
    //   'francesca',
    //   'lidia',
    //   'steve',
    //   'benny',
    //   'ezekiel',
    //   'DEC16',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'junior',
    //   'aemond',
    //   'siggy',
    //   'raquel',
    //   'penny',
    //   'joffrey',
    //   'sergio',
    //   'merle',
    //   'ola',
    //   'fabio',
    //   'carol',
    //   'DEC17',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'terry',
    //   'tywin',
    //   'love',
    //   'lucrecia',
    //   'moira',
    //   'martin',
    //   'maggie',
    //   'arthur',
    //   'brienne',
    //   'violet',
    //   'barney',
    //   'DEC18',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'tormund',
    //   'mi-nyeo',
    //   'ted',
    //   'tasha',
    //   'christian',
    //   'bob',
    //   'ada',
    //   'olivia',
    //   'daemon',
    //   'eduardo',
    //   'dexter',
    //   'DEC19',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'constance',
    //   'stevie',
    //   'francisco',
    //   'finn',
    //   'aimee',
    //   'mike',
    //   'ruby',
    //   'maeve',
    //   'dmitri',
    //   'ann',
    //   'Kimberly',
    //   'DEC20',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'il-nam',
    //   'mycroft',
    //   'janet',
    //   'sofia',
    //   'anwar',
    //   'david',
    //   'sam',
    //   'murray',
    //   'skyler',
    //   'carlos',
    //   'jason',
    //   'DEC21',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'thomas',
    //   'emily',
    //   'serena',
    //   'jonathan',
    //   'leopoldo',
    //   'stanley',
    //   'helen',
    //   'rosita',
    //   'judy',
    //   'wendy',
    //   'daisy',
    //   'DEC22',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'triss',
    //   'delilah',
    //   'kalf',
    //   'curly',
    //   'irving',
    //   'norma',
    //   'alice',
    //   'sally',
    //   'eddard',
    //   'gustavo',
    //   'rhaenyra',
    //   'DEC23',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'john',
    //   'mirko',
    //   'maxine',
    //   'sheldon',
    //   'dominique',
    //   'juan',
    //   'william',
    //   'adam',
    //   'logan',
    //   'cersei',
    //   'erin',
    //   'DEC24',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'kay',
    //   'phoebe',
    //   'shane',
    //   'suzanne',
    //   'andrew',
    //   'krista',
    //   'francis',
    //   'guillaume',
    //   'gina',
    //   'eric',
    //   'elisa',
    //   'DEC25',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'gloria',
    //   'marc',
    //   'tyrell',
    //   'aaron',
    //   'hershel',
    //   'jakov',
    //   'ben',
    //   'joe',
    //   'eugene',
    //   'theon',
    //   'holly',
    //   'DEC26',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'cesar',
    //   'joanna',
    //   'craig',
    //   'johnny',
    //   'carl',
    //   'gideon',
    //   'piper',
    //   'jesse',
    //   'alicia',
    //   'rick',
    //   'elliot',
    //   'DEC27',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'connie',
    //   'laenor',
    //   'alison',
    //   'kady',
    //   'agustin',
    //   'rollo',
    //   'fernando',
    //   'hector',
    //   'zhang',
    //   'jon',
    //   'daryl',
    //   'DEC28',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'sae-byeok',
    //   'XXX',
    //   'walter',
    //   'jamie',
    //   'candace',
    //   'caleb',
    //   'sara',
    //   'jolene',
    //   'grace',
    //   'andy',
    //   'ciri',
    //   'DEC29',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'eleanor',
    //   'XXX',
    //   'chidi',
    //   'vasily',
    //   'jorah',
    //   'shama',
    //   'charlie',
    //   'holden',
    //   'petyr',
    //   'santiago',
    //   'jane',
    //   'DEC30',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'XXX',
    //   'ubbe',
    //   'XXX',
    //   'chris',
    //   'XXX',
    //   'howard',
    //   'XXX',
    //   'dolores',
    //   'robin',
    //   'XXX',
    //   'arturo',
    //   'XXX',
    //   'DEC31'
    // ];
    // let date = new Date('01/01/2023');
    // const nw = [];
    // let numerodujour = date.getDate();
    // let numerodumois = date.getMonth() + 1;
    // let numeroannee = date.getFullYear() - 2022;
    // let index = 1;
    // do {
    //   const ind =
    //     12 * (numerodujour - 1) + numerodumois + (Math.pow(numerodujour, 2) + 1 * numerodujour) / 2 + 868 * numeroannee;
    //   nw.push(words[ind - 1]);
    //   console.warn(ind);
    //   date.setDate(date.getDate() + 1);
    //   console.warn(date);
    //   numerodujour = date.getDate();
    //   numerodumois = date.getMonth() + 1;
    //   index++;
    // } while (index <= 365);
    // console.warn(nw);
  }
}

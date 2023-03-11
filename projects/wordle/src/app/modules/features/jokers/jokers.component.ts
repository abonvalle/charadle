import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from '@core/services/game.service';

@Component({
  selector: 'jokers',
  // styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'jokers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokersComponent {
  constructor(public gameService: GameService) {}
  // get paintJoker() {
  //   return this.gameService.boardGame$.value?.jokers.paintJoker;
  // }
  // get placeLetterJoker() {
  //   return this.gameService.boardGame$.value?.jokers.placeLetterJoker;
  // }
  // get serieJoker() {
  //   return this.gameService.boardGame$.value?.jokers.serieJoker;
  // }

  useJoker1(): void {
    this.gameService.useJoker1();
  }
  useJoker2(): void {
    this.gameService.useJoker2();
  }
  useJoker3(): void {
    this.gameService.useJoker3();
  }
}

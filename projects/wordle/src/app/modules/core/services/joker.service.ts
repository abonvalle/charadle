import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';

@Injectable({ providedIn: 'root' })
export class JokerService {
  joker1Uses$: BehaviorSubject<jokersUses>;
  joker2Uses$: BehaviorSubject<jokersUses>;
  joker3Uses$: BehaviorSubject<jokersUses>;
  jokersUses$: BehaviorSubject<3 | 5>;
  constructor(private _gameService: GameService) {
    this.joker1Uses$ = new BehaviorSubject<jokersUses>('0');
    this.joker2Uses$ = new BehaviorSubject<jokersUses>('0');
    this.joker3Uses$ = new BehaviorSubject<jokersUses>('0');
    this.jokersUses$ = new BehaviorSubject<3 | 5>(3);
    this._setJokerUses();
  }
  private _setJokerUses() {
    this.jokersUses$.next(this._gameService.isDifficult() ? 5 : 3);
  }
  useJoker(joker: number) {
    switch (joker) {
      case 1:
        this.useJoker1();
        break;
      case 2:
        this.useJoker2();
        break;
      case 3:
        this.useJoker3();
        break;
    }
  }

  useJoker1() {
    // this._gameService.;
  }

  useJoker2() {}

  useJoker3() {}
}

export type jokersUses = '1/3' | '2/3' | '1/5' | '2/5' | '3/5' | '4/5' | '0';

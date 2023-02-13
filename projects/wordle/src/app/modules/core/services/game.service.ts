import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  wordle$: BehaviorSubject<string>;
  constructor() {
    this.wordle$ = new BehaviorSubject('KHAL');
  }
  get wordleLength(): number {
    return this.wordle$.value.length;
  }
}

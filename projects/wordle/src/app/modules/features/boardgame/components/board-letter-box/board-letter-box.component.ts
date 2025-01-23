import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, SimpleChanges, input } from '@angular/core';
import { JokersService } from '@core/services/jokers.service';
import { PlaceLetterJoker, letterState } from '@models';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'board-letter-box',
    templateUrl: 'board-letter-box.component.html',
    styleUrls: ['board-letter-box.component.css'],
    // styles: [':host{flex-basis: 16.666667%;}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, AsyncPipe]
})
export class BoardLetterBoxComponent implements OnChanges, OnDestroy {
  readonly index = input.required<number>();
  readonly letter = input<string>('');
  readonly state = input<letterState>('none');
  readonly isCurrentActive = input<boolean>(false);
  readonly isBoardLineActive = input<boolean>(false);
  computedClasses$: BehaviorSubject<{ state: string; active: string; placeholder: string }> = new BehaviorSubject({
    state: '',
    active: '',
    placeholder: ''
  });
  classes$: Observable<string> = new Observable();
  private _destroy$: Subject<void> = new Subject();

  constructor(private _jokerServ: JokersService) {
    this.classes$ = this.computedClasses$.pipe(map((c) => `${c.state} ${c.active} ${c.placeholder}`));
    this._jokerServ.placeLetterJoker$
      .pipe(takeUntil(this._destroy$))
      .subscribe((jok) => this._setPlaceholder(jok ?? undefined));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }
    const index = this.index();
    if (!index && index !== 0) {
      throw new TypeError('index should be instancied');
    }

    if (changes['state']) {
      const { active, placeholder } = this.computedClasses$.value;
      this.computedClasses$.next({ active, placeholder, state: this._getStateClasses() });
    }

    if (changes['isCurrentActive']) {
      const { state, placeholder } = this.computedClasses$.value;
      this.computedClasses$.next({
        active: this.isCurrentActive() ? 'active after:animate-pulse-fast after:absolute' : '',
        placeholder,
        state
      });
    }

    if (changes['isBoardLineActive'] || changes['letter']) {
      this._setPlaceholder(this._jokerServ.placeLetterJoker$.value ?? undefined);
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  private _setPlaceholder(placeLetterJoker?: PlaceLetterJoker): void {
    const { state, active } = this.computedClasses$.value;
    this.computedClasses$.next({
      placeholder: this._getPlaceholder(placeLetterJoker),
      active,
      state
    });
  }

  private _getPlaceholder(placeLetterJoker?: PlaceLetterJoker): string {
    if (!this.isBoardLineActive() || this.letter() !== '' || !placeLetterJoker) {
      return '';
    }
    const letter = placeLetterJoker.uses.find((plJok) => plJok.index === this.index())?.letter;
    if (!letter) {
      return '';
    }
    return `before:content-['${letter}'] before:opacity-50 before:relative`;
  }

  private _getStateClasses(): string {
    const classes = [];
    const state = this.state();
    if (state !== 'none') {
      classes.push(`animate-[flip-${state}_1.5s_ease-in-out_${Math.floor(this.index() * 0.3 * 10) / 10}s_forwards]`);

      //colorblind
      classes.push(`accessibility-${state}`);
    }
    return classes.join(' ');
  }
}

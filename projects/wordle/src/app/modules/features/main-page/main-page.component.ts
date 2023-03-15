import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { KeyboardService } from '@core/services/keyboard.service';
import { ShareService } from '@core/services/share.service';
import { ThemeService } from '@core/services/theme.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'main-page',
  styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  constructor(
    public themeService: ThemeService,
    public shareService: ShareService,
    public gameService: GameService,
    private _cdr: ChangeDetectorRef,
    private _keyboardServ: KeyboardService
  ) {}
  ngOnInit(): void {
    // this.boardGame$ = this._gameService.boardGame$.asObservable().pipe(takeUntil(this._destroy$));
    // this._gameService.initGame();
  }

  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  onLetterClick(letter: string) {
    this.gameService.enterLetter(letter);
    this._cdr.detectChanges();
  }

  @HostListener('window:keydown', ['$event'])
  onkeydown(event: KeyboardEvent) {
    let key = event.key === 'Backspace' ? 'delete' : event.key === 'Enter' ? 'enter' : event.key;
    if (this._keyboardServ.getKey(key)) {
      this.onLetterClick(key);
    }
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { BoardBox } from '@models/*';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'board-letter-box',
  templateUrl: 'board-letter-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLetterBoxComponent implements OnInit, OnChanges, OnDestroy {
  @Input() boardBox!: BoardBox;
  classes: string = '';
  _destroy: Subject<void> = new Subject();
  constructor(private _cdr: ChangeDetectorRef, private _themeService: ThemeService) {}
  ngOnInit(): void {
    this.classes = this.getBGClass();
    this._themeService.theme$
      .asObservable()
      .pipe(takeUntil(this._destroy))
      .subscribe((_theme) => {
        this.classes = this.getBGClass();
        this._cdr.detectChanges();
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) {
      return;
    }
    if (changes['boardBox']) {
      console.warn('sqf');
      this.classes = this.getBGClass();
      this._cdr.detectChanges();
    }
  }
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.unsubscribe();
  }
  getBoxStyle(): {
    [klass: string]: any;
  } {
    return {
      width: this.boardBox.boxSize + 'vw',
      height: this.boardBox.boxSize + 'vw',
      'font-size': this.boardBox.boxSize / 1.8 + 'vw'
    };
  }
  getBGClass(): string {
    const classes = [];
    classes.push(
      this.boardBox.isActive ? this._themeService.theme$.value.borderActive : this._themeService.theme$.value.border
    );
    if (this.boardBox.background !== 'none') {
      classes.push(
        `animate-[flip-${this.boardBox.background}_1.5s_ease-in-out_${
          Math.floor(this.boardBox.index * 0.3 * 10) / 10
        }s_forwards]`
      );
    } else {
      classes.push(this._themeService.theme$.value.boardLetterBg);
    }
    return classes.join(' ');
  }
}

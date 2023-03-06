import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { BoardBox } from '@models/*';

@Component({
  selector: 'board-letter-box',
  templateUrl: 'board-letter-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardLetterBoxComponent implements OnInit, OnChanges {
  @Input() boardBox!: BoardBox;
  classes: string = '';
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.classes = this.getBGClass();
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
    classes.push(`${this.boardBox.isActive ? 'border-cyan-500' : 'border-secondary'}`);
    if (this.boardBox.background) {
      classes.push(
        `animate-[flip-${this.boardBox.background}_1.5s_ease-in-out_${
          Math.floor(this.boardBox.index * 0.3 * 10) / 10
        }s_forwards]`
      );
    }
    return classes.join(' ');
  }
}

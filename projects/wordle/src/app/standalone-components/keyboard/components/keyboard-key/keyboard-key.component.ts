import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlatformService } from '@core/services/platform.service';
import { ThemeService } from '@core/services/theme.service';
import { BehaviorSubject } from 'rxjs';
import { specialLetters } from '../../models/sepcial-letters';

@Component({
  standalone: true,
  selector: 'app-keyboard-key',
  templateUrl: './keyboard-key.component.html',
  styleUrls: ['./keyboard-key.component.css'],
  styles: [':host{display:contents}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class KeyboardKeyComponent implements OnInit {
  @Input() letter: string = '';
  @Input() backgroundClass: string = 'bg-secondary';
  @Output() letterClick: EventEmitter<string> = new EventEmitter();
  feedBack$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSpecial: boolean = false;
  letterIcon: string = '';

  constructor(public themeService: ThemeService, private _platformServ: PlatformService) {}
  ngOnInit() {
    this.isSpecial = Object.keys(specialLetters).includes(this.letter);
    if (this.isSpecial) {
      const specialLetter = Object.entries(specialLetters).find(([letter]) => letter === this.letter);
      this.letterIcon = specialLetter ? specialLetter[1] : '';
    }
  }
  clickEnterLetter(letter: string): void {
    if (this._platformServ.touchStart$?.value) {
      return;
    }
    this.enterLetter(letter);
  }
  enterLetter(letter: string): void {
    this.feedbackLetter();
    this.letterClick.emit(letter);
  }

  feedbackLetter(): void {
    this.feedBack$.next(true);
    setTimeout(() => {
      this.feedBack$.next(false);
    }, 200);
  }
}

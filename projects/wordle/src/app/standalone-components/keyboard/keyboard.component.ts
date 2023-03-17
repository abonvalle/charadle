import { CommonModule, KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { key, keyboard } from '../../models/keyboard';
import { KeyboardService } from '../../modules/core/services/keyboard.service';
import { KeyboardKeyComponent } from './components/keyboard-key/keyboard-key.component';

@Component({
  standalone: true,
  selector: 'app-keyboard',
  templateUrl: 'keyboard.component.html',
  imports: [CommonModule, KeyboardKeyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardComponent implements OnInit, OnDestroy {
  @Output() letterClick: EventEmitter<string> = new EventEmitter();
  private _destroy$: Subject<void> = new Subject();
  letterFeedback$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  keyboard$: Observable<keyboard> = this._keyboardService.keyboard$.asObservable().pipe(
    takeUntil(this._destroy$),
    map((kb) => kb.keyboard)
  );
  constructor(private _keyboardService: KeyboardService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }

  enterLetter(letter: string): void {
    this.letterClick.emit(letter);
  }

  trackByKeyFn(_index: number, item: key) {
    return item.letter;
  }
  trackByRowFn(_index: number, item: KeyValue<string, key[]>) {
    return item.key;
  }
}

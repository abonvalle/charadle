import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { keyboard } from '../../models/keyboard';
import { KeyboardService } from '../../modules/core/services/keyboard.service';
import { KeyboardKeyComponent } from './components/keyboard-key/keyboard-key.component';

@Component({
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
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { JokerService } from '@core/services/joker.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { keyboard } from '../../models/';
import { KeyboardService } from '../../modules/core/services/keyboard.service';
import { KeyboardKeyComponent } from './components/keyboard-key/keyboard-key.component';

@Component({
  standalone: true,
  selector: 'app-keyboard',
  templateUrl: 'keyboard.component.html',
  imports: [CommonModule, KeyboardKeyComponent]
})
export class KeyboardComponent implements OnInit, OnDestroy {
  @Input() extraClass: string[] = [];
  @Output() letterClick: EventEmitter<string> = new EventEmitter();
  private _destroy$: Subject<void> = new Subject();
  letterFeedback$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  keyboard$: Observable<keyboard> = this._keyboardService.keyboard$.asObservable().pipe(takeUntil(this._destroy$));
  constructor(private _keyboardService: KeyboardService, public jokerService: JokerService) {}
  ngOnInit(): void {
    this._keyboardService.setKeyboard();
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }

  enterLetter(letter: string): void {
    this.letterClick.emit(letter);
  }
}

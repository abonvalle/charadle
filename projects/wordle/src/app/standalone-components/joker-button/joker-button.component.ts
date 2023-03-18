import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Joker } from '../../models/joker/joker.model';

@Component({
  standalone: true,
  selector: 'joker-button[joker]',
  // styles: [':host{position:relative}'],
  styleUrls: ['joker-button.component.css'],
  templateUrl: 'joker-button.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokerButtonComponent implements OnInit, OnDestroy {
  @Input() joker!: Joker;
  classes: string = '';
  _destroy: Subject<void> = new Subject();
  constructor(private _cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this._setClasses();
  }
  ngOnDestroy(): void {}
  private _setClasses() {
    const classes = [];
    classes.push(this.joker.soldOut ? `opacity-60 active:bg-complementary/80` : `active:bg-primary`);
    this.classes = classes.join(' ');
    this._cdr.detectChanges();
  }
}

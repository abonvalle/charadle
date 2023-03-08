import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
export class JokerButtonComponent {
  @Input() joker!: Joker;
  constructor() {}
}

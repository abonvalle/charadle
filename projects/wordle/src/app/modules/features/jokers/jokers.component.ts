import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JokersService } from '@core/services/jokers.service';
import { Subject } from 'rxjs';
import { Joker, jokersIcons } from '../../../models/joker';

@Component({
  selector: 'jokers',
  // styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'jokers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokersComponent implements OnInit {
  jokers$: Subject<Joker[]> = new Subject();
  constructor(private _jokersService: JokersService) {}

  ngOnInit(): void {
    this.jokers$ = this._jokersService.jokers$;
  }
  useJoker(joker: Joker): void {
    this._jokersService.useJoker(joker);
  }
  getJokerIcon(jokerName: string): string {
    return jokersIcons[jokerName as keyof typeof jokersIcons];
  }
}

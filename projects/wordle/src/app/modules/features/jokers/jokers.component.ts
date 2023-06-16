import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { JokersService } from '@core/services/jokers.service';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Joker, jokersIcons } from '../../../models/joker';

@Component({
  selector: 'jokers',
  // styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'jokers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokersComponent implements OnInit, OnDestroy {
  jokers$: Subject<Joker[]> = new Subject();
  _destroy$: Subject<void> = new Subject();
  constructor(private _jokersService: JokersService, private _cdr: ChangeDetectorRef, private _apiServ: APIService) {}

  ngOnInit(): void {
    this.jokers$ = this._jokersService.jokers$.pipe(
      takeUntil(this._destroy$),
      filter((jks) => jks !== null),
      map((jks) => Object.values(jks!))
    ) as Subject<Joker[]>;

    this._jokersService.jokers$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((joks) => {
        joks && this._apiServ.setJokers(joks);
        this._cdr.detectChanges();
      });
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  useJoker(joker: Joker): void {
    this._jokersService.useJoker(joker);
  }
  getJokerIcon(jokerName: string): string {
    return jokersIcons[jokerName as keyof typeof jokersIcons];
  }
}

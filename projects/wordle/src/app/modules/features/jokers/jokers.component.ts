import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { JokersService } from '@core/services/jokers.service';
import { Subject, takeUntil } from 'rxjs';
import { Joker, jokersIcons } from '../../../models/joker';

@Component({
  selector: 'jokers',
  // styles: [':host{overflow:hidden;height:100%}'],
  templateUrl: 'jokers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JokersComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  showPoints: boolean = false;
  constructor(public jokersService: JokersService, private _cdr: ChangeDetectorRef, private _apiServ: APIService) {}

  ngOnInit(): void {
    this.jokersService.paintJoker$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((jok) => {
        jok && this._apiServ.setPaintJoker(jok);
        this._cdr.detectChanges();
      });

    this.jokersService.placeLetterJoker$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((jok) => {
        jok && this._apiServ.setPlaceLetterJoker(jok);
        this._cdr.detectChanges();
      });

    this.jokersService.serieJoker$
      .asObservable()
      .pipe(takeUntil(this._destroy$))
      .subscribe((jok) => {
        jok && this._apiServ.setSerieJoker(jok);
        this._cdr.detectChanges();
      });

    setInterval(() => {
      this.showPoints = !this.showPoints;
      this._cdr.detectChanges();
    }, 5000);
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  useJoker(joker: Joker): void {
    this.jokersService.useJoker(joker);
  }
  getJokerIcon(jokerName: string): string {
    return jokersIcons[jokerName as keyof typeof jokersIcons];
  }
}

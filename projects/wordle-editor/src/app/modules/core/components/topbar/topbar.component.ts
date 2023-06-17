import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  themeList = this._themeServ.themeList;
  currentThemeId$ = this._themeServ.selectedThemeId$;

  constructor(private _themeServ: ThemeService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentThemeId$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._cdr.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
}

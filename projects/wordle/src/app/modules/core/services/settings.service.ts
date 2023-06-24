import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '@core/components/help-dialog/help-dialog.component';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { settings } from '../../../models/settings.interface';
import { APIService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class SettingsService implements OnDestroy {
  colorBlindMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  firstTime$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  hideKeyboard$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  destroy$: Subject<void> = new Subject();
  constructor(private _localStrgeServ: LocalStorageService, private _APIServ: APIService, private _dialog: MatDialog) {}
  initSettings(): void {
    this._getStorageSettings();
    this._event();
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  private _event(): void {
    this._localStrgeServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.colorBlindMode$.next(false);
      this.hideKeyboard$.next(false);
      this.firstTime$.next(true);
    });
  }
  private _getStorageSettings(): void {
    const settings = this._APIServ.getSettings();
    this.colorBlindMode$.next(settings?.colorBlindMode ?? false);
    this.hideKeyboard$.next(settings?.hideKeyboard ?? false);
    settings?.firstTime && this._dialog.open(HelpDialogComponent);
    this.firstTime$.next(false);
    this._setStorageSettings();
  }
  private _setStorageSettings(): void {
    const settings: settings = {
      colorBlindMode: this.colorBlindMode$.value,
      hideKeyboard: this.hideKeyboard$.value,
      firstTime: this.firstTime$.value
    };
    this._APIServ.setSettings(settings);
  }
  saveStorageSettings(settings: settings): void {
    this.colorBlindMode$.next(settings?.colorBlindMode ?? this.colorBlindMode$?.value);
    this.hideKeyboard$.next(settings?.hideKeyboard ?? this.hideKeyboard$?.value);
    this.firstTime$.next(settings?.firstTime ?? this.firstTime$?.value);
    this._setStorageSettings();
  }
  setFirstTime(firstime: boolean) {
    this.firstTime$.next(firstime);
    this._setStorageSettings();
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { settings } from '../../../models/settings.interface';
import { APIService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class SettingsService implements OnDestroy {
  colorBlindMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  firstTime$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  themeGuid$: BehaviorSubject<string> = new BehaviorSubject('');
  destroy$: Subject<void> = new Subject();
  constructor(private _localStrgeServ: LocalStorageService, private _APIServ: APIService) {}
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
      this.themeGuid$.next('');
      this.firstTime$.next(true);
    });
  }
  private _getStorageSettings(): void {
    const settings = this._APIServ.getSettings();
    this.colorBlindMode$.next(settings?.colorBlindMode ?? false);
    this.themeGuid$.next(settings?.themeGuid ?? '');
    this.firstTime$.next(settings?.firstTime ?? true);
    this._setStorageSettings();
  }
  private _setStorageSettings(): void {
    const settings: settings = {
      colorBlindMode: this.colorBlindMode$.value,
      themeGuid: this.themeGuid$.value,
      firstTime: this.firstTime$.value
    };
    this._APIServ.setSettings(settings);
  }
  saveStorageSettings(settings: settings): void {
    this.colorBlindMode$.next(settings?.colorBlindMode ?? this.colorBlindMode$?.value);
    this.themeGuid$.next(settings?.themeGuid ?? this.themeGuid$?.value);
    this.firstTime$.next(settings?.firstTime ?? this.firstTime$?.value);
    this._setStorageSettings();
  }
  setFirstTime(firstime: boolean) {
    this.firstTime$.next(firstime);
    this._setStorageSettings();
  }
}

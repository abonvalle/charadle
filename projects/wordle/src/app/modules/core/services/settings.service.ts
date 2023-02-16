import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class SettingsService implements OnDestroy {
  colorBlindMode$: BehaviorSubject<boolean>;
  playerName$: BehaviorSubject<string>;
  destroy$: Subject<void>;
  constructor(private _localStrgeServ: LocalStorageService) {
    this.colorBlindMode$ = new BehaviorSubject<boolean>(false);
    this.playerName$ = new BehaviorSubject('');
    this.destroy$ = new Subject();

    this._setStorageSettings();
    this._event();
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  private _event(): void {
    this._localStrgeServ.clear$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.colorBlindMode$.next(false);
      this.playerName$.next('');
    });
  }
  private _setStorageSettings(): void {
    const settings = this._localStrgeServ.getItem(this._localStrgeServ.settings);
    this.colorBlindMode$.next(settings?.colorBlindMode ?? false);
    this.playerName$.next(settings?.playerName ?? '');
  }
  saveStorageSettings(settings: { playerName: string; colorBlindMode: boolean }): void {
    this.colorBlindMode$.next(settings?.colorBlindMode ?? this.colorBlindMode$?.value);
    this.playerName$.next(settings?.playerName ?? this.playerName$?.value);
    this._localStrgeServ.setItem(this._localStrgeServ.settings, settings);
  }
}

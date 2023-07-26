import { Injectable } from '@angular/core';
import { UtilsService } from '@modules/shared/utils.service';
import { BehaviorSubject, Observable, combineLatestWith, map } from 'rxjs';
import { defaultVersion } from '../../../models/default-version.const';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';
import { version } from '../../../models/version.interface';
import { versions } from '../../../models/versions.const';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  version$: BehaviorSubject<version>;
  versionsState$: BehaviorSubject<{ code: string; end: boolean }[]>;
  otherVersionsState$: Observable<
    {
      code: string;
      end: boolean;
    }[]
  >;

  constructor(private _utilsServ: UtilsService) {
    const versionCode = this._getStoredVersionCode();
    const version = versionCode ? versions[versionCode] : defaultVersion;
    if (!version) {
      throw new TypeError('Version should be properly instancied');
    }
    this.version$ = new BehaviorSubject(version);
    this.versionsState$ = new BehaviorSubject<{ code: string; end: boolean }[]>([
      { code: 'serie', end: false },
      { code: 'anime', end: false }
    ]);
    this.otherVersionsState$ = this.versionsState$.pipe(
      combineLatestWith(this.version$),
      map(([vsState, currentV]) => vsState.filter((v) => v.code !== currentV.code))
    );
  }
  setVersion(version: version): void {
    this.version$.next(version);
    this._updateStoredVersion(version);
  }

  private _getStoredVersionCode(): string | null {
    const res = localStorage.getItem(localStorageKeys.nameGuessrVersion);
    return res ? this._utilsServ.decode(res) : null;
  }
  private _updateStoredVersion(version: version): void {
    localStorage.setItem(localStorageKeys.nameGuessrVersion, this._utilsServ.encode(version.code));
  }
}

import { Injectable } from '@angular/core';
import { UtilsService } from '@modules/shared/utils.service';
import packageJson from '@packageJSON';
import { Subject } from 'rxjs';
import { localStorageKeys } from '../../../models/local-storage-keys.enum';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  clear$: Subject<void> = new Subject();
  isVersionCtrled: boolean = false;
  constructor(private _environmentServ: EnvironmentService, private _utilsServ: UtilsService) {}
  read(key: string, unprefixed: boolean = false): string | null {
    if (!this.isVersionCtrled) {
      if (!this._checkVersion()) {
        localStorage.clear();
        localStorage.setItem(localStorageKeys.appVersion, this._utilsServ.encode(this._getMajorMinorVersion()));
        this.isVersionCtrled = true;
        return null;
      }
      this.isVersionCtrled = true;
    }

    const res = localStorage.getItem(unprefixed ? key : this._prefixedkey(key));
    return res ? this._utilsServ.decode(res) : null;
  }
  update(key: string, value: string, unprefixed: boolean = false): void {
    localStorage.setItem(unprefixed ? key : this._prefixedkey(key), this._utilsServ.encode(value));
  }
  delete(key: string, unprefixed: boolean = false): void {
    localStorage.removeItem(unprefixed ? key : this._prefixedkey(key));
  }
  clearStorage(): void {
    this.clear$.next();
    localStorage.clear();
  }
  private _prefixedkey(key: string): string {
    return `${this._environmentServ.version$.value.storagePrefix}-${key}`;
  }
  private _getMajorMinorVersion(): string {
    const v = packageJson.version.split('.');
    v.pop();
    return v.join('.') ?? '';
  }

  private _checkVersion(): boolean {
    const res = localStorage.getItem(localStorageKeys.appVersion);
    if (!res) {
      return false;
    }
    return this._utilsServ.decode(res).split('.')[0] === this._getMajorMinorVersion().split('.')[0];
  }
}

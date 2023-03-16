import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import packageJson from '../../../../../../../package.json';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  clear$: Subject<void> = new Subject();
  constructor() {}
  read(key: string): string | null {
    return localStorage.getItem(this._getVersionedKey(key));
  }
  update(key: string, value: string): void {
    localStorage.setItem(this._getVersionedKey(key), value);
  }
  delete(key: string): void {
    localStorage.removeItem(this._getVersionedKey(key));
  }
  clearStorage(): void {
    this.clear$.next();
    localStorage.clear();
  }
  private _getVersionedKey(key: string): string {
    return `${key}?v=${this._getMajorVersion()}`;
  }
  private _getMajorVersion(): string {
    return packageJson.version.split('.')[0] ?? '';
  }
}

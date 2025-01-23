import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { theme } from '@models';
import packageJson from '@packageJSON';
import { Observable, map } from 'rxjs';
@Component({
    selector: 'about-dialog',
    templateUrl: 'about-dialog.component.html',
    standalone: false
})
export class AboutDialogComponent {
  readonly contactAddress: string = 'nameguessr@abvdev.fr';
  version: string = packageJson.version;
  currentTheme$: Observable<theme> = this._themeServ.activeTheme$;
  themeLabel$: Observable<string> = this.currentTheme$.pipe(map((th) => th.name ?? ''));
  themeCredits$: Observable<{ text: string; url: string }[]> = this.currentTheme$.pipe(map((th) => th.copyright ?? []));
  constructor(private _themeServ: ThemeService) {}
}

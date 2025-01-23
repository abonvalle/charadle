import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@editor-core/services/theme.service';
import { Subject } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'layout',
    templateUrl: 'layout.component.html',
    imports: [NgClass, TopbarComponent, RouterOutlet, AsyncPipe]
})
export class LayoutComponent implements OnInit {
  _destroy$: Subject<void> = new Subject();
  themeId$ = this._themeService.defaultTheme$;

  constructor(private _themeService: ThemeService) {}
  ngOnInit(): void {}
}

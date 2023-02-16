import { Component } from '@angular/core';
import { PlatformService } from '@core/services/platform.service';

@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent {
  constructor(public platformService: PlatformService) {}
}

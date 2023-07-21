import { inject, NgModule } from '@angular/core';
import { Route, RouterModule, Routes, UrlSegment } from '@angular/router';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { GameService } from '@core/services/game.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@features/main-page/main-page.module').then((m) => m.MainPageModule)
      },
      {
        path: 'resultat',
        canMatch: [(_route: Route, _segments: UrlSegment[]) => inject(GameService).end$.value],
        loadChildren: () => import('@features/resultat-page/resultat-page.module').then((m) => m.ResultatPageModule)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

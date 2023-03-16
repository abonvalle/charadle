import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultatPageComponent } from './resultat-page.component';

const routes: Routes = [{ path: '', component: ResultatPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultatPageRoutingModule {}

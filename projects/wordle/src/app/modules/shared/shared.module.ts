import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { strToArr } from './pipes/str-to-arr.pipe';

const DECLARED_MODULES: any = [strToArr];

const IMPORTED_MODULES = [CommonModule, RouterModule];
const exports = [...IMPORTED_MODULES, ...DECLARED_MODULES];

@NgModule({
  imports: IMPORTED_MODULES,
  declarations: DECLARED_MODULES,
  exports: exports
})
export class SharedModule {}

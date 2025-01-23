import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared/shared.module';
import { JokerButtonComponent } from '../../../standalone-components/joker-button/joker-button.component';
import { JokersComponent } from './jokers.component';

@NgModule({
    imports: [SharedModule, JokerButtonComponent, JokersComponent],
    exports: [JokersComponent]
})
export class JokersModule {}

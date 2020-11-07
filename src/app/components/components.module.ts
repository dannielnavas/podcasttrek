import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { TitleComponent } from './title/title.component';
import { CaratulaComponent } from './caratula/caratula.component';
import { ActionComponent } from './action/action.component';


@NgModule({
  declarations: [ListComponent, TitleComponent, CaratulaComponent, ActionComponent],
  imports: [
    CommonModule,
  ],
  exports: [ListComponent, TitleComponent, CaratulaComponent, ActionComponent]
})
export class ComponentsModule { }

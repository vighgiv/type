import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './type.component';
import { TextareaComponent } from '../shared/textarea/textarea.component';

@NgModule({
  declarations: [TypeComponent, TextareaComponent],
  imports: [CommonModule, TypeRoutingModule]
})
export class TypeModule {}

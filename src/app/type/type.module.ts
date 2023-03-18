import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './type.component';
import { TextareaModule } from '../shared/textarea/textarea.module';

@NgModule({
  declarations: [TypeComponent],
  imports: [CommonModule, TypeRoutingModule, TextareaModule]
})
export class TypeModule {}

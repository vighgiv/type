import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeyboardModule } from '../shared/keyboard/keyboard.module';
import { LevelEndModule } from '../shared/level-end/level-end.module';
import { TextareaModule } from '../shared/textarea/textarea.module';
import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './type.component';

@NgModule({
  declarations: [TypeComponent],
  imports: [CommonModule, TypeRoutingModule, TextareaModule, KeyboardModule, LevelEndModule]
})
export class TypeModule {}

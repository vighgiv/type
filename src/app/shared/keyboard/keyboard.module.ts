import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeyboardComponent } from './keyboard.component';

@NgModule({
  declarations: [KeyboardComponent],
  imports: [CommonModule],
  exports: [KeyboardComponent]
})
export class KeyboardModule {}

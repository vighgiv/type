import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { LevelEndComponent } from './level-end.component';
import { LevelEndService } from './level-end.service';

@NgModule({
  declarations: [LevelEndComponent],
  imports: [CommonModule, MatDialogModule],
  providers: [LevelEndService]
})
export class LevelEndModule {}

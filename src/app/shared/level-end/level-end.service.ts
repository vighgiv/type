import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LevelEndComponent } from './level-end.component';

@Injectable()
export class LevelEndService {
  constructor(private dialog: MatDialog) {}

  open(data: any): MatDialogRef<LevelEndComponent> {
    return this.dialog.open(LevelEndComponent, {
      disableClose: true,
      data
    });
  }
}

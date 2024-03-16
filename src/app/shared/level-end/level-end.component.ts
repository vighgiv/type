import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-level-end',
  templateUrl: './level-end.component.html',
  styleUrls: ['./level-end.component.scss']
})
export class LevelEndComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LevelEndComponent>
  ) {}

  message = '';
  score = 0;

  COMPLIMENTS = [
    'Nice one!',
    'Good work!',
    'Good job!',
    'Great job!',
    'Well done!',
    'Excellent work!',
    'Bravo!',
    'Outstanding!',
    'Superb!',
    'Wonderful job!',
    'Impressive work!'
  ];

  ngOnInit() {
    let differences = 0;

    for (let i = 0; i < this.data.currentPracticeText.length; i++) {
      if (this.data.currentPracticeText[i] !== this.data.currentText[i]) {
        differences++;
      }
    }

    this.score = +((1 - differences / this.data.currentPracticeText.length) * 100).toFixed(1);

    if (this.score < 85) {
      this.message = 'Try again!';
    } else {
      const randomIndex = Math.floor(Math.random() * this.COMPLIMENTS.length);
      this.message = this.COMPLIMENTS[randomIndex];
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'Space':
      case 'Enter':
        this.dialogRef.close(event.code);
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  currentPracticeText = 'Hello World';
  enteredText = '';

  compareText(letter: string, enteredLetter: string): string {
    console.log(enteredLetter);
    if (!enteredLetter) {
      return 'pending';
    }
    if (letter === enteredLetter) {
      return 'correct';
    } else {
      return 'incorrect';
    }
  }

  onInput(value: any) {
    this.enteredText = value;
    console.log(value);
  }
}

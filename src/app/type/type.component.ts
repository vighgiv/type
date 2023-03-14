import { Component } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {
  currentPracticeText = 'Practise text to practise.';
  enteredText = '';

  compareText(letter: string, enteredLetter: string): string {
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
  }

  cursor(one: number): string {
    return one === this.enteredText.length ? 'cursor' : '';
  }
}

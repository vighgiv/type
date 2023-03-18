import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  currentPracticeText = 'fj fj fj fj fj jf jf jf jf fj fj fj fj fj jf jf jf jf';
  enteredText = '';

  compareText(letter: string, enteredLetter: string): string {
    if (!enteredLetter) {
      return 'pending';
    } else if (letter !== enteredLetter) {
      return 'incorrect';
    }
    return '';
  }

  onInput(value: any) {
    this.enteredText = value;
  }

  cursor(one: number): string {
    return one === this.enteredText.length ? 'cursor' : '';
  }
}

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { position } from 'caret-pos';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @ViewChild('textarea')
  textarea!: ElementRef;

  @Input()
  practiceText!: string;

  enteredText = '';

  compareText(letter: string, enteredLetter: string): string {
    if (!enteredLetter) {
      return 'pending';
    } else if (letter !== enteredLetter) {
      return 'incorrect';
    }
    return '';
  }

  caretPos(index: number): string {
    return index === this.enteredText.length ? 'cursor' : '';
  }

  moveCaretToEndOfText() {
    position(this.textarea.nativeElement, this.enteredText.length);
  }

  onInput(value: string) {
    this.enteredText = value;
  }
}

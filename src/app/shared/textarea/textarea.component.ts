import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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

  @Output()
  currentText = new EventEmitter<string>();

  @Output()
  isFocused = new EventEmitter<boolean>();

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
    this.textarea.nativeElement.setSelectionRange(
      this.textarea.nativeElement.textLength,
      this.textarea.nativeElement.textLength
    );
  }

  onInput(value: string) {
    this.enteredText = value;
    this.currentText.emit(this.enteredText);
  }

  toggleFocus(isFocused: boolean) {
    this.isFocused.emit(isFocused);
  }

  reset() {
    this.enteredText = '';
    this.textarea.nativeElement.value = '';
  }
}

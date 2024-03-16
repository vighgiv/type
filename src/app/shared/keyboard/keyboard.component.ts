import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent {
  @Input() practiceText!: string;
  @Input() currentIndex!: number;
  @Input() isFocused!: boolean;

  row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'];
  row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"];
  row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'];

  isLeftShift(letter: string): boolean {
    return ['Y', 'U', 'I', 'O', 'P', 'H', 'J', 'K', 'L', 'N', 'M'].includes(letter) &&
      this.isFocused
      ? true
      : false;
  }

  isRightShift(letter: string): boolean {
    return ['Q', 'W', 'E', 'R', 'T', 'A', 'S', 'D', 'F', 'G', 'Z', 'X', 'C', 'V', 'B'].includes(
      letter
    ) && this.isFocused
      ? true
      : false;
  }
}

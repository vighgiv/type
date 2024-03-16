import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('board') board!: ElementRef;

  @HostListener('window:keypress', ['$event.key'])
  keyPress(key: string) {
    if (this.hp > 0 && this.intervalId) {
      if (this.fallingKeys.get(key)) {
        this.playCorrectAudio();
        this.removeKeyFromBoard(key);
        this.points++;
      } else {
        this.decreaseHp();
      }
    }
  }

  // CHAR_POOL: string[] = [
  //   'a',
  //   'A',
  //   'b',
  //   'B',
  //   'c',
  //   'C',
  //   'd',
  //   'D',
  //   'e',
  //   'E',
  //   'f',
  //   'F',
  //   'g',
  //   'G',
  //   'h',
  //   'H',
  //   'i',
  //   'I',
  //   'j',
  //   'J',
  //   'k',
  //   'K',
  //   'l',
  //   'L',
  //   'm',
  //   'M',
  //   'n',
  //   'N',
  //   'o',
  //   'O',
  //   'p',
  //   'P',
  //   'q',
  //   'Q',
  //   'r',
  //   'R',
  //   's',
  //   'S',
  //   't',
  //   'T',
  //   'u',
  //   'U',
  //   'v',
  //   'V',
  //   'w',
  //   'W',
  //   'x',
  //   'X',
  //   'y',
  //   'Y',
  //   'z',
  //   'Z'
  // ];

  CHAR_POOL: string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];

  hp = 3;
  fallingKeys = new Map<string, any>();
  timer = 0;
  timerId: any;
  interval = 1000;
  intervalId: any;
  points = 0;

  constructor(private authService: AuthService, private renderer: Renderer2) {}

  ngOnInit() {}

  start() {
    this.timerId = setInterval(() => {
      this.timer += 1000;
      if (this.timer % 10000 === 0) {
        this.interval -= 100;
        clearInterval(this.intervalId);
        this.startInterval(this.interval);
      }
    }, 1000);

    this.startInterval(this.interval);
  }

  restart() {
    if (this.fallingKeys.size === 0) {
      this.hp = 3;
      this.timer = 0;
      this.interval = 1000;
      this.points = 0;
      this.start();
    }
  }

  startInterval(interval: number) {
    this.intervalId = setInterval(() => {
      this.createKey();
    }, interval);
  }

  decreaseHp() {
    if (this.hp > 0) {
      this.renderer.addClass(this.board.nativeElement, 'fallen');
      setTimeout(() => {
        this.renderer.removeClass(this.board.nativeElement, 'fallen');
      }, 300);
      if (this.hp > 1) {
        this.playWrongAudio();
        this.hp--;
      } else {
        this.playWrongAudio();
        this.hp--;
        clearInterval(this.intervalId);
        clearInterval(this.timerId);
      }
    }
  }

  createKey() {
    const keyElement = this.renderer.createElement('div');
    this.renderer.addClass(keyElement, 'glass');
    this.renderer.addClass(keyElement, 'key');
    this.renderer.setStyle(keyElement, 'left', this.randomX());

    const char = this.renderer.createText(this.randomChar());
    this.fallingKeys.set(char.nodeValue, keyElement);

    this.renderer.appendChild(keyElement, char);
    this.renderer.appendChild(this.board.nativeElement, keyElement);

    setTimeout(() => {
      const parentRect = this.board.nativeElement.getBoundingClientRect();
      const childRect = this.fallingKeys.get(char.nodeValue)?.getBoundingClientRect();
      if (childRect && parentRect.bottom - childRect.bottom < -45) {
        this.removeKeyFromBoard(char.nodeValue);
        this.decreaseHp();
      }
    }, 2000);
  }

  logout() {
    this.authService.logoutUser();
  }

  randomX(): string {
    return Math.floor(Math.random() * (753 + 1)) + 'px';
  }

  randomChar(): string {
    const randomIndex = Math.floor(Math.random() * this.CHAR_POOL.length);
    const randomChar = this.CHAR_POOL[randomIndex];
    this.CHAR_POOL.splice(randomIndex, 1);
    return randomChar;
  }

  removeKeyFromBoard(key: string) {
    const keyElement = this.fallingKeys.get(key);
    setTimeout(() => {
      this.renderer.removeChild(this.board, keyElement);
    }, 75);
    this.renderer.addClass(keyElement, 'pop');
    this.fallingKeys.delete(key);
    this.CHAR_POOL.push(key);
  }

  playCorrectAudio() {
    const audio = new Audio();
    audio.src = '../../assets/sounds/happy-pop-1-185286.mp3';
    audio.play();
  }
  playWrongAudio() {
    const audio = new Audio();
    audio.src = '../../assets/sounds/wronganswer-37702.mp3';
    audio.play();
  }
}

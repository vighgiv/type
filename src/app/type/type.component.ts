import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { NUMBER_OF_LEVELS } from '../core/constants/numberOfLevels';
import { AuthService } from '../core/services/auth.service';
import { LevelService } from '../core/services/level.service';
import { UserService } from '../core/services/user.service';
import { LevelEndService } from '../shared/level-end/level-end.service';
import { TextareaComponent } from '../shared/textarea/textarea.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  objectKeys = Object.keys;

  NUMBER_OF_LEVELS = NUMBER_OF_LEVELS;

  @ViewChild(forwardRef(() => TextareaComponent)) textareaComponent!: TextareaComponent;

  levelData!: any;
  userData!: any;
  currentPracticeText = '';
  currentText = '';
  isTextareaFocused = false;
  timer = 0;
  isTimerRunning = false;
  intervalId: any;
  isGuideOpened = false;

  constructor(
    private levelService: LevelService,
    private userService: UserService,
    private levelEndService: LevelEndService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.getUserProgress().subscribe((user: any) => {
      this.userData = user;
      this.getLevelAndUpdate();
    });
  }

  textareaFocused(event: boolean) {
    this.isTextareaFocused = event;
    if (!event) {
      this.startStopTimer(event);
    }
  }

  startStopTimer(start: boolean) {
    if (start) {
      this.isTimerRunning = true;
      this.intervalId = setInterval(() => {
        this.timer += 100;
      }, 100);
    } else {
      this.isTimerRunning = false;
      clearInterval(this.intervalId);
    }
  }

  updateCurrentText(currentText: string) {
    if (!this.isTimerRunning) {
      this.startStopTimer(true);
    }
    this.currentText = currentText;
    if (this.currentPracticeText.length == this.currentText.length) {
      this.handleLevelEnd();
    }
  }

  handleLevelEnd() {
    this.levelEndService
      .open({
        currentPracticeText: this.currentPracticeText,
        currentText: this.currentText,
        timer: this.timer
      })
      .afterClosed()
      .subscribe((result) => {
        this.currentText = '';
        switch (result) {
          case 'Enter':
            this.resetLevel();
            break;
          case 'Space':
            // Check to increase level or sublevel
            if (
              this.userData.subLevels[this.userData.currentLevel - 1] ===
              Object.keys(this.levelData).length
            ) {
              if (NUMBER_OF_LEVELS.length !== this.userData.currentLevel) {
                this.userData.currentLevel = this.userData.currentLevel + 1;
                this.userService.updateCurrentLevel(this.userData);
                this.getLevelAndUpdate();
              } else {
                this.resetLevel();
              }
            } else {
              ++this.userData.subLevels[this.userData.currentLevel - 1];
              this.userService.updateSubLevel(this.userData);
              this.updatePracticeText();
              this.resetLevel();
            }
        }
      });
  }

  updatePracticeText() {
    this.currentPracticeText =
      this.levelData[this.userData.subLevels[this.userData.currentLevel - 1].toString()];
  }

  resetLevel() {
    this.textareaComponent.reset();
    this.timer = 0;
  }

  getLevelAndUpdate() {
    this.levelService.getLevel(this.userData.currentLevel.toString()).subscribe((level: any) => {
      this.levelData = level;
      this.updatePracticeText();
      this.resetLevel();
    });
  }

  changeLevel(level: number) {
    if (level !== this.userData.currentLevel) {
      this.userData.currentLevel = level;
      this.userService.updateCurrentLevel(this.userData);
      this.getLevelAndUpdate();
    }
  }

  resetSubLevel() {
    this.userData.subLevels[this.userData.currentLevel - 1] = 1;
    this.userService.updateSubLevel(this.userData);
    this.updatePracticeText();
    this.resetLevel();
  }

  logout() {
    this.authService.logoutUser();
  }
}

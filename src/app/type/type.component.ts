import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
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
  @ViewChild(forwardRef(() => TextareaComponent)) textareaComponent!: TextareaComponent;

  levelData!: any;
  userData!: any;
  currentPracticeText = '';
  currentCharCount = 0;
  isKeyboardFocused = false;

  constructor(
    private levelService: LevelService,
    private userService: UserService,
    private levelEndService: LevelEndService
  ) {}

  ngOnInit() {
    console.log('On Init ran! 🚀');
    this.userService.getUserProgress().subscribe((user: any) => {
      this.userData = user;

      this.getLevelAndUpdate();
    });
  }

  updateCharCount(i: number) {
    this.currentCharCount = i;
    if (this.currentPracticeText.length == this.currentCharCount) {
      this.handleLevelEnd();
    }
    console.log();
  }

  handleLevelEnd() {
    this.levelEndService
      .open('asd')
      .afterClosed()
      .subscribe((result) => {
        switch (result) {
          case 'Enter':
            this.resetLevel();
            break;
          case 'Space':
            // Check to increase level or sublevel
            if (this.userData.currentSubLevel == Object.keys(this.levelData).length) {
              // Last Level check #TODO
              // if ()
              this.userService.updateLevel(this.userData.currentLevel + 1);
              this.userData.currentLevel = this.userData.currentLevel + 1;
              this.userData.currentSubLevel = 1;
              this.getLevelAndUpdate();
            } else {
              this.userService.updateSubLevel(this.userData.currentSubLevel + 1);
              this.userData.currentSubLevel = this.userData.currentSubLevel + 1;
              this.updatePracticeText();
              this.resetLevel();
            }
        }
      });
  }

  updatePracticeText() {
    this.currentPracticeText = this.levelData[this.userData.currentSubLevel.toString()];
  }

  resetLevel() {
    this.textareaComponent.reset();
    this.currentCharCount = 0;
  }

  getLevelAndUpdate() {
    this.levelService.getLevel(this.userData.currentLevel.toString()).subscribe((level: any) => {
      this.levelData = level;
      this.updatePracticeText();
      this.resetLevel();
    });
  }
}

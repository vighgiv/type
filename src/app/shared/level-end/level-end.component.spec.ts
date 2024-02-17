import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelEndComponent } from './level-end.component';

describe('LevelEndComponent', () => {
  let component: LevelEndComponent;
  let fixture: ComponentFixture<LevelEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelEndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

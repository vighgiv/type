import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = this.authService.getCurrentUser();

  constructor(private db: AngularFirestore, private authService: AuthService) {}

  getUserProgress(): Observable<any> {
    return from(this.currentUser).pipe(
      switchMap((user: any) =>
        this.db
          .collection('users')
          .doc(user.uid)
          .get()
          .pipe(map((snapshot: any) => snapshot.data()))
      )
    );
  }

  updateCurrentLevel(userData: any): Promise<any> {
    return this.currentUser.then((user) => {
      this.db.collection('users').doc(user!.uid).update({
        currentLevel: userData.currentLevel
      });
    });
  }

  updateSubLevel(userData: any): Promise<any> {
    return this.currentUser.then((user) => {
      this.db.collection('users').doc(user!.uid).update({
        subLevels: userData.subLevels
      });
    });
  }
}

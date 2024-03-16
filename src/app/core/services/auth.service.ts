import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NUMBER_OF_LEVELS } from '../constants/numberOfLevels';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {}

  getCurrentUser() {
    return this.auth.currentUser; // returns user object for logged-in users, otherwise returns null
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    this.auth.signOut();
  }

  resetPassword(email: string): Promise<any> {
    return this.auth.sendPasswordResetEmail(email);
  }

  registerUser(user: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password).then((newUser) => {
      this.afs.doc('/users/' + newUser.user?.uid).set({
        currentLevel: 1,
        subLevels: Array.from(NUMBER_OF_LEVELS, () => 1)
      });
    });
  }
}

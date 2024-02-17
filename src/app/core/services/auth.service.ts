import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userLoggedIn!: boolean;

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    // this.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.userLoggedIn = true;
    //   } else {
    //     this.userLoggedIn = false;
    //   }
    // });
  }

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
        currentSubLevel: 1
      });
    });
  }
}

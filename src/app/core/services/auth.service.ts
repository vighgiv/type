import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userLoggedIn!: boolean;

  constructor(private auth: AngularFireAuth) {
    // this.auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.userLoggedIn = true;
    //   } else {
    //     this.userLoggedIn = false;
    //   }
    // });
  }

  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

  register(user: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  getCurrentUser() {
    return this.auth.currentUser; // returns user object for logged-in users, otherwise returns null
  }
}

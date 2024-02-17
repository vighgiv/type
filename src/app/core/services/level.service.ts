import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  constructor(private db: AngularFirestore) {}

  getLevel(level: string): Observable<any> {
    return this.db
      .collection('levels')
      .doc(level)
      .get()
      .pipe(map((snapshot: any) => snapshot.data()));
  }
}

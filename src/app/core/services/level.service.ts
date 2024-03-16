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

  // addLevel() {
  //   return this.db.collection('levels').doc('13').set({
  //     1: 'lazing frazzles bizarreness azotising Zho Skrowaczewski Iztaccihuatl gazelle zigzagging frizzles',
  //     2: 'kolkhoz Helmholtz Dalzell organizes enzymes rhizome hazarding buzzard mizzenmast',
  //     3: 'enzyme Ziegfelds Heinze Balthazar schizophrenia diazomethane realization breathalyzer enzymologist denizens',
  //     4: 'zapping Nebuchadnezzar Dietz rhizoid blazingly reorganizations Schulz Zinman',
  //     5: 'whizzing zoomed schmaltzy razed piazza garbanzo blazer Dzungaria freezing',
  //     6: 'disorganizing Mendoza fuzzed Lorentzian lollapalooza haziness wizardry Bydgoszcz tweezers crazier',
  //     7: 'bazookas chimpanzee Belshazzar gizzard Jezebel blazoner subzero oozier Frizette',
  //     8: 'Zuider Frazil stargazing Katz pizzicato frenziedly wheezed azan Zuidholland Suzanne',
  //     9: 'Nullstellensatz anaesthetizations specialization Bergonzi zapped schizophrenia'
  //   });
  // }
}

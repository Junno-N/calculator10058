import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tutorial22 } from '../models/tutorial.model';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import {getAuth} from "firebase/auth";
import {onAuthStateChanged}from "firebase/auth";

import { map } from 'rxjs';

import { DocumentReference } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private dbPath = '/Calcdata/';

  alovelaceDocumentRef = "tutorialsRef" ;

  tutorialsRef: AngularFirestoreCollection<Tutorial22>;

  constructor(private db: AngularFirestore) {
this.tutorialsRef = db.collection(this.dbPath);
};



  getAll(){    

    return (this.tutorialsRef)
  
  }



    create(tutorial: Tutorial22): any {
      let auth = getAuth();
      let User = auth.currentUser?.uid
      return this.tutorialsRef.doc(User).set({ ...tutorial });
    }  
    
  update(data: any): Promise<void> {
    let auth = getAuth();
    let User = auth.currentUser?.uid;
    return this.tutorialsRef.doc(User).set(data);
  }

  delete(id: string): Promise<void> {
    let auth = getAuth();
    let User = auth.currentUser?.uid;
    return this.tutorialsRef.doc(User).delete();
  };
}
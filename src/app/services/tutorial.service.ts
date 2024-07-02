import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Tutorial } from '../models/tutorial.model';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import {getAuth} from "firebase/auth";
import {onAuthStateChanged}from "firebase/auth";

import { map } from 'rxjs';

import { DocumentReference, FieldPath } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/tutorials/';

  tutorialsRef: AngularFirestoreCollection<Tutorial>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);

  }


  getAll(): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef;
  }


  getAll2(id:string): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef.doc(id).collection('tagList')

  }

  getAll5(id:string,tagName:string): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef.doc(id).collection('taskList')
    .doc('taskList').collection( 'taskList',  ref => ref.where(new FieldPath('tag'),'==',tagName))

  }  

  getAll4(id:string): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef.doc(id).collection('tagList')

  }



;
getAll3(id:string):AngularFirestoreCollection<Tutorial> {
  return this.tutorialsRef.doc(id).collection('user', ref => ref.where("user",'==', "user"))

}
;



  create(id:string ,tutorial: Tutorial): any {

    return this.tutorialsRef.doc(id).set({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  update2(genre:string,id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(genre).collection(id).doc("userList").set({ ...data});
  }



  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}
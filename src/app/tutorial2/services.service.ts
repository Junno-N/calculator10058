import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,DocumentData} from '@angular/fire/compat/firestore';
import { Tutorial } from '../models/tutorial.model';
import { Observable, from } from 'rxjs';
import { FieldPath, documentId } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class TutorialService2 {
  private dbPath = '/tutorials/';

  tutorialsRef: AngularFirestoreCollection<Tutorial>;
  
  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef;
  }

  getAll4(address:string): AngularFirestoreCollection<Tutorial> {
    return this.db.collection(this.dbPath, ref =>ref.where(new FieldPath ("user"),'==', address));
     }


  getAll2(id:string,user:string,name:string,): AngularFirestoreCollection<Tutorial> {
    return this.tutorialsRef.doc(id).collection('user', ref => ref.where( new FieldPath(user),'==', name))
  }
;
getAll3(id:string):AngularFirestoreCollection<Tutorial> {
  return this.tutorialsRef.doc(id).collection('user', ref => ref.where("user",'==', "user"))

}
;


updateTask(subCollectionId: string, id: string, data: Partial<Tutorial>): Observable<void> {
  return from(this.db.doc(`${this.dbPath}${subCollectionId}/taskList/${id}`).update(data));
}

  create(genre:string,taskname:string ,tutorial: Tutorial): any {

    return this.tutorialsRef.doc(genre).collection("taskList").doc(taskname).set({ ...tutorial });
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
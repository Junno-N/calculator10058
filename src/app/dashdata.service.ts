import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task , Genre  } from './dash.service';


export interface User {
  uid: any;
  name: any;
  email: any;
}



@Injectable({
  providedIn: 'root'
})
export class DashdataService {
  constructor(private firestore: AngularFirestore) {}

  getGenres(): Observable<Genre[]> {
    return this.firestore.collection('tutorials').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Genre;
        const id = a.payload.doc.id;
        return { ...data, id }; ;
      }))
    );
  } 


  getUserSubCollection(genreId: string, userEmail: string): Observable<any> {
    return this.firestore.collection(`tutorials/${genreId}/user`).doc(userEmail).get();
  }


  getTasksByGenre(genreId: string): Observable<Task[]> {
    return this.firestore.collection(`tutorials/${genreId}/taskList`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { ...data, id };;
      }))
    );
  }

  getUserList(): Observable<User[]> {
    return this.firestore.doc('userList/memberList').snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as { [uid: string]: {  name: any,email: string  }};
       console.log(data,
       )
        return Object.keys(data).map(uid => ({
          uid,
          name:   Object.keys(data[uid])[0],
          email:Object.values(data[uid])[0]
        }));
      })
    );
  }
  getmanagerList(): Observable<User[]> {
    return this.firestore.doc('userList/managerList').snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as { [uid: string]: {  name: any,email: string  }};
       console.log(data,
       )
        return Object.keys(data).map(uid => ({
          uid,
          name:   Object.keys(data[uid])[0],
          email:Object.values(data[uid])[0]
        }));
      })
    );
  }
}

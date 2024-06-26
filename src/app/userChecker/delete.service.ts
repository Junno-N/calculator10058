import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument,DocumentData} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { FieldPath, documentId } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
    
    private dbPath = '/userList/';
  
    usersRef: AngularFirestoreDocument<any>;
  
    constructor(private db: AngularFirestore) {
      this.usersRef = db.collection(this.dbPath).doc("memberList");
    }
    
    deletes(){
      return this.usersRef;
    }
  }


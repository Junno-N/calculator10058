import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,DocumentData,} from '@angular/fire/compat/firestore';
import { FieldValue } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


    private dbPath = '/userList/';
  
    usersRef: AngularFirestoreCollection<any>;
  
    constructor(private db: AngularFirestore) {
      this.usersRef = db.collection(this.dbPath);
    }
  
  
    getAll(): AngularFirestoreCollection<any> {
      return this.usersRef;
    }
  
    getAll2(user:string): AngularFirestoreCollection<any> {
      return this.usersRef}
    

    create(target:string,data: any): any {
  
      return this.usersRef.doc(target).update(data);
    }
  
    update(id: string, data: any): Promise<void> {
      return this.usersRef.doc(id).update(data);
    }
  
    update2(genre:string,id: string, data: any): Promise<void> {
      return this.usersRef.doc(genre).collection(id).doc("userList").set({ ...data});
    }
  
  
  
  }


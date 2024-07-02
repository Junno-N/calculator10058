import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Task } from './task/task.module';

@Injectable({
  providedIn: 'root'
})
export class GettagService {
  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  getTagList(): Observable<string[]> {
    return this.firestore.collection('tutorials').snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.id))
    );
  }

  getTasksByTag(tag: any) {
    console.log(tag,"を取得するよ")
    return this.firestore.collection(`tutorials/${tag}/taskList`).snapshotChanges().pipe(
      map(action => action.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { ...data, id };
      }))
    );
  }


  isManager(userId: string): Observable<boolean> {
    return this.firestore.collection('userList').doc('managerList').get().pipe(
      map(doc => {
        const data = doc.data() as DocumentData;
        return !!data && !!data[userId]; 
      })
    );
  }
  isAuther(userId: string): Observable<boolean> {
    return this.firestore.collection('userList').doc('autherList').get().pipe(
      map(doc => {
        const data = doc.data() as DocumentData;
        return !!data && !!data[userId]; 
      })
    );
  }


  getUserList(): Observable<{ id: string, name: string }[]> {
    return this.firestore.collection('userList').doc('memberList').get().pipe(
      map(doc => {
        const data = doc.data()as { [key: string]: { [key: string]: string } };
        if (data) {
          return Object.keys(data).map(key => ({
            id: key,
            name: Object.values(data[key])[0]
          }));
        } else {
          return [];
        }
      })
    );
  }

  getUserId(): Observable<string> { 
    return this.authService.getUserId().pipe(
      tap(userId => console.log("取得したユーザーID:", userId))
    );
  }
  getInitialTasks(tags: string[]): Observable<Task[]> {
    const tasksObservables = tags.map(tag => {
      return this.firestore.collection<Task>('tasks', ref => ref.where('tag', '==', tag)).valueChanges();
    });
    return forkJoin(tasksObservables).pipe(
      map(tasksArrays => tasksArrays.flat())
    );
  }

  listenToTasksChanges(tags: string[]): Observable<Task[]> {
    return new Observable(observer => {
      const subscriptions = tags.map(tag => {
        return this.firestore.collection<Task>('tasks', ref => ref.where('tag', '==', tag))
          .valueChanges()
          .subscribe(tasks => {
            observer.next(tasks);
          }, error => {
            observer.error(error);
          });
      });

      return () => {
        subscriptions.forEach(sub => sub.unsubscribe());
      };
    });
  }




}

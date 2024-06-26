import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Task } from './task/task.module';

@Injectable({
  providedIn: 'root'
})
export class GettagService {
  constructor(private firestore: AngularFirestore, private authService: AuthService) {}

  // タグリストを取得
  getTagList(): Observable<string[]> {
    console.log("タグリストは動いてる");
    return this.firestore.collection('tutorials').snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.id))
    );
  }

  getTasksByTag(tag: any): Observable<Task[]> {
    console.log(`タグ ${tag} のタスクリストを取得します`);
    return this.firestore.collection(`tutorials/${tag}/taskList`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        console.log(`タスク ${id} を取得しました`, data);
        return { ...data, id }; // 'id' プロパティを追加または上書き
      }))
    );
  }

  // マネージャーかどうかをチェック
  isManager(userId: string): Observable<boolean> {
    return this.firestore.collection('userList').doc('managerList').get().pipe(
      map(doc => {
        const data = doc.data() as DocumentData;
        return !!data && !!data[userId]; // マップ内にuserIdが存在するかどうかを確認
      })
    );
  }
  getUserList(): Observable<{ id: string, name: string }[]> {
    return this.firestore.collection('userList').doc('memberList').get().pipe(
      map(doc => {
        const data = doc.data()as { [key: string]: { [key: string]: string } };
        if (data) {
          console.log(data,"あああああ");
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
  // ユーザーIDを取得
  getUserId(): Observable<string> {
    console.log("動いてるUID");
    return this.authService.getUserId().pipe(
      tap(userId => console.log("取得したユーザーID:", userId))
    );
  }
}

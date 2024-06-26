import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Tutorial } from './models/tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private firestore: AngularFirestore) {}

  searchTasks(projectId: string, query: string, limit: number, startAfter?: any): Observable<Tutorial[]> {
    console.log("検索クエリ:", query);
    console.log("プロジェクトID:", projectId);
    let queryRef = this.firestore.collection(`tutorials/${projectId}/taskList`, ref => {
      let q = ref.where('title', '>=', query).where('title', '<=', query + '\uf8ff').limit(limit);
      if (startAfter) {
        q = q.startAfter(startAfter);
      }
      return q;
    });

    return queryRef.snapshotChanges().pipe(
      map(actions => {
        const tasks = actions.map(a => {
          const data = a.payload.doc.data() as Tutorial;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
        return tasks;
      }),
      catchError(error => {
        console.error(`プロジェクト${projectId}のタスク取得エラー:`, error);
        return of([]);
      })
    );
  }
}

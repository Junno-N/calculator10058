import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  constructor(private afAuth: AngularFireAuth) {}


  
  // ユーザー認証の状態を監視
  watchAuthState() {
    return this.afAuth.authState;
  }
  getUserId(): Observable<string> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user && user.uid) {
          return user.uid;
        } else {
          throw new Error('User is not authenticated');
        }
      })
    );
  }

  isManager(userId: string): Observable<boolean> {

    return this.afAuth.authState.pipe(
      map(user => {
        // マネージャー判定ロジックに基づいてbooleanを返す
        return true; // 適宜変更
      })
    );
  }

}
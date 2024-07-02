import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  constructor(private afAuth: AngularFireAuth) {}
  private loggedIn = false;
  async checkAuthState(): Promise<void> {
    const user = await firstValueFrom(this.afAuth.authState);
    this.loggedIn = !!user;
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
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
   return true; 
      })
    );
  }

}
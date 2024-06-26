import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth } from "firebase/auth";
import { ServicesService } from "../userChecker/services.service";
import firebase from 'firebase/compat/app';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent {
  constructor(public angularFireAuth: AngularFireAuth, public servicesService: ServicesService) {}

  signInWithGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider).then(result => {
      console.log('Googleサインイン成功:', result);
    }).catch(error => {
      console.error('Googleサインインエラー:', error);
    });
  }

  logOut(): void {
    this.angularFireAuth.signOut().then(() => {
      console.log('サインアウト成功');
    }).catch(error => {
      console.error('サインアウトエラー:', error);
    });
  }

  register(): void {
    let auth = getAuth();
    let userUid = auth.currentUser?.uid;
    let userName = auth.currentUser?.displayName;
    let userAddress = auth.currentUser?.email;
    
    if (!userName || !userAddress || !userUid) {

      return;
    }

    const userInfo = { [userUid]: { [userName]: userAddress } };
    this.servicesService.getAll().doc("memberList").update(userInfo).then(() => {
    }).catch(error => {
      console.error('ユーザー情報の登録エラー:', error);
    });
  }
}

import { Directive, HostListener } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "@firebase/auth";

@Directive({
  selector: "[googleSso]",
})
export class GoogleSsoDirective {


  constructor(public angularFireAuth: AngularFireAuth) {}
  @HostListener("click")
  async onClick() {

const provider = new GoogleAuthProvider();  

provider.setCustomParameters({
  prompt: 'select_account',
});

const creds = await this.angularFireAuth.signInWithPopup(provider);

    // do what you want with the credentials, for ex adding them to firestore...
  }
}
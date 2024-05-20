//app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "../environments/environment";
import { SigninComponent } from './signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { GoogleSsoDirective } from './google-sso.directive';
import { RequireAuthComponent } from './require-auth/require-auth.component';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bearerTokenInterceptor } from './bearer-token.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { FormsModule } from '@angular/forms';
import {jsPDF} from "jspdf" ;






@NgModule({
  declarations: [AppComponent, SigninComponent, LandingComponent, GoogleSsoDirective, RequireAuthComponent
    
    

  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,


    provideFirebaseApp(() => initializeApp({"projectId":"authtest-ff85d","appId":"1:444657401161:web:7ba2a399eb92f9648e2e98","databaseURL":"https://authtest-ff85d-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"authtest-ff85d.appspot.com","apiKey":"AIzaSyApV9QoLlfEsjNBhZkmjWe9H4Q0G4LrMQw","authDomain":"authtest-ff85d.firebaseapp.com","messagingSenderId":"444657401161","measurementId":"G-1F6C4G098V"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [provideHttpClient(withInterceptors([bearerTokenInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {


  
}
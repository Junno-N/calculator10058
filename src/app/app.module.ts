import { APP_INITIALIZER, NgModule } from "@angular/core";
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

import { GenreListComponent } from "./components/genre-list/genre-list.component";

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bearerTokenInterceptor } from './bearer-token.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {jsPDF} from "jspdf";
import { TagListComponent } from './components/tag-list/tag-list.component';
import { MemberListComponent } from './components/tag-list/member-list/member-list.component';
import { UserAuthComponent } from './user.auth/user.auth.component';
import { PullTESTComponent } from './pull-test/pull-test.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendertestComponent } from './calendertest/calendertest.component';
import { DragCompComponent } from './drag-comp/drag-comp.component';
import { TaskDetailCalComponent } from './task-detail-cal/task-detail-cal.component';
import { UserAuthManageComponent } from './user-auth-manage/user-auth-manage.component';
import { GenreCreateComponent } from './genre-create/genre-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { GenreListManageComponent } from './genre-list-manage/genre-list-manage.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { FlatComponent } from './flat/flat.component';
import { TasksComponent } from './src/app/components/tag-list/member-list/tasks/tasks.component';
import { AuthService } from "./auth.service";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PastTaskComponent } from './past-task/past-task.component';

@NgModule({
  declarations: [AppComponent, SigninComponent, LandingComponent, GoogleSsoDirective, RequireAuthComponent, GenreListComponent, TagListComponent, MemberListComponent, UserAuthComponent, 
    PullTESTComponent, CalendertestComponent, DragCompComponent, TaskDetailCalComponent, UserAuthManageComponent, GenreCreateComponent, UserListComponent, GenreListManageComponent, ScheduleComponent, DashboardComponent, TaskSearchComponent, FlatComponent, TasksComponent, PastTaskComponent, 
  ],
  imports: [
    ScrollingModule ,
    NgChartsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),   
    BrowserAnimationsModule ,
    provideFirebaseApp(() => initializeApp({"projectId":"authtest-ff85d","appId":"1:444657401161:web:7ba2a399eb92f9648e2e98","databaseURL":"https://authtest-ff85d-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"authtest-ff85d.appspot.com","apiKey":"AIzaSyApV9QoLlfEsjNBhZkmjWe9H4Q0G4LrMQw","authDomain":"authtest-ff85d.firebaseapp.com","messagingSenderId":"444657401161","measurementId":"G-1F6C4G098V"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [provideHttpClient(withInterceptors([bearerTokenInterceptor])) ],
  bootstrap: [AppComponent],
})
export class AppModule {


  
}
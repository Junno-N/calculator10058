import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { LandingComponent } from "./landing/landing.component";

import { GenreListComponent } from "./components/genre-list/genre-list.component";

import { RequireAuthComponent } from './require-auth/require-auth.component';
import { authGuard } from './auth.guard';

import { UserAuthComponent } from "./user.auth/user.auth.component";

import { TaskDetailCalComponent } from "./task-detail-cal/task-detail-cal.component";

import { DragCompComponent } from "./drag-comp/drag-comp.component";

import { UserAuthManageComponent } from "./user-auth-manage/user-auth-manage.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: "daily", component: LandingComponent,
    canActivate: [authGuard],
   },
  { path: "", component: SigninComponent },
  {
    path: 'registtask',
    component: RequireAuthComponent,
    canActivate: [authGuard],
  }, 
  { path: "authtest", component: UserAuthComponent,
    canActivate: [authGuard],
  },
  
  { path: "dashboard", component: DashboardComponent,
    canActivate: [authGuard],},

  {
    path: 'genre-list',
    component: GenreListComponent,
    canActivate: [authGuard],
  },
  { path: 'task/detail', component: TaskDetailCalComponent,
    canActivate: [authGuard],},
  { path: 'task', component:DragCompComponent,
    canActivate: [authGuard],},
  { path: 'userauth', component:UserAuthManageComponent,
    canActivate: [authGuard],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
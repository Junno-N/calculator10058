import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ServicesService } from '../userChecker/services.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-auth-manage',
  templateUrl: './user-auth-manage.component.html',
  styleUrl: './user-auth-manage.component.scss'
})
export class UserAuthManageComponent {
  router: any;
  constructor(private ServicesService: ServicesService,

  ) {}
  ngOnInit():void
  { 
    this.getUser()
    this.getUser2()}
 
  Users=[];
  list:any=[];
  getUser2(){
    this.flag=false
    this.checked=false

    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    let UserAddress = auth.currentUser?.email
    if(!UserName||!UserAddress||!UserUid){return}
  this.ServicesService.getAll().doc("autherList").snapshotChanges().pipe(
    map(changes =>
      (
        ({ id: changes.payload.id, ...changes.payload.data() })
      )
    )
  ).subscribe(data => {
   this.Users =   data; 
  if(!data[UserUid])
    {this.getUser();return}
  else{this.flag=true;
    this.checked=true
  }
}) 
}

  getUser(){
    this.flag=false
    this.checked=false

    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    let UserAddress = auth.currentUser?.email
    if(!UserName||!UserAddress||!UserUid){return}
  this.ServicesService.getAll().doc("managerList").snapshotChanges().pipe(
    map(changes =>
      (
        ({ id: changes.payload.id, ...changes.payload.data() })
      )
    )
  ).subscribe(data => {
   this.Users =   data; 
  if(!data[UserUid])
    {return}
  else{this.flag=true;
    this.checked=true
  }





})

 
}

flag=false
checked=false





}
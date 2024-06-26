import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ServicesService } from '../userChecker/services.service';
import { FormsModule } from '@angular/forms';

import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs';
import { FieldValue, deleteField } from 'firebase/firestore';
;
import { DeleteService } from '../userChecker/delete.service';
import { TutorialService2 } from '../tutorial2/services.service';
import { Tutorial } from '../models/tutorial.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  constructor(private ServicesService: ServicesService,
    private Deleteservice: DeleteService,
    private tutorialService: TutorialService2,
  
  ) {}
  flag=false
  checked=false
  
  Authchecker(){
    this.flag=false
    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    let UserAddress = auth.currentUser?.email
    if(!UserUid){console.log("誰もいないよ！1");return}         
    this.ServicesService.getAll().doc("autherList").snapshotChanges().pipe(
      map(changes =>
        (
          ({ id: changes.payload.id, ...changes.payload.data() })
        )
      )
    ).subscribe(data => {if(!data[UserUid])
      {console.log("管理者ではありません");
        console.log(this.flag);this.checked=true;return}
  else{this.flag=true;this.checked=true;}
  
      }
  )};


  list:any=[]
  tutorials?: Tutorial[];
   deletetest(User:any,mail:any,name:any): void{
  console.log(User)
  console.log(mail)
  console.log(name)
 if(confirm("このユーザを削除してもよろしいでしょうか"))
{this.Deleteservice.deletes().ref.update({[User]:deleteField()});this.Getter()} 
  
  }
;

  Users!: {};


  Getter(){
    let auth = getAuth();
    let User = auth.currentUser?.email;
    if(!User){console.log("誰もいないよ！1");return}         
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.subCollections = data;
    console.log(this.subCollections,"がすべて")
    });
  
    };
    subCollections:any; 
addUser()
{
  console.log("提出テスト開始")
  let auth = getAuth();
  let UserUid = auth.currentUser?.uid;
  let UserName = auth.currentUser?.displayName;
  let UserAddress = auth.currentUser?.email
  if(!UserName||!UserAddress||!UserUid){console.log(UserAddress,"か",UserName,"がないよ！");return}
  const userInfo = { [UserUid]:{[UserName]:UserAddress}}
 this.ServicesService.create("memberList",userInfo)
console.log(userInfo,"が提出できたかな？");
}

getUser(){
  console.log("ネーム取得テスト開始");
  let auth = getAuth();
  let UserUid = auth.currentUser?.uid;
  let UserName = auth.currentUser?.displayName;
  let UserAddress = auth.currentUser?.email
  if(!UserName||!UserAddress||!UserUid){console.log(UserAddress,"か",UserName,"がないよ！");return}
this.ServicesService.getAll().doc("memberList").snapshotChanges().pipe(
  map(changes =>
    (
      ({ id: changes.payload.id, ...changes.payload.data() })
    )
  )
).subscribe(data => {
 this.Users =   data; 
console.log(this.Users,"は取得できましたね！")
console.log(data,"内に、現在のユーザが含まれているかチェックします！")
if(!data[UserUid])
  {"未登録のアカウントです！"}
if(data[UserUid][UserName]==!UserName)
  {console.log("おっと？アカウント名を変更しましたか？",
"以下に表示されるアカウント名について管理者に問い合わせて下さい！"),console.log(data[UserAddress])
}
if(data[UserUid]){console.log(data[UserUid][UserName],"OK!")
  
};


console.log(Object.keys(data))
const lister= Object.keys(data)
this.list=[];
for( let i in lister)
{
  console.log(i,"回目のループです!")
  let testtest = lister[i];
  console.log(testtest,"でやるよ!!!!!")
if(testtest==="id"){console.log(testtest)}else{
console.log(Object.keys(data[testtest])[0],"OK!!!!!")
console.log(data[testtest],"を参考程度に...")
let IdAddress =Object.keys(data[testtest])[0];
let testtest3 =Object.values(data[testtest])[0];
let test3={
id:testtest, 
Name:IdAddress,
Mail:testtest3,
}

console.log(test3,"をだすよ！！！")
this.list!.push(test3);console.log(i,"回目の提出！",this.list);
}

} } )

}
;
selectedOption?:any;

  
onChange(event: any) {
  this.selectedOption = event.target.value; }

consoler(id:any,mail:any,name:any){console.log(this.selectedOption)
  console.log(id)
  console.log(mail)
  console.log(name)
  // const userInfo = { [mail]:{[]:UserAddress}}
this.tutorialService.getAll().doc(this.selectedOption).collection("user").doc(mail).set({[mail]:name})

}

consoler2(id:any,mail:any,name:any){console.log(this.selectedOption)
  console.log(id)
  console.log(mail)
  console.log(name)

this.tutorialService.getAll().doc(this.selectedOption).collection("user").doc(mail).delete()}

consoler3(id:any,mail:any,name:any){ 
  const userInfo = { [id]:{[name]:mail}};
  this.ServicesService.create("managerList",userInfo)}

  consoler4(id:any){ 
  if(confirm("このユーザを削除してもよろしいでしょうか"))
{  this.ServicesService.getAll().doc("managerList").ref.update({[id]:deleteField()})}}


regist(){console.log(this.ServicesService.getAll().doc("memberList"),"aaaa")};


  Authcheck(): void {getAuth().onAuthStateChanged((currentUser) => {
    if (!currentUser) { this.regist
      return;
    } else { this.regist
}
  });  }  
  ngOnInit(): void 
  {
    this.Authcheck();  
          this.list=[]
    
  }

  currentlist?:{};
  currentIndex = -1;

  retrieveTutorials(): void 
  {  

  }


}

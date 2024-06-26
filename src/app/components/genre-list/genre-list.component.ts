import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, map } from 'rxjs';
import { Tutorial } from '../../models/tutorial.model' ;
import { TutorialService2 } from '../../tutorial2/services.service';
import { getAuth } from 'firebase/auth';
import { TagListComponent } from '../tag-list/tag-list.component';
import { ServicesService } from '../../userChecker/services.service'; 
import { DataSharing2Service } from '../../data-sharing2.service';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class GenreListComponent  implements OnInit {
  
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService2,
private ServicesService:ServicesService,
private dataSharing2Service: DataSharing2Service
  ) { }

  Authcheck(): void {getAuth().onAuthStateChanged((currentUser) => {
    if (!currentUser) {
      this.tutorials=[];     ;return;
    } else { 
      this.tutorials=[];
          this.dataSharing2Service.genreList=""
      this.getUser()
}
  });  }  

  ngOnInit(): void 
  
  {    

    this.Authcheck();  
        this.tutorials=[];

  }
  getUser(){
    this.flag=false
    console.log("ネーム取得テスト開始");
    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    let UserAddress = auth.currentUser?.email
    if(!UserName||!UserAddress||!UserUid){console.log(UserAddress,"か",UserName,"がないよ！");return}
  this.ServicesService.getAll().doc("managerList").snapshotChanges().pipe(
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
    {console.log("管理者ではありません");
      console.log(this.flag);this.retrieveTutorials();return}
  else{this.flag=true;this.retrieveTutorials()}
})
}

flag=false

  test(tutorials: any){
    if(this.flag==true)
      {console.log("管理者");return}

    this.dataSharing2Service.genreList=""
    console.log("TEST関数が呼び出されました！");
    let auth = getAuth();
    let UserAdress = auth.currentUser?.email;
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    if(!UserAdress||!UserName||!UserUid){console.log("誰もいないよ！2");return}
    this.tutorials=[]
    for( let i in tutorials){ 
      console.log(this.Users,"ループ？？？")
      console.log(i,"回目のループです!")
    let testtest = tutorials[i];
    let auth = getAuth();
    let User = auth.currentUser?.email;
    let UserName= auth.currentUser?.displayName;
    if(!User||!UserName){console.log("誰もいないよ！");return}
    console.log(i,"回目のループです! ユーザがいるときの処理です！")
    console.log(User,"を使うよ")
    console.log(testtest.id,"を使うよ")
    if(!testtest.id){console.log(testtest,"に",testtest.id,"がない");return}
    this.tutorialService.getAll2(testtest.id,User,UserName).snapshotChanges().pipe(
      map(action =>
        action.map(a =>
          ({ id: a.payload.doc.id, ...a.payload.doc.data() })
        )
      )
    ).subscribe(data => {    console.log(i,"回目！のデータは",data);
  if(data.length==0){console.log(i,"回目のループです!値がないのでリターン");return}
  if(data==undefined){console.log(i,"回目のループです!ないのでリターン");return}
  if(this.tutorials)
    console.log(i,"回目！");
  let checker=Number(i) ;
  let counter=Number(1)+1
  if(this.tutorials![checker]==testtest){console.log("ダブってる！");return;}
  if(!tutorials[counter]){console.log("打ち止め")}
  else{  
  this.tutorials!.push(testtest);console.log(i,"回目の提出！");
  this.dataSharing2Service.genreList=this.tutorials;
  console.log(this.dataSharing2Service.genreList,"を共有提出！")
  this.tutorials = [...new Set(this.tutorials)]
  console.log(this.tutorials!,"が修正後")
 
  return}
  }
    )}
  }

  Users!: {};

   refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }
;




;

retrieveTutorials()
  {  
    this.tutorials=[];
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
      this.tutorials = data;
    console.log(this.tutorials,"がすべて")
    if(this.flag==true)
      {console.log("管理者");  this.dataSharing2Service.genreList=this.tutorials;return}
    else{
    this.test(this.tutorials);console.log("非管理者")}});

  }


  setActiveTutorial(tutorial: Tutorial, index: number): void {
    console.log(this.currentTutorial,"ジャンルです1")
    this.currentTutorial = tutorial;
    this.currentIndex = index;
    console.log(this.currentIndex,"ジャンルです4")
    console.log(this.currentTutorial,"ジャンルです4")

  }}

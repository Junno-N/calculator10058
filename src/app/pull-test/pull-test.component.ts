 import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
  import { AngularFirestore, AngularFirestoreCollection,DocumentData,} from '@angular/fire/compat/firestore';
  import { TutorialService2 } from './../tutorial2/services.service';
import { map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataSharingService } from '../data-sharing.service';
import { GettagService } from '../gettag.service';

@Component({
  selector: 'app-pull-test',
  templateUrl: './pull-test.component.html',
  styleUrl: './pull-test.component.scss'
})
export class PullTESTComponent implements OnInit {
  
    subCollections:any; // ジャンル名
    subCollections2:any;//タグ名
    subCollections3:any; // ユーザ名

  selectedOption: string = '';
  selectedOption2: string = '';
  selectedOption3?:any;

  
  onChange(event: any) {
    this.selectedOption = event.target.value; 
    this.dataSharingService.genreName == event.target.value
   
     this.subCollections2 = [];
    this.subCollections3 = [];
    this.dataSharingService.tagName = this.selectedOption2;
    this.dataSharingService.user = this.selectedOption3;
    this.someFunction(this.selectedOption);
    this.dataSharingService.genreName = this.selectedOption;
   }

  onChange2(event: any) {
    this.selectedOption2 = event.target.value;
     this.dataSharingService.tagName = this.selectedOption2;
    } 
  
    onChange3(event: any) {
      this.selectedOption3 = event.target.value;
       this.dataSharingService.user = this.selectedOption3;
     }
     




  someFunction(selectedValue: string) {
this.tutorialService.getAll().doc(selectedValue).collection('tagList').snapshotChanges().pipe(
  map(forEach =>
    forEach.map(s =>
      ({ id: s.payload.doc.id, ...s.payload.doc.data() })
    )
  )
).subscribe(data => {
  this.subCollections2 = data;
});

this.tutorialService.getAll().doc(selectedValue).collection('user').snapshotChanges().pipe(
  map(forEach =>
    forEach.map(s =>
      ({ id: s.payload.doc.id, ...s.payload.doc.data() })
    )
  )
).subscribe(data => {
  this.subCollections3 = data;

})




  }



    constructor(private firestore: AngularFirestore,
      private tutorialService:TutorialService2,
      private dataSharingService: DataSharingService,
      private taskService:GettagService
    ) {     
    }
  
    ngOnInit(): void {  
      this.Authcheck()   
    }
    Authcheck(): void {getAuth().onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        this.subCollections=[];     ;return;
      } else { 
        this.test()
   }
    });  }  
  



Getter(){
  let auth = getAuth();
  let User = auth.currentUser?.email;
  if(!User){;return}         
  this.tutorialService.getAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
    )
  ).subscribe(data => {
    this.subCollections = data;
console.log(this.isManager,"です")
if(this.isManager==true){;return}  
else{
  this.Check(this.subCollections)}});
  };
    Check(IDS: any){
if(this.isManager==true ){console.log;return}

      this.subCollections=[];
      let auth = getAuth();
      let User = auth.currentUser?.email;
      if(!User){;return}
    
      for( let i in IDS){      let testtest = IDS[i];
      let auth = getAuth();
      let User = auth.currentUser?.email;
      let UserName = auth.currentUser?.displayName;
      if(!User||!UserName){;return}
      this.tutorialService.getAll2(testtest.id ,User,UserName).snapshotChanges().pipe(
        map(action =>
          action.map(a =>
            ({ id: a.payload.doc.id, ...a.payload.doc.data() })           
          )
        )
      ).subscribe(data => {

    if(data.length==0){;return}
    if(this.subCollections)
      console.log(i,"回目！");
    let checker=Number(i) ;
    if(this.subCollections![checker]===testtest){;return;}
    else{  
    this.subCollections!.push(testtest);  
    return}  
  } )
  }
}
test(){
  let auth = getAuth();
let userUID = auth.currentUser?.uid
if(!userUID){return}
this.taskService.isManager(userUID).pipe().subscribe(isManager =>{
this.isManager = isManager 
this.Getter()

}
)
 
}

isManager!: boolean; 

}
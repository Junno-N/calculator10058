import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tutorial } from '../../../models/tutorial.model';
import { getAuth } from 'firebase/auth';
import { map } from 'rxjs';
import { TutorialService } from '../../../services/tutorial.service';
import { FieldPath, FieldValue, Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})  
export class MemberListComponent {
  @Input() tutorial?: Tutorial;
  @Input() tutorial2?: Tutorial;
  @Output() refreshList2: EventEmitter<any> = new EventEmitter();
  
  today = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
    day: "2-digit"}).replaceAll('/', '-')
    currentTutorial3?: Tutorial
  ngOnChanges(): void {

    this.currentTutorial2 = { ...this.tutorial }
     this.currentTutorial = { ...this.tutorial2 }
     ,console.log({ ...this.tutorial },"に書き換えられました")
     ,console.log({ ...this.tutorial2 },"は？")
     ,console.log(this.currentTutorial2,"が引き渡されました"),this.retrieveTutorials();
  }

  currentTutorial?:Tutorial;

  currentTutorial2: Tutorial = {
  id:"" ,
  tag:"" ,
  title:"" ,
  status:"" ,
  priority:"" ,
  deadlineDate:undefined ,
  deadlineTime:"" ,
  freeText:"" ,
  };
  
  tutorials?: Tutorial[];

  currentIndex2 = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

 
  retrieveTutorials(): void 
  {  
    let auth = getAuth();
    let User = auth.currentUser?.email;
    if(!User){console.log("誰もいないよ！1");return}
    if(!this.currentTutorial2.id){console.log("IDが指定されてないよ!!!!!!!!");return}
    console.log("この値で処理されます!!!!!!!!",this.currentTutorial2.id)
    console.log("この値で処理されます2",this.currentTutorial!.id)
    this.tutorialService.getAll().doc(this.currentTutorial!.id).collection("taskList"
,  ref => ref.where('tag','==',this.currentTutorial2.id))
    .snapshotChanges().pipe(
      map(action =>
        action.map(a =>
          ({ id: a.payload.doc.id, ...a.payload.doc.data() })
        )
      )).subscribe(data => {
      this.tutorials = data;
      console.log(data,"やね！") 
      console.log(this.tutorials,"やね！")
    console.log(this.currentTutorial2,"がすべてTGL22")
    this.setActiveTutorial
    console.log(this.currentTutorial2,"がすべてTGL33")
    });

  }

  currentIndex3 = -1;
  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial3={}
    this.currentTutorial3 = tutorial;
    this.currentIndex3 = index;

console.log(this.currentTutorial3)
this.tutorialService.getAll().doc(this.currentTutorial!.id).collection("taskList")
.doc(this.currentTutorial3.id).get().pipe(
    map( 
      doc => {
        const data = doc.data() as Tutorial;
        console.log(data.tag)
        

      })
    )
    console.log("このドキュメントのパスは/tutorials/",this.currentTutorial!.id,"/taskList/"
      ,this.currentTutorial2.id
    )


  }

taskdata:any  
tag="" ;
status="" ;
priority="" ;
deadlineDate=undefined 
deadlineTime="" ;
freeText="" ;
  
}

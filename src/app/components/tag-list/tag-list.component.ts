import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, map } from 'rxjs';
import { Tutorial } from '../../models/tutorial.model' ;
import { TutorialService } from '../../services/tutorial.service';
import { getAuth } from 'firebase/auth';
import { MemberListComponent } from './member-list/member-list.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss'
})
export class TagListComponent {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  ngOnChanges(): void {
    this.currentTutorial3=undefined
     this.currentTutorial = { ...this.tutorial },
     console.log({ ...this.tutorial },"に書き換えられました")
     ,console.log(this.currentTutorial,"が引き渡されました"),this.retrieveTutorials();
  }
  currentTutorial2?: Tutorial
  currentTutorial3?: Tutorial
  ;
  currentTutorial: Tutorial = {
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
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  
 
  retrieveTutorials(): void 
  {  
    this.currentTutorial3=undefined
    let auth = getAuth();
    let User = auth.currentUser?.email;
    if(!User){console.log("誰もいないよ！1");return}
    if(!this.currentTutorial.id){console.log("IDが指定されてないよ！1");return}
    console.log("この値で処理されます",this.currentTutorial.id)
    this.tutorialService.getAll2(this.currentTutorial.id).snapshotChanges().pipe(
      map(forEach =>
        forEach.map(s =>
          ({ id: s.payload.doc.id, ...s.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
      
    console.log(this.tutorials,"がすべてTGL1")
    console.log(this.currentTutorial2,"がすべてTGL2")
    console.log(this.currentTutorial2,"がすべてTGL3")
    });

  }


  setActiveTutorial2(tutorial: Tutorial, index: number): void {
    console.log(tutorial,"tag内側!!!")
    this.currentTutorial2 = tutorial;
    this.currentIndex = index;
    this.currentIndex2 = index;
    console.log(this.currentIndex2,"tag内側だぜ")
    console.log(this.currentTutorial2,"tag内側だぜ3333")
;return
  }
   refreshList2(): void {
    console.log(this.currentIndex2,"tag内側")
    this.currentTutorial2 = undefined;
    this.currentIndex2 = -1;
    this.currentTutorial3=undefined
    
    this.retrieveTutorials();
  }

}

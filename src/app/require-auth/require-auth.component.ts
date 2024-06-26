import { Component, Input, OnInit, input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tutorial } from '../models/tutorial.model';
import { TutorialService2 } from '../tutorial2/services.service';
import { PullTESTComponent } from '../pull-test/pull-test.component';
import { DataSharingService } from '../data-sharing.service';
import { DataSharing2Service } from '../data-sharing2.service';
import { map } from 'rxjs';
import { Timestamp, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './require-auth.component.html',
  styleUrls: ['./require-auth.component.scss']
})
export class RequireAuthComponent {
  preventInput(event: KeyboardEvent): void {
    event.preventDefault();
  }
  selectedDateTime: string = this.getCurrentDateTimeString();
  
  get minDateTime(): string {
    const now = new Date();
    const minDateTimeString = `${now.getFullYear()}-${this.pad(now.getMonth() + 1)}-${this.pad(now.getDate())}T${this.pad(now.getHours())}:${this.pad(now.getMinutes())}`;

    return minDateTimeString;
  }

  private getCurrentDateTimeString(): string {
    const now = new Date();
    return `${now.getFullYear()}-${this.pad(now.getMonth() + 1)}-${this.pad(now.getDate())}T${this.pad(now.getHours())}:${this.pad(now.getMinutes())}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
}

  tutorial: Tutorial = new Tutorial ;
  submitted = false;
  constructor(private tutorialService: TutorialService2,
    private dataSharingService: DataSharingService,
    private dataSharing2Service: DataSharing2Service
  ) {}
  validateTagName()
{
    if (/[/.:;]/.test(this.tutorial.title!)) {
       this.tutorial.title!;
    }
}

  tags = this.dataSharingService.tagName;
  names= this.dataSharingService.genreName;
  user=this.dataSharingService.user;

  fullWidthRegex = /[０-９Ａ-Ｚａ-ｚ]/;;
  isHalfWidthOnly(text: any) {
    return !this.fullWidthRegex.test(text);
  }
  async saveTutorial(): Promise<void> {
    if(!this.tutorial.title||!this.tutorial){return;}
    this.tags = this.dataSharingService.tagName;
    this.names = this.dataSharingService.genreName;
    this.user = this.dataSharingService.user;
    this.tutorial.title=this.tutorial.title.replaceAll(/[/.:;]/g, '')
if((await getDoc(this.tutorialService.getAll().doc(this.names)
  .collection("taskList").doc(this.tutorial.title).ref))
  .exists())
{ 
  if(
  !confirm(("タスク名が重複していますが続けますか？"))) 
  {alert("重複しないようにタスク名をつけてください");return}
 }
 if (!this.isHalfWidthOnly(this.tutorial.title)) {
  alert('全角英数字は使用できません');
  return; 
}
if (!this.isHalfWidthOnly(this.tutorial.freeText)) {
  alert('全角英数字は使用できません');
  return;
}
this.tutorial.title=this.tutorial.title.replaceAll(/[/.:;]/g, '')
this.tutorial.genre=this.names
 this.tutorial.tag=this.tags
 this.tutorial.user=this.user
this.dataSharing2Service=this.tutorial
this.tutorial.taskTime
this.tutorial.deadlineDate= new Date(this.tutorial.deadlineDate!)
this.tutorial.deadlineTime= new Date(this.tutorial.deadlineDate!)
.toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
  day: "2-digit"})
this.tutorialService.create(this.names,this.tutorial.title,this.tutorial).then(() => {
this.submitted = true;
});
  }
  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
  }
  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TutorialService2 } from '../tutorial2/services.service';
import { map } from 'rxjs';
import { TaskbasedcalService } from '../taskbasedcal.service';
import { deleteField } from 'firebase/firestore';

@Component({
  selector: 'app-task-detail-cal',
  templateUrl: './task-detail-cal.component.html',
  styleUrl: './task-detail-cal.component.scss'
})
export class TaskDetailCalComponent {
  task: { id: any, name: any };

  constructor(private route: ActivatedRoute, private router: Router,
    private TutorialService:TutorialService2,
    private TaskbasedcalService: TaskbasedcalService
  ) {
    this.task = {
      id: parseInt(this.route.snapshot.paramMap.get('id') || '0', 10),
      name: ''
    }
    ;
  }
  formatDateToDateTimeLocal(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  ngOnInit(): void {
    const deadline = this.TaskbasedcalService.deadline;
    if (deadline) {

      this.data = this.formatDateToDateTimeLocal(deadline);
    } else {

      this.data = this.formatDateToDateTimeLocal(new Date());
    }
  } 
  freeText=this.TaskbasedcalService.freeText;
  taskTime=this.TaskbasedcalService.taskTime;
  genre=this.TaskbasedcalService.genre;
  tag=this.TaskbasedcalService.tag;
  DeadlineTime=this.TaskbasedcalService.start;
  tasktitle=this.TaskbasedcalService.title;
  Status=this.TaskbasedcalService.status;
  Priority=this.TaskbasedcalService.priority;
  rate=this.TaskbasedcalService.rate;
 data:any=this.TaskbasedcalService.deadline
 preventInput(event: KeyboardEvent): void {
  event.preventDefault();
}
get minDateTime(): string {
  const now = new Date();
  const minDateTimeString = `${now.getFullYear()}-${this.pad(now.getMonth() + 1)}-${this.pad(now.getDate())}T${this.pad(now.getHours())}:${this.pad(now.getMinutes())}`;

  return minDateTimeString;
}
private pad(n: number): string {
  return n < 10 ? '0' + n : n.toString();
}

  catch(){

this.rate=this.rate
    this.genre=this.genre;
    this.Status=this.Status;
    this.Priority=this.Priority;
    this.taskTime=this.taskTime;
    this.freeText=this.freeText

    this.data=new Date(this.data)
    let date2:any
    date2=this.data
    .toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",
      day: "2-digit"})
      console.log(this.data,date2,"処理後")
  this.TutorialService.getAll()
  .doc(this.genre).collection("taskList").doc(this.tasktitle)
  .update({deadlineDate:this.data,deadlineTime:date2,status:this.Status
    ,priority:this.Priority,taskTime:this.taskTime})
  this.TutorialService.getAll()
  .doc(this.genre).collection("taskList").doc(this.tasktitle)
  .update({freeText:this.freeText
  })
}
deletes(){
this.TutorialService.getAll().doc(this.genre).collection("taskList").doc(this.tasktitle)
.delete();}
  save(): void {
    this.goBack();
  }

  discard(): void {
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['task']);
  }
}
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GettagService } from '../gettag.service';
import { forkJoin, of, throwError, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Task } from '../task/task.module';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  userUId!: string;
  isManager!: boolean;
  userWorkHours: { [userUId: string]: number } = {};
  selectedMonth: Date = new Date(); // 選択された月
  selectedUser: string = ''; // 選択されたユーザ
  months: { value: string, label: string }[] = []; // 月のリスト
  users: { id: string, name: string }[] = []; // ユーザのリスト
  private unsubscribe$ = new Subject<void>(); // Unsubscribe用のSubject

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [], label: '予定労働時間' }
  ];

  constructor(private taskService: GettagService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.generateMonthsList();
    this.loadUsers();
    this.loadData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  generateMonthsList() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    for (let i = -12; i <= 12; i++) {
      const date = new Date(currentYear, currentMonth + i, 1);
      const value = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
      const label = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      this.months.push({ value, label });
    }
  }

  loadUsers() {
    this.taskService.getUserList().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(users => {
      this.users = users;
      console.log("Users loaded:", users);
    }, error => {
      console.error("Error loading users:", error);
    });
  }

  onMonthChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedMonth = new Date(selectedValue + '-01');
    this.loadData();
  }

  onUserChange(event: Event) {
    this.selectedUser = (event.target as HTMLSelectElement).value;
    this.loadData();
  }

  loadData() {
    this.userWorkHours = {};
    console.log("Loading data for user:", this.selectedUser, "and month:", this.selectedMonth);

    this.taskService.getUserId().pipe(
      switchMap(userId => {
        this.userUId = userId;
        return this.taskService.isManager(this.userUId).pipe(
          catchError(error => {
            console.error("Error checking manager status:", error);
            return throwError(error);
          })
        );
      }),
      switchMap(isManager => {
        this.isManager = isManager;
        return this.taskService.getTagList().pipe(
          catchError(error => {
            console.error("Error loading tags:", error);
            return throwError(error);
          })
        );
      }),
      switchMap(tags => {
        const tasksObservables = tags.map(tag => {
          return this.taskService.getTasksByTag(tag).pipe(
            map(tasks => {              
              this.calculateTotalWorkHours(tasks,tags.length);
              this.updateChart();
              return tasks;
            }),
            catchError(error => {
              console.error("Error loading tasks for tag:", tag, error);
              return of([]);
            })
          );
        });
        return forkJoin(tasksObservables).pipe(
          map(tasksArrays => {
            const flatTasks = tasksArrays.flat();
            this.updateChart();
            return flatTasks;
          }),
          catchError(error => {
            console.error("Error in forkJoin:", error);
            return throwError(error);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: tasks => {
        console.log("Tasks loaded:", tasks);
      },
      error: err => {
        console.error("Error in observable chain:", err);
      }
    });
  }

  updateData() {
    this.counter=0
    this.flag=true
    this.loadData();
  }
flag:boolean=true
counter=0
  calculateTotalWorkHours(tasks: Task[],length:any) {
    if(this.flag==false){console.log("フラッグ");return} 
 this.counter += 1 

    if(this.counter==length){console.log("最後",this.counter,length);this.flag=false}
    if (!this.isManager && this.selectedUser !== this.userUId) {
      return;
    }    
    const selectedMonth = this.selectedMonth.getMonth();
    const selectedYear = this.selectedMonth.getFullYear();
    const uniquetasks = Array.from(
      new Map(tasks.map((task) => [task.id, task])).values()
    );  

    uniquetasks.forEach(task => {
      const deadlineDate: Timestamp = task.deadlineDate;
      const deadline = deadlineDate.toDate();
      const [year, month] = task.deadlineTime.split('/').map(Number);
      if ((deadline.getMonth() === selectedMonth && deadline.getFullYear() === selectedYear) ||
          (month - 1 === selectedMonth && year === selectedYear)) {
        const userId = task.user;
        if (this.selectedUser && userId !== this.selectedUser) {
          return;
        }
        const taskHours = this.calculateTaskHours(task);
        if (!this.userWorkHours[userId]) {
          this.userWorkHours[userId] = 0;

        }
        this.userWorkHours[userId] += taskHours;
        console.log( this.userWorkHours[userId],task.id,"あるね")
      }
    });
  }

  calculateTaskHours(task: Task): number {
    if (!this.isManager && this.selectedUser !== this.userUId) {
      return 0;
    }

    const taskTime = parseInt(task.taskTime); 
    if (!isNaN(taskTime) && taskTime >= 0 && taskTime <= 24) {
      return taskTime;
    } else {
      return 1;
    }
  }

  updateChart() {
    if (!this.isManager && this.selectedUser !== this.userUId) {
      return;
    }

    this.barChartLabels = Object.keys(this.userWorkHours);
    this.barChartData[0].data = Object.values(this.userWorkHours);
    this.cdr.detectChanges(); 
    console.log("Chart updated:", this.barChartLabels, this.barChartData);
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GettagService } from '../gettag.service';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Task } from '../task/task.module';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  userUId!: string;
  isManager!: boolean;
  userWorkHours: { [userUId: string]: number } = {};
  selectedMonth: Date = new Date(); // 選択された月
  selectedUser: string = ''; // 選択されたユーザ
  months: { value: string, label: string }[] = []; // 月のリスト
  users: { id: string, name: string }[] = []; // ユーザのリスト

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
    this.taskService.getUserList().subscribe(users => {
      this.users = users;
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


    this.taskService.getUserId().pipe(
      switchMap(userId => {
        this.userUId = userId;
        return this.taskService.isManager(this.userUId).pipe(
          catchError(error => {

            return throwError(error);
          })
        );
      }),
      switchMap(isManager => {

        this.isManager = isManager;
        return this.taskService.getTagList().pipe(
          catchError(error => {
;
            return throwError(error);
          })
        );
      }),
      switchMap(tags => {

        const tasksObservables = tags.map(tag => {

          return this.taskService.getTasksByTag(tag).pipe(
            map(tasks => {

              this.calculateTotalWorkHours(tasks);
              this.updateChart();
              return tasks;
            }),
            catchError(error => {
              console.log(`Error in getTasksByTag for tag :`, error);
              return of([]);
            })
          );
        });
        return forkJoin(tasksObservables).pipe(
          map(tasksArrays => {

            const flatTasks = tasksArrays.flat();

            return flatTasks;
          }),
          catchError(error => {
            console.log("Error in forkJoin:", error);
            return throwError(error);
          })
        );
      })
    ).subscribe({
      next: tasks => {

        this.calculateTotalWorkHours(tasks);
        this.updateChart();
      },
      error: err => {
        console.log("Error in observable chain:", err);
      }
    });
  }

  calculateTotalWorkHours(tasks: Task[]) {
    if (!this.isManager && this.selectedUser !== this.userUId) {
      return;
    }


    const selectedMonth = this.selectedMonth.getMonth();
    const selectedYear = this.selectedMonth.getFullYear();
    tasks.forEach(task => {
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
  }
}

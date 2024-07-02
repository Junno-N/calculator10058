import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DashdataService, User } from '../dashdata.service';
import { Genre, Task } from '../dash.service';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getAuth } from 'firebase/auth';

type TaskStatus = '着手前' | '着手中' | '完了' | '中止';
type TaskPriority = '高' | '中' | '低' | '';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  preventInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  formatDateToDateTimeLocal(date: any): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  isHalfWidthOnly(text: any) {
    return !this.fullWidthRegex.test(text);
  }

  fullWidthRegex = /[０-９Ａ-Ｚａ-ｚ]/;
  pad(arg0: number) {
    throw new Error('Method not implemented.');
  }

  genres$: Observable<Genre[]> | null = null;
  users$: Observable<User[]> | null = null;
  managers$: Observable<User[]> | null = null;
  tasksByGenre: { [genreId: string]: Task[] } = {};
  filteredTasks: Task[] = [];
  overdueTasks: Task[] = [];
  sortCriteria: { [key: string]: string } = {};
  selectedGenreId: string | null = null;
  selectedPriority: TaskPriority = '';
  progressData: { [key: string]: number } = {};
  user=getAuth().currentUser?.email;

  pieChartLabels: TaskStatus[] = ['着手前', '着手中', '完了', '中止'];
  pieChartData: any[] = [{ data: [] }];
  chartType: string = 'pie';
  get minDateTime(): string {
    const now = new Date();
    const minDateTimeString = `${now.getFullYear()}-${this.pad(now.getMonth() + 1)}
    -${this.pad(now.getDate())}T${this.pad(now.getHours())}:${this.pad(now.getMinutes())}`;
  
    return minDateTimeString;
  }

  chartOptions = {
    responsive: true
  };

  currentPage: number = 0;
  pageSize: number = 10;
  private subscriptions: Subscription = new Subscription();

  constructor(private dataService: DashdataService) {}

  loadAllGenres(): void {
    this.genres$ = this.dataService.getGenres();
    const genresSub = this.genres$.subscribe(genres => {
      genres.forEach(genre => {
        this.loadTasksByGenre(genre.id);
      });
    });
    this.subscriptions.add(genresSub);
  }

  loadUserGenres(userEmail: string): void {
    this.genres$ = this.dataService.getGenres().pipe(
      switchMap(genres => {
        const genreChecks = genres.map(genre =>
          this.dataService.isUserInGenre(genre.id, userEmail).pipe(
            map(isInGenre => (isInGenre ? genre : null))
          )
        );
        return forkJoin(genreChecks).pipe(
          map(results => results.filter(genre => genre !== null) as Genre[])
        );
      })
    );

    const genresSub = this.genres$.subscribe(genres => {
      genres.forEach(genre => {
        this.loadTasksByGenre(genre.id);
      });
    });
    this.subscriptions.add(genresSub);
  }
flag:boolean=false;
  ngOnInit(): void {
    this.user=getAuth().currentUser?.email;
    this.flag=false
    this.filteredTasks= [];
    this.overdueTasks= [];
    this.selectedGenreId="";
    this.selectedPriority= '';
    this.progressData= {};
    this.users$ = this.dataService.getUserList();
    this.managers$ = this.dataService.getmanagerList();

    const managersSub = this.managers$.subscribe(managers => {
      const auth = getAuth();
      const currentUserEmail = auth.currentUser?.email;

      if (managers.some(manager => manager.email === currentUserEmail)) {
        this.flag=true
        this.loadAllGenres();
        console.log("管理")
      } else {
        this.flag=false
        console.log("非管理")
        this.loadUserGenres(currentUserEmail!);
      }
    });
    this.subscriptions.add(managersSub);

    const usersSub = this.users$.subscribe(users => {
    });
    this.subscriptions.add(usersSub);
    this.genres$ = this.dataService.getGenres();
    
    const genresSub = this.genres$.subscribe(genres => {
      if (genres.length > 0) {
        const currentUserEmail = getAuth().currentUser?.email;
        this.selectedGenreId = genres.find( p => p.id =currentUserEmail! )!.id
      if(this.flag==false){
        this.loadUserGenres(this.selectedGenreId)}
      else{this.loadTasksByGenre(this.selectedGenreId);}
      }
    });
    this.subscriptions.add(genresSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTasksByGenre(genreId: string): void {
    const tasksSub = this.dataService.getTasksByGenre(genreId).subscribe(tasks => {
      console.log('Tasks loaded for genre:', genreId, tasks); // ログを追加
      this.updateFilteredTasks(); // フィルタリングを更新
      this.calculateProgress(genreId, tasks); // 進捗を計算
      this.sortTasks(genreId); // タスクを並べ替え
      this.updatePieChartData(); // グラフデータを更新
      this.updateOverdueTasks(); // 期限が過ぎているタスクを更新
      this.tasksByGenre[genreId] = tasks;
    });
    this.subscriptions.add(tasksSub);
  }

  setSortCriteria(genreId: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {this.sortCriteria[genreId] = target.value;
      this.sortTasks(genreId);
    }
  }

  sortTasks(genreId: string) {
    const criteria = this.sortCriteria[genreId];
    if (!criteria) {
      return;
    }

    this.tasksByGenre[genreId] = this.tasksByGenre[genreId].sort((a, b) => {
      switch (criteria) {
        case 'dateAsc':
          return a.deadlineDate.toDate().getTime() - b.deadlineDate.toDate().getTime();
        case 'dateDesc':
          return b.deadlineDate.toDate().getTime() - a.deadlineDate.toDate().getTime();
        case 'priority':
          const priorityOrder: any = { '高': 1, '中': 2, '低': 3 };
          return (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4);
        default:
          return 0;
      }
    });
  }

  calculateProgress(genreId: string, tasks: Task[]) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === '完了').length;
    this.progressData[genreId] = (totalTasks > 0) ? (completedTasks / totalTasks) * 100 : 0;
  }

  updatePieChartData() {
    const tasks = this.selectedPriority 
      ? this.filteredTasks.filter(task => task.priority === this.selectedPriority)
      : this.filteredTasks;

    const statusCounts: { [key in TaskStatus]: number } = {
      '着手前': 0,
      '着手中': 0,
      '完了': 0,
      '中止': 0
    };
    tasks.forEach(task => {
      statusCounts[task.status as TaskStatus]++;
    });
    const newPieChartData = [{ data: Object.values(statusCounts) }];
    if (JSON.stringify(this.pieChartData) != JSON.stringify(newPieChartData)) {
      this.pieChartData = newPieChartData;     console.log("123") 
    }
  }

  getUserName(email: string, users: User[] | null): string {
    if (!users) {
      return email;
    }
    const user = users.find(u => u.email === email);
    return user ? user.name : email;
  }

  onGenreChange(event: Event | null) {
    if (event) {
      const target = event.target as HTMLSelectElement;
      this.selectedGenreId = target.value;
      console.log('Genre changed to:', this.selectedGenreId); // ログを追加
    }
    if (this.selectedGenreId) {
      this.loadTasksByGenre(this.selectedGenreId);
    }
  }

  onPriorityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPriority = target.value as TaskPriority;
    this.currentPage = 0; 
    this.updateFilteredTasks();
    this.updatePieChartData();
  }

  updateFilteredTasks() {
    if (this.selectedGenreId && this.tasksByGenre[this.selectedGenreId]) {
      const tasks = this.tasksByGenre[this.selectedGenreId];
      const filtered = this.selectedPriority
        ? tasks.filter(task => task.priority === this.selectedPriority)
        : tasks;
      // フィルタリング結果を更新
      this.filteredTasks = filtered.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
    } else {
      this.filteredTasks = [];
    }
  }

  updateOverdueTasks() {
    if (this.selectedGenreId && this.tasksByGenre[this.selectedGenreId]) {
      const now = new Date();
      this.overdueTasks = this.tasksByGenre[this.selectedGenreId].filter(task => 
        task.deadlineDate.toDate().getTime() < now.getTime() && task.status !== '完了'
      );
    } else {
      this.overdueTasks = [];
    }
  }

  loadMoreTasks() {
    this.currentPage++;
    this.updateFilteredTasks();
  }

  getSelectedGenreName(): string {
    const genres = this.genres$ ? this.genres$ : of([]);
    let genreName = '';
    const genresSub = genres.subscribe((genreList: any[]) => {
      const selectedGenre = genreList.find(genre => genre.id === this.selectedGenreId);
      genreName = selectedGenre ? selectedGenre.name : '';
    });
    this.subscriptions.add(genresSub);
    return genreName;
  }

  updateTask(task: Task) {
    if (!this.isHalfWidthOnly(task.freeText)) {
      alert('全角英数字は使用できません ');
      return;
    }
    this.dataService.updateTask(task).subscribe(updatedTask => {
      console.log('Task updated:', updatedTask);
      this.loadTasksByGenre(this.selectedGenreId!);
    });
  }

  deleteTask(task: Task) {
    this.dataService.deleteTask(task)
    ;
}


}

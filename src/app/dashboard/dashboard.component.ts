import { Component, OnInit } from '@angular/core';
import { DashdataService, User } from '../dashdata.service';
import { Genre, Task } from '../dash.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  users$: Observable<User[]> | null = null;
  managers$: Observable<User[]> | null = null;
  tasksByGenre: { [genreId: string]: Task[] } = {};
  sortCriteria: { [key: string]: string } = {};
  selectedGenreId: string | null = null;
  progressData: { [key: string]: number } = {};

  chartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true, max: 100 } }
  };

  constructor(private dataService: DashdataService) {}

  ngOnInit(): void {
    this.users$ = this.dataService.getUserList();
    this.managers$ = this.dataService.getmanagerList();

    this.managers$.subscribe(managers => {
      const auth = getAuth();
      const currentUserEmail = auth.currentUser?.email;

      if (managers.some(manager => manager.email === currentUserEmail)) {
        this.loadAllGenres();
      } else {
        this.loadUserGenres(currentUserEmail!);
      }
    });

    this.users$.subscribe(users => {
      console.log('User list:', users);
    });
  }

  loadAllGenres(): void {
    this.genres$ = this.dataService.getGenres();
    this.genres$.subscribe(genres => {

      genres.forEach(genre => {
        this.loadTasksByGenre(genre.id);
      });
    });
  }

  loadUserGenres(userEmail: string | undefined): void {
    if (!userEmail) {
      return;
    }

    this.genres$ = this.dataService.getGenres().pipe(
      switchMap(genres => this.filterUserGenres(genres, userEmail))
    );

    this.genres$.subscribe(genres => {
      console.log('User genres:', genres);
      genres.forEach(genre => {
        this.loadTasksByGenre(genre.id);
      });
    });
  }

  filterUserGenres(genres: Genre[], userEmail: string): Observable<Genre[]> {
    const observables = genres.map(genre => {
      return this.dataService.getUserSubCollection(genre.id, userEmail).pipe(
        map(userDoc => (userDoc.exists ? genre : null))
      );
    });

    return new Observable<Genre[]>(observer => {
      const results: Genre[] = [];
      let completedRequests = 0;

      observables.forEach(observable => {
        observable.subscribe(result => {
          if (result) {
            results.push(result);
          }
          completedRequests++;
          if (completedRequests === observables.length) {
            observer.next(results.filter(res => res !== null));
            observer.complete();
          }
        });
      });
    });
  }

  loadTasksByGenre(genreId: string): void {
    this.dataService.getTasksByGenre(genreId).subscribe(tasks => {
      this.tasksByGenre[genreId] = tasks;
      this.calculateProgress(genreId, tasks);
      this.sortTasks(genreId);
    });
  }

  setSortCriteria(genreId: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.sortCriteria[genreId] = target.value;
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

  getUserName(email: string, users: User[] | null): string {
    if (!users) {
      return email;
    }
    const user = users.find(u => u.email === email);
    return user ? user.name : email;
  }

  onGenreChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedGenreId = target.value;
  }

  getSelectedGenreName(): string {
    const genres = this.genres$ ? this.genres$ : of([]);
    let genreName = '';
    genres.subscribe(genreList => {
      const selectedGenre = genreList.find(genre => genre.id === this.selectedGenreId);
      genreName = selectedGenre ? selectedGenre.name : '';
    });
    return genreName;
  }
}

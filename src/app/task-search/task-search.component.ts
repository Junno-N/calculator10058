import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Tutorial } from '../models/tutorial.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getAuth } from 'firebase/auth';
import { TutorialService2 } from './../tutorial2/services.service';
import { GettagService } from '../gettag.service';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit {
  projectId: string = '';
  query: string = '';
  tasks$: Observable<Tutorial[]> = of([]); 
  subCollections: any[] = [];
  selectedOption: string = '';
  isManager: boolean = false;
  selectedTask: Tutorial | null = null;
  limit: number = 10; 
  lastVisible: any; 
  constructor(
    private searchService: SearchService,
    private tutorialService: TutorialService2,
    private taskService: GettagService
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const auth = getAuth();
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.getUserRole(currentUser.uid);
        this.loadSubCollections();
      } else {
        this.subCollections = [];
      }
    });
  }

  getUserRole(userUID: string): void {
    this.taskService.isManager(userUID).subscribe(isManager => {
      this.isManager = isManager;

    });
  }

  loadSubCollections(): void {
    const auth = getAuth();
    const user = auth.currentUser?.email;
    const userName = auth.currentUser?.displayName;
    
    if (!user || !userName) {

      return;
    }

    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      if (this.isManager) {
        this.subCollections = data;
      } else {
        this.filterSubCollections(data, user, userName);
      }

    });
  }

  filterSubCollections(data: any[], user: string, userName: string): void {
    this.subCollections = data.filter(subCollection => {
      return this.tutorialService.getAll2(subCollection.id, user, userName).snapshotChanges().pipe(
        map(action => action.length > 0)
      ).toPromise();
    });
  }

  searchTasks(loadMore: boolean = false): void {

    if (this.query.trim() && this.selectedOption) {
      this.tasks$ = this.searchService.searchTasks(this.selectedOption, this.query, this.limit, loadMore ? this.lastVisible : null).pipe(
        catchError(error => {
          return of([]); 
        }),
        map(tasks => {
          if (tasks.length > 0) {
            this.lastVisible = tasks[tasks.length - 1];
          }
          return tasks;
        })
      );
      this.tasks$.subscribe(tasks => {
      });
    } else {

      this.tasks$ = of([]);
    }
  }

  onChange(event: any): void {
    this.selectedOption = event.target.value; 
    
  }

  editTask(task: Tutorial): void {
    this.selectedTask = { ...task };}

  discard(): void {
    this.selectedTask = null; 
  }

  updateTask(): void {
    if (this.selectedTask&&this.selectedTask.id) {

      this.tutorialService.updateTask(this.selectedOption, this.selectedTask.id, this.selectedTask).subscribe(() => {
        this.searchTasks(); 
        this.selectedTask = null;       });
    }
  }

  loadMoreTasks(): void {
    this.searchTasks(true);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { TutorialService2 } from '../tutorial2/services.service';
import { map, Subscription } from 'rxjs';
import { FieldPath, Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-past-task',
  templateUrl: './past-task.component.html',
  styleUrl: './past-task.component.scss'
})
export class PastTaskComponent {
  genres: any[] = [];
  today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });

  shouldDisplayGenreList: boolean = false;
  tasksByGenre: { [key: string]: any[] } = {}; 
  priorityOptions: string[] = ['高', '中', '低'];
  statusOptions: string[] = ['着手前', '着手中', '完了', '中止'];
  private subscriptions: Subscription[] = []; 

  constructor(
    private tutorialService: TutorialService2
  ) { }

  ngOnInit(): void {
    this.tasksByGenre = {};
    this.loadGenres();
  }

  loadGenres(): void {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("ユーザーが認証されていません");
      return;
    }

    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.genres = data;
      this.test();
    });
  }
  fullWidthRegex = /[０-９Ａ-Ｚａ-ｚ]/;;

  isHalfWidthOnly(text: any) {
    return !this.fullWidthRegex.test(text);
  }  


  deletes(item: any){

    const { genre, title,} = item;
    if(!confirm("削除しますか？")){return}else{
    this.tutorialService.getAll()
    .doc(genre).collection("taskList").doc(title).delete(); this.test();}  
  }


  updateTask(item: any): void {
    const { genre, title, status, priority, taskTime ,freeText} = item;

    if(!freeText){this.tutorialService.getAll()
      .doc(genre).collection("taskList").doc(title)
      .update({ status, priority, taskTime })
      .then(() => {
        this.test();
      });}
      else{
        if (!this.isHalfWidthOnly(freeText.trim())){
          alert('半角文字のみを使用してください');
          return;}
    this.tutorialService.getAll()
      .doc(genre).collection("taskList").doc(title)
      .update({ status, priority, taskTime,freeText })
      .then(() => {
        this.test();
      });}
  }

  preventInput(event: KeyboardEvent): void {
    event.preventDefault();
  }

  test(): void {
    this.tasksByGenre = {}; 
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("ユーザーが認証されていません");
      return;
    }

    for (const genre of this.genres) {
      const sub = this.tutorialService.getAll().doc(genre.id).collection('taskList', ref =>
        ref.where(new FieldPath("user"), '==', user.email)
        .where(new FieldPath("deadlineTime"), '!=', this.today)
        .where(new FieldPath("status"), 'in', ["着手前","着手中",])
          .where(new FieldPath("deadlineDate"), '<=', new Date())
      ).snapshotChanges().pipe(
        map(actions =>
          actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
        )
      ).subscribe(data => {

        if (!this.tasksByGenre[genre.id]) {
          console.log(!this.tasksByGenre[genre.id])
          this.tasksByGenre[genre.id] = [];
        }
        data.forEach(task => {
          if (!this.tasksByGenre[genre.id].some(t => t.id === task.id)) {
            this.tasksByGenre[genre.id].push(task);
          }
        });
      });

      this.subscriptions.push(sub);
    }
  }

  ngOnDestroy(): void {
     this.subscriptions.forEach(sub => sub.unsubscribe());
    this.tasksByGenre = {};
  }

  trackByFn(index: number, item: any): string {
    return item.id;
  }
}

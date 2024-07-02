import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { getAuth } from 'firebase/auth';
import { TutorialService2 } from '../tutorial2/services.service';

@Component({
  selector: 'app-genre-list-manage',
  templateUrl: './genre-list-manage.component.html',
  styleUrls: ['./genre-list-manage.component.scss']
})
export class GenreListManageComponent implements OnInit {
  subCollections: any[] = []; // ジャンル名
  subCollections2: any[] = []; // タグ名

  selectedGenre: string = '';
  selectedTag: string = '';
  newTagName: string = '';

  constructor(private firestore: AngularFirestore, private tutorialService: TutorialService2) {}

  ngOnInit(): void {  
    this.checkAuth();
  }

  checkAuth(): void {
    getAuth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.loadGenres();
      } else {
        this.subCollections = [];
      }
    });
  }

  loadGenres(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.subCollections = data;
    });
  }

  onGenreChange(event: any): void {
    this.selectedGenre = event.target.value;
    this.loadTags(this.selectedGenre);
  }

  loadTags(selectedGenre: string): void {
    this.tutorialService.getAll().doc(selectedGenre).collection('tagList').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.subCollections2 = data;
    });
  }

  onTagChange(event: any): void {
    this.selectedTag = event.target.value;
  }
  fullWidthRegex = /[０-９Ａ-Ｚａ-ｚ]/;;

  isHalfWidthOnly(text: any) {
    return !this.fullWidthRegex.test(text);
  }  

  addTag(): void {

    if (this.selectedGenre && this.tagToAdd.replaceAll(/[/:.;]/g, '').trim() !== '') {
      if (!this.isHalfWidthOnly(this.tagToAdd.trim())){
        alert('半角文字のみを使用してください');
        return; 
      }
      if (this.subCollections2.length >= 5) {
        alert('タグの数は5個までです。');
        return;
      }
      this.tagToAdd=this.tagToAdd.replaceAll(/[/:.;]/g, '')
      const tagData = { id: this.tagToAdd };
      this.tutorialService.getAll().doc(this.selectedGenre).collection('tagList').doc(this.tagToAdd).set(tagData).
      then(() => {
        this.subCollections2.push(tagData);
        this.tagToAdd = '';
        alert('新しいタグが追加されました。');
      });
    }
  }

  tagToAdd: string = '';

  deleteGenre(): void {
    
    if (this.selectedGenre) {
      if(confirm("ジャンルを削除しますか？")){
      this.firestore.collection('tutorials').doc(this.selectedGenre).delete().then(() => {
        this.selectedGenre = '';
        this.subCollections2 = [];
        this.loadGenres();
      }).catch(error => {
        console.error('ジャンル削除エラー:', error);
      });
    }
  else{alert("削除を中止しました")}
  
  }
  }

  confirmDeleteOrUpdateTag(): void {
    const confirmation = confirm('タグを削除しますか？ (OK = 削除, Cancel = 名前を変更)');
    if (confirmation) {
      this.deleteTag();
    } else {
      if (!this.newTagName.replaceAll(/[/:.;]/g, '').trim()) {
        alert('新しいタグ名を入力してください');
      } else {
        this.updateTagName();
      }
    }
  }

  deleteTag(): void {
    if (this.selectedTag && this.selectedGenre) {
      this.deleteTasksWithTag(this.selectedGenre, this.selectedTag).then(() => {
        this.firestore.collection('tutorials').doc(this.selectedGenre).collection('tagList').doc(this.selectedTag).delete().then(() => {
          this.selectedTag = '';
          this.loadTags(this.selectedGenre);
        }).catch(error => {
          console.error('タグ削除エラー:', error);
        });
      }).catch(error => {
        console.error('タスク削除エラー:', error);
      });
    }
  }

  async deleteTasksWithTag(selectedGenre: string, selectedTag: string): Promise<void> {
    const tasksSnapshot = await this.firestore.collection('tutorials').doc(selectedGenre).collection('taskList', ref => ref.where('tag', '==', selectedTag)).get().toPromise();
    const batch = this.firestore.firestore.batch();

    tasksSnapshot?.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  }

  updateTagName(): void {
    if (this.selectedTag&& this.selectedGenre)
      {this.selectedTag=this.selectedTag
this.newTagName=this.newTagName.replaceAll(/[/:.;]/g, '')        
      const tagDocRef = this.firestore.collection('tutorials').doc(this.selectedGenre).collection('tagList').doc(this.selectedTag);
      const newTagDocRef = this.firestore.collection('tutorials').doc(this.selectedGenre).collection('tagList').doc(this.newTagName);

      tagDocRef.get().subscribe(doc => {
        if (doc.exists) {
          const tagData = doc.data();
          newTagDocRef.set(tagData!).then(() => {
            tagDocRef.delete().then(() => {
              this.updateTasksWithNewTag(this.selectedGenre, this.selectedTag, this.newTagName).then(() => {
                this.selectedTag = '';
                this.newTagName = '';
                this.loadTags(this.selectedGenre);
              }).catch(error => {
                console.error('タスク更新エラー:', error);
              });
            }).catch(error => {
              console.error('古いタグ削除エラー:', error);
            });
          }).catch(error => {
            console.error('新しいタグ作成エラー:', error);
          });
        }
      });
    }
  }

  async updateTasksWithNewTag(selectedGenre: string, oldTag: string, newTag: string): Promise<void> {
    const tasksSnapshot = await this.firestore.collection('tutorials').doc(selectedGenre).collection('taskList', ref => ref.where('tag', '==', oldTag)).get().toPromise();
    const batch = this.firestore.firestore.batch();

    tasksSnapshot?.forEach(doc => {
      batch.update(doc.ref, { tag: newTag });
    });

    return batch.commit();
  }
}

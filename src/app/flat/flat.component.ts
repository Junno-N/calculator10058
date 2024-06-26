import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Tutorial } from '../models/tutorial.model';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss']
})
export class FlatComponent implements OnInit {
  @Input() tutorial!: Tutorial;
  @Output() refreshList: EventEmitter<void> = new EventEmitter<void>();
  
  users$: Observable<any[]> | null = null;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tutorial'] && changes['tutorial'].currentValue) {
      this.loadUsers();
    }
  }

Object(object1:any){return Object.values(object1)[1]}


  loadUsers() {
    const genreId = this.tutorial.id;
    this.users$ = this.firestore.collection(`tutorials/${genreId}/user`).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        console.log(data,"でユーザリスト作成")
        return { id: a.payload.doc.id, ...data };
      }))
    );
  }
}

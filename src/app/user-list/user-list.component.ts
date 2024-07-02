import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ServicesService } from '../userChecker/services.service';
import { DeleteService } from '../userChecker/delete.service';
import { TutorialService2 } from '../tutorial2/services.service';
import { Tutorial } from '../models/tutorial.model';
import { map } from 'rxjs/operators';
import { deleteField } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(
    private servicesService: ServicesService,
    private deleteService: DeleteService,
    private tutorialService: TutorialService2
  ) {}

  flag = false;
  checked = false;
  list: any[] = [];
  tutorials?: Tutorial[];
  Users: any = {};
  subCollections: any;
  selectedOption?: any;
  currentIndex = -1;
  currentlist?: {};

  ngOnInit(): void {

    this.list = [];
    this.Authchecker();this.Getter(); this.getUser();
    this.fetchUserGroups
  }

  
  Authchecker() {
    this.flag = false;
    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    if (!UserUid) {
      console.log("誰もいないよ！1");
      return;
    }
    this.servicesService.getAll().doc("autherList").snapshotChanges().pipe(
      map(changes => ({
        id: changes.payload.id,
        ...changes.payload.data()
      }))
    ).subscribe(data => {
      if (!data[UserUid]) {
        this.checked = true;
        this.getUser()
      } else {
        this.flag = true;
        this.checked = true;
        this.getUser()
      }
    });
  }

  deletetest(User: any, mail: any, name: any): void {
    if (confirm("このユーザを削除してもよろしいでしょうか")) {
      this.deleteService.deletes().ref.update({ [User]: deleteField() });
      this.Getter();
    }
  }

  Getter() {
    let auth = getAuth();
    let User = auth.currentUser?.email;
    if (!User) {
      return;
    }
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.subCollections = data;
    });
  }

  addUser() {
    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    let UserAddress = auth.currentUser?.email;
    if (!UserName || !UserAddress || !UserUid) {
      return;
    }
    const userInfo = { [UserUid]: { [UserName]: UserAddress } };
    this.servicesService.create("memberList", userInfo);
  }

  getUser() {
    let auth = getAuth();
    let UserUid = auth.currentUser?.uid;
    let UserName = auth.currentUser?.displayName;
    let UserAddress = auth.currentUser?.email;
    if (!UserName || !UserAddress || !UserUid) {
      return;
    }
    this.servicesService.getAll().doc("memberList").snapshotChanges().pipe(
      map(changes => ({
        id: changes.payload.id,
        ...changes.payload.data()
      }))
    ).subscribe(data => {
      this.Users = data;
      const lister = Object.keys(data);
      this.list = [];
      for (let i in lister) {
        let testtest = lister[i];
        if (testtest === "id") {
          console.log(testtest);
        } else {
          let IdAddress = Object.keys(data[testtest])[0];
          let testtest3 = Object.values(data[testtest])[0];
          let test3 = {
            id: testtest,
            Name: IdAddress,
            Mail: testtest3,
            Groups: []
          };
          this.list!.push(test3);


          this.fetchUserGroups(testtest, test3);
        }
      }
    });
  }

  async fetchUserGroups(userId: string, user: any) {
    try { console.log("トライ")


      console.log('Group Data:',this.subCollections);
      if (this.subCollections) {
        for (const group of this.subCollections) {
          const userDoc = await this.tutorialService.getAll().doc(group.id).collection("user").doc(user.Mail).get().toPromise();
          if (userDoc && userDoc.exists) {
            user.Groups.push(group.id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user groups:', error); // Debugging information
    }
  }

  onChange(event: any) {
    this.selectedOption = event.target.value;
  }

  consoler(id: any, mail: any, name: any) {
    this.tutorialService.getAll().doc(this.selectedOption).collection("user").doc(mail).set({ [mail]: name });
  }

  consoler2(id: any, mail: any, name: any) {
    this.tutorialService.getAll().doc(this.selectedOption).collection("user").doc(mail).delete();
  }

  consoler3(id: any, mail: any, name: any) {
    const userInfo = { [id]: { [name]: mail } };
    this.servicesService.create("managerList", userInfo);
  }

  consoler4(id: any) {
    if (confirm("このユーザを削除してもよろしいでしょうか")) {
      this.servicesService.getAll().doc("managerList").ref.update({ [id]: deleteField() });
    }
  }

  regist() {
    console.log(this.servicesService.getAll().doc("memberList"), "aaaa");
  }
}

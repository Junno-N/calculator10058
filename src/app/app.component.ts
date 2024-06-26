import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
     window.addEventListener('beforeunload', this.logout);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.logout);
  }

  logout = () => {
    this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/']); 
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}

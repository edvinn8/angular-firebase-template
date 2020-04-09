import { Component } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-firebase-template'
  loading: boolean
  user: firebase.User

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.loading = true
    afAuth.authState.subscribe((user) => {
      console.log('this.afAuth.authState changed', user)
      this.user = user
      this.loading = false
      if (user) {
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['/login'])
      }
    })
  }
}

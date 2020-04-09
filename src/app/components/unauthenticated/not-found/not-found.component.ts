import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-not-found',
  template: ''
})
export class NotFoundComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      this.router.navigate([!!user ? '/dashboard' : 'login'])
    })
  }
}

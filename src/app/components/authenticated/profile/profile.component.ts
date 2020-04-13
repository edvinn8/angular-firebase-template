import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  loggedInUser: firebase.User

  temp: FormGroup
  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.temp = this.fb.group({})
    this.afAuth.authState.pipe(take(1)).subscribe((user) => (this.loggedInUser = user))
  }
}

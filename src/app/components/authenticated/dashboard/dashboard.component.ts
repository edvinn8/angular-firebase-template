import { Component, OnInit } from '@angular/core'
// Import Firebase and AngularFire
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { AuthService } from '../../unauthenticated/auth/auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public authInfo: Observable<firebase.User>
  messageListRef: firebase.database.Reference

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.authInfo = this.afAuth.authState
  }

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe((usree) => {
      this.messageListRef = firebase.database().ref('message_list/' + usree.id)
      this.messageListRef.on('value', (snapshot) => {
        var data = snapshot.val() // "last"
        console.log('data: ', data)
      })
    })
  }

  test() {
    this.messageListRef.push({
      user_id: 'ada',
      text:
        'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
    })
    //   .then(function (snapshot) {
    //   var key = snapshot.key // "ada"
    //   console.log('key: ', key)
    //   var data = snapshot.val() // "last"
    //   console.log('data: ', data)
    // })
    // console.log('messageListRef.toJSON(): ', messageListRef.ref.toJSON())
    // var newMessageRef = messageListRef.push()
    // newMessageRef.set({
    //   user_id: 'ada',
    //   text:
    //     'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
    // })
    // We've appended a new message to the message_list location.
    // var path = newMessageRef.toString()
    // console.log('path: ', path)
  }
}

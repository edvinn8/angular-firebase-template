import { Component, OnInit } from '@angular/core'
// Import Firebase and AngularFire
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable } from 'rxjs'
import { AngularFireDatabase } from '@angular/fire/database'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public authInfo: Observable<firebase.User>
  messageListRef: firebase.database.Reference
  displayData: any

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.authInfo = this.afAuth.authState
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((usree) => {
      if (usree) {
        this.messageListRef = this.afDatabase.database.ref('message_list/' + usree.uid)
        this.messageListRef.on('value', (snapshot) => {
          var data = snapshot.val() // "last"
          this.displayData = Object.values(data)
          console.log('data: ', data)
        })
      }
    })
  }

  test() {
    this.displayData = this.displayData.splice()
    //   .then(function (snapshot) {
    //   var key = snapshot.key // "ada"
    //   console.log('key: ', key)
    //   var data = snapshot.val() // "last"
    //   console.log('data: ', data)
    // })
    // console.log('messageListRef.toJSON(): ', messageListRef.ref.toJSON())
    var newMessageRef = this.messageListRef.push()
    newMessageRef.set({
      user_id: 'ada',
      text:
        'The Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves.'
    })
    // We've appended a new message to the message_list location.
    // var path = newMessageRef.toString()
    // console.log('path: ', path)
  }
}

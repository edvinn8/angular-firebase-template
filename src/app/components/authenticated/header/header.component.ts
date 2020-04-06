import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../unauthenticated/auth/auth.service'
import { User } from '../../unauthenticated/auth/user.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  loggedInUser: User

  ngOnInit() {
    // TODO: Handle sidbar toggling
    this.authService.user.subscribe((user) => (this.loggedInUser = user))
  }

  logout() {
    this.authService.logout()
  }
}

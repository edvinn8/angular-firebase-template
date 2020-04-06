import { Component } from '@angular/core'
import { AuthService } from './components/unauthenticated/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-firebase-template'

  authenticated = false

  constructor(private authService: AuthService) {
    this.authService.autoLogin()
    this.authService.user.subscribe((user) => (this.authenticated = !!user))
  }
}

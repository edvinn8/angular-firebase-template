import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { take } from 'rxjs/operators'
import { Router } from '@angular/router'

@Component({
  selector: 'app-not-found',
  template: '',
})
export class NotFoundComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      this.router.navigate([!!user ? '/dashboard' : 'login'])
    })
  }
}

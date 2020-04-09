import { DOCUMENT } from '@angular/common'
import { Component, HostListener, Inject, OnInit, Renderer2, OnDestroy } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { take } from 'rxjs/operators'
import { SidebarService } from '../sidebar/sidebar.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser: firebase.User
  subscription: Subscription

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private afAuth: AngularFireAuth,
    private renderer: Renderer2,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.subscription = this.sidebarService.sidebarToggled$.subscribe((sidebarToggled) => {
      this.renderer[sidebarToggled ? 'addClass' : 'removeClass'](
        this.document.body,
        'sidebar-toggled'
      )
      this.renderer[sidebarToggled ? 'addClass' : 'removeClass'](
        this.document.getElementsByClassName('sidebar').item(0),
        'toggled'
      )
    })
    this.afAuth.authState.pipe(take(1)).subscribe((user) => (this.loggedInUser = user))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidebarService.collapseSidebar()
    }
  }
  logout() {
    this.afAuth.signOut()
  }
}

import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnInit, Renderer2, HostListener } from '@angular/core'
import { AuthService } from '../../unauthenticated/auth/auth.service'
import { User } from '../../unauthenticated/auth/user.model'
import { SidebarService } from '../sidebar/sidebar.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  loggedInUser: User

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private renderer: Renderer2,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarToggled$.subscribe((sidebarToggled) => {
      this.renderer[sidebarToggled ? 'addClass' : 'removeClass'](
        this.document.body,
        'sidebar-toggled'
      )
      this.renderer[sidebarToggled ? 'addClass' : 'removeClass'](
        this.document.getElementsByClassName('sidebar').item(0),
        'toggled'
      )
    })

    this.authService.user$.subscribe((user) => (this.loggedInUser = user))
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('event.target.innerWidth: ', event.target.innerWidth)
    if (event.target.innerWidth < 768) {
      this.sidebarService.collapseSidebar()
    }
  }

  logout() {
    this.authService.logout()
  }
}

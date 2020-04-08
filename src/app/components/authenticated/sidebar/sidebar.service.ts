import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarToggled = false

  private sidebarToggledSubject = new BehaviorSubject<boolean>(false)
  public sidebarToggled$ = this.sidebarToggledSubject.asObservable()

  constructor() {}

  toggleSidebar() {
    this.sidebarToggled = !this.sidebarToggled
    this.sidebarToggledSubject.next(this.sidebarToggled)
  }

  collapseSidebar() {
    if (!this.sidebarToggled) {
      this.sidebarToggled = true
      this.sidebarToggledSubject.next(this.sidebarToggled)
    }
  }
}

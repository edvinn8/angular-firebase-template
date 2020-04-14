import { Component, OnInit } from '@angular/core'
import { settings } from 'src/app/shared/config'

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.sass']
})
export class AuthenticatedComponent implements OnInit {
  brandAndYear = `${settings.uiConfig.footer.brand} ${new Date().getFullYear()}`

  constructor() {}

  ngOnInit() {}
}

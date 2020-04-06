import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthenticatedComponent } from './authenticated.component'
import { HeaderComponent } from './header/header.component'
import { SidebarComponent } from './sidebar/sidebar.component'

describe('AuthenticatedComponent', () => {
  let component: AuthenticatedComponent
  let fixture: ComponentFixture<AuthenticatedComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent, HeaderComponent],
      declarations: [AuthenticatedComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatedComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

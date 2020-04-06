import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderComponent } from './header.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      declarations: [HeaderComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

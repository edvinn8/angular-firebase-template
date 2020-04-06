import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NotFoundComponent } from './not-found.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

describe('NotFoundComponent', () => {
  let component: NotFoundComponent
  let fixture: ComponentFixture<NotFoundComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      declarations: [NotFoundComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

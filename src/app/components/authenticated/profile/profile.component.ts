import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  temp: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.temp = this.fb.group({})
  }
}

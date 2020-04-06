import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup
  errorMsg: string

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(false)
    })
  }

  onSubmit() {
    const formValue = this.loginForm.value
    this.authService.signupOrLogin(formValue.email, formValue.password).subscribe(
      (res) => {
        console.log('res: ', res)
      },
      (err) => {
        this.errorMsg = err
        // TODO: display this in HTML
      }
    )
  }
}

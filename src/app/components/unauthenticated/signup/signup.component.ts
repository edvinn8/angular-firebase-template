import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: this.fb.group(
        {
          password: new FormControl('', [Validators.required, Validators.minLength(6)]),
          repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        },
        { validator: this.equalPasswords }
      ),
    })
  }

  equalPasswords(group: FormGroup) {
    const pass = group.get('password').value
    const repeatPassword = group.get('repeatPassword').value

    return pass === repeatPassword ? null : { notSame: true }
  }

  onSubmit() {
    const formValue = this.signupForm.value
    this.authService
      .signupOrLogin(
        formValue.email,
        formValue.passwords.password,
        `${formValue.firstName} ${formValue.lastName}`
      )
      .subscribe((res) => console.log('res: ', res))
  }
}

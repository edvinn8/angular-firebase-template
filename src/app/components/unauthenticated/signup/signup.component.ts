import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup
  errorMsg: string

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: this.fb.group(
        {
          password: new FormControl('', [Validators.required, Validators.minLength(6)]),
          repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
        },
        { validator: this.equalPasswords }
      )
    })
  }

  equalPasswords(group: FormGroup) {
    const pass = group.get('password').value
    const repeatPassword = group.get('repeatPassword').value

    return pass === repeatPassword ? null : { notSame: true }
  }

  onSubmit() {
    const formValue = this.signupForm.value
    this.afAuth
      .createUserWithEmailAndPassword(formValue.email, formValue.passwords.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: `${formValue.firstName} ${formValue.lastName}`
        })
      })
      .catch((err) => (this.errorMsg = err))
  }
}

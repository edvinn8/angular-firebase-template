import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { settings } from '../../../shared/config'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup
  errorMsg: string
  showGoogleLoginOption = settings.uiConfig.loginOptions.google.display
  showFacebookLoginOption = settings.uiConfig.loginOptions.facebook.display

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(false)
    })
  }

  onSubmit() {
    this.errorMsg = null
    const formValue = this.loginForm.value
    this.afAuth
      .signInWithEmailAndPassword(formValue.email, formValue.password)
      .catch((err) => (this.errorMsg = err))
  }

  googleLogin() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  facebookLogin() {
    this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }
}

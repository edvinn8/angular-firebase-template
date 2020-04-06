import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { catchError, tap, take } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs'
import { settings } from '../../../shared/config'

import { User } from './user.model'

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null)
  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
  API_KEY = settings.apiConfig.apiKey

  signupOrLogin(email: string, password: string, displayName?: string) {
    return this.http
      .post<AuthResponseData>(
        `${this.API_URL}${displayName ? 'signUp' : 'signInWithPassword'}?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        take(1),
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            displayName,
            resData.idToken,
            +resData.expiresIn
          )
        })
      )
  }

  autoLogin() {
    const userData: {
      email: string
      id: string
      displayName: string
      _token: string
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.displayName,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/login'])
    localStorage.removeItem('userData')
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  private handleAuthentication(
    email: string,
    userId: string,
    displayName: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, displayName, token, expirationDate)
    this.user.next(user)
    this.router.navigate(['/dashboard'])
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.'
        break
    }
    return throwError(errorMessage)
  }
}

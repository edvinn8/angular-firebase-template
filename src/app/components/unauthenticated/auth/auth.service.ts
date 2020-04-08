import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, take, tap } from 'rxjs/operators'
import { UserService } from 'src/app/services/user/user.service'
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
  private userSubject = new BehaviorSubject<User>(null)
  public user$ = this.userSubject.asObservable()
  private tokenExpirationTimer: any

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  API_KEY = settings.apiConfig.apiKey

  signupOrLogin(email: string, password: string, displayName?: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          displayName ? 'signUp' : 'signInWithPassword'
        }?key=${this.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
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
    this.userSubject.next(loadedUser)
    this.verifyToken(userData._token).subscribe(
      () => {
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
          this.autoLogout(expirationDuration)
        }
      },
      // TODO: error handling
      () => this.logout()
    )
  }

  verifyToken(idToken: string) {
    return this.http
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${this.API_KEY}`,
        {
          idToken
        }
      )
      .pipe(take(1), catchError(this.handleError))
  }

  logout() {
    this.userSubject.next(null)
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

    // log in as soon as possible to reflect in the app and enable interceptor
    const user = new User(email, userId, displayName, token, expirationDate)
    this.userSubject.next(user)
    this.router.navigate(['/dashboard'])
    this.autoLogout(expiresIn * 1000)

    // add or get info to database
    const obs = displayName ? this.userService.insertUser(user) : this.userService.getUser(userId)
    obs.subscribe((dbUserData) => {
      const newUser = new User(
        dbUserData.email,
        dbUserData.id,
        dbUserData.displayName,
        token,
        expirationDate,
        dbUserData.databaseId
      )
      this.userSubject.next(newUser)
      localStorage.setItem('userData', JSON.stringify(newUser))
    })
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

  getLoggedInUser(): Observable<User> {
    return this.userSubject.pipe(take(1))
  }
}

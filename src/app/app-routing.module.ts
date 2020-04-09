import { NgModule } from '@angular/core'
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components/authenticated/dashboard/dashboard.component'
import { ProfileComponent } from './components/authenticated/profile/profile.component'
import { TableComponent } from './components/authenticated/table/table.component'
import { AuthComponent } from './components/unauthenticated/auth/auth.component'
import { ForgotPasswordComponent } from './components/unauthenticated/forgot-password/forgot-password.component'
import { NotFoundComponent } from './components/unauthenticated/not-found/not-found.component'
import { SignupComponent } from './components/unauthenticated/signup/signup.component'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login'])
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['/dashboard'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'table',
    component: TableComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    component: AuthComponent,
    ...canActivate(redirectLoggedInToDashboard)
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectLoggedInToDashboard)
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    ...canActivate(redirectLoggedInToDashboard)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

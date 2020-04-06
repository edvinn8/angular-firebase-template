import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './components/authenticated/dashboard/dashboard.component'
import { ProfileComponent } from './components/authenticated/profile/profile.component'
import { TableComponent } from './components/authenticated/table/table.component'
import { AuthComponent } from './components/unauthenticated/auth/auth.component'
import { AuthGuard } from './components/unauthenticated/auth/auth.guard'
import { ForgotPasswordComponent } from './components/unauthenticated/forgot-password/forgot-password.component'
import { NotFoundComponent } from './components/unauthenticated/not-found/not-found.component'
import { SignupComponent } from './components/unauthenticated/signup/signup.component'
import { ReverseAuthGuard } from './components/unauthenticated/auth/reverse-auth.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [ReverseAuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ReverseAuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [ReverseAuthGuard]
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

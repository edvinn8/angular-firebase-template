import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthenticatedComponent } from './components/authenticated/authenticated.component'
import { DashboardComponent } from './components/authenticated/dashboard/dashboard.component'
import { HeaderComponent } from './components/authenticated/header/header.component'
import { ProfileComponent } from './components/authenticated/profile/profile.component'
import { SidebarComponent } from './components/authenticated/sidebar/sidebar.component'
import { TableComponent } from './components/authenticated/table/table.component'
import { AuthComponent } from './components/unauthenticated/auth/auth.component'
import { ForgotPasswordComponent } from './components/unauthenticated/forgot-password/forgot-password.component'
import { SignupComponent } from './components/unauthenticated/signup/signup.component'
import { UnauthenticatedComponent } from './components/unauthenticated/unauthenticated.component'
import { AuthInterceptorService } from './components/unauthenticated/auth/auth-interceptor.service'
import { NotFoundComponent } from './components/unauthenticated/not-found/not-found.component'

// Import AngularFire
import { AngularFireModule } from '@angular/fire'
// import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'

import { settings } from '../app/shared/config'
@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    ProfileComponent,
    TableComponent,
    UnauthenticatedComponent,
    AuthComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AuthComponent,
    NotFoundComponent
  ],
  imports: [
    // Init Firebase with environment configuration
    AngularFireModule.initializeApp(settings.apiConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

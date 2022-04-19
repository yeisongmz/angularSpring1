import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { ClienteService } from './Services/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './utils/auth.Interceptor';
import {ErrorInterceptor} from './utils/error.interceptor';



import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';
import { LoginComponent } from './components/usuarios/login.component';
import { AuthGuard } from './Guards/auth.guard';
import { RoleGuard } from './Guards/role.guard';

registerLocaleData(localeEs, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'} },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [ClienteService, { provide: LOCALE_ID, useValue: 'es' }, 
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

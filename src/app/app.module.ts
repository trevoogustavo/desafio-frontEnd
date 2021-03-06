import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { TextMaskModule } from 'angular2-text-mask';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteCadastroComponent } from './components/cliente-cadastro/cliente-cadastro.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './components/login/auth.service';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClienteCadastroComponent,
    PaginaNaoEncontradaComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    TextMaskModule,
    NgxMaskModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

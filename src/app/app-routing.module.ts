import { HomeComponent } from './components/home/home.component';
import { ClienteCadastroComponent } from './components/cliente-cadastro/cliente-cadastro.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
//import { AuthGuard } from './guards/';
import { AppComponent } from './app.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component'; 

const routes: Routes = [

  { path: 'login',  component: LoginComponent },
  { path: 'cliente', component: ClienteCadastroComponent },
  {path: '', component: HomeComponent},
 // { path: '', canActivate: [AuthGuard], redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent}, 
];
//canActivate: [AuthGuard],

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { User } from './../../model/User';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isDate } from 'util';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly API = `${environment.API}login`
displayMenuEmitter = new EventEmitter<boolean>()  ;
private usuarioAutenticado:boolean = false;
  constructor(private http:  HttpClient, private router: Router) { }

  fazerLogin(user: User){
    if((user.nome ==="admin" || user.nome ==="comun") && (user.senha ==="123456") ){
      //btoa(user.senha)
        return this.http.post<User>(this.API, user);
        this.usuarioAutenticado = true;
        this.displayMenuEmitter.emit(true);
    }else{
      this.usuarioAutenticado = false;
        this.displayMenuEmitter.emit(false);
    }
  }

  usuarioLogado() {
    let senha = sessionStorage.getItem('pass')
    if( senha!= null && atob(senha) === '123456' ){
      return !this.usuarioAutenticado;
    }
  return this.usuarioAutenticado;
  }

  isAdmin(){
    let level = sessionStorage.getItem('level');
    if (level === 'ADMIN'){
      return !this.usuarioAutenticado;
    }
  }

  logOut() {
    sessionStorage.removeItem('level')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('pass')
    this.router.navigate(['/login'])
  }
}

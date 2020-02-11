import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { User } from './../../model/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly API = `${environment.API}login`
  constructor(private http:  HttpClient, private router: Router) { }

  fazerLogin(user: User){
    if((user.nome ==="admin" || user.nome ==="comun") && (user.senha ==="123456") ){
      //btoa(user.senha)
        return this.http.post<User>(this.API, user);
    }
  }

  usuarioLogado() {
    let senha = sessionStorage.getItem('pass')
    //console.log(!(user === null))
  return !(senha === null)
  }

  logOut() {
    sessionStorage.removeItem('level')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('pass')
    this.router.navigate(['/login'])
  }
}

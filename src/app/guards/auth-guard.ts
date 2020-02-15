import { AuthService } from './../components/login/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor( private authService: AuthService, private  route: Router) { }

  canActivate(
            route: ActivatedRouteSnapshot,
            statte: RouterStateSnapshot
  ): Observable<boolean> |boolean{
    if(this.authService.usuarioLogado()){
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}

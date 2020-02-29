import { User } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
message = '';
error: any ;
private user: User = new User();

  constructor(private router: Router, private  authService:  AuthService) { }

  ngOnInit() {
  }

   fazerLogin(){
     this.authService.fazerLogin(this.user).subscribe((data: User) =>{
       sessionStorage.setItem('user',btoa(this.user.nome));
       sessionStorage.setItem('pass', btoa(this.user.senha));
       sessionStorage.setItem('level', data.level)
       this.router.navigate([''])
       console.log(data);
     }, error =>{
       this.error = error;
       alert("Algo deu errado, tente novamente mais tarde.")
     console.log("Algo deu errado", error)
    });
   }
}

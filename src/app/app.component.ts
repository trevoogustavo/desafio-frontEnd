import { environment } from './../environments/environment';
import { AuthService } from './components/login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'desafio-frontEnd';
  ambiente: string;
  displayAdmin: boolean = false;
  usuarioLogado: boolean = false;
  constructor(private route: Router, private authService:AuthService){
    this.ambiente =environment.ambiente;
  }
  ngOnInit():void{
    this.isAdmin();
   }
  mostrarMenu(){
    if(this.authService.usuarioLogado() ){
      return true;
    }
  }

  fazerLogoff(){
    this.authService.logOut();
  }
  isAdmin(){
    if(sessionStorage.getItem('level') === 'ADMIN'){
      this.displayAdmin = !this.displayAdmin;
      return true;
    }
  }
}

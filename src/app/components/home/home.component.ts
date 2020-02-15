import { AuthService } from './../login/auth.service';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { error } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
private clientes: Cliente[];
private error;
displayError: boolean = false;
isAdmin: boolean =false;
  constructor(private service: ClienteService, private auth: AuthService) { }

  ngOnInit() {
    this.findAll();
    debugger;
    this.isAdmin = this.auth.isAdmin();
  }

  findAll(){
    this.service.findAll().subscribe((data: Cliente[]) =>{
      this.clientes = data;
      console.log(this.clientes);
      
    }, error  =>{
      this.error = error['error'].message;
      this.displayError = !this.displayError;
      if(this.error == undefined){
        this.error= "Erro ao buscar Clientes"
      }
      console.log("erro:",error['error'].message)
    })
  }
}

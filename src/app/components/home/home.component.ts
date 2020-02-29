
import { AuthService } from './../login/auth.service';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { error } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
displayForm: boolean = false;
clientes: Cliente[] = [];
cliente:  Cliente = new Cliente();
@Output() eventUpdate =  new EventEmitter();
private error;
message;
displayError: boolean = false;
isAdmin: boolean =false;
  constructor(private service: ClienteService, private auth: AuthService, private route: Router) {
    this.isAdmin = this.auth.isAdmin();
   }

  ngOnInit() {
    this.findAll(); 
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
      setTimeout(()=>this.error =  '', 3000)
    },)
  }

  onViewCliente(cliente: Cliente){
    this.cliente= cliente;
    console.log(this.cliente);
  }

  onPreUpdate(cliente: Cliente){
      console.log(cliente)
      this.displayForm = !this.displayForm;
      this.eventUpdate.emit(cliente);
      

  }

  excluirCliente(cliente){
    this.service.excluirCliente(cliente.id, sessionStorage.getItem('level')).subscribe((res)=>{
      console.log(res)
        this.findAll();
        alert(res['mensagem'])
    },error =>{
      console.log(error)
    })
  }
}

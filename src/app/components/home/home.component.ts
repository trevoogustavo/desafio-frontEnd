import { Endereco } from './../../model/Endereco';

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
//onUpdate: boolean = false;
 cliente:  Cliente = new Cliente();
 endereco: Endereco= new Endereco();
@Output() eventUpdate =  new EventEmitter();
error;
telMask = ['(',/[1-9]/, /\d/,')', ' ', /\d/,/\d/,/\d/,/\d/, '-', /\d/,/\d/,/\d/,/\d/,/\d/]
cepMask = [/[0-9]/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ]
 
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
    this.endereco= this.cliente.endereco
    console.log(this.cliente);
  }

  onPreUpdate(cliente: Cliente){
    if( this.clientes.length < 0){
      this.clientes = []
    }
      this.cliente = cliente;
      this.endereco= this.cliente.endereco

  }
  onUpdate(form){
    this.cliente.endereco = this.endereco;
    this.service.salvarCliente(this.cliente, sessionStorage.getItem('level')).subscribe((data) =>{
        this.message = "Cliente Atualizado com sucesso"
        this.service.findAll();
    },error =>{
      console.error(error);
    });
    console.log(this.cliente)
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

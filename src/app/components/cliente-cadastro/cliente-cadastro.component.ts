
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Telefone } from './../../model/Telefone';
import { Email } from './../../model/Email';
import { Cliente } from 'src/app/model/Cliente';
import { Endereco } from 'src/app/model/Endereco';
import { error } from 'protractor';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
 displayAdmin: boolean = false;
 emails: Email[] = [];
 email: Email= new Email();

 telefones:Telefone[] = [];
 telefone:Telefone= new Telefone();
 cliente: Cliente= new Cliente();
 endereco: Endereco = new Endereco();
  cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/,/\d/]
  telMask = ['(',/[1-9]/, /\d/,')', ' ', /\d/,/\d/,/\d/,/\d/, '-', /\d/,/\d/,/\d/,/\d/]
  cel = []
  constructor(private service: ClienteService) { }

  ngOnInit() {
    this.isAdmin();
  }

  isAdmin(){
    if(sessionStorage.getItem('level') === 'ADMIN'){
      this.displayAdmin = !this.displayAdmin;
    }
  }

  addTelefone(){
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  addEmail(email){
    this.emails.push(this.email);
    this.email = new Email();
  }


  salvarCliente(cliente){
    console.log(cliente);
  }

limpaForm(clientForm?:NgForm){
  this.cliente = new Cliente();
}

buscarEndereco(cep){
  debugger;
  this.service.buscarEndereco(cep).subscribe((data: Endereco) =>{
      this.endereco  = data
      console.log(this.endereco)
  },error =>{
    console.log(error)
  });
 
}

}

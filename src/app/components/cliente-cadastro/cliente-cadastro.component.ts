
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Telefone } from './../../model/Telefone';
import { Email } from './../../model/Email';
import { Cliente } from 'src/app/model/Cliente';
import { Endereco } from 'src/app/model/Endereco';
import { error } from 'protractor';

@Component({
  selector: 'cliente-form',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
 displayAdmin: boolean = false;
 emails: Email[] = [];
 email: Email= new Email();
 message;
 erro;
 telefones:Telefone[] = [];
 telefone:Telefone= new Telefone();
 cliente: Cliente= new Cliente();
 endereco: Endereco = new Endereco();
  cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/,/\d/]
  telMask = ['(',/[1-9]/, /\d/,')', ' ', /\d/,/\d/,/\d/,/\d/, '-', /\d/,/\d/,/\d/,/\d/]
  cepMask = [/[0-9]/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
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
  removeTelefone(telefone){
    this.telefones.splice(telefone,0)
  }

  addEmail(email){
    this.emails.push(this.email);
    this.email = new Email();
  }
  removeEmail(email){
    this.emails.splice(email,0)
  }

  salvarCliente(cliente){
    this.removeTelMask();
    this.endereco.cep= cliente.value.cep;
    this.endereco.logradouro=  cliente.value.logradouro
    this.cliente.nome = cliente.value.nome;
    this.cliente.cpf = cliente.value.cpf.replace(/[^\d]+/g,'')
    this.cliente.endereco = this.endereco;
    this.cliente.telefones= this.telefones ;
    this.cliente.emails= this.emails;
    //console.log(this.cliente);
    this.service.salvarCliente(this.cliente,  sessionStorage.getItem('level')).subscribe((data) =>{
      this.message = data['mensagem']
      setTimeout(()=> this.message = '', 3000);
    }, error=>{
      this.erro= error['error'].message
      setTimeout(()=> this.message = '', 3000);
    });
    this.limpaForm();
  }

  removeTelMask(){
      this.telefones.forEach(item =>{
          const tel = item.numero.replace(/[^\d]+/g,'');
          item.numero = tel;
      });
  }

limpaForm(){
  this.endereco = new Endereco();
  this.cliente = new Cliente();
}

buscarEndereco(cep){
  let cepReg = cep.replace(/[^\d]+/g,'')
  this.service.buscarEndereco(cepReg).subscribe((data: Endereco) =>{
      this.endereco = data
  },error =>{
    console.log(error)
  });
 
}


}

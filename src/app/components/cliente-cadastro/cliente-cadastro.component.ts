import { Email } from './../../model/Email';

import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Telefone } from './../../model/Telefone';
import { Cliente } from 'src/app/model/Cliente';
import { Endereco } from 'src/app/model/Endereco';



@Component({
  selector: 'cliente-form',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
 displayAdmin: boolean = false;
 emails: Email[] = [];
email: Email = new  Email();
 message;
 erro;
 telefones:Telefone[] = [];
public telefone:Telefone= new Telefone();
cliente: Cliente = new Cliente();
public  endereco: Endereco = new Endereco();
  formulario : FormGroup;

  cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,'-', /\d/,/\d/]
  telMask = ['(',/[1-9]/, /\d/,')', ' ', /\d/,/\d/,/\d/,/\d/, '-', /\d/,/\d/,/\d/,/\d/]
  cepMask = [/[0-9]/,/\d/,'.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  constructor(private service: ClienteService, private  formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome:[null, [Validators.minLength(3), Validators.required, Validators.maxLength(100)]],
      cpf:[null, [Validators.required]],
      cep:[null],
      logradouro:[null],
      complemento:[null],
      bairro:[null],
      localidade:[null],
      uf:[null],
      tipoTel:[null],
      numero:[''],
      email:[''],
      
    });

    this.isAdmin();
    this.service.emitirCliente.subscribe(     
      (cliente) => {
        this.cliente = cliente
        console.log(cliente)
      });
  }

  isAdmin(){
    if(sessionStorage.getItem('level') === 'ADMIN'){
      this.displayAdmin = !this.displayAdmin;
    }
  }

  addTelefone(){
    this.telefone.tipo = this.formulario.get('tipoTel').value;
    this.telefone.numero  = this.formulario.get('numero').value
    this.telefones.push(this.telefone);
    this.formulario.get('tipoTel').reset();
    this.formulario.get('numero').reset();
    this.endereco =  new Endereco();
  }
  removeTelefone(telefone){
    this.telefones.splice(telefone)
  }

  addEmail(){
  this.email.endereco = this.formulario.get('email').value;
   this.emails.push(this.email);
    this.formulario.get('email').reset();
    this.email  = new Email();
  }
  removeEmail(email){
    this.emails.splice(email,1)
  }

  salvarCliente(){
    //this.removeTelMask();
    this.cliente.nome = this.formulario.get('nome').value;
    this.cliente.cpf = this.formulario.get('cpf').value.replace(/[^\d]+/g,'');
    const cep =this.formulario.get('cep').value.replace(/[^\d]+/g,'');
    this.endereco.cep = cep;
    this.endereco.logradouro = this.formulario.get('logradouro').value;
    this.endereco.complemento  =  this.formulario.get('complemento').value;
    this.endereco.bairro = this.formulario.get('bairro').value;
    this.endereco.localidade = this.formulario.get('localidade').value;
    this.endereco.uf = this.formulario.get('uf').value;
    this.cliente.endereco = this.endereco;
    this.cliente.telefones= this.telefones;
    this.cliente.emails= this.emails; 
    console.log(this.cliente)
    this.formulario.reset()
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
  let cepReg = this.formulario.get('cep').value.replace(/[^\d]+/g,'')
  this.service.buscarEndereco(cepReg).subscribe((data: Endereco) =>{
     // this.formulario.controls['logradouro'].setValue(data['logradouro']) 
     this.endereco = data 
      console.log(data['localidade'])
  },error =>{
    console.log(error)
  });
 
}


}

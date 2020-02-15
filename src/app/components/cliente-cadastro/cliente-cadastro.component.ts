import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {
 displayAdmin: boolean = false;
  constructor() { }

  ngOnInit() {
    this.isAdmin();
  }

  isAdmin(){
    if(sessionStorage.getItem('level') === 'ADMIN'){
      this.displayAdmin = !this.displayAdmin;
    }
  }
}

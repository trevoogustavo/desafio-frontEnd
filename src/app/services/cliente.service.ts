import { AuthService } from './../components/login/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = `${environment.API}cliente`
  private readonly viaCep = ``
  //private const headers = new Headers().append('Authorization', 'Basic '+sessionStorage.getItem('pass'));
  constructor(private http:  HttpClient) { }
  findAll() {
    return this.http.get<any>(this.API );
  }

  buscarEndereco(cep){
    if(cep != ''){
        const validaCep = /^[0-9]{8}$/;
        if(validaCep.test(cep)){
          return this.http.get<any>(`//viacep.com.br/ws/${cep}/json/`)
        }
    }
    return of({});
  }
}

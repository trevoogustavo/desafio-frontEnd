import { AuthService } from './../components/login/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = `${environment.API}cliente`
  constructor(private http:  HttpClient) { }

  findAll() {
    return this.http.get<any>(this.API);
  }
}

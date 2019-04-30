import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;

  constructor(private storage: Storage, private http: HttpClient) { }

  login(email: string, password: string) {
    const data = { email, password };


    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/user/login`, data).subscribe((resp) => {
        console.log(resp);
  
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });

  
  }

  registro(usuario: Usuario) {

    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/user/create`, usuario).subscribe((resp) => {
        console.log(resp);
  
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }
}
